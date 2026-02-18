# Marliin.com Deployment Brief

## Project Overview

**Site:** marliin.com
**Owner:** Brett Marlin
**Stack:** React (Vite) → Cloudflare Pages
**Status:** Ready for production build and deployment

---

## What This Is

A single-page marketing site for Marliin, Brett Marlin's design-led AI consultancy. The site has been fully designed and iterated in a Claude artifact (v5). This brief documents everything needed to convert the prototype into a production Cloudflare Pages deployment.

---

## Architecture

### Recommended Stack
- **Vite + React** (lightweight, fast builds, native Cloudflare Pages support)
- **No CSS framework** (all styles are custom, inline + CSS-in-JS via `<style>` tag)
- **Sanity CMS** (build-time content fetch; content in Credentials, Practice Cases, Lab, Log)
- **Google Fonts** loaded via `<link>` (Cormorant Garamond + DM Sans)

### File Structure
```
marliin.com/
├── public/
│   ├── images/
│   │   ├── brett-illustrated.jpg    (portrait, 500px)
│   │   ├── boston-marathon.jpg       (story section, 900px)
│   │   ├── marliin-wordmark.png     (header/footer logo)
│   │   ├── sf-bay-sunset.jpg        (strip, 600x280)
│   │   ├── sf-rooftops.jpg          (strip, 600x280)
│   │   ├── sf-bay-pano.jpg          (strip, 600x280)
│   │   ├── sf-golden-gate.jpg       (strip, 600x280)
│   │   ├── sf-pier.jpg              (strip, 600x280)
│   │   └── sf-transamerica.jpg      (strip, 600x280)
│   └── favicon.svg                   (marliin logo mark)
├── sanity/
│   └── schema/                      (Cred, Practice Case, Lab, Log)
├── scripts/
│   ├── fetch-content.js             (build-time Sanity fetch)
│   ├── run-studio.js                (Sanity Studio launcher)
│   └── seed-content.js              (initial content migration)
├── src/
│   ├── App.jsx                       (main site component)
│   ├── data/content.json            (CMS content, generated at build)
│   ├── main.jsx                      (entry point)
│   └── index.css                     (global resets + font imports)
├── index.html
├── package.json
├── sanity.config.js
├── sanity.cli.js
├── vite.config.js
└── wrangler.toml                     (Cloudflare Pages config)
```

---

## Key Production Changes from Prototype

### 1. Extract base64 images to files
The prototype embeds all images as base64 data URIs. In production, these must be separate files in `/public/images/` referenced by path. All images are already exported in this repo's `public/images/` folder.

### 2. Add proper `<head>` metadata
```html
<title>Marliin — Intelligence, Added</title>
<meta name="description" content="Design-led AI consultancy. 25 years of product design leadership with AI-powered execution. Fractional strategic leadership with agent-level delivery.">
<meta property="og:title" content="Marliin — Intelligence, Added">
<meta property="og:description" content="Fractional design leadership with agent execution for the AI era.">
<meta property="og:image" content="/images/og-image.jpg">
<meta property="og:url" content="https://marliin.com">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
```

### 3. Add OG image
Create a 1200x630 Open Graph image for social sharing. Suggested: the Marliin logo on the cream (#FAF7F2) background with the tagline "Intelligence, added." in Cormorant Garamond.

### 4. Google Fonts optimization
Move from `<link>` in component to `<link rel="preconnect">` + `<link rel="preload">` in `index.html` for faster font loading.

### 5. Analytics
Add Cloudflare Web Analytics or Plausible. No Google Analytics (privacy-first positioning).

---

## Design Tokens (locked)

```
Brand Color (Cognac):  #B8652A
Background (Cream):    #FAF7F2
Text (Charcoal):       #1A1714
Dark Section BG:       #1A1714
Alt Section BG:        #F4F0EA

Body Text on Light:    #1A1714A0
Body Text on Dark:     #FAF7F2B0
Label Text on Light:   #1A171480
Label Text on Dark:    #FAF7F290

Heading Font:          Cormorant Garamond (300, 400, 500, 600, 700; italic 400, 500)
Body Font:             DM Sans (300, 400, 500, 600)
```

---

## External Links (all verified)

| Link | URL |
|------|-----|
| Book a Call CTA | https://calendar.app.google/ZBtcWj5AGEhxoN197 |
| MAF Machine | https://maf.marliin.com |
| LinkedIn | https://www.linkedin.com/in/brettmarlin/ |
| Substack | https://substack.com/@brettmarlin |
| Contact email | brett@marliin.com |

---

## Section Architecture

1. **Hero** — Avatar (circle, 140px), tagline, headline, body, dual CTA
2. **The Name** — Two-column explanation of the double-i brand concept
3. **The Builder** — Boston Marathon photo + career/running story
4. **Credentials** — Company list with roles, plus additional clients
5. **Practice** — "Fractional leadership. Agent execution." Two engagement cards:
   - The Runway (flat fee workshop sprint)
   - The Loop (outcomes-based retained engagement)
6. **Use Cases** — Four scenarios for The Runway
7. **Pricing** — Three-card grid: Flat Fee, Outcomes-Based, Skin in the Game
8. **Network Callout** — "Building the loop, together" recruitment callout
9. **Philosophy** — "The advantage is taste" quote + Steve Jobs quote
10. **Lab** — Three product cards (MAF Machine, Tether, Next Build)
11. **Log** — Field notes from the frontier + Substack link
12. **Contact** — Final CTA with "Book a Strategy Call"
13. **SF Photo Strip** — 6 images, infinite scroll, edge fades
14. **Footer** — Logo, LinkedIn, Substack, copyright

---

## Cloudflare Pages Deployment

### Setup
```bash
npm create vite@latest marliin -- --template react
cd marliin
npm install
```

### wrangler.toml
```toml
name = "marliin"
pages_build_output_dir = "dist"

[build]
command = "npm run build"
```

### Deploy
```bash
npx wrangler pages deploy dist
```

Or connect the GitHub repo to Cloudflare Pages for automatic deploys on push.

### Custom Domain
In Cloudflare Pages dashboard:
1. Add custom domain: marliin.com
2. Add www redirect: www.marliin.com → marliin.com
3. SSL is automatic

---

## Cursor Instructions

When opening this project in Cursor, the primary task is:

1. **Scaffold the Vite project** using the structure above
2. **Convert App.jsx** from the prototype (which uses base64 images) to reference `/images/filename.jpg` paths instead
3. **Extract the CSS** from the inline `<style>` tag into `index.css` for better maintainability, or keep it inline if preferred for single-component simplicity
4. **Add the `<head>` metadata** in `index.html`
5. **Test locally** with `npm run dev`
6. **Deploy to Cloudflare Pages**

The prototype JSX (marliin-v5.jsx) is the source of truth for all copy, layout, animations, and styling. Every design decision in that file is intentional and locked.

---

## What Is NOT In Scope for Launch

- Blog/CMS integration (Substack handles this externally)
- Contact form (Google Calendar booking link handles this)
- Analytics dashboard (add post-launch)
- A/B testing
- No Seat Required integration (separate project, may link later)

---

## Brand Rules (for reference in Cursor)

- **No em-dashes anywhere** in copy
- **No emojis** in site content
- **Cognac (#B8652A)** is the only accent color
- **Cormorant Garamond** for all headings, quotes, and display text
- **DM Sans** for all body copy, labels, and UI
- Logo renders as SVG with the double-i tittle treatment (one solid dot, one loop)
- Body copy uses font-weight 300 (light) for airiness
- Labels use uppercase with wide letter-spacing
- Animations: translateY(36px) → 0 with IntersectionObserver, 0.9s cubic-bezier(.16,1,.3,1)
- Photo strip: infinite CSS scroll animation, 60s duration, edge gradient fades
