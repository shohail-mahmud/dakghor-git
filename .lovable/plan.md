# Dakghor UI refinement

## Goal
Bring the supplied Dakghor website into the current app while preserving its identity, typography, palette, postal aesthetic, page structure, content, and existing interactions.

## Refinements
- Remove purely decorative dot accents, including the dot beside the Dakghor wordmark and kicker dots; retain meaningful status indicators.
- Add restrained paper-like depth with thin borders, subtle surface variation, light elevation, and modest overlap where postal objects already exist.
- Apply a consistent soft corner radius to buttons, inputs, cards, navigation surfaces, writing surfaces, and interactive rows without turning controls into pills.
- Simplify the home-page opening to one strong message, one primary action, and one postal mark; remove competing labels and secondary hero content.
- Keep the existing public and application page sets, with every requested navigation item mapped to a real page and clearly active.
- Preserve the dedicated desktop application sidebar while refining the public mobile menu and application mobile navigation for deliberate phone layouts.
- Reduce sign-in to the Dakghor identity, essential credentials, submit action, and account-creation link.
- Keep the footer compact with only the requested description, links, and copyright.

## Pages retained
- Public: Dakghor, How It Works, About, Sign In, Create Account
- Application: Postbox, Write Letter, My Address, My Letters, individual letter, Settings

## Technical details
- Convert the uploaded React Router implementation to the project’s TanStack route structure.
- Create shared public and application navigation components and reusable postal UI components.
- Keep demo letter content and current form interactions client-side; no account backend is added in this visual refinement pass.
- Add unique page metadata and validate desktop and mobile layouts in the browser.
