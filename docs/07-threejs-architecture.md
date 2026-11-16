# 07 — Three.js architecture

File: `src/lib/coldField.ts` — a framework-agnostic class mounted by `Hero.tsx` through a dynamic import.

## Intent

The hero should feel like standing inside a cold, moving air mass: volumetric fog, suspended ice crystals, and a field that responds to the pointer. When the visitor stops moving, the field slows and frost creeps in from the edges — a controlled chamber reaching equilibrium, not a screensaver.

## Scene graph

```
WebGLRenderer (alpha:false, antialias:false, DPR ≤ 1.75)
├── fogScene (Scene)
│   ├── OrthographicCamera(-1,1,1,-1,0,1)
│   └── Mesh(PlaneGeometry(2,2), ShaderMaterial)
│        uTime, uFreeze, uAspect, uPointer
└── pointsScene (Scene)
    ├── PerspectiveCamera(55°, z=3.4)
    └── Points(BufferGeometry × 2,200, ShaderMaterial, additive)
         attributes: position, aScale, aSeed
         uniforms: uTime, uFreeze, uPointer, uPixelRatio
```

Two scenes avoid resizing a world-space fog plane against changing aspect ratios. `autoClear = false`; each frame clears once, renders fog, then points.

## Fog shader

Fractal value noise (5 octaves, rotated between octaves) drives:

1. **Flow** — domain-warped fbm at low frequency, scrolling on two axes.
2. **Plume** — a second fbm warped by the first, thresholded with `smoothstep(0.30, 0.96)` for soft volumetric density.
3. **Filaments** — high-frequency fbm raised to the third power, tinted electric cyan at 20% intensity.
4. **Pointer bloom** — radial falloff around the smoothed pointer, adding a 7% cyan lift.
5. **Horizon glow** — a horizontal band low in the frame for depth separation.
6. **Frost** — product of two fbm fields masked by an edge-weighted radial curve, strong only when `uFreeze → 1`.
7. **Vignette + grain** — 0.40–1.18 luminance falloff and per-frame hash grain at 0.014.

Frost is computed in the shader, so it flows across the fog rather than sitting on top as a static texture. CSS adds a second, softer frost layer at the viewport edges.

## Particle system

- 2,200 points distributed in a 5.4 × 3.3 × 4.6 box behind the content plane.
- Vertex shader: slow sine drift on x/y (seeded per particle), pointer repulsion within 0.95 units, perspective size attenuation `38 / -mv.z`.
- Fragment: soft circular sprite, `smoothstep` alpha, additive blending, `depthWrite: false`.
- Pointer is smoothed with `lerp(1 - 0.0015^dt)`, giving a fluid trail rather than a snapping crosshair.

## Freeze state machine

```
ACTIVE ──(2.8s no pointer/key/scroll)──► FREEZING ──(damp 1.15/s)──► FROZEN
   ▲                                                                   │
   └────────────────(any pointer/key/scroll)───────────────────────────┘
```

`uFreeze` is damped toward 0/1 rather than switched, so frost spreads and melts over roughly 1.5s while the CSS overlay takes 2.6s. Time itself scales by `1 - freeze * 0.6`, slowing drift and filaments. The chamber readout switches to "HOLDING", the loop reads "IDLE / STABLE", and the load bar contracts.

## Lifecycle

| Event | Response |
| --- | --- |
| Hero mounts | dynamic `import()` after first paint |
| WebGL unavailable | `createColdField` catches, logs a warning, CSS atmosphere remains |
| Hero off-screen | IntersectionObserver → `setActive(false)`, loop idles without rendering |
| Tab hidden | browser suspends rAF; delta clamped to 50ms on return |
| Resize | ResizeObserver → renderer size, aspect, DPR, projection update |
| Reduced motion | no rAF loop; `setFreeze` renders a single frame instantly |
| Unmount | cancel rAF, remove listener/observer, dispose geometry, materials, renderer, canvas |

## Performance budget

| Lever | Setting |
| --- | --- |
| Pixel ratio | `min(dpr, 1.75)` |
| Particles | 2,200 (enough density at 1.75 DPR without fill-rate pain) |
| Antialiasing | off; fog hides edges, additive points do not need MSAA |
| Depth | disabled on both materials |
| Shader octaves | 5 fog octaves; no raymarching, no post-processing pass |
| Render loop | only while hero intersects the viewport |
| Bundle | Three.js split into `three` chunk and loaded via dynamic import |

Known cost: the fog fragment shader is fill-rate bound, so low-end mobile GPUs will run hotter. The intended mitigation is to reduce particle count/DPR below 700px or swap to a static gradient — a tracked roadmap item rather than a claimed optimisation.

## Tuning knobs

| Uniform / constant | Effect |
| --- | --- |
| `PARTICLE_COUNT` | Density vs GPU cost |
| `uFreeze` damp lambda (1.15) | Speed of frost spread/melt |
| `uTime` scale (`1 - freeze*0.6`) | How much the field slows when idle |
| Pointer repulsion `0.24` | Strength of the air displacement |
| `smoothstep(0.30, 0.96)` in fog | Fog coverage vs legibility |
| IDLE_DELAY (2800ms) | How quickly the chamber settles |

## Accessibility and fallback

Canvas is `aria-hidden`. No meaning is carried by the field. Under `prefers-reduced-motion`, the scene renders a single static frame (time = 6s) and the CSS frost overlay is disabled. If WebGL creation throws, the gradient atmosphere and all content remain intact.
