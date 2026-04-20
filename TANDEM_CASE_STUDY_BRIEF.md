# Tandem Case Study Brief

This file stores the working content brief for the Tandem case study implemented in the hero fullscreen case-study view.

## Locked Project Facts

- Project: Tandem
- Role: Lead Full-Stack Developer
- Format: hero fullscreen case-study view (no separate route)
- Timeline: Sep 2025 - Dec 2025 (16 weeks)
- Team: 3 developers + 5 designers
- Product positioning: mobile web app helping parents in trades manage childcare scheduling

## Approved Public Links

- Live app: `https://tandem-app.com`
- Repository: `https://github.com/IDSP-TRADECARE/Tandem`
- Blog: `https://tandem-blog.vercel.app`

## Confirmed Contribution Scope

- Led core application architecture decisions.
- Implemented real-time synchronized sessions and live messaging behavior.
- Built profile section end-to-end including user schema and database structures tied to user data.
- Implemented guest mode with privacy-aware behavior and temporary guest-user handling compatible with the app system.
- Implemented nanny-sharing feature logic including messaging, async group joins, privacy constraints, calendar transfer/persistence, automatic nanny-share creation, and linked navigation/system flow.
- Contributed to signup flow and feature integration across the app.

## Confirmed Challenges and Solutions

1. Cross-device behavior

- Challenge: mobile-first interface also needed reliable desktop behavior.
- Solution: responsive relative layout strategy and iterative behavior tuning.

2. Privacy-safe guest mode

- Challenge: allow no-login usage for sharing/embed scenarios while preserving privacy boundaries.
- Solution: rewired auth boundary and introduced a temporary guest-user model compatible with chat and system flows.

3. Nanny-sharing integration complexity

- Challenge: acceptance and technical coupling issues in group logic.
- Solution: separated higher-risk integration boundary to protect main app stability.

4. Date creation and overlap logic

- Challenge: calendar-based scheduling generated timing conflicts and overlap issues.
- Solution: explicit date/time generation and overlap handling strategies.

## Outcome Positioning (Soft Metrics)

- Reduced interface clutter and improved flow concision.
- Improved intuitive navigation with fewer unnecessary steps.
- Increased clarity of where users should go without heavy tutorial dependence.

## Pending Inputs

- Exact month range label for the 16-week timeline.
- Final design team names and LinkedIn URLs.
- Final Figma links (personas, user flow, hi-fi, system map, style references).
- Final screenshots and assets for each section.
- Final non-placeholder citations.

## Placeholder Policy

- Placeholder links use `https://placeholder.example/...`.
- Placeholder visuals are represented by UI blocks with replacement captions.
- Placeholder citations are tagged as placeholders in references.

## Creative Direction Added

- Narrative Map: sticky section navigation that updates as the reader scrolls through the case-study structure.
- Embedded Preview: live Tandem iframe block in the case-study flow so reviewers can interact with the product without leaving the page.
- Tandem Atmosphere Layer: lightweight transparent gradient treatment using Tandem brand hues, applied only to the Tandem case-study section wrapper.
