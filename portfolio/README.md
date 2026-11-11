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

Everything lives in **`src/data/site.ts`**. Lines marked `⚠ EDIT` are draft copy I wrote
without your input: the MatchMind AI and nux-express descriptions/stacks, the GitHub URL, and the
nux-express repo link.

Your CV is served from `public/Chukwuemeka_Ekine_CV.pdf`; replace the file to update the download.

## Structure

```
src/
  app/                 layout (fonts, metadata), page (composition), globals.css (design tokens)
  data/site.ts         all copy
  lib/store.ts         scroll / pointer / active-section store shared with the 3D scene
  components/
    three/             Rig (scene logic), Orbits, shaders (GLSL), targets (per-section pose + colour)
    sections/          Navbar, Hero, About, Experience, Projects, Stack, Contact, Footer
    ui/                Reveal, SplitText, Magnetic, TiltCard, Preloader, SmoothScroll, ...
    visuals/           generative SVG/CSS art for each project card
```

## How the 3D works

A single fixed WebGL canvas sits behind the page. `SectionTracker` reports which section is in
view; `Rig` eases the object's position, scale, opacity and colour toward that section's entry in
`three/targets.ts`. Scroll progress rotates it, scroll velocity agitates its surface, and the
pointer adds parallax. To change where it sits in a section, edit `targets.ts`.

Safeguards: `prefers-reduced-motion` freezes time and disables smooth scroll and the preloader,
the particle count and mesh detail drop on small screens, and if WebGL fails the page falls back
to the CSS backdrop.

See `DESIGN.md` for the UI principles behind the design.
