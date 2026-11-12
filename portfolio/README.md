# Chukwuemeka Ekine: Portfolio v2

Next.js 15 (App Router) · React 19 · Tailwind CSS v4 · Three.js via React Three Fiber · Motion · Lenis

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

Deploys to Vercel with zero config.

## Edit your content

Everything lives in **`src/data/site.ts`**. Lines marked `⚠ EDIT` need your input: the tech stacks for
MatchMind AI and Nux Express, and the GitHub URL.

Your CV is served from `public/Chukwuemeka_Ekine_CV.pdf`; replace the file to update the download.
`SITE.openToWork` / `SITE.statusText` control the availability chip in the hero and snapshot.

## Structure

```
src/
  app/                 layout (fonts, metadata), page (composition), globals.css (design tokens)
  data/site.ts         all copy
  lib/store.ts         scroll / pointer / active-section store shared with the 3D scene
  components/
    three/             Rig (scene logic), TechObjects (laptop, racks, ...), shaders, targets
    sections/          Navbar, Hero, About, Experience, Projects, Stack, Contact, Footer
    ui/                Reveal, SplitText, Magnetic, TiltCard, Preloader, SmoothScroll, ...
    visuals/           generative art for projects without a screenshot
```

## Features aimed at recruiters

- **Availability chip** and **20-second snapshot** card (role, experience, stack, location, education)
  with one-click Download CV, Save contact (.vcf) and Email.
- **Role-fit cards**: each role a recruiter might hire for, mapped to where it was actually done.
- **Experience timeline** showing the three most recent roles, with a "Show more previous positions" fold.
- **Recruiter FAQ** accordion and an **enquiry form** that drafts an email (no backend, nothing stored).
- **Light / dark theme** toggle: follows the OS by default, remembers the choice, no flash on load, and the
  3D scene re-tints itself for each theme.
- Person structured data (JSON-LD) for search engines.

## How the 3D works

A single fixed WebGL canvas sits behind the page, drawn entirely in code (no model files). Five
software-themed objects take turns on stage: a **laptop** running scrolling code (hero and
contact), **server racks** with blinking LEDs (about), floating **code windows** (experience), a
**service network** with data packets (projects) and a **layer stack** (stack).

`SectionTracker` reports which section is in view; `Rig` scales the matching object in, the others
out, and eases position, scale and colour toward that section's entry in `three/targets.ts`. Scroll
tilts the scene, scroll velocity agitates the particle field, and the pointer adds parallax.

**Readability.** `ui/Scrim.tsx` is a faded overlay between the canvas and the content. In the hero
it darkens only the text side; in every other section it dims the whole scene evenly. Tune its
opacity values there.

Safeguards: `prefers-reduced-motion` freezes time and disables smooth scroll and the preloader,
particle count drops on small screens, and if WebGL fails the page falls back to the CSS backdrop.

See `DESIGN.md` for the UI principles behind the design.
