# Ring UI System Implementation Plan

## AltFrame Implementation

**Goal**: Create a full-screen overlay system for detailed content viewing that sits above the ring interface.

### Files/Modules to Create or Update:

- `src/frames/AltFrame.tsx` - Main AltFrame component
- `src/frames/components/MiniNav.tsx` - Navigation header for AltFrame
- Global state management for AltFrame visibility
- Integration with existing ring system

### Development Tasks:

- [x] **Implement AltFrame component**:
  - **Structure**: Cover the whole viewport (position fixed, z-index above ring and nav)
  - Use a full-screen div or modal approach
  - Include a content area (placeholder or route outlet for different pages)
  - Include a mini-nav header at the top (or bottom) of AltFrame:
    - Small bar containing a "back" button (to exit AltFrame)
    - Title or icon indicating the current section or content
    - Use `FrostedPanel` for consistency (translucent bar)
    - Back button: icon (left arrow from Lucide) or text "Back"
    - Show ring name or item title if tied to a particular ring
  - Content can initially be static placeholder ("Content goes here...")
  - Future: integrate with routing scheme (React Router to mount AltFrame for certain routes)

- [x] **Triggering AltFrame**:
  - Clicking a content item in a ring (not placeholder) should open its details in AltFrame
  - Example: item in "Work" ring representing a project opens detailed project view
  - Implement `onClick` in `RingItem` for `kind: 'content'` items designated to open AltFrame
  - `onClick` sets global state `isAltFrameActive = true` and stores `activeContentId`
  - Alternative: use routes where `onClick` navigates to new route triggering AltFrame

- [x] **Global State Handling**:
  - Add `isAltFrameActive` and `altContent` info to global context/App state
  - When true, render `<AltFrame />` component above rest of app (conditionally in App.tsx)
  - Underlying RingView and Nav remain but should be inert
  - Optional enhancement: dim or blur background, apply scale-down effect to ring behind AltFrame

- [x] **Back Navigation**:
  - When user clicks back button in AltFrame's mini-nav:
    - Set `isAltFrameActive = false` to hide AltFrame
    - Restore any paused/altered background state
    - Resume ring animations if paused
    - Return focus to ring item that launched AltFrame (accessibility)

- [x] **Behavior and Style**:
  - AltFrame acts like separate page - no ring motion inside
  - Hide SidePanel/Dock when AltFrame is active (or cover with higher z-index)
  - Prevent user clicking another ring behind AltFrame

- [x] **Animation**:
  - Use Framer Motion to animate AltFrame appearance (fade/slide from bottom)
  - Animate out when closing (fade out)
  - Keep animations short (~300ms)
  - Respect reduced-motion (instantly show/hide if motion is reduced)

- [x] **Testing AltFrame**:
  - Simulate clicking ring item designated to open alt content
  - Verify AltFrame appears with expected content/placeholder
  - Click back button, ensure AltFrame disappears and ring UI is interactive again
  - Check main nav is hidden/non-functional while in AltFrame
  - Ensure toggling AltFrame doesn't reset ring state unexpectedly

- [x] **Extensibility**:
  - Document how AltFrame could be used for multiple content pages
  - Consider `altFrameType` or loading different components based on trigger
  - Design for generic reusability
  - `openAltFrame` now accepts a `type` field to differentiate content handlers

- [x] **Accessibility**:
  - AltFrame mini-nav should be keyboard accessible
  - Back button focusable with aria-label "Go back"
  - Consider focus trapping within AltFrame (like modal)
  - Restore focus to last focused element when closed
  - Trap focus within AltFrame and close on `Escape`, restoring prior focus

## Background Effects & Controller

**Goal**: Create a system to manage dynamic backgrounds for each ring, enhancing visual appeal without interfering with content.

### Files/Modules to Create or Update:

- `src/rings/engine/BackgroundController.tsx` - Component/utility for background orchestration
- `rings.json` - Contains background config (already exists)
- CSS/assets for specific backgrounds

### Development Tasks:

- [ ] **Implement BackgroundController component**:
  - Render single full-viewport background element (`<div id="background-layer">`)
  - Absolutely positioned (`inset-0`) behind all content (z-index below ring content)
  - Mount once (in App) and listen to `activeRingId` and ring progress changes
  - **Background modes**:
    - `mode: 'color'`: Set div's background color (Tailwind class or inline style)
    - `mode: 'gradient'`: Apply CSS gradient based on palette/angle config
    - `mode: 'image'`: Set background image with `background-size: cover`, crossfade when changing
    - `mode: 'video'`: Render HTML5 `<video>` element, handle autoplay/muting
    - `mode: 'shader'` or `mode: 'react'`: Advanced modes (placeholder for future)
  - **Handle `followsIndex`**: Background reacts to `ringIndexProgress`
    - Color/gradient: interpolate colors as user scrolls
    - Image: crossfade based on progress or parallax shift
    - Video: seek according to progress (advanced)
    - Simple initial implementation: log "followsIndex" and plan effects

- [ ] **State Management**:
  - Subscribe to `activeRingId` changes and `ringIndexProgress` updates
  - Use hooks or context for ring state
  - Consider throttling `onBackgroundTick(progress)` to ~30fps
  - **Transitions**: Smooth background transitions on ring switch
    - Same mode (gradient to gradient): animate between configurations
    - Different modes (color to video): crossfade with two background elements
    - Simple approach: instant switch with simultaneous fade

- [ ] **Performance**:
  - Avoid heavy computations on every tick
  - Throttle `onBackgroundTick` to 30fps or threshold-based updates
  - For video backgrounds: use low resolution, pause when not active
  - CSS gradients/colors are cheap; optimize canvas/WebGL if added later

- [ ] **Testing Backgrounds**:
  - Set up distinct backgrounds in `rings.json` (one color, one gradient)
  - Verify background changes when switching rings
  - Test `followsIndex: true` rings for reactive behavior
  - Ensure background doesn't scroll with content (fixed in place)

- [ ] **Logging**:
  - Use `onBackgroundTick(progress)` hook to log progress changes
  - Log background mode switches on ring change for debugging

- [ ] **AltFrame Background**:
  - Decide if AltFrame uses same background layer or own styling
  - Option: AltFrame overlays solid background or blurs existing one
  - Design choice: separate page appearance vs. subtle background continuity

- [ ] **Dark Mode/Theming**:
  - Ensure color/gradient choices adapt to dark mode
  - Use Tailwind CSS variables or conditional classes
  - Define separate palettes in config for dark mode if needed

## Accessibility & Input Fallbacks

**Goal**: Make the ring UI system accessible for all users, including keyboard-only navigation, assistive technologies, and reduced motion preferences.

### Files/Modules to Create or Update:

- Keyboard input handling in InputMapper or global event handlers
- Focus management in RingView/Nav components
- ARIA attributes in JSX (no new files, modify existing)
- Reduced motion styles in Tailwind/transitions

### Development Tasks:

- [ ] **Keyboard Scrolling Controls**:
  - Add `keydown` event listener (window or focusable wrapper)
  - **Key mappings**:
    - `ArrowDown` or `PageDown`: advance ring forward (call `RingEngine.updateIndex(delta)`)
    - `ArrowUp` or `PageUp`: move ring backward
    - Consider `ArrowRight/Left` for horizontal axis (keep simple with up/down for now)
  - Prevent page scroll with `preventDefault()` when needed
  - Only activate when ring/items/nav is focused (avoid hijacking keys during form input)

- [ ] **Tab Focus Cycling**:
  - Ring items with `tabIndex={-1}` by default (manual focus management)
  - Handle Tab keydown manually:
    - Focus on ring item + Tab = move to next item in sequence
    - Last visible item + Tab = wrap to first visible
    - Alternative: allow normal DOM flow if item count is reasonable
  - After idle snap, focus the centered item
  - After ring switch, focus first item of new ring (implement in `changeRing`)

- [ ] **Screen Reader Considerations**:
  - **ARIA markup**:
    - RingView: `role="region"` with `aria-label` or `role="listbox"` with items as options
    - Announce ring changes with `aria-live` region ("Switched to Work section")
    - Nav buttons: actual `<button>` elements with accessible names
    - Dock double-tap alternative: single tap announces or acts as "Next section"
  - Images need alt text for content items
  - AltFrame content should have proper heading structure

- [ ] **prefers-reduced-motion**:
  - Detect via CSS `@media (prefers-reduced-motion)` or JS `window.matchMedia`
  - Set global state boolean `reducedMotion`
  - **Adjust behaviors**:
    - Replace fade transitions with instant cut or minimal transition
    - Snap immediately rather than animated
    - Disable parallax or background follow effects
    - Conditional Tailwind animation classes
  - Optional: manual toggle in settings

- [ ] **Testing Keyboard & A11y**:
  - **Keyboard-only testing**:
    - Tab from page start to SidePanel nav items
    - Enter/Space on nav item switches ring
    - Tab moves into ring content after switch
    - ArrowDown/Up scrolls ring
    - Tab cycles through ring items
    - AltFrame: focus item, press Enter to open, close button accessible, focus returns properly
  - **Screen reader testing**: Check announcements and labeling

- [ ] **Documentation**: Document keyboard controls in README or Guidelines

- [ ] **Clean Up & ARIA**: Ensure all interactive elements are keyboard accessible and crucial info isn't only visual

## Performance Optimization

**Goal**: Maintain smooth performance and frame rates, targeting i5 CPU with no dedicated GPU.

### Development Tasks:

- [ ] **Use GPU-accelerated transforms**:
  - Ring item movement via CSS `transform: translate()/rotate()` not layout properties
  - Opacity changes use CSS transitions/transform for GPU offloading
  - Keep animations on compositor thread

- [ ] **Minimize Layout Thrash**:
  - Avoid DOM layout queries (`.offsetWidth`, `.scrollHeight`) in frequent loops
  - Cache layout values when needed, compute once
  - No layout-forcing operations in Snapper/Input handling per frame

- [ ] **Efficient Backdrop Blur**:
  - Frosted glass nav uses `backdrop-filter: blur` - constrain to necessary area only
  - Panel not larger than needed (width of side panel or height of dock)
  - Test on lower-end devices; fallback to semi-transparent solid if needed

- [ ] **Limit Animation Work**:
  - Cancel `requestAnimationFrame` when not needed (ring idle and snapped)
  - Pause ring RAF loops when AltFrame is open
  - Re-use single RAF loop for multiple animations
  - Leverage Framer Motion and GSAP optimized loops

- [ ] **Conditional Rendering / Virtualization**:
  - For many items: render only subset within +2/+3 positions of current index
  - Small portfolios (5-10 items): full rendering acceptable
  - Don't render placeholders far from view

- [ ] **Optimize Media Assets**:
  - Appropriately sized images for display context
  - Compress images (webp format)
  - Lazy loading for offscreen content (`<img loading="lazy">`)
  - Video backgrounds: short loops, compressed, pause when not active

- [ ] **Memory Management**:
  - Clean up event listeners on unmount
  - Cancel timers/RAF when rings unmount or switch
  - Pause inactive RingEngines to save CPU

- [ ] **Testing Performance**:
  - Browser dev tools Performance monitor: aim for 60fps
  - Profile memory for leak detection
  - Test on mobile device/emulator for touch smoothness
  - Monitor blur effect impact on frame rate

- [ ] **Logging for Performance**:
  - Debug panel or console for slow frames/choke points (dev only)
  - Optional FPS meter overlay during development

- [ ] **WebGL Consideration**:
  - Future WebGL backgrounds: render only when needed, not every frame if static
  - Architecture isolation supports future plug-in

## Logging Hooks & Debug Panel

**Goal**: Enhance developer experience with hooks for key events and debug interface for observing system behavior.

### Files/Modules to Create or Update:

- Event hooks in RingEngine or global context
- `src/components/dev/DebugPanel.tsx` - Debug panel overlay
- Integration in app (dev-only rendering)

### Development Tasks:

- [ ] **Define Hook Signatures**:
  - `onRingChange?(oldRingId: string, newRingId: string): void`
  - `onIndexChange?(ringId: string, ringIndex: number, velocity: number): void`
  - `onIdleSnap?(startIndex: number, targetIndex: number, mode: 'midpoint' | 'center'): void`
  - `onBackgroundTick?(progress: number): void`
  - Store in RingsProvider or central object for developer subscription

- [ ] **Implement Hook Triggers**:
  - After `changeRing` completes: call `onRingChange` with old/new IDs
  - In `RingEngine.updateIndex`: call `onIndexChange` (throttle if needed)
  - In Snapper when snap initiates/completes: call `onIdleSnap`
  - In background update loop: call `onBackgroundTick` at RAF interval

- [ ] **Build DebugPanel UI**:
  - Small overlay in corner (bottom-left) with semi-transparent background
  - Scrollable list of events with monospaced text:
    - `[RingChange] work -> about`
    - `[IndexChange] ring:about index:3.27 vel:120px/s`
    - `[IdleSnap] from 2.7 to 2.5 (midpoint)`
    - `[BackgroundTick] progress: 0.45`
  - Toggle button "Debug" to collapse/expand
  - Checkboxes/filters for event types
  - React component with internal state array of log lines
  - Subscribe to hooks via callbacks from DebugPanel to RingsProvider
  - "Clear" button to empty logs
  - Tailwind styling: `text-xs`, `max-h-60 overflow-y-scroll`

- [ ] **Dev-Only Rendering**:
  - Condition: `{import.meta.env.DEV && <DebugPanel .../>}` in App.jsx
  - Prevents exposing internal logs in production

- [ ] **Test DebugPanel**:
  - Scroll ring: see multiple `IndexChange` events (consider debouncing to ~10/sec)
  - Stop and snap: see `IdleSnap` event
  - Switch rings: see `RingChange` event
  - Verify panel usability: scroll logs, clear, hide/show

- [ ] **Logging Alternatives**:
  - Future: integrate with Storybook or Redux devtools
  - In-app panel convenient for dynamic interactions

- [ ] **Maintainability**:
  - Document hooks are for dev purposes
  - Ensure no lint rule violations
  - All logs disabled in production build

## Quality Assurance & Testing

**Goal**: Verify the implemented Ring UI system meets all expected behaviors and usability criteria.

### Acceptance Criteria Checklist:

- [ ] **A1 (Desktop Scroll)**: Mouse wheel advances ring along configured axis smoothly; pointer dragging not required/enabled

- [ ] **A2 (Mobile Swipe & Cycle)**: Vertical swipe advances ring; dock double-tap cycles to next ring in fixed order

- [ ] **A3 (Endless Loop)**: Ring items loop endlessly with no perceptible seam when wrapping from last to first

- [ ] **A4 (Idle Snap)**: After user stops, idle timeout causes ring to ease to nearest midpoint/center alignment

- [ ] **A5 (Background Behavior)**: Background reacts to ring index progress if configured but doesn't visually scroll with items

- [ ] **A6 (Nav Overlay)**: Navigation panel always visible above ring content; items pass behind with frosted-glass effect

- [ ] **A7 (AltFrame Functionality)**: AltFrame renders when invoked with mini-nav and back control; no ring motion while active

- [ ] **A8 (Accessibility)**: Keyboard navigation supported; reduced-motion respected; focus management works

### Quality Checks:

- [ ] **Code Quality**:
  - All code conforms to ESLint and Prettier rules
  - Components have clear names and proper folder structure
  - JSDoc comments on components and complex functions

- [ ] **Modularity**:
  - Engine logic separated from UI (no direct DOM calls in RingEngine)
  - Components reusable and not overly coupled
  - Structure matches proposed folders (`rings/engine`, `rings/components`, `nav`, `frames`)

- [ ] **Integration Testing**:
  - Load app (desktop and mobile layouts)
  - Scroll landing ring, let it snap
  - Switch to each ring via nav, test content
  - Open and close AltFrame if applicable
  - Try variety of input patterns (fast scroll, slow scroll, spam ring switches)

- [ ] **Performance Check**:
  - Typical interactions don't cause noticeable lag or stutter
  - Test with debug panel off for accurate performance assessment

- [ ] **Logging & Debug**:
  - Development mode debug panel captures events correctly
  - Can diagnose unexpected behavior through logs

---

By following this implementation plan and completing all tasks, we will create a robust, polished Ring UI system that aligns with the design blueprint and adheres to professional development standards. The result will be an interactive, maintainable portfolio feature showcasing modern UI animation techniques and solid architecture.
