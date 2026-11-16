# 04 — Wireframes

Structural wireframes for the shipped build. Type sizes are indicative at 1440px.

## Global frame

```
┌──────────────────────────────────────────────────────────────┐
│ TOTALLY COOL ▸   Services  Work  Technology  About   [Quote] │ 78px fixed, blur after 24px
├──────────────────────────────────────────────────────────────┤
│                                                              │
│   page content                                               │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

## 01 — Hero (desktop)

```
┌──────────────────────────────────────────────────────────────┐
│  ·  SOUTH AFRICA · SINCE 1994                                │
│                                                              │
│   Cooling                                     ┌────────────┐ │
│   the future.                                 │ CHAMBER 01 │ │
│                                               │ SETPOINT   │ │
│   HVAC, refrigeration and cold-chain…         │ −18.0 °C   │ │
│   ─────────────────────────                   │ AMBIENT    │ │
│   [ Request a survey ↗ ] [ ◌ Free check ]     │ 31.4 °C    │ │
│   · 24/7  · SAQCC  · Guaranteed               │ ▓▓▓▓▓░░░   │ │
│                                               └────────────┘ │
│                                     SCROLL ↓                 │
├──────────┬──────────┬──────────┬─────────────────────────────┤
│ 30+      │ 1,000+   │ 24/7     │ 4.9★                        │
│ years    │ systems  │ response │ Google                      │
└──────────┴──────────┴──────────┴─────────────────────────────┘
   WebGL fog + 2,200 frost particles behind; idle 2.8s → frost
```

## 02 — Client marquee

```
┌──────────────────────────────────────────────────────────────┐
│ BROLL · CITY OF JOHANNESBURG · CRADLE MOON · XEROX · →       │
└──────────────────────────────────────────────────────────────┘
```

## 03 — About

```
┌───────────────────────────────┬──────────────────────────────┐
│ · 02 — ABOUT                  │ ┌──────────────────────────┐ │
│ Built in Randburg.            │ │ 01  The workshop         │ │
│ Cold by design.               │ │     Randburg · 1994      │ │
│                               │ └──────────────────────────┘ │
│ "Since 1994 we have been…"    │   ┌────────────────────────┐ │
│                               │   │ 02  The field          │ │
│ Two paragraphs                │   └────────────────────────┘ │
│ [SAQCC][PIRB][Insured][…]     │     ┌──────────────────────┐ │
│                               │     │ 03  The promise      │ │
│                               │     └──────────────────────┘ │
│                               │ ┌──────────────────────────┐ │
│                               │ │  technical plate SVG     │ │
│                               │ └──────────────────────────┘ │
└───────────────────────────────┴──────────────────────────────┘
```

## 04 — Services

```
┌──────────────────────────────────┬───────────────────────────┐
│ 01  Air conditioning     tag  ↗  │ ┌───────────────────────┐ │
│ 02  Commercial HVAC      tag  ↗  │ │  airflow schematic    │ │
│ 03  Commercial refriger. tag  ↗  │ └───────────────────────┘ │
│ 04  Cold rooms           tag  ↗  │ Title / tagline           │
│ 05  Ventilation          tag  ↗  │ Description               │
│ 06  Maintenance & 24/7   tag  ↗  │ [cap][cap][cap]           │
│ 07  Energy efficiency    tag  ↗  │ SPEC rows                 │
│                                  │ −28% metric               │
│                                  │ [ Scope this service → ]  │
└──────────────────────────────────┴───────────────────────────┘
   Sticky panel on desktop; panel follows list on mobile
```

## 05 — Work reel (pinned)

```
┌──────────────────────────────────────────────────────────────┐
│ · 04 — FIELD RECORDS          SELECTED RECORDS · 05          │
│ Work that holds under load.                                  │
│                                                              │
│ ┌──────────────────┐ ┌──────────────────┐ ┌───────────────┐ │
│ │ 01    COMMERCIAL │ │ 02    COLD ROOM  │ │ 03  RESIDENT. │ │
│ │                  │ │                  │ │               │ │
│ │ SANDTON          │ │ JOHANNESBURG     │ │ RANDBURG      │ │
│ │ Three floors,    │ │ Midnight rescue  │ │ Restoring     │ │
│ │ one climate      │ │                  │ │ capacity      │ │
│ │ outcome copy     │ │ outcome copy     │ │ outcome       │ │
│ │ SPEC  SPEC  SPEC │ │ SPEC  SPEC  SPEC │ │ SPEC SPEC SPEC│ │
│ └──────────────────┘ └──────────────────┘ └───────────────┘ │
│ ▓▓▓▓▓▓▓░░░░░░░░  vertical scroll drives horizontal travel   │
└──────────────────────────────────────────────────────────────┘
```

## 06 — Technology

```
┌────────────────────────────────────────┬─────────────────────┐
│ SCHEMATIC 01 — LOOP       OFFICE FLOOR │ LOAD SIMULATOR      │
│                                        │ [Office][Cold][Ret] │
│   ┌────────┐    ┌────────┐             │   ◯ 72%  REL. LOAD  │
│   │ EVAP   │───▶│ COMP   │             │ AMBIENT     31 °C   │
│   └────────┘    └────────┘             │ SETPOINT    22 °C   │
│        ▲             │                 │ SAVING      −28%    │
│   ┌────────┐    ┌────────┐             │ CONTROL  Inverter   │
│   │ TX     │◀───│ COND   │             │ note + disclaimer   │
│   └────────┘    └────────┘             └─────────────────────┘
│ ── temperature envelope −25 ─── 40 ──                        │
└────────────────────────────────────────┴─────────────────────┘
```

## 07 — Outcomes / process / reviews / coverage / FAQ

```
┌────────────┬────────────┬────────────┬────────────┐
│ 28%        │ R0         │ 4h         │ 100%       │
│ ENERGY     │ STOCK LOST │ RESPONSE   │ COVER      │
└────────────┴────────────┴────────────┴────────────┘

①──────────②──────────③──────────④
Request    Assess     Quote      Commission

┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ ★★★★★        │ │ ★★★★★        │ │ ★★★★★        │
│ “quote…”     │ │ “quote…”     │ │ “quote…”     │
│ initials/name│ │ initials/name│ │ initials/name│
└──────────────┘ └──────────────┘ └──────────────┘

[area][area][area][area]        ┌ sonar dot field ┐
[area][area][area][area]        │  HQ / CT / DBN  │
                                └─────────────────┘

Question ▸  |  Question ▸  |  Question ▸
```

## 08 — Quote wizard

```
┌──────────────────────────────────────────────────────────────┐
│ · 11 — START HERE                                            │
│ Tell us what needs cooling.                                  │
│                                                              │
│ 01 Scope ─────── 02 Site ─────── 03 Contact                  │
│ ┌──────────────────────────────────────┬───────────────────┐ │
│ │ WHAT NEEDS COOLING?                  │ EMERGENCY · 24/7  │ │
│ │ [Aircon] [HVAC] [Refrigeration]      │ 078 963 5441      │ │
│ │ [Cold rooms] [Ventilation] [Maint.]  │ WHATSAPP          │ │
│ │ [Energy] [Not sure]                  │ EMAIL             │ │
│ │                                      │ BASE              │ │
│ │ no obligation · fixed pricing        │ notes             │ │
│ │                    [ Continue → ]    │                   │ │
│ └──────────────────────────────────────┴───────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

## Tablet (768–1023)

- Hero: chamber card drops below copy, full width, two-column stats become four.
- About: single column; layers keep stagger, plate full width.
- Services: list then panel (no sticky).
- Work: pin still active from 901px; otherwise swipe. Card 74vw.
- Technology: schematic above controls.
- Quote: wizard + aside stacked; aside becomes a 2-column card grid.

## Mobile (< 768)

```
┌─────────────────────┐
│ ☰   TOTALLY COOL  ↑ │
│                     │
│ · SINCE 1994        │  hero 100svh-ish,
│ Cooling             │  no chamber card,
│ the future.         │  compact readout line
│ lede (3–4 lines)    │
│ [ Request survey ]  │
│ [ Free check ]      │
│ −18.0°C · NOMINAL   │
├─────────────────────┤
│ 30+  │ 1,000+       │
│ 24/7 │ 4.9★         │
└─────────────────────┘

Work: vertical chapter → native horizontal snap, 84vw cards
Wizard: chips 2-up, fields single column, nav wraps
Menu: full-screen numbered links + call/WhatsApp
```
