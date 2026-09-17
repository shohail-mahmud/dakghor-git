# Dakghor targeted refinement

## What will change
- Recompose the Home page’s “How a letter travels” stages on phones into a compact, connected four-step layout while preserving the desktop treatment.
- Reduce only the Home page section-level vertical padding to roughly 40% of its current size, keeping internal typography and component spacing intact.
- Add a local demo session using browser storage, with Shohail / demo@dakghor.local / DG-7K4P-92 as authenticated-only demo data.
- Require that local demo session for Postbox, Write Letter, My Address, My Letters, individual letters, and Settings; public visitors attempting those pages will return to Sign In.
- Update Sign In to accept the demo account and sign-out controls to clear the local session. Public navigation remains public; app navigation appears only after demo sign-in.
- Remove personal-address presentation from public pages. Public explanations may retain clearly labeled example address formatting, but the demo account’s actual address will only render inside the protected app.

## Technical details
- Keep all state client-side with no Cloud, database, or production authentication.
- Use a small shared demo-session module and a client-side authenticated layout guard that avoids hydration mismatches.
- Preserve existing routes, typography, palette, content structure, and postal components.
- Validate signed-out redirects, demo sign-in, sign-out, protected pages, and Home layout at desktop and phone widths.
