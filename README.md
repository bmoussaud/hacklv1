# Operation Atelier 404

Act III local reveal for the Louis Vuitton hackathon: **ASYM-P / Passage**, a proposed capsule for design-conscious travellers. React + Vite, plain CSS, a single page, no backend or commercial transactions.

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
npm run preview -- --host 127.0.0.1 --port 4275 --strictPort
```

Open `http://127.0.0.1:4275/`. Keep the terminal running: this is a local preview, not public hosting. It must be restarted after a machine shutdown.

If the port is occupied, do not terminate an unrelated process. Use an available alternative, for example `--port 4276 --strictPort`, and use the URL printed by Vite. If the page is blank, confirm the build succeeded, the preview command is still running, and the browser is using the correct port.

The application uses local illustrations, bundled code, and system fonts. External network access is not required to browse it while the local server remains running. This is not a service-worker-backed offline application: localhost must stay reachable.

## Quality and proof

```sh
npm run lint
npm run build
npx playwright install chromium
npm test
npm run audit
```

`npm run check` combines lint, production build, and desktop/mobile browser checks. The 32 checks cover the fiction disclosure, archival facts, source PDF, metadata, runtime/console/network errors, loaded illustrations and alt text, keyboard navigation and focus, native material disclosures, and the six source-labelled exhibit summaries. Reflow is checked at 320, 390, 768, and 1280 CSS pixels with product notes expanded.

Act III adds full document tab-order coverage, 44 CSS-pixel control targets, landmark/heading and native expanded-state checks in Chromium's accessibility tree, computed text/focus contrast in expanded and hover states, and browsing with all external requests blocked.

Lighthouse CI audits the production build and writes local HTML/JSON reports to `.lighthouseci/reports`. It needs Chrome/Chromium; if autodetection fails, set `CHROME_PATH` to the browser executable (the Chromium installed by Playwright also works). Reports are not uploaded to a public third-party service.

`.github/workflows/quality.yml` runs the checks and Lighthouse on pushes and pull requests, retaining reports as GitHub Actions artifacts. The accessibility score gate of 100 and warning thresholds of 90 for the other categories are project choices, **not thresholds imposed by the brief**. Lighthouse does not replace manual accessibility review. A configured workflow is not evidence of a successful GitHub run; use the actual run and artifacts in the final presentation.

The final Act III production build passed local lint and all 32 desktop/mobile browser checks. Desktop/mobile screenshots were inspected for the integrated content and illustrations. A fresh Act III Lighthouse run scored 100 for performance, accessibility, best practices, and SEO; its HTML/JSON reports and latest manifest are in `.lighthouseci/reports`. These are current local results, not the carried-forward Act II scores or a claim that GitHub Actions has run. The remaining manual checks are listed below.

Validated application commit: `a12c872`, including the Act III target-size correction, documentation, and regression checks. The frozen local application assets are:

```text
index-Mpmd1Cfy.css
SHA256 B8566E44CC48A4B8055C6E02B390A9BCDD91299171B235A1BD804E7FB5365AA6
index-sOWyAfP9.js
SHA256 3B67DDF7FA2792147D3AAAEDE88DF53E36BDDEFC87990EA94685CE4555EC8FB2
```

Representative report: `localhost-index_html-2026_10_12_12_46_44.report.html` and its matching JSON report. A later code/build change invalidates this frozen-build identity until the affected checks and audit are repeated.

## GitHub quality evidence

The published application commit `a12c872` passed [Quality and Lighthouse run 38259592956](https://github.com/bmoussaud/hacklv1/actions/runs/38259592956). The actual remote job completed lint, production build, all 32 browser checks, and Lighthouse successfully.

The downloaded remote Lighthouse report scored **100 for performance, accessibility, best practices, and SEO**. These are verified GitHub results, separate from the local scores above. The run retains `lighthouse-reports` and `browser-checks` artifacts; both were also downloaded into this session's artifact storage as a local backup. Report filename: `localhost-index_html-2026_10_12_14_00_46.report.html`, with its matching JSON report.

This run proves the submitted application code; later documentation-only commits do not change the frozen application assets. Any application/configuration change requires fresh checks and current proof. Screen-reader, real-device, browser-zoom, and human rehearsal limitations remain documented below.

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

The AI-assisted final review preserves the small structure:

- `src/App.jsx`: semantic page shell and small `ConceptFigure`/`CollectionItem` components, with native `details`/`summary` interactions and the exhibit index.
- `src/content.js`: product descriptions, image metadata, material notes, exhibit summaries, source facts, and unresolved questions, separate from rendering.
- `src/index.css`: shared tokens, type, focus, and reduced-motion foundations.
- `src/App.css`: composition and responsive section styling.
- `vite.config.js`: React build plus copying the canonical source PDF into the built site.
- `tests/site.spec.js`: production-site behavior checks.

There is no router, state layer, API, image service, or unused transactional control. Stable item IDs drive repeated markup. Navigation uses real anchors. The production build is what both browser checks and Lighthouse evaluate. The missing exhibits remain the main source-validation constraint; team approval of the concept artwork and manual accessibility review remain later-stage work.

The final review checked content provenance, image semantics and loading, native disclosure behavior, visible focus, heading order, component reuse, and production asset availability. The exhibit index is inside the record section, not mixed into the proposed products. No authenticated product dimensions, capacities, prices, or original legal conditions are claimed. Browser checks verify closed and expanded notes and identify resource errors rather than substituting success-shaped image fallbacks.

The focused Act III correction increases navigation, wordmark, primary-link, and footer-link targets to at least 44 CSS pixels without redesigning the page. Native disclosures already exceed that height. The review retains native `details`/`summary` semantics instead of introducing redundant ARIA state or JavaScript toggles. The existing type/palette and truthful copy remain intact.

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

AI contributions: proposed narrative and product/material copy, original SVG concept illustrations, source-labelled exhibit summaries, React component integration, accessibility and browser checks, workflow configuration, final architecture/code review, and the pitch draft. These were assisted by GitHub Copilot; no use of MaIA or Claude Code is claimed.

**Pitch premise:** "The crate gives us a material language, not a complete history. Passage proposes how that language could travel into a new collection. We distinguish every creative hypothesis from the brief's evidence, and make the revival accessible through a local React experience."

## Jury pitch

Draft for the brief's required 2-3 minute presentation, in English to match the site. The presenter should rehearse aloud with the click path below; speech timing and human presenter/backup assignments have not been verified. Translate it if the jury presentation will be in French.

> In 1987, sixty finished pieces were sealed away. Their release authorization had been withheld, and the reason was never entered. The archive counts sixty; the workshop record counts fifty-nine. Our starting point is not a solution to that mystery. It is a material language waiting for a new expression.
>
> This is ASYM-P / Passage: a fictional 2026 capsule revival inspired by the Louis Vuitton hackathon brief. Its name, product categories, and illustrations are our proposals, not recovered archive objects. We say that beside the hero, where visitors can actually read it.
>
> We imagine the audience as travellers who see an object as a piece of design. Three scales of movement shape the wider line: The Fold for the city, The Carry for departure, and The Fragment to keep close. Matte striated leather, thermoformed vinyl, geometric padding, and asymmetry connect the three. Our original illustrations make the shoulder, travel, and envelope silhouettes distinct without copying house logos or inventing archive photography.
>
> Opening a product's material notes explains the design decisions. The interaction uses native browser disclosures, not a custom widget. Keyboard navigation, visible focus, descriptive image text, responsive layouts, and larger touch targets are part of the experience, not a layer added at the end.
>
> The record separates known facts from open questions. Its six exhibit summaries are explicitly labelled as summaries from the brief: the actual documents were not supplied. We have not invented the legal memo's conditions or explained what happened to Janus.
>
> GitHub Copilot supported the narrative, original concept artwork, React integration, quality checks, final code review, and this presentation draft. The implementation stays small: reusable React components, structured content, plain CSS, and no unnecessary backend.
>
> We can show the current local browser-check results and Lighthouse report, alongside a successful GitHub Actions run with retained reports. Its Lighthouse scores are one hundred in all four categories. An automated accessibility score is evidence, not a substitute for a real screen-reader review.
>
> Passage revives the collection's possibilities without pretending to complete its missing history.

## Walkthrough and rehearsal

| Stop | Show | Point to make |
|---|---|---|
| Beginning of page | Hero, illustration, visible fiction notice | The revival is a proposed interpretation, not an authenticated collection |
| The capsule | Three distinct concepts | Audience, wider line, material vocabulary, and original artwork |
| The Fold's material disclosure | Expand with keyboard or pointer | Explain the proposal and demonstrate native accessible interaction |
| The record | Facts, open questions, six exhibit summaries | Evidence and invention remain separate; missing sources are disclosed |
| Local Lighthouse report | Current report, not an old screenshot | Actual local proof, with remote and manual-review limitations stated |
| Finish | One sentence from the pitch | Revive possibilities without inventing history |

The five jury criteria map to clear evidence: small React architecture for code quality; coherent artwork/materials for visual result; native interaction and reviewed accessibility for inclusion; documented actual AI contributions across roles; and the short, rehearsed story for presentation.

Before the jury arrives, the team should assign a presenter and backup, rehearse aloud, reset the page to the beginning, close expanded disclosures, and open the current local report in a second tab. Keep the source PDF as optional evidence; do not spend the pitch searching for absent exhibits.

## Local audit report for the demo

After a successful audit, copy only its representative report into the generated build:

```powershell
$manifest = Get-Content .\.lighthouseci\reports\manifest.json -Raw | ConvertFrom-Json
$report = $manifest | Where-Object isRepresentativeRun | Select-Object -First 1
if (-not $report) { throw 'No representative Lighthouse report found' }
New-Item -ItemType Directory -Path .\dist\quality -Force | Out-Null
Copy-Item -LiteralPath $report.htmlPath -Destination .\dist\quality\lighthouse.html
Copy-Item -LiteralPath $report.jsonPath -Destination .\dist\quality\lighthouse.json
```

The production preview then serves `http://127.0.0.1:4275/quality/lighthouse.html`. This is a generated proof artifact, not another application route. Build output and reports are ignored by Git. A new build removes the copied report: rerun the audit and copy the new representative report rather than presenting stale evidence. To open the original HTML report without the server, use `Invoke-Item -LiteralPath $report.htmlPath`.

## Accessibility review status

| Review | Method and status |
|---|---|
| Keyboard order, skip link, return-to-top, disclosure toggles, focus | Passed automated browser checks across desktop/mobile emulation; all 11 controls traversed in DOM order |
| Landmarks, heading levels, image names, native expanded states | Chromium accessibility tree inspected and regression-checked; not a screen-reader session |
| Text, hover/expanded, and focus contrast | Passed computed contrast checks: normal text at least 4.5:1, large text and focus at least 3:1 |
| Reflow with expanded notes | Passed at 320, 390, 768, and 1280 CSS pixels |
| Touch targets and reduced motion | Passed browser checks; visible controls are at least 44 by 44 CSS pixels and navigation is motion-free |
| Desktop/mobile composition | Screenshots inspected; original concepts, captions, and disclosure remain readable |
| Screen-reader and physical-device behavior | Not performed; require actual assistive technology and a real device |
| Actual browser zoom at 200% and 400% | Native Chrome UI verification was attempted but the UI bridge could not reliably dispatch/verify zoom; remains pending. Narrow-viewport tests are not claimed as browser-zoom checks |

Remaining manual checks for the team's QA/accessibility owner:

- The temporary native Chrome review window may remain minimized: the UI bridge could not reliably complete zoom or close-window actions. Close that review window manually if it is still present.
- [ ] With a real screen reader, read from the page title through landmarks and headings; confirm meaningful image names, fiction disclosure, and each disclosure's announced state.
- [ ] In the actual presentation browser, use browser zoom at 200% and 400%; traverse expanded notes and the record without clipping or horizontal scrolling.
- [ ] On a real mobile device with access to a locally available preview, tap navigation/disclosures, read captions, and confirm focus/zoom behavior.
- [ ] Rehearse the pitch aloud and confirm the brief-required duration, presenter, and backup.

## Reveal handoff and publication status

The local reveal includes the focused target-size correction, current browser-based review, pitch script, and production-demo instructions. Final human creative approval and the manual checks above are still outstanding. Missing exhibits remain a source constraint, not a reason to invent evidence.

Act II remains committed and tagged locally as `act2` at `03ceedc`. The Act III application branch has been published, and actual GitHub quality proof is verified and retained above. The `act2` tag was not pushed, and no pull request or merge was performed. Human creative approval, the remaining accessibility checks, and timed pitch rehearsal still belong to the team. Keep the Act II tag fixed during future changes.
