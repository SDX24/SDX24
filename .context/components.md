# Components Context

Authoritative component reference for SDX24. Use this file as the source of truth for component behavior, animation ownership, and usage rules.

## Scope

Active UI primitives:

- `CometCard` (`apps/web/src/components/ui/comet-card.tsx`)
- `MainTealCard` (`apps/web/src/components/ui/main-teal-card.tsx`)
- `ProjectCardCompact` (`apps/web/src/components/ui/project-card-compact.tsx`)
- `ProjectCardExpanded` (`apps/web/src/components/ui/project-card-expanded.tsx`)
- `HandEmbed` (`apps/web/src/components/ui/hand-embed.tsx`)
- `HeroPhotoCard` (`apps/web/src/components/cards/hero-photo-card.tsx`)
- `HeroBackHoverCard` (`apps/web/src/components/cards/hero-back-hover-card.tsx`)
- `HeroCatchScene` (`apps/web/src/components/cards/hero-catch-scene.tsx`)
- `ProjectsScrollSection` (`apps/web/src/components/cards/projects-scroll-section.tsx`)
- `ScrollToTopOnLoad` (`apps/web/src/components/scroll-to-top-on-load.tsx`)

Only the hero card components in `components/cards/` are supported outside the UI primitives.

## CometCard

**Purpose**: Interactive 3D card with tilt, hover scale, animated glare, and optional flip. Supports layout/motion animations without transform conflicts.

**Responsibilities**:

- Pointer-driven tilt (rotate + translate)
- Hover scale (velocity stretch disabled by default)
- Glare animation tied to pointer movement
- Optional flip between front/back content
- Composition-safe transforms for external layout/motion
- Reduced-motion compliance and touch disablement
- Clip scaled surface to rounded corners (prevents border bleed)

**Key props**:

- Tilt/hover: `rotateDepth`, `translateDepth`, `hoverScale`, `hoverScaleX`, `hoverScaleY`, `hoverDuration`, `springConfig`, `hoverSpringConfig`
- Glare: `showGlare`, `glareOpacity`, `glareColor`, `glareMidColor`, `glareDuration`, `glareClassName`, `glareSpringConfig`
- Fluidity: `fluidStrength`, `fluidMax` (velocity-based stretch; default off)
- Flip: `front`, `back`, `flipped`, `flipProgress`, `flipAxis`, `flipSpringConfig`
- Layout: `containerMotionProps` (Motion props on outer wrapper), `containerClassName`
- Styling: `className`, `surfaceClassName`, `contentClassName`, `shadow`

**Animation ownership**:

- **Outer wrapper**: layout/movement only (use `containerMotionProps` for scroll/motion position changes)
- **Tilt layer**: pointer-based `rotateX/rotateY` + `translateX/translateY`
- **Scale layer**: hover scale and velocity stretch (fluid)
- **Flip layer**: full-card 3D flip (front/back)
- **Glare**: pointer-relative overlay that stays aligned to the surface

**Usage rules**:

- Do not animate `transform` on the inner surface directly when also using tilt; use `containerMotionProps` on the outer wrapper for movement.
- For scroll-driven flips, prefer `flipProgress` (MotionValue 0-1).
- For programmatic flips, use `flipped` (boolean); `flipProgress` takes precedence.
- Reduced motion: tilt/glare auto-disable via `prefers-reduced-motion`.
- Touch: tilt/glare are disabled for touch pointers.
- If `fluidStrength` is `0`, hover scaling is stable (no stretch).

## MainTealCard

**Purpose**: Preset wrapper around `CometCard` with the approved muted-teal glare and veil-fast base styling.

**Responsibilities**:

- Provide default surface styling, glare colors, and hover tuning
- Glare is intentionally subtle (50% reduced visibility vs earlier tests)
- Keep sizing fully class-driven (no preset sizes)

**Key props**:

- `className`, `contentClassName` for size and padding
- `containerMotionProps` to drive layout/scroll animations
- All other `CometCard` props are supported and override defaults

**Defaults**:

- Glare: `glareOpacity=0.35`, muted teal glare colors, screen blend
- Hover: subtle horizontal emphasis with stable vertical scale

**Usage rules**:

- Use for production-facing cards unless a custom `CometCard` variant is necessary.
- Size via `className` (e.g. `max-w-[360px]`) and `contentClassName` for padding.
- Use GSAP on a wrapper for page movement, and drive `flipProgress` with GSAP for scroll flips.

## ProjectCardCompact

**Purpose**: Summary project card used in grids and lists. No links; compact content only.

**Responsibilities**:

- Render logo + wordmark
- Show slogan, short description, and short stack list
- Acts as hover trigger for expanded card
- Serve as hover trigger for expanded card

**Key props**:

- `title`, `slogan`, `description`
- `stack`
- `logoSrc`, `wordmarkSrc`

**Usage rules**:

- Do not include links inside the compact card.
- Keep stack to 3-5 items for readability.
- Compact cards default to `interactive={false}` to avoid wasted hover motion.

## ProjectCardExpanded

**Purpose**: Hover-revealed expanded card with full project details, interactive drag bump, and magnetic snap system.

**Responsibilities**:

- Provide longer description, expanded stack, achievements, and links
- Show cover image container on the right
- Use stronger project branding than compact card
- Reduce motion for stability (lower tilt + hover scale)
- Handle draggable bump with magnetic snap to right-edge cue
- Manage expanded state persistence during drag interactions
- Trigger fly-away only when release happens while snapped
- Start fly-away from the card's live transform (no snap-back to origin)
- Coordinate split exit choreography (card exits left, cue/bump visuals exit right)

**Key props**:

- `title`, `slogan`, `description`, `status`
- `links`, `stack`, `achievements`
- `logoSrc`, `wordmarkSrc`, `coverSrc`
- `brand` (project palette for expanded card)
- `onHoldStart`, `onHoldEnd`, `onDragRelease` (drag interaction callbacks)
- `showCue` (enables right-edge cue and drag interactions)

**Magnetic Snap System**:

- **Snap trigger**: 30px approach distance or -30px overshoot (fast movement)
- **Release trigger**: 120px drag away or -150px pullback past cue
- **Y-axis following**: Cue position dynamically follows bump's vertical position
- **Position override**: Uses `onDrag` callback to lock position when snapped
- **Pointer tracking**: Separate pointer position tracking for accurate release detection
- **Visual feedback**: Green color transitions and animated fill when snapped
- **Fly-away gate**: Fly-away runs only when pointer release occurs in snapped state
- **Dynamic fly start**: Uses current spring-driven card transform as animation start

**Usage rules**:

- Pair with `ProjectCardCompact` in a hover group.
- Expanded card appears on hover with a popout/overlay animation.
- Expanded card uses lower tilt/hover values for easier interaction.
- Keep achievements concise (3-5 short items).
- Expanded card should be interactive only while visible.

## HandEmbed

**Purpose**: Right-edge visual cue and line indicator for ProjectCardExpanded drag interactions, rendered as a portal overlay.

**Responsibilities**:

- Render fixed-position cue circle at right screen edge
- Display animated dashed line connecting bump position to cue
- Provide visual feedback for magnetic snap state (color transitions)
- Handle portal-based rendering for proper z-index layering
- Follow bump's Y position dynamically for accurate line placement

**Key props**:

- `visible` (controls overall visibility)
- `y` (MotionValue tracking bump's Y position)
- `bumpX` (MotionValue tracking bump's X position)
- `isSnapped` (boolean for snap state visual feedback)
- `isFlyingAway` (boolean to animate cue + dashed line exiting right and fading out)

**Visual Features**:

- **Cue**: 48px circle with teal/green color transitions, animated glow effects
- **Line**: Animated dashed line with moving pattern, opacity based on visibility
- **Snap feedback**: Green fill animation (500ms) and enhanced glow when snapped

**Usage rules**:

- Only use with ProjectCardExpanded when `showCue={true}`
- Portal renders to document.body for proper overlay positioning
- During fly-away, cue and dashed line should move right and dissolve while preserving Y alignment

## HeroPhotoCard

**Purpose**: Landing hero card that scrolls diagonally with GSAP, flips, and settles into a compact project card.

**Responsibilities**:

- Drive scroll-linked translation and flip timing
- Disable interactivity and glare during flip for stability
- Re-enable compact card interactivity after settle
- Keep front/back faces size-aligned for seamless flip
- Emit a reset token when card transitions from back face to front face on reverse scroll

**Usage rules**:

- Use only as a client-side island on the landing page
- Keep the front card as the hero photo variant
- Back face must render `ProjectCardCompact`

## ProjectsScrollSection

**Purpose**: Static Projects section that appears after additional scroll space following the hero.

**Responsibilities**:

- Render buffered spacing so Projects appears after additional scroll
- Render a centered Projects heading with brand-apricot gradient text
- Render a 3-column desktop grid with uniform compact-card footprints
- Keep cards static (no transition transfer from hero)

**Usage rules**:

- Keep heading natural-scrolling (no heading pinning)
- Keep mobile layout single-column with featured card first
- Keep cards non-interactive in this section (`interactive={false}`)

## HeroBackHoverCard

**Purpose**: Compact + expanded project card hover pair used on the hero back face.

**Responsibilities**:

- Render compact project card with hover-activated expanded overlay
- Manage pointer-events handoff and delayed close behavior
- Keep expanded card anchored to the compact card origin
- Reset local hover/dismiss state when `resetToken` changes

**Usage rules**:

- Use only inside hero back faces (not general grids)
- Expanded card is interactive only while visible

## HeroCatchScene

**Purpose**: Experimental hand-object bundle used in `/test` route to iterate on hand + phone + adjacent project card composition.

**Responsibilities**:

- Render mirrored hand image behind the phone shell
- Render phone shell with Tandem iframe using the exact `402:874` ratio
- Render adjacent expanded project card as a visual companion panel
- Lock page scrolling while pointer is interacting with frame region

**Usage rules**:

- Use as sandbox/preview on `/test` route while iterating on composition
- Keep separate from production hero sequence unless explicitly promoted
- Treat `resetToken` as authoritative lifecycle reset after fly-away and reverse-scroll front re-entry

## ScrollToTopOnLoad

**Purpose**: Forces page refreshes to start at the top of the document.

**Responsibilities**:

- Disables browser scroll restoration
- Scrolls to top on initial load

**Usage rules**:

- Use once in the root layout

## Hover Interaction Pattern

- Compact card sits in normal flow and fades out on hover.
- Expanded card overlays the compact card and scales up from the top-left anchor (2x preview).
- Expanded card becomes interactive only after compact hover.
- Use `pointer-events` toggling so the expanded card is interactive while compact is hidden.

## Movement + Flip + Tilt + Glare (Expected Behavior)

- **Movement**: external motion (position/scale/rotate) lives on a GSAP-driven wrapper only.
- **Tilt**: remains independent from layout motion.
- **Flip**: applies to the full card surface (border + background + glare + content).
- **Glare**: tracks pointer within the card; no glare on touch or reduced motion.
- **Scroll usage**: GSAP owns scroll-linked motion; do not use Framer Motion for scroll.
- **Interaction usage**: Framer Motion owns hover/tap/enter interactions only.

## Examples (Usage Patterns)

1. **Move card on scroll**: use GSAP + ScrollTrigger on a wrapper element.
2. **Flip on scroll**: drive flip progress with GSAP or apply `rotate3d` directly on a flip wrapper.
3. **Content types**: cards support image-only, image+text, and text-only layouts without special wrappers.

## GSAP Plugin Guidance

- **ScrollTrigger**: default for scroll-linked motion and pinning
- **ScrollToPlugin**: use for anchor/CTA smooth scrolling

## Animation Ownership (Strict)

- GSAP owns all scroll-linked animations
- Framer Motion owns interaction/state animations only
- No element may be animated by both libraries
- If ownership is unclear, default to GSAP

## Performance & Motion Rules

- Allowed: `transform`, `opacity`
- Avoid: `top`, `left`, `width`, `height`, `filter`, `box-shadow`
- Use restrained easing (no bouncy/cartoon motion)
- Cap high-impact moments to 2 max (hero + one section)
- Always respect `prefers-reduced-motion`

---

**Last Updated**: February 21, 2026
