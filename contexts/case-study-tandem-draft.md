# Tandem Case Study Draft Notes

Working source-of-truth for the Tandem hero case-study fullscreen content. This file captures user-provided facts, placeholders, and pending inputs so implementation copy stays consistent.

## Locked Facts

- Project: Tandem
- Role: Lead Full-Stack Developer
- Format: Hero fullscreen case-study view (no separate route)
- Timeline: 16 weeks
- Team: 3 developers + 5 designers
- Positioning: Mobile web app helping parents in trades manage childcare scheduling
- Case-study state: Finalized long-form structure with real visuals, references, and team credits

## Approved Public Links

- Live app: `https://tandem-app.com`
- Repository: `https://github.com/IDSP-TRADECARE/Tandem`
- Blog: `https://tandem-blog.vercel.app`
- Case-study card labels: `App Link`, `Repository Link`, `Blog Link`

## Confirmed Contribution Scope

- Led core application architecture decisions.
- Implemented real-time synchronized sessions and live messaging behavior.
- Independently implemented guest authentication for iframe embedding with secure cookie settings (`HttpOnly`, `Secure`, `SameSite=None`).
- Built profile section end-to-end including user schema and database structures tied to user data.
- Implemented and integrated nanny-sharing feature logic including:
  - messaging behavior,
  - async group joins,
  - calendar form transfer and persistence,
  - automatic nanny-share creation,
  - linked navigation/system flow.
- Contributed across signup flow and integration linking across app features.

## Confirmed Challenges and Solutions

1. Cross-device behavior (mobile-first with desktop support)

- Challenge: keep interaction quality across viewport differences.
- Solution: responsive, relative layout strategy and iterative adaptation.

2. Nanny-sharing integration complexity

- Challenge: acceptance and technical coupling issues in group logic.
- Solution: separated high-risk hosting/integration boundary so group logic can operate without destabilizing core app pathways.

3. Date creation and overlap logic

- Challenge: calendar-based flows generated timing conflicts.
- Solution: explicit date/time generation and overlap handling techniques.

4. Competitive gap in current market tools

- Challenge: existing products split scheduling and childcare across separate tools.
- Solution: unified flow combining scheduling, sharing, participation status, and coordination context.

## Outcome Positioning (Soft Metrics)

- Reduced common scheduling path from approximately 6-7 interactions to 3-4 focused actions.
- Improved availability and group-status clarity in sharing flows.
- Reduced switching between separate calendar/chat tools for core coordination actions.
- Improved navigation clarity between scheduling and sharing states.

## Team Credits (Confirmed)

- Development:
  - Matheus Demeis (LinkedIn + Portfolio + GitHub)
  - Lam Thai (LinkedIn + Portfolio + GitHub)
- Design:
  - Thea Calaquian (LinkedIn)
  - Angie Duong (LinkedIn)
  - Sandy Chow (LinkedIn)
  - Bonnie Wan (LinkedIn)
  - Alyssa Huggins (LinkedIn)
- UI presentation rule: show team tag only (`Development`/`Design`) with optional profile links.

## Current Implementation Notes (Session Synced)

- Role is presented as a highlighted role title with structured responsibility list.
- Role section now includes technical ownership evidence with:
  - guest auth API snippet,
  - typed Socket.IO room handler snippet,
  - schema captures for `users`, `pending_nanny_requests`, and `nanny_shares`.
- Timeline block uses a horizontal rail with 4 markers (`4`, `8`, `12`, `16`) and no start/delivery labels.
- Team block scroll targets Team Credits centered in the case-study scroll container.
- Project links are finalized to `App Link`, `Repository Link`, `Blog Link`.
  - `App Link` includes `Currently Live` status chip.
- Tech stack is collapsible with matched chip styling in collapsed and expanded states.
- Live interaction preview uses a simplified embedded frame focused on direct in-page interaction visibility.
- Section assets use real screenshots per section; Figma embeds are limited to Process section only.
- Process section uses two public Figma embeds (mid-fi and hi-fi component files) with `embed.figma.com` links.
- Process-section Figma embeds now render full frame (no side cropping) and include an explicit interactive cue.
- Process-section embed cards are presented side-by-side on large screens to emphasize direct mid-fi to hi-fi comparison.
- Process copy now explicitly frames iteration as mid-fi diagnosis -> hi-fi refinement.
- Context copy and visual labels now reference a single primary persona.
- Added new hi-fi evidence screens and mapped them by section to reduce repeated screenshot usage:
  - Challenge: monthly schedule board, pending work state
  - Solution: empty-state onboarding, request detail review, upload flow, new monthly setup, single-message confirmation
  - Outcomes: final request queue, final group join, final availability state, childcare edit success
- Case-study visuals are now section-unique in the rendered flow (no repeated screenshot content between sections).
- Role highlights now explicitly document:
  - full guest session lifecycle (create, consume, cleanup),
  - typed room-scoped realtime architecture (`share-${id}` / `dm-${id}`),
  - persistence-first then socket-fanout messaging reliability approach.
- Placeholder previews are click-only with section-scoped expansion and reduced-bounce transitions.
- Team credits show avatar images from `apps/web/public/case-study/members/`.

## Evidence and References (Finalized)

- Competitive analysis statement included in context section:
  - "Competitive analysis revealed that while scheduling tools and childcare platforms exist, none effectively support shared childcare coordination between multiple families."
- References include public sources for shiftwork/childcare context plus Tandem product links.
- Process section uses paired public Figma embeds (mid-fi + hi-fi) as direct iteration evidence.
