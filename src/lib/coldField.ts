import * as THREE from 'three';

const FOG_VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const FOG_FRAG = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uFreeze;
  uniform float uAspect;
  uniform vec2 uPointer;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = rot * p * 2.03;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = uv - 0.5;
    p.x *= uAspect;

    float t = uTime * (1.0 - uFreeze * 0.6);
    float flow = fbm(p * 1.35 + vec2(t * 0.035, -t * 0.045));
    float plume = fbm(p * 0.9 + flow * 0.8 + vec2(-t * 0.016, -t * 0.052));
    float density = smoothstep(0.30, 0.96, plume * 1.12);

    vec3 deep = vec3(0.012, 0.026, 0.032);
    vec3 ice = vec3(0.048, 0.30, 0.40);
    vec3 col = mix(deep, ice, density * 0.62);

    float filaments = pow(max(0.0, fbm(p * 2.1 + flow - t * 0.03)), 3.0);
    col += vec3(0.20, 0.86, 1.0) * filaments * 0.20;

    vec2 ptr = uPointer * 0.5;
    ptr.x *= uAspect;
    float d = length(p - ptr);
    col += vec3(0.24, 0.86, 1.0) * smoothstep(0.55, 0.0, d) * 0.07;

    col += vec3(0.10, 0.44, 0.56) * smoothstep(0.62, 0.0, abs(p.y + 0.16)) * 0.06;

    float crystal = fbm(uv * vec2(9.0, 14.0)) * fbm(uv * 23.0 + 5.0);
    float edge = smoothstep(0.1, 0.85, length((uv - 0.5) * vec2(1.3, 1.0)) * 1.65);
    float frost = smoothstep(0.11, 0.5, crystal) * uFreeze * (0.22 + edge * 0.95);
    col = mix(col, vec3(0.60, 0.82, 0.91), frost * 0.30);

    float vignette = smoothstep(1.2, 0.12, length(p));
    col *= 0.40 + vignette * 0.78;

    float grain = hash(uv * vec2(1024.0, 768.0) + fract(uTime));
    col += (grain - 0.5) * 0.014;

    gl_FragColor = vec4(col, 1.0);
  }
`;

const POINTS_VERT = /* glsl */ `
  attribute float aScale;
  attribute float aSeed;
  uniform float uTime;
  uniform float uFreeze;
  uniform float uPixelRatio;
  uniform vec2 uPointer;
  varying float vFade;

  void main() {
    vec3 p = position;
    float t = uTime * (1.0 - uFreeze * 0.55);

    p.x += sin(t * 0.22 + aSeed * 6.2831) * 0.18;
    p.y += cos(t * 0.17 + aSeed * 4.712) * 0.13 + sin(t * 0.05 + aSeed * 6.2831) * 0.1;

    vec2 ptr = uPointer * 2.1;
    float d = distance(p.xy, ptr);
    p.xy += normalize(p.xy - ptr + 0.0001) * smoothstep(0.95, 0.0, d) * 0.24;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aScale * uPixelRatio * (38.0 / max(0.2, -mv.z));
    vFade = smoothstep(2.6, 0.8, d) * 0.75 + 0.25;
  }
`;

const POINTS_FRAG = /* glsl */ `
  precision mediump float;
  varying float vFade;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.02, d) * vFade * 0.5;
    gl_FragColor = vec4(0.74, 0.94, 1.0, alpha);
  }
`;

const PARTICLE_COUNT = 2200;

export class ColdField {
  private container: HTMLElement;
  private renderer: THREE.WebGLRenderer;
  private fogScene = new THREE.Scene();
  private fogCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  private pointsScene = new THREE.Scene();
  private pointsCamera = new THREE.PerspectiveCamera(55, 1, 0.1, 30);

  private fogUniforms: Record<string, THREE.IUniform>;
  private pointUniforms: Record<string, THREE.IUniform>;
  private geometry: THREE.BufferGeometry;
  private material: THREE.ShaderMaterial;
  private fogGeometry: THREE.PlaneGeometry;
  private fogMaterial: THREE.ShaderMaterial;

  private clock = new THREE.Clock();
  private elapsed = 6;
  private freeze = 0;
  private freezeTarget = 0;
  private pointer = new THREE.Vector2(0, 0.08);
  private pointerTarget = new THREE.Vector2(0, 0.08);
  private raf = 0;
  private active = true;
  private disposed = false;
  private reduced: boolean;
  private resizeObserver: ResizeObserver;
  private onPointerMove: (event: PointerEvent) => void;

  constructor(container: HTMLElement, reducedMotion = false) {
    this.container = container;
    this.reduced = reducedMotion;

    this.renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: false,
      powerPreference: 'high-performance',
      stencil: false,
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    this.renderer.setClearColor(0x03070a, 1);
    this.renderer.autoClear = false;
    this.renderer.domElement.setAttribute('aria-hidden', 'true');
    container.appendChild(this.renderer.domElement);

    this.fogUniforms = {
      uTime: { value: 0 },
      uFreeze: { value: 0 },
      uAspect: { value: 1 },
      uPointer: { value: new THREE.Vector2(0, 0.08) },
    };

    this.fogGeometry = new THREE.PlaneGeometry(2, 2);
    this.fogMaterial = new THREE.ShaderMaterial({
      vertexShader: FOG_VERT,
      fragmentShader: FOG_FRAG,
      uniforms: this.fogUniforms,
      depthWrite: false,
      depthTest: false,
    });
    this.fogScene.add(new THREE.Mesh(this.fogGeometry, this.fogMaterial));

    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const scales = new Float32Array(PARTICLE_COUNT);
    const seeds = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 5.4;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 3.3;
      positions[i * 3 + 2] = Math.random() * 4.6 - 3.0;
      scales[i] = 0.5 + Math.random() * 1.9;
      seeds[i] = Math.random();
    }

    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
    this.geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));

    this.pointUniforms = {
      uTime: { value: 0 },
      uFreeze: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 1.75) },
      uPointer: { value: new THREE.Vector2(0, 0.08) },
    };

    this.material = new THREE.ShaderMaterial({
      vertexShader: POINTS_VERT,
      fragmentShader: POINTS_FRAG,
      uniforms: this.pointUniforms,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
    });

    this.pointsScene.add(new THREE.Points(this.geometry, this.material));
    this.pointsCamera.position.set(0, 0, 3.4);

    this.onPointerMove = (event: PointerEvent) => {
      const rect = this.container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((((event.clientY - rect.top) / rect.height) * 2) - 1);
      this.pointerTarget.set(
        THREE.MathUtils.clamp(x, -1.2, 1.2),
        THREE.MathUtils.clamp(y, -1.2, 1.2),
      );
    };
    window.addEventListener('pointermove', this.onPointerMove, { passive: true });

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(container);
    this.resize();

    if (!this.reduced) {
      this.raf = requestAnimationFrame(this.tick);
    }
  }

  private resize = () => {
    const width = this.container.clientWidth || 1;
    const height = this.container.clientHeight || 1;
    this.renderer.setSize(width, height, false);
    this.fogUniforms.uAspect.value = width / height;
    this.pointsCamera.aspect = width / height;
    this.pointsCamera.updateProjectionMatrix();
    this.pointUniforms.uPixelRatio.value = Math.min(window.devicePixelRatio || 1, 1.75);
    if (this.reduced) this.draw();
  };

  private draw = () => {
    if (this.disposed) return;
    this.renderer.clear();
    this.renderer.render(this.fogScene, this.fogCamera);
    this.renderer.render(this.pointsScene, this.pointsCamera);
  };

  private tick = () => {
    if (this.disposed) return;
    this.raf = requestAnimationFrame(this.tick);
    if (!this.active) {
      this.clock.getDelta();
      return;
    }

    const delta = Math.min(this.clock.getDelta(), 0.05);
    this.elapsed += delta;
    this.freeze = THREE.MathUtils.damp(this.freeze, this.freezeTarget, 1.15, delta);
    this.pointer.lerp(this.pointerTarget, 1 - Math.pow(0.0015, delta));

    this.fogUniforms.uTime.value = this.elapsed;
    this.fogUniforms.uFreeze.value = this.freeze;
    (this.fogUniforms.uPointer.value as THREE.Vector2).copy(this.pointer);

    this.pointUniforms.uTime.value = this.elapsed;
    this.pointUniforms.uFreeze.value = this.freeze;
    (this.pointUniforms.uPointer.value as THREE.Vector2).copy(this.pointer);

    this.draw();
  };

  setFreeze(value: boolean): void {
    this.freezeTarget = value ? 1 : 0;
    if (this.reduced) {
      this.freeze = this.freezeTarget;
      this.fogUniforms.uFreeze.value = this.freeze;
      this.pointUniforms.uFreeze.value = this.freeze;
      this.draw();
    }
  }

  setActive(value: boolean): void {
    this.active = value;
    if (value) this.clock.getDelta();
  }

  dispose(): void {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    window.removeEventListener('pointermove', this.onPointerMove);
    this.resizeObserver.disconnect();
    this.geometry.dispose();
    this.material.dispose();
    this.fogGeometry.dispose();
    this.fogMaterial.dispose();
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }
}

export function createColdField(container: HTMLElement, reducedMotion: boolean): ColdField | null {
  try {
    return new ColdField(container, reducedMotion);
  } catch (error) {
    console.warn('Cold field unavailable, falling back to CSS atmosphere.', error);
    return null;
  }
}
