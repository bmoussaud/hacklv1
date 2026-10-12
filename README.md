# Operation Atelier 404

Act II showcase for the Louis Vuitton hackathon: **ASYM-P / Passage**, a proposed capsule for design-conscious travellers. React + Vite, plain CSS, a single page, no backend or commercial transactions.

**This is a fictional reconstruction, not an official collection.** The title, product categories, names, and abstract studies are proposals. Only facts attributed to `operation_atelier_404_brief.pdf` are treated as source evidence.

## Run locally

Use Node.js 24 LTS and npm.

```sh
npm ci
npm run dev -- --host 127.0.0.1
```

Open the local URL printed by Vite. For the production demo:

```sh
npm run build
npm run preview -- --host 127.0.0.1
```

## Quality and proof

```sh
npm run lint
npm run build
npx playwright install chromium
npm test
npm run audit
```

`npm run check` combines lint, production build, and desktop/mobile browser checks. The 22 checks cover the fiction disclosure, archival facts, source PDF, metadata, runtime/console/network errors, loaded illustrations and alt text, keyboard navigation and focus, native material disclosures, and the six source-labelled exhibit summaries. Reflow is checked at 320, 390, 768, and 1280 CSS pixels with product notes expanded.

Lighthouse CI audits the production build and writes local HTML/JSON reports to `.lighthouseci/reports`. It needs Chrome/Chromium; if autodetection fails, set `CHROME_PATH` to the browser executable (the Chromium installed by Playwright also works). Reports are not uploaded to a public third-party service.

`.github/workflows/quality.yml` runs the checks and Lighthouse on pushes and pull requests, retaining reports as GitHub Actions artifacts. The accessibility score gate of 100 and warning thresholds of 90 for the other categories are project choices, **not thresholds imposed by the brief**. Lighthouse does not replace manual accessibility review. A configured workflow is not evidence of a successful GitHub run; use the actual run and artifacts in the final presentation.

The Act II production build passed local lint and all 22 desktop/mobile browser checks. Desktop/mobile screenshots were inspected for the integrated content and illustrations. The new Act II Lighthouse run scored 100 for performance, accessibility, best practices, and SEO; the HTML/JSON reports and latest manifest are in `.lighthouseci/reports`. These are current local results, not the carried-forward Act I scores or a claim that GitHub Actions has run. The final manual checklist remains open.

## Creative handoff

- **Audience:** proposed audience of travellers who collect design-led objects.
- **Promise:** recover an interrupted material language without inventing a resolution to the archive.
- **Name:** ASYM-P / Passage is a creative completion of the surviving fragment, not an archival discovery.
- **Wider line:** The Fold (shoulder piece), The Carry (travel piece), and The Fragment (small leather object). All categories are hypotheses because the original category is redacted.
- **Narrative:** open the crate, explore proposed objects, then read what is known and what remains unanswered.
- **Disclosure:** visible beside the hero copy; repeated in the record and footer.
- **Product exploration:** native disclosures explain each object's proposed surfaces, construction, and intended gesture. These are fictional interpretations, not authenticated specifications.
- **Exhibit index:** A-F are listed using only summaries from the brief, each marked "Source exhibit unavailable" and "Brief summary only." There are no fabricated downloads.

The six exhibits are absent. The organizer request remains outstanding: "Please provide exhibits A-F, especially the legal memo and its three conditions, so we can validate the revival concept." No request has been sent on the team's behalf. Do not invent missing exhibit contents, archive photography, Janus's fate, or a reason for the authorization hold.

## Visual specification

The foundation is a material study: warm stone (`#e9e4db`), pale surface (`#f5f2ec`), ink (`#292521`), plum (`#542f46`), and contrasting blue focus (`#075a9c`). Helvetica/Arial provide a neutral system-font typographic base. The design detector's generic font warning is intentionally left as a scaffold trade-off: no external font dependency before the team approves final typography. Large asymmetric title composition, sharp planes, restrained rules, and generous spacing connect to the capsule's geometry.

The sequence is hero/disclosure, discovery, proposed collection, and evidence ledger with the exhibit index. Desktop uses split layouts; mobile reads in one column. Three original concept illustrations replace the abstract CSS studies. Every illustration has descriptive alt text and a nearby caption stating it is a fictional proposal, not an archival photograph. Use empty alt text only for purely decorative images added later.

No external imagery, fonts, logos, or monogram assets are required. Obtain source/usage approval before replacing the illustrations. Navigation scrolls immediately: no animation competes with rapid keyboard navigation, including when reduced motion is requested.

## Concept artwork and provenance

| Asset | Depicted proposal | Provenance |
|---|---|---|
| `public/concepts/fold.svg` | Shoulder piece with curved strap, asymmetric vinyl flap, and padded front planes; also used in the hero | Original SVG authored with GitHub Copilot for this fictional concept |
| `public/concepts/carry.svg` | Broad travel piece with paired handles, angled end panel, and vinyl band | Original SVG authored with GitHub Copilot for this fictional concept |
| `public/concepts/fragment.svg` | Small envelope object with diagonal flap and vinyl inset | Original SVG authored with GitHub Copilot for this fictional concept |

The assets contain no scripts, external resources, house logos, or archival photographs. All have an 800 by 680 view box and intrinsic dimensions. The hero loads eagerly with high priority; collection images load lazily. Gradients and grain patterns illustrate proposed materials rather than documenting original objects.

## Architecture review

The AI-assisted Act II review preserves the small structure:

- `src/App.jsx`: semantic page shell and small `ConceptFigure`/`CollectionItem` components, with native `details`/`summary` interactions and the exhibit index.
- `src/content.js`: product descriptions, image metadata, material notes, exhibit summaries, source facts, and unresolved questions, separate from rendering.
- `src/index.css`: shared tokens, type, focus, and reduced-motion foundations.
- `src/App.css`: composition and responsive section styling.
- `vite.config.js`: React build plus copying the canonical source PDF into the built site.
- `tests/site.spec.js`: production-site behavior checks.

There is no router, state layer, API, image service, or unused transactional control. Stable item IDs drive repeated markup. Navigation uses real anchors. The production build is what both browser checks and Lighthouse evaluate. The missing exhibits remain the main source-validation constraint; team approval of the concept artwork and manual accessibility review remain later-stage work.

The integrated review checked content provenance, image semantics and loading, native disclosure behavior, visible focus, heading order, component reuse, and production asset availability. The exhibit index is inside the record section, not mixed into the proposed products. No authenticated product dimensions, capacities, prices, or original legal conditions are claimed. Browser checks verify closed and expanded notes and identify resource errors rather than substituting success-shaped image fallbacks.

## Team ownership and next work

Human assignments still need team confirmation; these are role-based handoffs, not claims that people have been assigned or consulted.

| Role | Next responsibility |
|---|---|
| Team lead | Confirm role owners, request exhibits A-F, approve the proposed concept |
| Content | Approve finished proposal copy; validate against any supplied exhibits before adding source claims |
| Art direction | Approve the three original concept illustrations or provide permitted replacement imagery |
| Development | Integrate approved content/imagery; keep navigation, layout, and quality checks working |
| Prompt coordination | Keep prompts source-grounded; record actual AI contributions and review decisions |
| QA/accessibility | Triage CI failures; complete the manual checklist below |
| Demo/pitch | Rehearse the local startup, story, evidence/fiction distinction, and actual audit proof |

AI contributions: proposed narrative and product/material copy, original SVG concept illustrations, source-labelled exhibit summaries, React component integration, accessibility and browser checks, workflow configuration, and architecture/code review. These were assisted by GitHub Copilot; no use of MaIA or Claude Code is claimed.

**Pitch premise:** "The crate gives us a material language, not a complete history. Passage proposes how that language could travel into a new collection. We distinguish every creative hypothesis from the brief's evidence, and make the revival accessible through a local React experience."

## Act III handoff

The local Act II showcase is complete. The team still needs to approve the fictional concept and artwork, obtain the missing exhibits if available, and complete the manual accessibility checks. Recheck the production build and audit after any content or image change, then rehearse the local walkthrough and pitch with the actual quality evidence.

The Act II application and workflow are maintained on this session's feature branch. Remote publication has not been authorized. Pushing the branch and obtaining an actual Actions run remain a separate handoff; no pull request was created and no remote CI success is claimed.

## Manual accessibility checklist

Owner: the team's QA/accessibility role. Record actual results before the final demo; unchecked items are not passed.

- [ ] Read the page with a screen reader: landmarks, headings, order, links, and fiction disclosure make sense.
- [ ] Navigate every link with keyboard only; focus remains visible and the skip link moves to main content.
- [ ] Check contrast for text, link states, and focus indicators, including after imagery changes.
- [ ] Check reflow at 320 CSS pixels and at browser zoom; no clipped text or horizontal scrolling.
- [ ] Review alt text for any new meaningful images; decorative images are ignored correctly.
- [ ] Verify reduced-motion behavior and touch navigation on a real mobile device.
- [ ] Attach final Lighthouse reports and identify limitations of the automated audit honestly.
