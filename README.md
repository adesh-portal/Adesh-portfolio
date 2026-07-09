# Adesh | AI Engineer · Cybersecurity · Full-Stack Developer — Portfolio

A single-page, terminal/command-center themed personal portfolio site built with HTML, CSS, and vanilla JavaScript.

## 🚀 Overview

This is a cinematic, sci-fi/hacker-styled personal portfolio for **Adesh**, showcasing skills in AI/ML, Cybersecurity, and Full-Stack Development. The site opens with an animated boot sequence and unfolds into a multi-zone, scroll-driven experience.

## Ui design
<img width="1920" height="1080" alt="Screenshot (6)" src="https://github.com/user-attachments/assets/b25ce5e4-06a3-42b3-b74c-7a4fea644f1d" />
<img width="1920" height="1080" alt="Screenshot (7)" src="https://github.com/user-attachments/assets/f932c2de-4970-4e20-b3b3-61d9a53c4549" />
<img width="1920" height="1080" alt="Screenshot (8)" src="https://github.com/user-attachments/assets/927e4782-0eb8-4ce6-9b17-9da7a3b61423" />
<img width="1920" height="1080" alt="Screenshot (10)" src="https://github.com/user-attachments/assets/b2c57f6e-4e52-41cb-bc52-540472b21191" />
<img width="1920" height="1080" alt="Screenshot (12)" src="https://github.com/user-attachments/assets/914923ec-0900-41c0-9aa1-2ea9d2435838" />
<img width="1920" height="1080" alt="Screenshot (13)" src="https://github.com/user-attachments/assets/5e35170e-c30c-4a3b-be69-dcf4f9b1e273" />
<img width="1920" height="1080" alt="Screenshot (14)" src="https://github.com/user-attachments/assets/83286f76-57d8-4b23-9f32-15494dd18a3e" />
<img width="1920" height="1080" alt="Screenshot (15)" src="https://github.com/user-attachments/assets/1b424672-e9c1-4978-9119-2e008cb75ddb" />


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
