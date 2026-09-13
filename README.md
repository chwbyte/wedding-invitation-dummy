# Wedding Invitation (Static)

A self-hosted, static wedding invitation — a remake of the classic *viding.co* single-page
invite, running free on **GitHub Pages**. Realistic dummy content (Arga & Nadia); swap in your
real names, dates, and photos.

## What's inside

```
index.html            the page (cover + invitation sections)
css/style.css         styling (floral corners, dividers, countdown, patterned bg)
js/config.js          ★ ALL your data lives here — names, dates, story, venues, links
js/app.js             logic (countdown, RSVP, wishes, gallery, lightbox, map)
images/               ★ your photos — replace the files, keep the filenames
guests.xlsx           master guest list (offline Excel)
scripts/gen_guests.py regenerates guests.xlsx
apps-script/Code.gs   Google Sheets backend (already pointed at your sheet)
```

## 1. Replace the photos

Drop your own images into `images/`, keeping the same filenames:

| File | What it is |
|---|---|
| `cover.jpg` | full-screen opening background (wide, e.g. 1600×1000) |
| `couple.jpg` | the couple photo in "Bride & Groom" (portrait) |
| `groom.jpg` / `bride.jpg` | individual portraits (shown in circles) |
| `gallery-1..6.jpg` | the gallery grid (square) |

No code change needed — just overwrite the files.

## 2. Edit the info

Open `js/config.js`. Change: couple names + parents, `countdownDate`, the two events
(venues + addresses + `mapsUrl`), `story`, gallery captions, the `guide` text, and
`rsvp.whatsapp` (your number, country code without `+`).

## 3. Preview locally

```bash
cd /Users/irfan-mac/Code/wedding-invitation-dummy
python3 -m http.server 8000
# open http://localhost:8000
# personalised link: http://localhost:8000/?name=Andi
```

## 4. Deploy to GitHub Pages (free)

```bash
git add -A && git commit -m "[FEAT] wedding invitation site"
git push origin main
```

Then on GitHub: **Settings → Pages → Source: Deploy from a branch → `main` / `(root)` → Save**.
The site goes live at `https://chwbyte.github.io/wedding-invitation-dummy/`.

**Personalised invite links** (guest name appears automatically):

```
https://chwbyte.github.io/wedding-invitation-dummy/?name=Andi+Saputra
```

These links are pre-built for every guest in `guests.xlsx`.

## 5. Connect RSVP & Wishes to your Google Sheet

The site is static (no server), so RSVP + wishes are written into a Google Sheet via a small
Google Apps Script. **`apps-script/Code.gs` is already pointed at your sheet**:

```
https://docs.google.com/spreadsheets/d/1o3Fg8-vZ5iHm--CeRUQUFszaU-w_g5wDizYOsH1HQHU/edit
```

One-time setup (~3 minutes):

1. Open that spreadsheet.
2. **Extensions → Apps Script**.
3. Delete the placeholder code, paste the whole contents of `apps-script/Code.gs`.
4. **Save**, then **Deploy → New deployment**:
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Approve permissions, **Deploy**, copy the **Web app URL**.
6. Paste that URL into `js/config.js` → **both** `rsvp.endpoint` and `wishes.endpoint`.
7. Re-deploy the site (step 4).

What you get in the sheet (auto-created tabs):

- **RSVP** → `Timestamp, Nama, Kehadiran, Jumlah Tamu, Ucapan`
- **Wishes** → `Timestamp, Nama, Ucapan`

RSVP + wishes land there live, and wishes are **read back and displayed** on the website's
"Wedding Wishes" section. To get an Excel file: in the sheet, **File → Download → Microsoft Excel (.xlsx)**.

> **No backend yet?** Leave `endpoint` empty and the RSVP/wish buttons fall back to opening
> WhatsApp with a pre-filled message — works instantly with zero setup.

## 6. Manage guests with the Excel

`guests.xlsx` is your master list. Columns: *No, Nama, Link Undangan, Kategori, Status,
Jumlah Tamu, WhatsApp, Catatan*. Each row has a personalised invite link you can send.

To edit the list and regenerate the file:

```bash
cd /Users/irfan-mac/Code/wedding-invitation-dummy
# edit the GUESTS list at the top of scripts/gen_guests.py, then:
uv run --with openpyxl python3 scripts/gen_guests.py
```
