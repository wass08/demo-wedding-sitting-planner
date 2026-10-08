# Vow — curated art direction

The intended character is an intimate garden reception: warm, layered and personal. Color belongs in selected details; the venue and linen provide a calm foundation. These are our design interpretations, not endorsements or reproductions of the featured weddings.

## References

- [Vogue France — Maggie and Derek at Le Mas des Poiriers](https://www.vogue.fr/galerie/mariage-mas-poiriers-avignon-provence-robe-mariee-oscar-de-la-renta): garden-led flowers, local lavender, illustrated linens, antique silver and French faïence. Translation: neutral linen, garden greenery and narrow porcelain accents rather than a whole room dyed blue.
- [British Vogue — Lillian and Nathan in Provence](https://www.vogue.co.uk/gallery/provence-wedding): an intimate French-bistro atmosphere with organic arrangements. Translation: smaller floral heads, low centerpieces and restrained evening illumination.
- [Vogue — Lauren Piscione and Travis Garrett in Tuscany](https://www.vogue.com/slideshow/lauren-piscione-and-travis-garrett-wedding): relaxed villa hospitality and layered vintage tableware. The inspected table photograph combines neutral linen, white plates, green glassware and small botanical details. Translation: fine plate rims, folded neutral napkins, menu cards and lightly tinted glasses.

## Palette direction

| Mood | Foundation | Selective accents |
| --- | --- | --- |
| Champagne | Warm ivory, cream flowers | Honey, olive and brushed gold |
| Rose | Warm ivory, cream flowers | Dusty blush buds and antique brass |
| Riviera | Ivory, white flowers | Porcelain blue, pale glass and silver |
| Citrus | Flax, cream flowers | Apricot buds, olive glass and muted brass |

Approximately five out of six modeled floral heads remain neutral. Color swatches show neutral colors as the dominant area. Lighting should keep the flowers readable after sunset.

## Applied refinements

A recessed loggia and framed doors give the arches depth. Tableware includes shaped plates, fine rims, cutlery and folded napkins. The arrival animation moves the camera through an already prepared reception. Guests are organized under one mode with Garden and Seating chart views.

No reference photographs are copied into the product. This is a stylized concept venue; custom high-detail floral and architectural assets remain a possible future investment.

## Garden polish and keepsake pass

Floral clusters now use overlapping petals, more compact flower heads, finer foliage and connected stems. Cloth folds vary gently rather than following a uniform corrugation. The evening horizon is cooler and the camera arrival ends on a quieter reception composition.

The new keepsake renders the actual layout at 1080 × 1350 with a dedicated portrait camera, then adds names and date. The renderer and editor camera are restored synchronously in a finally block. It includes no guest labels. The user previews the image before downloading it; it does not publish to a social account or change Site access.

Checked locally: TypeScript, portrait creation and download action, desktop and 390px mobile dialog, and return to the planner without modifying wedding data.

## Full critique pass

- Curved petal surfaces and filled rose centers replace open, angular flower shapes. Table arrangements vary between low compotes and small vase groups; the floral arch is heavier on one shoulder and at its base.
- Gathered curtains use broad folds and subtle movement. Limestone courses are staggered with low-contrast texture variation.
- Evening illumination is concentrated at tables and the couple's setting. Ambient light falls away more quickly; two table spotlights and the couple's light provide local shadows.
- Presentation mode removes the header and fades its controls after inactivity. A Controls button and Escape provide routes back. Wide, selected-table detail and arch cameras remain available.
- Garden seats use numbered markers. Full names are available on hover, keyboard focus and in the seat dialog.
- A 14-second showcase uses the current layout: venue, tables, assigned-seat markers, evening. It changes only presentation state, never saved wedding data. Stopping restores all tables and lights.
- A silent 1280 × 720 film can be recorded locally where supported. MP4 is preferred, WebM is the fallback. A playback dialog lets the user review and download the result. Portrait keepsakes remain available.

This is an improved procedural scene, not a photoreal scan or a commissioned asset library. No new venues or additional planning scope were added in this pass.

## Physical-contact corrections

Tableware now references one linen height for round and square tables. Cutlery bottoms and glass feet meet that surface; each glass has a foot, connected stem and a bowl with an inner wall. Geometry checks verified both table shapes.

Curtains are mounted in front of the masonry with rods and rings. Only their lower fabric sways; the hanging edge remains fixed. A sweep of the complete movement envelope measured at least 0.293 m clearance from the arch wall.

Arrangements combine rounded roses, small clustered florets, taller flowering stems, elongated buds and trailing foliage. Table mood changes rebuild the botanical mix as well as updating colors. Close-up preview checked the table setting and adjacent curtains.

## Close-up refinement — September 25
- Prevent projected labels from scrolling the canvas; presentation hides and disables table markers.
- Clear transmissive glass without opaque cast shadows; thinner cutlery preserves tabletop contact.
- Cupped hydrangea petals, wrapped rose buds and branched stems replace bead-like flower parts. Smaller leaves expose petals.
- Arch floral masses follow a visible slender support, with intentional gaps and an asymmetrical cascade onto the couple’s table. Continuous hanging linen replaces the solid table plinth.
- Curtain folds have varied wavelengths and lower sheen. Sampled worst-case wall clearance including sway: 0.324m.
- Local browser review: full-height presentation with zero scroll offset, table detail and arch cameras. Type check passes. Scene remains stylized rather than photorealistic.

## Venue and seating refinement
- Side urns stand on simple stone pedestals at x=±10.8, outside the hedge bed at x=±12.3. Pedestal caps end at ±11.21; the bed starts at ±11.625.
- Continuous rounded cloth surfaces replace disconnected table skirts; tabletop height remains unchanged. Curtain folds are finer and less deeply gathered.
- Denser rose centres, varied bloom heights, and outward-facing arch flowers replace flat repeated tiers.
- Increased ambient fill and reduced table spotlights soften the evening contrast.
- Close-up cameras hide the couple caption; camera toolbar and exit button occupy separate rows. Portrait arch framing adjusts to screen aspect.
- Explicit couple identity and two-seat table supported in validation, seating chart, guest assignments and exports. Guest-table mode releases couple-table seats and offers table/seat selection; existing plans stay valid.
- Verified own-table/shared-table transitions, seat uniqueness, urn/foliage clearance, tabletop height, type checks, browser seating controls and portrait presentation.

## Delivery review — rebuilt focal scene
- Replaced the old flower sheets with a reusable rounded shell-petal rose model, curved olive leaves and tapered cypress silhouettes. Materials use subdued highlights, and post-processing now preserves four-sample antialiasing.
- Reworked cloth folds by perimeter distance, avoiding concentrated corner ridges; preserved the exact tableware contact height.
- Added two full couple-table settings and raised both chairs onto the dais. Moved the trees that intersected the loggia outside the building. Soft window variation gives the background depth.
- Collapsed the couple setup by default to keep selected-table controls accessible.
- Review corrections before publication: rejected an angular flower revision; corrected a portrait camera blocked by a festoon bulb; isolated portrait-export field of view from the active camera and restored it after export.
- Checked desktop table/arch views, two palettes, 390px portrait framing, no viewport overflow, browser errors, and keepsake preview. Geometry checks cover stand clearance and glass contact at both table heights; seating transition and type checks pass.
- Art direction remains a stylized interactive venue, not a photorealistic venue survey.

## Performance refinement — 25 September
- Preserve indexed geometry when batching the venue and tables. Sample initial table geometry buffers fell from 10,039,968 to 2,841,066 bytes (72%); appearance and triangle topology remain unchanged. This measures buffer storage, not frame rate.
- Reuse table meshes when moving, rotating or renaming tables. Structural changes still rebuild the table set.
- Cache shadow maps between geometry changes, refreshing gentle animated shadows twice per second. Dragging and showcase transitions update immediately.
- Select using table footprints instead of testing every flower and glass triangle; skip hidden label positioning in presentation and pause drawing in background tabs.
- Validation: type check; seating and botanical geometry regression checks; mesh identity after pose/name changes; footprint hit/miss checks; local planner and evening presentation visual review. No device FPS guarantee.

## Atelier refinement — 28 September
- Collections now pair color with floral proportions, vessel finish and textile accents. Riviera uses more hydrangea clusters; Tuscan favors ceramic bud-vase groupings; rose sizes, heights and orientations vary more. Linen folds have a softer silhouette, napkins use a woven bump map, and table numbers remain visible on printed standing cards in presentation mode.
- Camera easing is time based. Sustained slow rendering gradually reduces raster resolution while preserving scene geometry; keyboard-focused presentation controls no longer disappear.
- Added atomic group seating into adjoining empty seats, with capacity errors and existing undo support. Layout notes use rotated chair footprints and reserved dance-floor/aisle regions; they focus the affected table and remain explicitly approximate.
- Added a reception booklet: venue portrait, collection, floor plan and paginated guest seats. Retained existing CSV, seating-only PDF and image exports. Browser rendering preserves non-Latin names as text images when the standard PDF fonts cannot represent them.
- Added a read-only presentation snapshot route. Links omit the guest list and guest assignments, whitelist design fields, validate input, and preserve the site's existing access control. Links are snapshots, not synchronized collaboration or public access grants.
- Verification: TypeScript and production build; legacy seating, urn/linen/glass placement checks; group placement and rejection checks; layout collision checks; Unicode snapshot round trip; booklet pages rendered and inspected; browser group assignment, booklet completion and presentation route; desktop and 390px mobile review.
- Remaining boundary: this is a stylized concept venue, not a photorealistic scan or a measured floor plan. No cross-device FPS claim.

## Banquet receptions
Long tables (8–24 places) and a three-sided U (18–40 outside places) share physical geometry across the garden, seat markers, chart and PDF. Presets place two 16-seat long tables or one 32-seat U around the central reception space. Clear table ends and deliberately unseated U corners leave circulation room. The 1.2 m circulation target includes chair footprints; it is concept guidance, with measured venue routes still requiring confirmation. Applying a preset preserves guest names and the couple-table choice, returns guest-table assignments to unseated, and supports undo. Individual moves retain assigned seat numbers; shrinking capacity compacts occupied seats only when required.

## Measured venue and guest planning
The floor plan is a dedicated full-width workspace with a measured rectangular boundary, metres/feet, a two-point ruler, drag placement and numerical dimensions. A private uploaded JPG/PNG/WebP can be fitted to that boundary for tracing; it is not an automatic reconstruction. The garden architecture remains illustrative. Floral pedestals, bar, cake table, sofa, DJ booth, stage, columns, partitions and entrance markers share positions, dimensions and rotations with the 3D scene. Original garden stands can be hidden. Scene geometry is batched to retain the existing performance approach.

Oval, half-round and curved tables use the same surface outline and chair positions in 3D, the map, seating chart and PDFs. Table dimensions can be adjusted within 70–140% of the base form; crowded-chair and circulation notes remain visible. The diagram uses a brass highlight for guest groups without recoloring the venue.

Guest profiles separate RSVP from event attendance. Ceremony-only, non-attending and declined guests are excluded from reception placement; changing attendance releases an existing seat. Household tags support placing eligible guests together. Food preference, meal, allergies and seating needs remain separate. Presentation snapshots exclude all guests and uploaded venue references. Guest-facing PDFs contain names and tables only; the catering PDF and CSV deliberately include private planning information and are labeled accordingly. Existing saved weddings remain valid with optional new fields.

Checks: type checking; geometry, attendance, collision and privacy regressions; desktop bar placement and drag; two-point ruler; ceremony-only counts; floor-plan image upload; mobile dimensions and visual review; rendered venue PDF; previous long/U preset regression.
