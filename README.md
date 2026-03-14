# dropsite

Build a professional website by simply editing text files and dropping images into folders.

No coding, no CMS, no deploy steps. Write your content in plain text, organize it in numbered folders, and your site is ready.

## Quick start

```
index.html
sw.js
config/
  logo.png
  website-title.txt     ← "My Site"
  lang.txt              ← "en"
  copyright.txt         ← "© 2026 My Site"
  vat.txt               ← "IT01234567890"
  privacy.txt           ← privacy policy URL
  social/
    instagram.txt       ← https://instagram.com/...
    linkedin.txt        ← https://linkedin.com/...
web/
  slide-1.jpg
  slide-2.jpg
  1/
    title.txt           ← "About us"
    content.txt         ← section content
    1.jpg, 2.jpg        ← image gallery (optional)
  2/
    title.txt           ← "Projects"
    content.txt
    1/                  ← sub-section
      title.txt
      content.txt
```

Serve with any web server:

```bash
python -m http.server 8000
npx serve .
```

## How it works

The JavaScript discovers content by trying to load numbered files (1, 2, 3...) until the first 404. No hardcoded lists — just add folders and files to extend the site.

- **Sections** = numbered folders `web/1/`, `web/2/`, `web/3/`...
- **Section title** = `title.txt` inside the folder (required, becomes a nav link)
- **Text** = `content.txt` (paragraphs separated by blank lines)
- **Images** = `1.jpg`, `2.jpg`... inside the folder (gallery with lightbox)
- **Sub-sections** = same recursive structure
- **Carousel** = `web/slide-1.jpg`, `web/slide-2.jpg`... (fullscreen with fade)
- **Links in text** = `["visible text","url"]` inside `content.txt` (see below)

## Links in content

Inside `content.txt` you can turn any text into a clickable link using this format:

```
["click here","https://example.com"]
["hello@studio.com","mailto:hello@studio.com"]
["+44 20 7946 0123","tel:+442079460123"]
["our portfolio","www.example.com"]
["see examples","./examples/"]
```

URLs without a protocol get `https://` automatically. Relative paths (`./`, `/`) are kept as-is. This is optional — plain text works as usual.

## Site settings

All settings are text files in `config/`:

| File | Default | Description |
|------|---------|-------------|
| `logo.png` | | Site logo |
| `website-title.txt` | `dropsite` | Site name (used as page title) |
| `lang.txt` | `en` | HTML lang attribute |
| `copyright.txt` | | Copyright text in footer |
| `vat.txt` | | VAT or secondary text in footer |
| `privacy.txt` | | Privacy policy URL (shown in footer) |
| `social/NAME.txt` | | Social links (URL inside, icon from filename) |

## Content management

Add a section:

```bash
mkdir web/3
echo "Contact" > web/3/title.txt
echo "Write us at info@example.com" > web/3/content.txt
```

Add gallery images:

```
web/3/1.jpg
web/3/2.jpg
web/3/3.jpg
```

Add a carousel slide:

```
web/slide-3.jpg
```

Add a social link:

```bash
echo "https://instagram.com/yourname" > config/social/instagram.txt
```

Numbering must be consecutive starting from 1. The site stops at the first gap.

## Examples

The `examples/` folder contains 11 ready-to-use sites you can copy as starting points:

- **atelier-studio** — Architecture & design studio
- **pizzeria** — Pizzeria with menu and gallery
- **hotel** — Hotel with rooms gallery
- **portfolio** — Photography portfolio with sub-galleries
- **gym** — Fitness center
- **lawyer** — Law firm (no gallery)
- **cafe** — Coffee shop with gallery
- **dentist** — Dental clinic (no gallery)
- **realestate** — Real estate agency with property listings
- **wedding** — Wedding planning studio
- **barber** — Barber shop with gallery

Each example is a complete working site with its own `config/`, `web/`, slides and images.

## Requirements

- Any web server (fetch doesn't work with `file://`)
- A modern browser
