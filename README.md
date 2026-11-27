# KokoLab

An installable, offline-first web app (PWA) that turns the Malaysian Cocoa Board's booklet
*From Lab to Market: R&D Products and Technologies* into an interactive pocket guide.

**Unofficial companion app.** Product text and photos come from the Board's booklet;
industry figures come from [koko.gov.my](https://www.koko.gov.my/); the journal index comes from [mcj.koko.gov.my](https://mcj.koko.gov.my/). It is not published by the Board.

## What is inside

- **42 products** in three collections (cocoa farming, personal care, food and beverages) with search, filters, saved items and sharing
- **Journal library**: 160 papers from the Malaysian Cocoa Journal (Volumes 11 to 18, 2019 to 2026) with search, year and topic filters,
  a reading list, copy-citation, and links from each product to the research behind it. Abstracts work offline; full papers open on mcj.koko.gov.my
- **Cocoa passport** that fills up as products are opened, plus a "Surprise me" button
- **Quiz** with six random questions per round, drawn from the booklet
- **Industry in numbers**: production, grindings, planted area, exports and a bean price snapshot
- **MCB web portals**: one-tap links to eight official sites (koko.gov.my, the journal, CROPED, E-Cocoa, germplasm database, CocoaSafe, KOKO Duniaku, ASEAN Cocoa Club)
- **About the Board** and a tap-to-call **directory** of 14 offices and research centres
- **English and Bahasa Melayu**, chosen on first launch and remembered
- Works offline, follows the phone's light or dark theme, and updates itself

## Run it

No build step. Serve the folder with any static server:

    python3 -m http.server 8000

Then open http://localhost:8000. To publish, enable GitHub Pages for the branch (Settings → Pages).

## Updating

Just push. There is no version number to bump. Installed copies open instantly from their saved
files, check for changes in the background, and show a "new version is ready" bar when the page,
a script or the stylesheet has changed. GitHub Pages takes a minute or two to publish.

| File | What it holds |
|---|---|
| `data.js` | Products, quiz, statistics, offices |
| `journal.js` | Journal index. Generated, do not edit by hand |
| `tools/update-journal.py` | Rebuilds `journal.js` from mcj.koko.gov.my |
| `app.js` | Screens, navigation, interface text in both languages |
| `styles.css` | Look and feel |
| `sw.js` | Offline cache. **Add any new image to its `SHELL` list** |

## Refreshing the journal

When a new volume is published, run `python3 tools/update-journal.py` and push. It reads every article page on
mcj.koko.gov.my (slowly, to be gentle on the server) and rewrites `journal.js`. No PDFs are copied.

## Content notes

- Journal abstracts and papers are the copyright of the Malaysian Cocoa Journal and their authors. The journal's copyright page
  asks for written permission from the MCJ Editor before reproduction, so get that before releasing the app publicly.
- Journal titles are shown in sentence case (the site lists them in capitals); a few scientific names or acronyms may be mis-cased.

- The Malay product text is an unofficial translation and should be reviewed by a native speaker.
- Statistics were read from koko.gov.my on 27 November 2026; bean prices are the list dated 26 November 2026.
  Update `STATS` in `data.js` when new figures are published.
- The Anton typeface is used under the SIL Open Font License.
