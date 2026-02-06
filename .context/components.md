# Components Context

Authoritative component reference for SDX24. Use this file as the source of truth for component behavior, animation ownership, and usage rules.

## Scope

Active UI primitives:

- `CometCard` (`apps/web/src/components/ui/comet-card.tsx`)
- `MainTealCard` (`apps/web/src/components/ui/main-teal-card.tsx`)
- `ProjectCardCompact` (`apps/web/src/components/ui/project-card-compact.tsx`)
- `ProjectCardExpanded` (`apps/web/src/components/ui/project-card-expanded.tsx`)

No other card components are supported; prior legacy/face card variants were removed.

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
- Use `containerMotionProps` for page movement, and `flipProgress` for scroll flips.

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

**Purpose**: Hover-revealed expanded card with full project details and links.

**Responsibilities**:

-- Provide longer description, expanded stack, achievements, and links
-- Show cover image container on the right
-- Use stronger project branding than compact card
-- Reduce motion for stability (lower tilt + hover scale)

**Key props**:

- `title`, `slogan`, `description`, `status`
- `links`, `stack`, `achievements`
- `logoSrc`, `wordmarkSrc`, `coverSrc`
- `brand` (project palette for expanded card)

**Usage rules**:

- Pair with `ProjectCardCompact` in a hover group.
- Expanded card appears on hover with a popout/overlay animation.
- Expanded card uses lower tilt/hover values for easier interaction.
- Keep achievements concise (3-5 short items).
- Expanded card should be interactive only while visible.

## Hover Interaction Pattern

- Compact card sits in normal flow and fades out on hover.
- Expanded card overlays the compact card and scales up from the top-left anchor (2x preview).
- Expanded card becomes interactive only after compact hover.
- Use `pointer-events` toggling so the expanded card is interactive while compact is hidden.

## Movement + Flip + Tilt + Glare (Expected Behavior)

- **Movement**: external motion (position/scale/rotate) lives on `containerMotionProps` only.
- **Tilt**: remains independent from layout motion.
- **Flip**: applies to the full card surface (border + background + glare + content).
- **Glare**: tracks pointer within the card; no glare on touch or reduced motion.
- **Scroll usage**: `useScroll` + `useTransform` should feed into `containerMotionProps.style` and `flipProgress`.

## Examples (Usage Patterns)

1. **Move card on scroll**: attach `x/y` MotionValues to `containerMotionProps.style`.
2. **Flip on scroll**: pass `flipProgress` MotionValue (0-1) to `CometCard` or `MainTealCard`.
3. **Content types**: cards support image-only, image+text, and text-only layouts without special wrappers.

---

**Last Updated**: February 03, 2026
