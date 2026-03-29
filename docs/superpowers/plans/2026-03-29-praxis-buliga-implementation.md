# Praxis Buliga Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static HTML/CSS/JS website for psychotherapist Matei Buliga with Organic Minimal design, WCAG AA accessibility, Schema.org SEO, and modern CSS animations.

**Architecture:** Single-page scroll site (index.html) with sticky header, 6 content sections, and separate legal pages. CSS in one stylesheet, JS in one file. No framework, no build tools.

**Tech Stack:** HTML5, CSS3 (Custom Properties, Grid, Flexbox, clamp()), Vanilla JS (IntersectionObserver, Scroll-Spy), Google Fonts (Playfair Display + Inter), inline SVGs.

**Spec:** `docs/superpowers/specs/2026-03-29-praxis-buliga-design.md`

**Reference Prototype:** `.superpowers/brainstorm/3420-1774789792/full-design.html`

> **WICHTIG:** Wo Prototype-Werte von Spec-Werten abweichen, ist die **SPEC autoritativ** — insbesondere bei Farb-/Opacity-Werten, die für WCAG AA Kontrast geprüft wurden. Der Prototype verwendet teils niedrigere Opacity-Werte, die WCAG AA nicht bestehen.

---

## File Structure

| File | Responsibility |
|------|---------------|
| `css/style.css` | All styles: design tokens, reset, header, all 6 sections, footer, responsive, print, reduced-motion |
| `js/main.js` | Accordion, scroll-spy, fade-in observer, mobile nav toggle/focus-trap, maps 2-click loader |
| `index.html` | Main page: head (meta/SEO/schema), skip-link, header, hero, about, services, process, FAQ, contact, footer |
| `impressum.html` | Legal page: impressum content, shared header/footer |
| `datenschutz.html` | Legal page: privacy policy content, shared header/footer |
| `404.html` | Custom 404 page with brand-consistent design |
| `sitemap.xml` | XML sitemap for search engines |
| `robots.txt` | Crawler directives |

---

## Task 1: CSS Foundation — Design Tokens & Reset

**Files:**
- Create: `css/style.css`

- [ ] **Step 1: Create CSS file with reset and design tokens**

Write the CSS file with:
- CSS reset (*, *::before, *::after box-sizing, margin/padding reset)
- `:root` block with all design tokens from spec section 3.2:
  - `--green: #3D5240`, `--green-light: #4a6350`, `--green-muted: rgba(61,82,64,0.82)`
  - `--green-subtle: rgba(61,82,64,0.04)`, `--cream: #F6F3EF`, `--cream-dark: #EDE8E1`
  - `--text: #1C1C1C`, `--text-muted: rgba(61,82,64,0.82)`, `--text-body: rgba(28,28,28,0.7)`
  - `--serif: 'Playfair Display', Georgia, serif`, `--sans: 'Inter', -apple-system, system-ui, sans-serif`
  - `--transition: 200ms ease-out`, `--max-width: 1100px`
- `html { scroll-behavior: smooth; }`
- `body` base styles (font-family, background, color, antialiasing)
- `:focus-visible` styles (2px solid var(--green), offset 3px)
- `.section-label` reusable styles (11px, uppercase, letter-spacing 3px, with ::before line)
- `.section-divider` with `hr` (1px rgba(61,82,64,0.08))
- Skip-link styles (visually hidden, visible on focus, positioned top-left)
- Print stylesheet:
```css
@media print {
  header, footer, .nav-overlay, .scroll-hint, .hero-info,
  .hero-cta, .section-cta, .faq-cta, .header-cta { display: none; }
  body { color: #000; background: #fff; }
  .hero { min-height: auto; padding: 40px 24px; }
  .contact { background: #fff; color: #000; }
  .info-card { background: #eee; color: #000; }
  a { color: #000; text-decoration: underline; }
  .fade-in { opacity: 1; transform: none; }
}
```
- `.legal-content`: max-width 780px, margin auto, padding, body text styles (for impressum/datenschutz pages)
- `@media (prefers-reduced-motion: reduce)` — disable all animations, set scroll-behavior: auto

- [ ] **Step 2: Verify file created correctly**

Run: `ls -la css/style.css`
Expected: File exists with reasonable size (should be ~3-4KB at this stage)

- [ ] **Step 3: Commit**

```bash
git add css/style.css
git commit -m "feat: add CSS foundation with design tokens, reset, and utilities"
```

---

## Task 2: Header Styles

**Files:**
- Modify: `css/style.css`

- [ ] **Step 1: Add header and navigation CSS**

Append to `css/style.css`:
- `header`: fixed, top 0, height 72px, flex between, glasmorphism (`backdrop-filter: blur(24px)`, `background: rgba(246,243,239,0.88)`), border-bottom, z-index 100, responsive padding with clamp
- `.logo`: Playfair Display, 18px, weight 500, color var(--green), no text-decoration
- `nav`: flex, gap 28px, aligned center
- `nav a`: 13px, opacity 0.6, hover→1, transition, relative positioning
- `nav a.active::after`: 1.5px bottom line indicator
- `.header-cta`: min-height 44px, bg green, color cream, 12px uppercase, hover→green-light + shadow
- `.nav-toggle`: hidden by default (display none), 44x44, hamburger icon via span + ::before/::after, aria-label="Menü öffnen", aria-expanded="false"
- Mobile nav overlay: `.nav-overlay` — fixed fullscreen, bg cream, z-index 99, flex column centered, transform translateY(-100%) by default, transition 300ms ease-out
- `.nav-overlay.open`: transform translateY(0)
- `.nav-overlay a`: larger text (18px), padding 16px, full opacity
- `body.nav-open`: overflow hidden

- Mobile (≤768px): header height 64px, nav links hidden, nav-toggle displayed

- [ ] **Step 2: Commit**

```bash
git add css/style.css
git commit -m "feat: add header and navigation styles with mobile overlay"
```

---

## Task 3: Hero Section Styles

**Files:**
- Modify: `css/style.css`

- [ ] **Step 1: Add hero section CSS**

Append to `css/style.css`:
- `.hero`: min-height 100dvh, flex column center, text-align center, padding 120px top
- `.hero-label`: 11px, uppercase, letter-spacing 3px, color text-muted, fade-up animation (delay 200ms)
- `.hero h1`: Playfair Display, clamp(32px, 5vw, 54px), weight 400, line-height 1.25, color green, max-width 680px, fade-up (delay 400ms)
- `.hero h1 em`: italic
- `.hero-divider`: 48px wide, 1px height, green, opacity 0.25, fade-in (delay 700ms)
- `.hero-subtitle`: clamp(15px, 1.8vw, 17px), weight 300, line-height 1.75, color text-muted, max-width 460px, fade-up (delay 800ms)
- `.hero-cta`: outline button, min-height 52px, border 1px solid green, 12px uppercase, hover→fill green + shadow, fade-up (delay 1000ms)
- `.hero-cta svg`: 14px, transition transform, hover→translateX(4px)
- `.hero-info`: absolute bottom 36px, flex gap 32px, 12px, color text-muted, fade-in (delay 1200ms)
- `.hero-info .dot`: 5px circle, green, opacity 0.35
- `.hero-info .available`: color #2d6a3f, weight 500, dot with pulse animation
- `.scroll-hint`: absolute, bottom 72px, centered, fade-in (delay 1400ms), mouse icon with wheel animation
- `@keyframes fadeUp`, `fadeIn`, `pulse`, `scrollWheel`
- Reduced motion: reset all hero animations to opacity 1, transform none, animation none
- Mobile (≤768px): hero padding adjusted, `.hero-info` flex-direction column + gap 8px + centered, `.scroll-hint` display none

- [ ] **Step 2: Commit**

```bash
git add css/style.css
git commit -m "feat: add hero section styles with staggered animations"
```

---

## Task 4: About Section Styles

**Files:**
- Modify: `css/style.css`

- [ ] **Step 1: Add about section CSS**

Append to `css/style.css`:
- `.about`: max-width var(--max-width), centered, responsive padding with clamp
- `.about-grid`: 2-column grid (1fr 1.2fr), responsive gap with clamp, align-items start
- `.about-portrait`: relative, aspect-ratio 3/4, bg cream-dark, overflow hidden
- `.about-portrait::after`: decorative frame offset (top 12px, left 12px, right -12px, bottom -12px, 1px border)
- `.about-portrait-placeholder`: flex center, icon + text (for when no image loaded yet)
- `.about-content h2`: Playfair Display, clamp size, color green
- `.about-qa`: margin-bottom 32px
- `.about-question`: 13px, weight 500, green, border-left 2px, padding-left 16px
- `.about-answer`: 15px, weight 300, line-height 1.8, color text-body, max-width 520px
- `.about-credentials`: flex wrap, gap 10px, border-top, padding-top
- `.credential`: inline-flex, gap 6px, padding 8px 16px, bg green-subtle, 12px green text, svg 14px opacity 0.5
- `.about-more`: inline-flex, gap 8px, 13px weight 500, green, opacity 0.7, hover→1, svg hover→translateX(4px)
- Mobile (≤768px): grid→1 column, portrait max-width 320px centered, no ::after frame

- [ ] **Step 2: Commit**

```bash
git add css/style.css
git commit -m "feat: add about section styles with portrait frame and credentials"
```

---

## Task 5: Services Section Styles

**Files:**
- Modify: `css/style.css`

- [ ] **Step 1: Add services section CSS**

Append to `css/style.css`:
- `.services`: max-width, centered, responsive padding
- `.services-header`: flex between, flex-end aligned, responsive margin-bottom
- `.services-header h2`: Playfair, clamp size
- `.services-note`: 13px, text-muted, max-width 280px, text-align right
- `.services-grid`: 3-column grid, gap 20px
- `.service-card`: bg rgba(255,255,255,0.5), border 1px rgba green 0.08, flex column, responsive padding, hover→border-color + box-shadow
- `.service-icon`: 44x44, flex center, bg green-subtle, margin-bottom 24px, svg 22px green opacity 0.7
- `.service-card h3`: Playfair, 20px, weight 400, green
- `.service-card p`: 14px, weight 300, line-height 1.7, color text-body, flex-grow 1
- `.service-price`: border-top, padding-top 20px
- `.price-row`: flex between, baseline, margin-bottom 6px
- `.price-label`: 12px, text-muted
- `.price-value`: 15px, weight 500, green, font-variant-numeric: tabular-nums
- `.price-free`: inline-block, padding 3px 10px, bg green-tinted, color #2d6a3f, 11px weight 500
- `.services-footer`: 2-column grid, gap 20px
- `.info-card`: flex, gap 16px, padding 24px 28px, bg green, color cream, svg 20px opacity 0.6
- `.section-cta`: text-align center, margin-top clamp
- `.cta-outline`: inline-flex, min-height 48px, border outline, hover→fill, svg arrow
- `.cta-filled`: inline-flex, min-height 52px, bg green, color cream, hover→green-light + shadow
- Mobile (≤900px): services-grid + services-footer → 1 column, header flex-direction column

- [ ] **Step 2: Commit**

```bash
git add css/style.css
git commit -m "feat: add services section styles with cards and info blocks"
```

---

## Task 6: Process (Ablauf) Section Styles

**Files:**
- Modify: `css/style.css`

- [ ] **Step 1: Add process section CSS**

Append to `css/style.css`:
- `.process`: max-width, centered, responsive padding
- `.process-header`: margin-bottom clamp, max-width 520px, h2 Playfair, p 15px text-muted
- `.timeline`: relative, 3-column grid
- `.timeline::before`: connecting line (absolute, top 28px, left calc(100%/6), right calc(100%/6), 1px green 0.15)
- `.step`: text-align center, relative, responsive padding
- `.step-number`: 56x56, flex center, margin auto, bg cream, border 1px green 0.15, z-index 1, transition 300ms
- `.step:hover .step-number`: bg green, border green, span color cream
- `.step-number span`: Playfair, 20px, green, transition color
- `.step h3`: Playfair, 18px, green
- `.step p`: 14px, weight 300, line-height 1.7, color text-body, max-width 280px, margin auto
- `.conditions`: margin-top clamp, 3-column grid, gap 1px, bg green 0.06, border 1px
- `.condition`: bg cream, responsive padding
- `.condition-icon`: 36x36, svg 20px, green opacity 0.5
- `.condition h4`: 13px, weight 600, green
- `.condition p`: 13px, weight 300, line-height 1.65, color text-body
- Mobile (≤768px): timeline→1 column, gap 40px, vertical line left, steps left-aligned with step-number absolute left
- Mobile (≤900px): conditions→1 column

- [ ] **Step 2: Commit**

```bash
git add css/style.css
git commit -m "feat: add process section styles with timeline and conditions"
```

---

## Task 7: FAQ Section Styles

**Files:**
- Modify: `css/style.css`

- [ ] **Step 1: Add FAQ section CSS**

Append to `css/style.css`:
- `.faq`: max-width, centered, responsive padding
- `.faq-layout`: 2-column grid (1fr 1.6fr), responsive gap, align start
- `.faq-intro`: sticky top 100px, h2 Playfair, p 15px text-muted max-width 320px
- `.faq-contact-hint`: margin-top 28px, padding 20px 24px, bg green-subtle, border-left 2px, p 13px, a underline
- `.accordion`: flex column
- `.accordion-item`: border-bottom 1px, first-child also border-top
- `.accordion-trigger`: full width button, min-height 56px, flex between, 15px, green, no bg/border, cursor pointer, hover→green-light
- `.accordion-icon`: 28px square, relative, ::before (12px horizontal line), ::after (12px vertical line), both 1.5px, green opacity 0.4, transition 300ms
- `.accordion-item.open .accordion-icon::after`: rotate(90deg), opacity 0
- `.accordion-item.open .accordion-trigger`: weight 500
- `.accordion-content`: grid, grid-template-rows 0fr, transition 300ms
- `.accordion-item.open .accordion-content`: grid-template-rows 1fr
- `.accordion-inner`: overflow hidden
- `.accordion-inner p`: padding-bottom 24px, 14px, weight 300, line-height 1.8, color text-body, max-width 520px
- `.faq-cta`: text-align center, margin-top clamp, p 15px text-muted, a = cta-filled
- Mobile (≤768px): faq-layout→1 column, faq-intro position static
- Reduced motion: accordion-content transition none, icon transitions none

- [ ] **Step 2: Commit**

```bash
git add css/style.css
git commit -m "feat: add FAQ section styles with accordion animation"
```

---

## Task 8: Contact Section & Footer Styles

**Files:**
- Modify: `css/style.css`

- [ ] **Step 1: Add contact section and footer CSS**

Append to `css/style.css`:
- `.contact`: bg green, color cream, responsive padding
- `.contact-inner`: max-width, centered
- `.contact .section-label`: color rgba(cream, 0.70), ::before bg cream opacity 0.25
- `.contact-grid`: 2-column grid, responsive gap, align start
- `.contact-left h2`: Playfair, clamp size, em italic
- `.contact-left > p`: 15px, weight 300, opacity 0.7, max-width 400px
- `.contact-details`: flex column, gap 20px
- `.contact-item`: flex, gap 16px
- `.contact-item-icon`: 40x40, flex center, border 1px rgba(cream, 0.15), svg 18px opacity 0.6
- `.contact-item-label`: 11px, uppercase, letter-spacing 1px, opacity 0.70
- `.contact-item-value`: 15px, a color cream with underline, hover→solid underline
- `.contact-map`: aspect-ratio 16/10, bg rgba(cream, 0.08), border, flex center (placeholder text)
- `.contact-map-placeholder`: flex center, button styled for 2-click GDPR solution
- `.contact-hours`: padding 28px, border 1px rgba(cream, 0.1)
- `.contact-hours h4`: 13px, weight 500
- `.hours-row`: flex between, padding 8px, border-bottom
- `.contact-availability`: flex, gap 8px, 13px weight 500, dot 6px #4ade80 with pulse
- `footer`: bg #344538, padding 40px
- `.footer-inner`: max-width, flex between, wrap
- `.footer-left`: 12px, rgba(cream, 0.70)
- `.footer-links`: flex gap 24px, a 12px rgba(cream, 0.70), hover→opacity higher
- Mobile (≤768px): contact-grid→1 column

- [ ] **Step 2: Commit**

```bash
git add css/style.css
git commit -m "feat: add contact section and footer styles"
```

---

## Task 9: Scroll Animation Utility Styles

**Files:**
- Modify: `css/style.css`

- [ ] **Step 1: Add scroll-driven fade-in utility**

Append to `css/style.css`:
- `.fade-in`: opacity 0, transform translateY(20px), transition opacity 600ms ease-out + transform 600ms ease-out
- `.fade-in.visible`: opacity 1, transform translateY(0)
- In the existing `prefers-reduced-motion` block, add: `.fade-in { opacity: 1; transform: none; transition: none; }`

- [ ] **Step 2: Commit**

```bash
git add css/style.css
git commit -m "feat: add scroll-driven fade-in animation utility"
```

---

## Task 10: index.html — Head & Header

**Files:**
- Create: `index.html`

- [ ] **Step 1: Create index.html with head and header**

Create `index.html` with:
- `<!DOCTYPE html>`, `<html lang="de">`
- `<head>`: charset, viewport, title, meta description, meta keywords, canonical, Open Graph tags (all from spec 5.1-5.3)
- Google Fonts `<link rel="preconnect" href="https://fonts.googleapis.com">` + `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` + stylesheet link (Playfair Display 400,500,italic + Inter 300,400,500,600, `&display=swap`)
- CSS link to `css/style.css`
- Schema.org ProfessionalService JSON-LD `<script type="application/ld+json">` (from spec 5.4)
- Schema.org FAQPage JSON-LD `<script type="application/ld+json">` (from spec 5.5)
- Favicon link
- `<body>`:
- Skip-link: `<a href="#main" class="skip-link">Zum Inhalt springen</a>`
- `<header>`: logo link (#hero), nav with all section links + header-cta, nav-toggle button
- Mobile nav overlay:
```html
<div class="nav-overlay" aria-hidden="true">
  <button class="nav-close" aria-label="Menü schließen">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>
  </button>
  <nav>
    <a href="#about">Über Mich</a>
    <a href="#services">Leistungen</a>
    <a href="#process">Ablauf</a>
    <a href="#faq">FAQ</a>
    <a href="#contact">Kontakt</a>
    <a href="#contact" class="header-cta">Erstgespräch</a>
  </nav>
</div>
```
- `<main id="main">`

- [ ] **Step 2: Verify HTML structure**

Run: Open `index.html` in browser, verify header displays correctly with all nav links
Expected: Sticky header with logo, nav links, and green CTA button

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add index.html with head, SEO meta, schema.org, and header"
```

---

## Task 11: index.html — Hero Section

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add hero section HTML**

Inside `<main>`, add `<section class="hero" id="hero">`:
- `<p class="hero-label">Psychotherapie in Wien</p>`
- `<h1>Ein sicherer Raum für Ihre <em>persönliche</em> Entwicklung</h1>`
- `<div class="hero-divider"></div>`
- `<p class="hero-subtitle">` with subtitle text
- `<a href="#contact" class="hero-cta">` with arrow SVG (Lucide-style, stroke-width 2, aria-hidden)
- `<div class="scroll-hint" aria-hidden="true">` with mouse/wheel divs
- `<div class="hero-info">` with 3 spans: address, times, availability (with .available class and .dot)

- [ ] **Step 2: Verify in browser**

Expected: Full-height hero with staggered fade-in animations, info bar at bottom, scroll indicator

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add hero section with animations and info bar"
```

---

## Task 12: index.html — About Section

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add about section HTML**

After hero, add divider + `<section class="about fade-in" id="about">`:
- Section-label "Über Mich"
- `.about-grid`: portrait div (placeholder with user icon SVG) + content div
- Content: h2 "Mein Weg & *meine Haltung*", 2x .about-qa (question + answer), .about-credentials (3 badges with SVGs), .about-more link
- All SVGs with aria-hidden="true", stroke-width 1.5-2

- [ ] **Step 2: Verify in browser**

Expected: 2-column layout, portrait placeholder with frame offset, interview text, credential badges

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add about section with interview format and credentials"
```

---

## Task 13: index.html — Services Section

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add services section HTML**

Add divider + `<section class="services fade-in" id="services">`:
- Section-label, header with h2 + services-note
- `.services-grid` with 3 service-cards:
  - Einzeltherapie: person icon, description, 80€/45min
  - Paartherapie: people icon, description, 80€/45min + 160€/90min
  - Jugendliche: youth icon, description, free first session + 80€/45min
- `.services-footer` with 2 info-cards (green bg): Kostenübernahme + Sozialtarife
- `.section-cta` with outline CTA link to #contact

- [ ] **Step 2: Verify in browser**

Expected: 3 cards with prices, 2 dark green info blocks, CTA at bottom

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add services section with pricing cards and info blocks"
```

---

## Task 14: index.html — Process Section

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add process section HTML**

Add divider + `<section class="process fade-in" id="process">`:
- Section-label, header with h2 + description
- `.timeline` with 3 steps: Kontakt aufnehmen, Erstgespräch, Therapie beginnen
- Each step: `.step-number` with `<span>1/2/3</span>`, h3, p
- `.conditions` with 3 blocks: Terminabsagen (clock icon), Verschwiegenheit (shield icon), Zahlung (credit card icon)

- [ ] **Step 2: Verify in browser**

Expected: Horizontal 3-step timeline with connecting line, 3 condition blocks below

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add process section with timeline and conditions"
```

---

## Task 15: index.html — FAQ Section

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add FAQ section HTML**

Add divider + `<section class="faq fade-in" id="faq">`:
- Section-label, `.faq-layout` 2-column
- Left: `.faq-intro` with h2, description, `.faq-contact-hint` with link to #contact
- Right: `.accordion` with 7 `.accordion-item` elements
  - Each: `<button class="accordion-trigger" aria-expanded="false/true">` + question text + `.accordion-icon` span
  - `.accordion-content` > `.accordion-inner` > `<p>` with answer
  - First item has class `.open` and `aria-expanded="true"`
- `.faq-cta` with "Bereit für den ersten Schritt?" + filled CTA

- [ ] **Step 2: Verify in browser**

Expected: FAQ with first item open, clickable items (won't animate yet without JS)

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add FAQ section with accordion markup"
```

---

## Task 16: index.html — Contact Section & Footer

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add contact section and footer HTML**

Add `<section class="contact fade-in" id="contact">`:
- `.contact-inner` > section-label + `.contact-grid`
- Left: h2, intro p, `.contact-details` with 3 items:
  - Phone: icon + tel: link
  - Email: icon + mailto: link
  - Address: icon + text + Öffi hint
- Right: `.contact-right`
  - `.contact-map`: GDPR 2-click placeholder:
    ```html
    <div class="contact-map">
      <div class="contact-map-placeholder">
        <p>Durch Klicken wird eine Verbindung zu Google Maps hergestellt.<br>
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Datenschutz von Google</a></p>
        <button>Karte laden</button>
      </div>
    </div>
    ```
  - `.contact-hours`: h4, 2 hours-rows (Mo + Mi), availability dot
- Close `</main>`
- `<footer>`: `.footer-inner` with copyright + links to impressum.html + datenschutz.html

- [ ] **Step 2: Verify in browser**

Expected: Green contact section with all details, map placeholder, hours, footer

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add contact section with GDPR map placeholder and footer"
```

---

## Task 17: JavaScript — Core Functionality

**Files:**
- Create: `js/main.js`
- Modify: `index.html` (add script tag)

- [ ] **Step 1: Create main.js with all interactivity**

Create `js/main.js` with these modules:

**1. Accordion:**
```javascript
document.querySelectorAll('.accordion-trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const item = trigger.parentElement;
    const isOpen = item.classList.contains('open');
    item.classList.toggle('open');
    trigger.setAttribute('aria-expanded', !isOpen);
  });
});
```

**2. Scroll-Spy:**
```javascript
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a:not(.header-cta)');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
}, { passive: true });
```

**3. Fade-in Observer:**
```javascript
const fadeEls = document.querySelectorAll('.fade-in');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  fadeEls.forEach(el => observer.observe(el));
} else {
  fadeEls.forEach(el => el.classList.add('visible'));
}
```

**4. Mobile Navigation:**
```javascript
const navToggle = document.querySelector('.nav-toggle');
const navOverlay = document.querySelector('.nav-overlay');
const navClose = document.querySelector('.nav-close');
const body = document.body;

function openNav() {
  navOverlay.classList.add('open');
  body.classList.add('nav-open');
  navToggle.setAttribute('aria-expanded', 'true');
  // Focus trap
  const focusable = navOverlay.querySelectorAll('a, button');
  if (focusable.length) focusable[0].focus();
}

function closeNav() {
  navOverlay.classList.remove('open');
  body.classList.remove('nav-open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.focus();
}

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navOverlay.classList.contains('open') ? closeNav() : openNav();
  });
}
if (navClose) navClose.addEventListener('click', closeNav);
// Close on link click
navOverlay?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeNav);
});
// Focus trap
navOverlay?.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeNav();
  if (e.key === 'Tab') {
    const focusable = navOverlay.querySelectorAll('a, button');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});
```

**5. Maps 2-Click:**
```javascript
const mapPlaceholder = document.querySelector('.contact-map-placeholder');
if (mapPlaceholder) {
  mapPlaceholder.querySelector('button')?.addEventListener('click', () => {
    const mapContainer = mapPlaceholder.parentElement;
    mapContainer.innerHTML = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2658.5!2d16.2987!3d48.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sKuefsteingasse+48%2F50%2C+1140+Wien!5e0!3m2!1sde!2sat" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Praxis Buliga Standort"></iframe>';
  });
}
```

- [ ] **Step 2: Add script tag to index.html**

Add before closing `</body>`: `<script src="js/main.js"></script>`

- [ ] **Step 3: Verify all JS features in browser**

Test: Accordion opens/closes, scroll-spy highlights nav, sections fade in on scroll, mobile nav works (resize to <768px), map loads on click
Expected: All interactive features working

- [ ] **Step 4: Commit**

```bash
git add js/main.js index.html
git commit -m "feat: add JavaScript for accordion, scroll-spy, fade-in, mobile nav, and maps"
```

---

## Task 18: Legal Pages — Impressum & Datenschutz

**Files:**
- Create: `impressum.html`
- Create: `datenschutz.html`

- [ ] **Step 1: Create impressum.html**

Create with same head structure as index.html (adjusted title/canonical/description), same header (with aria-current="page" on no link, since it's not a section), simple content area with placeholder text "Impressum-Inhalte hier einfügen", same footer. Link CSS and JS.

- [ ] **Step 2: Create datenschutz.html**

Same structure as impressum.html but with "Datenschutzerklärung" title and content placeholder.

- [ ] **Step 3: Verify both pages**

Run: Open both in browser
Expected: Consistent header/footer, content area with placeholder text

- [ ] **Step 4: Commit**

```bash
git add impressum.html datenschutz.html
git commit -m "feat: add legal pages (impressum and datenschutz) with shared layout"
```

---

## Task 19: 404 Page

**Files:**
- Create: `404.html`

- [ ] **Step 1: Create 404.html**

Create brand-consistent 404 page:
- Same head (title "Seite nicht gefunden"), CSS link
- Minimal header (logo only)
- Centered content: h1 "Seite nicht gefunden", p with friendly message, link back to index.html styled as cta-outline
- No footer needed (minimal page)

- [ ] **Step 2: Commit**

```bash
git add 404.html
git commit -m "feat: add custom 404 page"
```

---

## Task 20: SEO Files — Sitemap & Robots

**Files:**
- Create: `sitemap.xml`
- Create: `robots.txt`

- [ ] **Step 1: Create sitemap.xml**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://www.praxis-buliga.at/</loc><priority>1.0</priority></url>
  <url><loc>https://www.praxis-buliga.at/impressum.html</loc><priority>0.3</priority></url>
  <url><loc>https://www.praxis-buliga.at/datenschutz.html</loc><priority>0.3</priority></url>
</urlset>
```

- [ ] **Step 2: Create robots.txt**

```
User-agent: *
Allow: /
Sitemap: https://www.praxis-buliga.at/sitemap.xml
```

- [ ] **Step 3: Commit**

```bash
git add sitemap.xml robots.txt
git commit -m "feat: add sitemap.xml and robots.txt for SEO"
```

---

## Task 21: Image Directory & Favicon

**Files:**
- Create: `img/` directory
- Create: `img/favicon.svg`

- [ ] **Step 1: Create img directory and placeholder favicon**

```bash
mkdir -p img
```

Create `img/favicon.svg` — a minimal SVG favicon using the brand green:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#3D5240"/>
  <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="Georgia,serif" font-size="20" fill="#F6F3EF">B</text>
</svg>
```

Note: `portrait.webp`, `praxis.webp`, and `og-image.jpg` need to be provided by the client. Use `<picture>` elements with WebP primary and JPEG fallback when real images are available.

- [ ] **Step 2: Commit**

```bash
git add img/
git commit -m "feat: add img directory and favicon placeholder"
```

---

## Task 22: Final Review & Push

- [ ] **Step 1: Verify complete page in browser**

Open `index.html` and test:
- All sections render correctly
- Scroll-spy highlights active nav link
- All CTAs scroll to #contact
- Accordion opens/closes with animation
- Fade-in on scroll works
- Mobile layout (resize to 375px): hamburger menu, stacked grids, vertical timeline
- Map loads on click (GDPR)
- Skip-link visible on Tab
- Print preview (Ctrl+P): clean output without nav/footer

- [ ] **Step 2: Verify legal pages**

Open impressum.html and datenschutz.html: header/footer consistent, content readable

- [ ] **Step 3: Push to GitHub**

```bash
git push origin main
```
