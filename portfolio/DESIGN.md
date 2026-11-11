# Design principles

**Direction.** Dark, editorial, instrument-like. One acid-lime accent on near-black, with a cool
ion-blue as the second note. A serif italic is used sparingly for emphasis against a tight grotesk.

1. **Hierarchy through scale, not decoration.** Display type is fluid (`clamp`), body is 16–20px,
   mono microtype labels carry metadata. Three levels read at a glance.
2. **One accent, used for meaning.** Lime marks the current thing: the active nav item, the live
   job, the primary action, timeline progress. If everything glows, nothing does.
3. **Tokens, not magic numbers.** Colour, type and easing are defined once in `globals.css`.
   Text is 7:1 or better on the background; focus rings are always visible.
4. **8-pt rhythm.** Section padding 112/160px, card padding 20–24px, gaps in multiples of 4/8.
5. **Motion has a job.** A single expo-out curve (`cubic-bezier(.16,1,.3,1)`) everywhere. Entrances
   reveal hierarchy (name, then role, then actions); hover states confirm affordance; the 3D object
   tells you where you are in the page. Only `transform`/`opacity` are animated.
6. **Depth is layered.** WebGL background → glass surfaces → content. Cards tilt in 3D toward the
   pointer, lit by a cursor-following spotlight.
7. **Respect the user.** Reduced-motion is honoured end to end, touch devices skip pointer
   effects, semantic landmarks + skip link + `aria-current` nav, decorative visuals are
   `aria-hidden`, and the page is fully usable if WebGL or JS motion fails.
8. **Performance budget.** Three.js loads after first paint, DPR capped at 1.75, one draw call
   each for the core and the particles, no images or external icon requests.
