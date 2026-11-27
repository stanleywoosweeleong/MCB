# KokoLab

An installable, offline-first web app (PWA) that turns the Malaysian Cocoa Board's booklet
*From Lab to Market: R&D Products and Technologies* into an interactive pocket guide.

**Unofficial companion app.** Product text and photos come from the Board's booklet;
industry figures come from [koko.gov.my](https://www.koko.gov.my/). It is not published by the Board.

## What is inside

- **42 products** in three collections (cocoa farming, personal care, food and beverages) with search, filters, saved items and sharing
- **Cocoa passport** that fills up as products are opened, plus a "Surprise me" button
- **Quiz** with six random questions per round, drawn from the booklet
- **Industry in numbers**: production, grindings, planted area, exports and a bean price snapshot
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
| `data.js` | All content: products, quiz, statistics, offices |
| `app.js` | Screens, navigation, interface text in both languages |
| `styles.css` | Look and feel |
| `sw.js` | Offline cache. **Add any new image to its `SHELL` list** |

## Content notes

- Four products (Anti-Dandruff Hair Gel, Cocoa Ice Creams, FLAVINT, Chocolate Spread) had missing or
  unreadable pages in the scan, so only their names and short descriptions are shown. Fill them in in `data.js`.
- The Malay product text is an unofficial translation and should be reviewed by a native speaker.
- Statistics were read from koko.gov.my on 27 November 2026; bean prices are the list dated 26 November 2026.
  Update `STATS` in `data.js` when new figures are published.
- The Anton typeface is used under the SIL Open Font License.
