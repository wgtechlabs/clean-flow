---
name: testing-landing-page
description: Test the Clean Flow landing page end-to-end. Use when verifying UI changes to site/index.html, site/styles.css, or site/script.js.
---

# Testing the Clean Flow Landing Page

## Setup

1. Start a local HTTP server from the `site/` directory:
   ```bash
   cd /home/ubuntu/clean-flow/site && python3 -m http.server 8080 &
   ```
2. Open `http://localhost:8080` in Chrome.
3. Maximize the browser window before recording.

## Test Cases

### 1. Desktop Content Rendering
Scroll through the entire page and verify all sections render:
- **Hero**: heading "Clean Flow", tagline, two CTA buttons (Get Started, Read the Spec), philosophy pill
- **Core Model** (`#model`): three flow steps — feature/* → dev → main
- **Branch Roles** (`#branches`): three cards (main, dev, feature/*)
- **Quick Start** (`#workflow`): seven numbered steps with git commands
- **Branch Naming** (`#naming`): six prefix cards
- **Merge Strategy** (`#strategy`): two cards with visual diagrams
- **Comparison** (`#comparison`): table with 5 rows, Clean Flow column highlighted green
- **AI Integration** (`#ai`): two cards (GitHub Copilot, AI Agents)
- **Rules** (`#rules`): 13 rule items
- **Footer**: dynamic year (should match current year), 6 links

### 2. Navigation Anchor Scrolling
- Click any nav link (e.g., "Strategy")
- Verify page scrolls to the correct section and URL updates with the hash
- Verify nav remains fixed at top during scroll

### 3. Mobile Hamburger Menu
- Use Chrome DevTools device toolbar (Ctrl+Shift+M) to set viewport to ~375-400px width
- Verify hamburger icon (three bars) is visible and nav links are hidden
- Check `aria-expanded="false"` on the toggle button
- Click hamburger → nav links should appear, icon animates to X, `aria-expanded="true"`
- Click a nav link → menu should close, page scrolls to section, `aria-expanded` resets

**Tip**: `window.resizeTo()` and `xdotool windowsize` might not reliably trigger CSS media queries in Chrome. Use Chrome DevTools device emulation (F12 → Ctrl+Shift+M) for reliable mobile testing.

### 4. Scroll-Shrink Navigation
- At top of page: nav should have class `nav` only (default 64px height)
- Scroll past 20px: nav should gain `.scrolled` class (shrinks to 52px with box-shadow)
- Scroll back to top: `.scrolled` class should be removed
- You can verify via console: `document.querySelector('.nav').className`

## Key Implementation Details
- Responsive breakpoints: 900px, 768px (hamburger appears), 480px
- Hamburger toggle: `#nav-toggle` button, nav links: `#nav-links` ul
- Scroll listener uses `{ passive: true }` for performance
- Footer year: set dynamically via `document.getElementById('year').textContent = new Date().getFullYear()`
- CSS supports `prefers-reduced-motion: reduce` (disables smooth scrolling)

## Devin Secrets Needed
None — this is a static site with no authentication required.
