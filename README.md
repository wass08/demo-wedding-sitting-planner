# Vow — Wedding Atelier

Live app: [Vow — Wedding Atelier](https://wedding.wawasensei.dev/)

## Hosting

Deployed on Vercel as a standard Next.js app. Saved plans live in Neon Postgres (connected through the Vercel Marketplace, which provides `DATABASE_URL`).

There is no sign-in: each browser receives a private, unguessable session cookie (`proxy.ts`), and plans are scoped to it. Clearing cookies or switching browsers starts a new wedding.

An interactive Three.js garden reception and seating planner. The working surface includes a 3D garden, overhead plan, and a cinematic evening view.

## Features
- Round and square tables, dragging, numeric placement, rotation, duplication, removal, capacity, and undo.
- Guest entry, assignment, search, and capacity checks.
- Names, date, linen, flowers, and adjustable evening lighting.
- Private saved plans in Postgres, scoped to the browser session, with optimistic revision checks.
- PDF seating plan and assignments, guest CSV, and current-view PNG.
- Responsive controls, reduced-motion support, and optional WebMCP atmosphere/read tools.

## Run
`npm install`, then `vercel env pull .env.local` to fetch `DATABASE_URL`.
For a new database run `npm run db:setup` once to create the tables in `db/schema.sql`.
Then `npm run dev`.

## Checks
`npx tsc --noEmit` and `npm run build`.

## Scope
The Garden Estate is an original concept venue, not a surveyed real venue. Confirm measurements and access clearances with a planner. One saved wedding per account. Table assignments are implemented; individual named chair assignments are not yet part of this version. Exporting an image captures the current camera, without the editing controls.

## Demo sequence
Open the populated reception. Add a square table and reposition it in Floor plan. Assign an unseated guest. Change the linen and evening lighting in Mood. Choose Experience the evening, orbit the garden, then export the seating plan and scene image.

## Visual implementation
Original procedural geometry, no third-party artwork. Soft pleated linens, modeled place settings, brass chairs, floral arch, stone colonnade, garden plantings, warm practical lights, PMREM reflections and restrained bloom. Three.js (MIT), jsPDF (MIT), and the included Sites starter dependencies retain their respective licenses.


## Visual seating and atmosphere update
- Live seating board with per-seat guest placement, drag-and-drop, click/touch assignment, swaps, undo, and links back to a table in the garden. Legacy table-only guest assignments are resolved without losing names. Seat numbers are included in PDF and CSV exports.
- Four coordinated palettes change linen, two floral colors, drapery, napkins, metal finishes and foliage accents. Nighttime light uses lower candle intensity and less bloom to preserve floral color.
- Surrounding hills, estate trees, gradient sky and evening stars. Entrance, dinner and floral-arch viewpoints.
- Optional original Web Audio ambient score, off by default, with volume control. No external music services, recordings, tracking or audio files.
- Existing private saves remain unchanged; the stored JSON accepts optional mood and guest seat fields, so no database migration is needed.


## Venue refinement and introduction
- `/` is now a short live-3D introduction with palette previews. It uses an isolated example and does not write the saved plan. `/plan` opens the existing authenticated planner.
- Original curved petal geometry, fine leaf surfaces, varied centerpieces, continuous square-table cloth folds, linen sheen, glazed porcelain, transmissive stemware, stone grain and contact shadows. Distant tree canopies are clustered and hills use smoother geometry.
- In-scene seating projects interactive names at the actual modeled chair positions, accounting for table rotation and shape. Table navigation, guest assignment, swapping and existing undo all share the saved plan. Camera transitions temporarily disable chair-label clicks to avoid misclicks.
- Eight-second entrance reveal assembles the dining tables. It supports replay, interruption, and reduced motion; it does not mutate saved data.
