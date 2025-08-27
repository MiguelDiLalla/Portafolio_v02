# Rings UX Blueprint (Portfolio\_v02)

**Author:** Miguel
**Purpose:** Implementation-ready specification for the custom **Ring (Pergamino) scrolling system** across desktop and mobile. Aimed at dev agents and collaborators.

---

## 1) Core Concepts & Naming

* **Ring (Pergamino):** Looping strip of items with a configurable **scroll axis angle**.
* **Item / View:** A card element inside a ring (placeholder or real content).
* **Nav:** Desktop **Side Panel** (floating, frosted, left). Mobile **Dock** (floating, bottom).
* **Alt Frame:** Non-ring canvas for internal content; includes a compact mini-nav (go‑back).

---

## 2) App Architecture (High Level)

**Global UI State**

```ts
uiMode: 'desktop' | 'mobile'
activeRingId: string
isAltFrameActive: boolean
isNavOpen?: boolean
```

**Ring Model**

```ts
type Ring = {
  id: string
  name: string
  axisDeg: number            // 0°=horizontal (→), 90°=vertical (↓); any angle allowed
  items: RingItem[]
  loop: true                 // rings always loop
  spacingPx: number          // gap between item centers along axis
  snapTolerance: number      // 0..1; fraction of spacing considered "close"
  idleSnapDelayMs: number    // inactivity threshold before auto-snap
  background?: BackgroundSpec
}

type RingItem = {
  id: string
  kind: 'placeholder' | 'content'
  payload: ItemPayload       // srcs, text, route, etc.
  size: { w: number; h: number } // max within the floating container
}

type BackgroundSpec = {
  mode: 'color' | 'gradient' | 'image' | 'video' | 'shader' | 'react'
  followsIndex?: boolean     // if true, reacts to ringIndexProgress
  config: any                // mode-specific settings
}
```

**Derived Runtime State (per ring)**

```ts
ringIndex: number               // continuous, [0, N)
ringIndexProgress: number       // ringIndex / N, 0..1
velocity: number                // px/s derived from input deltas
lastInputAt: number             // timestamp for idle detection
```

---

## 3) Input → Motion Mapping

### Desktop

* **Wheel only (no panning):**

  * Read wheel `deltaY`; map to ring axis motion.
    `Δ = k * deltaY`
    Project onto axis via rotation matrix `R(axisDeg)`.
  * Update `ringIndex += Δ`; wrap with `(ringIndex % N + N) % N`.

### Mobile

* **Vertical touch scroll only** (no horizontal pan):

  * Use touch `deltaY` → same mapping as desktop.
* **Dock double‑tap** → `activeRingId = nextRing()` (rings have a fixed order and loop).

> Users cannot switch rings by scrolling; only via Nav (side panel / dock).

---

## 4) Snapping Behavior (Idle Snap to Midpoint)

* After `idleSnapDelayMs` with no input, if not centered:

  1. Find two nearest item centers around current `ringIndex`.
  2. Compute **midpoint** `m = i0 + 0.5 (mod N)`.
  3. If distance to nearest center < `snapTolerance * spacingPx`, snap to the **center** instead of midpoint.
  4. Animate with velocity‑aware easing (e.g., critically‑damped spring or `expoOut`).

> Default: **snap to midpoint** on **all** rings (configurable per ring later if needed).

---

## 5) Layout Model

* **Floating Container:** Invisible, centered, up to viewport size (with generous default margins). Items render **behind** the frosted nav (z-index).
  Placeholders: rounded-rect outline + centered lightweight `.webp`.
* **Background Layer:** Full-viewport visual independent of ring motion. May react to `ringIndexProgress` but **does not physically slide** unless explicitly coded.
* **Static Viewport Elements:** Nav side panel (desktop) / dock (mobile) live in a static layer above ring content.

---

## 6) Navigation Rules

* Side Panel / Dock selects **ring** and triggers optional **transition**.
* Transition types: `cut`, `fade`, `slideAlongNewAxis`, `morphBackground`, `composite`.
* Optional interstitial micro‑animation (e.g., rotate briefly to target axis).
* Within a ring, scroll never changes the active ring.

---

## 7) Accessibility & Input Fallbacks

* **Keyboard:** `ArrowDown/PageDown` advance; `ArrowUp/PageUp` reverse; `Tab` cycles focus among visible items.
* **Reduced Motion:** Honor `prefers-reduced-motion` → reduce velocity multiplier, disable parallax, increase snap tolerance.
* **Focus:** On ring change, focus active item.

---

## 8) Performance Budget (i5 CPU, no dGPU)

* Prefer transform‑only updates (translate/rotate); avoid layout thrash.
* Constrain backdrop blur region for frosted panel; avoid full‑screen heavy blur.
* Cap RAF work; consider virtualization for long rings (render neighbors only).
* If using WebGL later, adopt demand‑driven frames.

---

## 9) File & Folder Structure (Proposal)

```
src/
  rings/
    config/
      rings.json                # declarative spec for rings & items
    engine/
      RingEngine.ts             # state, physics, wrapping
      InputMapper.ts            # wheel/touch → axis motion
      Snapper.ts                # idle snap logic
      BackgroundController.tsx  # background orchestration
    components/
      RingView.tsx              # renders a ring; consumes RingEngine
      RingItem.tsx              # single item (placeholder/content)
  nav/
    SidePanel.tsx
    Dock.tsx
  frames/
    AltFrame.tsx                # blank canvas page with mini-nav
  components/static/
    FrostedPanel.tsx
assets/
  rings/<ringId>/{placeholders,images,video,...}
  backgrounds/<ringId>/{...}
```

---

## 10) Config (Declarative JSON Example)

```json
{
  "ringOrder": ["landing", "work", "about", "contact", "settings"],
  "rings": {
    "landing": {
      "axisDeg": 0,
      "spacingPx": 560,
      "snapTolerance": 0.12,
      "idleSnapDelayMs": 900,
      "background": { "mode": "gradient", "followsIndex": true, "config": { "palette": "teal-red" } },
      "items": [
        { "id": "intro", "kind": "placeholder", "size": { "w": 960, "h": 540 } },
        { "id": "latest", "kind": "content", "payload": { "type": "card", "src": "/assets/rings/landing/latest.webp" }, "size": { "w": 960, "h": 540 } }
      ]
    },
    "work": { "axisDeg": 30, "spacingPx": 560, "snapTolerance": 0.10, "idleSnapDelayMs": 700, "items": [] }
  }
}
```

---

## 11) Transition Contract (Ring → Ring)

```ts
type RingTransition = {
  type: 'cut' | 'fade' | 'slideAlongNewAxis' | 'morphBackground' | 'composite'
  durationMs?: number
}
// API: changeRing(nextId: string, transition?: RingTransition)
```

---

## 12) Idle Snap Algorithm (Concise)

1. On input (wheel/touch): update `ringIndex`; set `lastInputAt = now`.
2. Timer checks `(now - lastInputAt) > idleSnapDelayMs`.
3. If true:

   * `i0 = floor(ringIndex)`, `t = ringIndex - i0`.
   * If `t` within `[0.5 - tol, 0.5 + tol]` → already near midpoint → no action.
   * Else `m = i0 + 0.5 (mod N)`.
   * If within center tolerance → prefer center snap.
   * Animate `ringIndex → target` with velocity‑aware easing.

---

## 13) Acceptance Criteria (for QA)

* **A1** Desktop wheel advances ring along its configured axis; no pointer panning.
* **A2** Mobile vertical swipe advances ring; dock double‑tap cycles rings in fixed order.
* **A3** Ring is **endless** with no perceptible seam at wrap.
* **A4** Idle snap: after inactivity, ring eases to nearest **midpoint** (or center if within tolerance).
* **A5** Background may react to index progress but does not slide unless coded.
* **A6** Nav is always visible above content; items pass **behind** (z‑index + backdrop filter).
* **A7** Alt Frame renders with mini‑nav and a go‑back control; no ring motion inside.
* **A8** Keyboard + reduced motion behaviors work as specified.

---

## 14) Hooks & Instrumentation (Dev Logging)

* `onRingChange(oldId, newId)`
* `onIndexChange(ringId, ringIndex, velocity)`
* `onIdleSnap(startIndex, targetIndex, mode: 'midpoint' | 'center')`
* `onBackgroundTick(ringIndexProgress)`

Dev-only collapsible **Debug Panel** logs these to aid tuning.

---

## 15) Edge Cases & Defaults

* Velocity clamp to avoid nausea; optionally invert scroll direction via setting.
* Normalize `axisDeg` to `[0, 360)`.
* Item sizes smaller than spacing are fine; centers align.
* Focus order aligns with active item after snap.

---

## 16) Next Steps (Implementation Stubs)

1. Create `src/rings/config/rings.json` with initial five rings.
2. Add TypeScript interfaces and stubs: `RingEngine`, `InputMapper`, `Snapper`, `BackgroundController`.
3. Implement `RingView` rendering with placeholder items and proper z‑layers.
4. Wire Desktop wheel + Mobile touch mapping; test idle snap.
5. Add SidePanel/Dock and `changeRing()` with a simple `fade` transition.
6. Add Debug Panel using dev-only toggles.

---

**This document is the single source of truth for the Rings interaction model.** Update it alongside code changes and keep assets organized per the structure above.
