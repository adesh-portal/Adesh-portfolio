# Adesh | AI Engineer · Cybersecurity · Full-Stack Developer — Portfolio

A single-page, terminal/command-center themed personal portfolio site built with HTML, CSS, and vanilla JavaScript.

## 🚀 Overview

This is a cinematic, sci-fi/hacker-styled personal portfolio for **Adesh**, showcasing skills in AI/ML, Cybersecurity, and Full-Stack Development. The site opens with an animated boot sequence and unfolds into a multi-zone, scroll-driven experience.

## 📁 Project Structure

```
.
├── index.html      # Main site markup (this file)
├── style.css        # Stylesheet (not included — required for the page to render correctly)
└── script.js         # Site behavior/interactivity (not included — required for animations & features)
```

> ⚠️ **Note:** `index.html` references `style.css` and `script.js`, which were not part of this upload. Both files are required for the page to display and function correctly.

## ✨ Key Features

- **Boot Sequence Overlay** — animated fake "system boot" intro (skippable) before the site reveals itself
- **Matrix rain / canvas backgrounds** — animated `<canvas>` elements used throughout for hacker-aesthetic visuals (global background, hero, skills orbit, contact)
- **"Jugnu" scroll firefly** — a glowing dot that tracks scroll progress alongside a percentage label
- **Sticky navbar** with section links, mobile hamburger menu, and an "Online" status indicator
- **Zoned single-page layout**, each section styled as a distinct "zone":
  - `#hero` — Identity / landing zone with animated terminal typewriter
  - `#about` — About section
  - `#cybersec` — Cybersecurity focus area
  - `#ai-lab` — AI/ML projects and experiments
  - `#skills` — Interactive skills "orbit" visualization + JSON output view
  - `#projects` — Projects grid with modal detail view
  - `#terminal-section` — Interactive fake terminal/console (supports commands like `help`, `skills`, `projects`, `whoami`, `certifications`, `contact`, `clear`, plus easter eggs like `matrix-mode` and `hack-the-system`)
  - `#contact` — Contact info (Email, GitHub, LinkedIn, Location) + a contact form that sends messages via WhatsApp
- **Interactive terminal console** with quick-command buttons and free-text input
- **Contact form** — submits via `sendToWhatsApp()` (JS function expected in `script.js`)
- **Fully responsive** with a dedicated mobile navigation drawer

## 🎨 Design & Fonts

- **Fonts:** Space Grotesk, Fira Code, Outfit (via Google Fonts)
- **Icons:** Font Awesome 6 and Devicons
- **Theme:** Dark, terminal/command-center aesthetic with neon accent colors (cyan `#00d4ff`, purple `#a855f7`, green `#00ff88`)

## 🔧 Setup

1. Place `index.html`, `style.css`, and `script.js` in the same directory.
2. Open `index.html` in a browser, or serve it with a local static server, e.g.:
   ```bash
   npx serve .
   ```
3. No build step or dependencies required beyond the CDN-loaded fonts/icon libraries.

## 📬 Contact Links (as configured in the markup)

- **Email:** adeshtrivedi49@gmail.com (via Gmail compose link)
- **GitHub:** https://github.com/adesh-portal
- **LinkedIn:** linked in the Contact section
- **Location:** New Delhi, India

## 📝 To Do / Missing Pieces

- [ ] Add `style.css`
- [ ] Add `script.js` (needed for: boot sequence timing, canvas animations, terminal commands, skills orbit, project modal, WhatsApp form submission, scroll progress)
- [ ] Verify/update footer social links (currently placeholder `github.com` / `linkedin.com` rather than personal profile URLs)
- [ ] Double-check footer email (typo: `adeshtrivedi49@gmai.com` — missing the `l` in `gmail`)

## © License

© 2026 Adesh. All rights reserved.
"# Adesh-portfolio" 
"# Adesh-portfolio" 
"# Adesh-portfolio" 
