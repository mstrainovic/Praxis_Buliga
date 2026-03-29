# Design Spec: Praxis Buliga — Website Redesign

**Datum:** 2026-03-29
**Status:** Genehmigt
**Kunde:** Matei Buliga, BEd. — Psychotherapeut i.A.u.S.
**Aktuell:** https://www.praxis-buliga.at/ (Google Sites)

---

## 1. Projektziel

Neugestaltung der Praxiswebsite von Matei Buliga als moderne, statische Website (HTML/CSS/JS). Das Redesign übernimmt die bewährte Farbwelt und warme Tonalität der bestehenden Seite, hebt sie aber auf 2026-Design-Niveau mit verbesserter UX, SEO und Accessibility.

### Verbesserungen gegenüber der aktuellen Seite

| # | Schwäche (alt) | Lösung (neu) |
|---|---------------|-------------|
| 1 | Google Sites — limitiertes System | Statisches HTML/CSS/JS, modernes CSS, volle Kontrolle |
| 2 | Kontaktdaten fehlen auf der Startseite | Hero-Info-Bar + Kontaktsektion + Footer |
| 3 | Kein Online-Buchungssystem | Phase 2 (nicht im Scope) |
| 4 | Keine FAQ-Sektion | FAQ-Akkordeon mit 7 Fragen + Schema.org FAQPage Markup |
| 5 | Kein Schema.org-Markup | ProfessionalService + FAQPage Structured Data |
| 6 | Limitiertes SEO | Meta-Tags, Open Graph, Canonical, semantisches HTML, H-Tag-Hierarchie |
| 7 | CTA nur am Hero | Wiederholter CTA am Ende jeder inhaltlichen Sektion |
| 8 | Kein Footer mit Kontaktdaten | Vollständige Kontaktsektion + Footer mit Impressum/Datenschutz |

---

## 2. Technologie

| Aspekt | Entscheidung |
|--------|-------------|
| **Stack** | Statisches HTML/CSS/JS — kein Framework |
| **CSS** | Custom Properties, clamp(), Grid, Flexbox |
| **JS** | Vanilla JS — IntersectionObserver (Scroll-Spy, Fade-in), Akkordeon |
| **Fonts** | Google Fonts: Playfair Display (Headings), Inter (Body) |
| **Icons** | Inline SVG (Lucide-Style, stroke-width 1.5) |
| **Hosting** | Noch offen (Netlify empfohlen) |
| **CMS** | Keines — Inhalte direkt im HTML |

---

## 3. Design-System

### 3.1 Stil

**Organic Minimal** — viel Weißraum, feine Linien, dezente Typografie. Ruhig und elegant.
Ergänzt durch **Soft UI Evolution** — subtile Schatten, Glasmorphism-Header, weiche Übergänge.

### 3.2 Farbpalette

| Token | Wert | Verwendung |
|-------|------|-----------|
| `--green` | `#3D5240` | Primärfarbe: Überschriften, Buttons, Akzente |
| `--green-light` | `#4a6350` | Hover-States |
| `--green-muted` | `rgba(61,82,64,0.82)` | Sekundärtext |
| `--green-subtle` | `rgba(61,82,64,0.04)` | Hintergründe (Cards, Badges) |
| `--cream` | `#F6F3EF` | Haupthintergrund |
| `--cream-dark` | `#EDE8E1` | Sekundärer Hintergrund |
| `--text` | `#1C1C1C` | Primärtext |
| `--text-muted` | `rgba(61,82,64,0.82)` | Labels, Beschreibungen |
| `--text-body` | `rgba(28,28,28,0.7)` | Fließtext in Cards/Beschreibungen |

**Kontrast:** Alle Text/Hintergrund-Kombinationen ≥ 4.5:1 (WCAG AA). Geprüfte Paare:
- `--text-muted` auf `--cream`: ≈ 4.8:1 ✓
- `--green-muted` auf `--cream`: ≈ 4.8:1 ✓
- `--text-body` auf `--cream`: ≈ 6.0:1 ✓
- `--green` auf `--cream`: ≈ 7.7:1 ✓
- Footer-Text (rgba cream 0.70) auf #344538: ≈ 4.7:1 ✓
- Kontakt-Labels (rgba cream 0.70) auf `--green`: ≈ 4.7:1 ✓

### 3.3 Typografie

| Element | Font | Größe | Gewicht | Line-Height |
|---------|------|-------|---------|-------------|
| H1 (Hero) | Playfair Display | clamp(32px, 5vw, 54px) | 400 | 1.25 |
| H2 (Sektionen) | Playfair Display | clamp(28px, 3.5vw, 38px) | 400 | 1.25 |
| H3 (Cards) | Playfair Display | 18–20px | 400 | 1.3 |
| Body | Inter | 15px | 300 | 1.75–1.8 |
| Labels | Inter | 11–13px | 500 | — |
| CTA-Text | Inter | 12px | 500 | — |

- `font-variant-numeric: tabular-nums` für Preise
- `letter-spacing: 1.5–3px` für Labels/CTAs (uppercase)
- `max-width: 520px` auf Fließtext (≈65 Zeichen pro Zeile)

### 3.4 Spacing

4px-basiertes System: 4, 8, 12, 16, 20, 24, 28, 32, 40, 48, 56, 64, 80, 120px.
Responsive via `clamp()` — z.B. `padding: clamp(60px, 10vw, 120px)`.

### 3.5 Schatten & Effekte

| Effekt | CSS |
|--------|-----|
| Card-Hover | `box-shadow: 0 4px 20px rgba(61,82,64,0.06)` |
| CTA-Hover | `box-shadow: 0 4px 16px rgba(61,82,64,0.18)` |
| Header-Blur | `backdrop-filter: blur(24px)` + `background: rgba(246,243,239,0.88)` |

### 3.6 Animationen

| Animation | Dauer | Easing | Trigger |
|-----------|-------|--------|---------|
| Hero Fade-up | 700ms | ease-out | Page load (staggered 200ms) |
| Scroll Fade-in | 600ms | ease-out | IntersectionObserver (threshold 0.1) |
| Accordion | 300ms | ease-out | Click (grid-template-rows 0fr→1fr) |
| Hover-Transitions | 200ms | ease-out | Hover |
| Step-Number Fill | 300ms | ease-out | Hover |
| Availability Pulse | 2.5s | ease-in-out | Infinite (nur auf .dot) |

**Alle Animationen werden bei `prefers-reduced-motion: reduce` deaktiviert.** Inkl. `scroll-behavior: auto` statt `smooth`.

---

## 4. Seitenarchitektur

### 4.1 Hybrid-Ansatz

- **Startseite (index.html):** Scroll-Page mit allen Sektionen + Scroll-Spy-Navigation
- **Impressum (impressum.html):** Separate Seite
- **Datenschutz (datenschutz.html):** Separate Seite

### 4.2 Sektionen der Startseite

#### Header (fixed)
- Logo: „Matei Buliga" (Playfair Display)
- Navigation: Über Mich, Leistungen, Ablauf, FAQ, Kontakt (Scroll-Links)
- CTA-Button: „Erstgespräch" (gefüllt, Waldgrün)
- Glasmorphism: `backdrop-filter: blur(24px)`
- Mobile: Hamburger-Menü (nur CTA + Toggle sichtbar)
  - Click → Full-Screen Overlay mit Slide-down (300ms ease-out)
  - Schließen: X-Button, Tap auf Link, Tap außerhalb
  - Body-Scroll gesperrt (overflow: hidden) bei offenem Menü
  - Focus-Trap: Tab-Navigation bleibt im Menü
  - Schließt automatisch bei Scroll-Link-Klick

#### Sektion 1: Hero
- Label: „Psychotherapie in Wien"
- H1: „Ein sicherer Raum für Ihre *persönliche* Entwicklung"
- Divider-Linie (48px)
- Subtitle: Begleitungstext
- CTA: „Erstgespräch anfragen" (Outline-Button mit Pfeil)
- Info-Bar (absolut unten): Adresse, Zeiten, „Plätze verfügbar" (pulsierender Dot)
- Scroll-Indikator: Mouse-Icon mit animiertem Wheel
- Staggered Fade-up Animation beim Laden

#### Sektion 2: Über Mich
- Section-Label mit Linie
- 2-Spalten-Grid: Portrait (3:4, Frame-Offset) | Text
- H2: „Mein Weg & *meine Haltung*"
- Interview-Format: 2 Frage-Antwort-Blöcke (border-left Akzent)
- Credential-Badges: BEd., Psychotherapeut i.A.u.S., Lerncoaching
- „Mehr erfahren" Link (optional: separate Über-Mich-Seite)

#### Sektion 3: Leistungen & Honorar
- Section-Label + H2 + USt-Hinweis (rechts)
- 3-Spalten-Grid mit Service-Cards:
  - **Einzeltherapie:** Icon, Beschreibung, 80 €/45 Min
  - **Paartherapie:** Icon, Beschreibung, 80 €/45 Min + 160 €/90 Min
  - **Jugendliche:** Icon, Beschreibung, Erstgespräch kostenlos + 80 €/45 Min
- Jede Card: Icon (44x44, green-subtle BG), Titel, Text, Preisblock (border-top)
- Hover: border-color + box-shadow Übergang
- 2 Info-Cards (Waldgrün-Hintergrund):
  - Kostenübernahme (Krankenkasse nicht möglich)
  - Sozialtarife (nach Absprache)
- CTA: „Jetzt Erstgespräch anfragen" (Outline)

#### Sektion 4: Ablauf
- Section-Label + H2 + Beschreibungstext
- 3-Schritte-Timeline (horizontal, verbunden mit Linie):
  1. Kontakt aufnehmen
  2. Erstgespräch
  3. Therapie beginnen
- Step-Numbers: 56x56 Kreise, Hover füllt mit Waldgrün
- Rahmenbedingungen (3er-Grid, 1px-Trennung):
  - Terminabsagen (48h)
  - Verschwiegenheit
  - Zahlung (Banküberweisung)
- Kein CTA (informative Sektion)
- Mobile: Timeline wird vertikal

#### Sektion 5: FAQ
- Section-Label
- 2-Spalten: Intro (sticky) | Akkordeon
- H2: „Antworten auf *Ihre Fragen*"
- „Ihre Frage nicht dabei?" Hinweis mit Kontakt-Link
- 7 Fragen im Akkordeon:
  1. Was erwartet mich beim Erstgespräch?
  2. Wie lange dauert eine Therapie?
  3. Brauche ich eine Überweisung?
  4. Werden die Kosten von der Krankenkasse übernommen?
  5. Was ist ein Psychotherapeut in Ausbildung unter Supervision?
  6. Wie kann ich einen Termin absagen oder verschieben?
  7. Ist Psychotherapie auch online möglich?
- Erstes Item standardmäßig offen
- Animation: grid-template-rows (CSS), Plus→Minus-Icon (CSS)
- CTA: „Erstgespräch vereinbaren" (Filled/Waldgrün — stärkster Push)

#### Sektion 6: Kontakt
- Vollflächig Waldgrün-Hintergrund
- Section-Label (invertiert, rgba cream 0.70)
- 2-Spalten: Kontaktdaten | Map + Öffnungszeiten
- Links:
  - H2: „Nehmen Sie *Kontakt auf*"
  - Einleitungstext
  - Telefon: 0670 1989777 (klickbar, tel:)
  - E-Mail: office@praxis-buliga.at (klickbar, mailto:)
  - Adresse: Kuefsteingasse 48/50, 1140 Wien + Öffi-Hinweis
- Rechts:
  - Google Maps Einbettung (DSGVO-konform: 2-Click-Lösung — Platzhalter mit „Karte laden" Button, Map erst nach Klick geladen)
  - Praxiszeiten: Mo & Mi 14:30–19:30
  - „Derzeit Plätze verfügbar" (pulsierender Dot)

#### Footer
- Dunkleres Grün (#344538), Text rgba(cream, 0.70)
- Copyright + Impressum/Datenschutz Links

---

## 5. SEO & Structured Data

### 5.1 HTML-Grundlagen

```html
<html lang="de">
```

### 5.2 Meta-Tags

```html
<title>Matei Buliga — Psychotherapie in Wien | Einzeltherapie, Paartherapie, Jugendliche</title>
<meta name="description" content="Psychotherapeut in Wien 1140. Einzeltherapie, Paartherapie und Therapie für Jugendliche. Lösungsorientiert, ressourcenstärkend. Jetzt Erstgespräch anfragen.">
<meta name="keywords" content="Psychotherapie Wien, Psychotherapeut 1140, Einzeltherapie, Paartherapie, Jugendtherapie, Matei Buliga">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="canonical" href="https://www.praxis-buliga.at/">
```

### 5.3 Open Graph

```html
<meta property="og:title" content="Matei Buliga — Psychotherapie in Wien">
<meta property="og:description" content="Ein sicherer Raum für Ihre persönliche Entwicklung. Einzeltherapie, Paartherapie und Therapie für Jugendliche.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://www.praxis-buliga.at/">
<meta property="og:image" content="https://www.praxis-buliga.at/img/og-image.jpg">
```

### 5.4 Schema.org — ProfessionalService

```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Praxis Buliga — Psychotherapie",
  "description": "Psychotherapie für Erwachsene, Paare und Jugendliche in Wien",
  "url": "https://www.praxis-buliga.at",
  "telephone": "+436701989777",
  "email": "office@praxis-buliga.at",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Kuefsteingasse 48/50",
    "addressLocality": "Wien",
    "postalCode": "1140",
    "addressCountry": "AT"
  },
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Monday", "opens": "14:30", "closes": "19:30" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Wednesday", "opens": "14:30", "closes": "19:30" }
  ],
  "priceRange": "€€"
}
```

### 5.5 Schema.org — FAQPage

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Was erwartet mich beim Erstgespräch?",
      "acceptedAnswer": { "@type": "Answer", "text": "Das Erstgespräch dient dem gegenseitigen Kennenlernen. Wir klären Ihre Anliegen und Ziele und prüfen, ob die Chemie für eine Zusammenarbeit stimmt. Es gibt keinen Druck und keine Verpflichtung." }
    },
    {
      "@type": "Question",
      "name": "Wie lange dauert eine Therapie?",
      "acceptedAnswer": { "@type": "Answer", "text": "Das ist sehr individuell und hängt von Ihren Anliegen und Zielen ab. Manche Themen lassen sich in wenigen Sitzungen bearbeiten, andere brauchen mehr Zeit." }
    },
    {
      "@type": "Question",
      "name": "Brauche ich eine Überweisung?",
      "acceptedAnswer": { "@type": "Answer", "text": "Nein, für Psychotherapie benötigen Sie in Österreich keine Überweisung. Sie können sich direkt an mich wenden." }
    },
    {
      "@type": "Question",
      "name": "Werden die Kosten von der Krankenkasse übernommen?",
      "acceptedAnswer": { "@type": "Answer", "text": "Da ich im Status Psychotherapeut in Fachausbildung unter Lehrsupervision bin, ist eine Kostenrückerstattung durch die Krankenkasse derzeit leider nicht möglich. Dafür biete ich flexible Sozialtarife nach Absprache an." }
    },
    {
      "@type": "Question",
      "name": "Was ist ein Psychotherapeut in Ausbildung unter Supervision?",
      "acceptedAnswer": { "@type": "Answer", "text": "Psychotherapeuten in Ausbildung unter Supervision haben den Großteil ihrer mehrjährigen Ausbildung bereits absolviert und arbeiten eigenständig mit KlientInnen. Ihre Arbeit wird regelmäßig von erfahrenen LehrtherapeutInnen supervidiert." }
    },
    {
      "@type": "Question",
      "name": "Wie kann ich einen Termin absagen oder verschieben?",
      "acceptedAnswer": { "@type": "Answer", "text": "Verschiebungen oder Absagen sind bis 48 Stunden vor dem Termin kostenfrei möglich — per Telefon, SMS oder E-Mail." }
    },
    {
      "@type": "Question",
      "name": "Ist Psychotherapie auch online möglich?",
      "acceptedAnswer": { "@type": "Answer", "text": "Bitte kontaktieren Sie mich direkt, um die aktuellen Möglichkeiten für Online-Sitzungen zu besprechen." }
    }
  ]
}
```

---

## 6. Accessibility (WCAG AA)

| Anforderung | Umsetzung |
|-------------|-----------|
| Kontrast ≥ 4.5:1 | Alle Text/BG-Paare geprüft |
| Focus-States | `:focus-visible` mit 2px Outline |
| Touch Targets | Alle Buttons ≥ 44px Höhe |
| aria-expanded | Akkordeon-Triggers |
| aria-hidden | Dekorative SVGs und Icons |
| aria-label | Hamburger-Menü, Links ohne sichtbaren Text |
| prefers-reduced-motion | Alle Animationen deaktiviert |
| Semantisches HTML | header, nav, main, section, footer, h1→h4 |
| Keyboard-Navigation | Tab-Reihenfolge = visuelle Reihenfolge |
| Skip-Link | „Zum Inhalt springen" (hidden, visible on focus) |
| scroll-behavior | `smooth` → `auto` bei prefers-reduced-motion |
| Impressum/Datenschutz Nav | `aria-current="page"` auf aktiver Seite |

---

## 7. Responsive Breakpoints

| Breakpoint | Änderungen |
|-----------|-----------|
| **≤ 768px** | Header: Hamburger-Menü. Grids → 1-spaltig. Timeline vertikal. Portrait zentriert. Hero-Info vertikal. |
| **769–900px** | Service-Cards 1-spaltig. Conditions 1-spaltig. |
| **901–1100px** | Volle Layouts mit reduzierten Gaps. |
| **≥ 1101px** | Maximale Darstellung, max-width: 1100px. |

---

## 8. Performance-Budget

| Metrik | Ziel |
|--------|------|
| First Contentful Paint | < 1.0s |
| Largest Contentful Paint | < 1.5s |
| Cumulative Layout Shift | < 0.05 |
| Total Page Weight | < 200KB (ohne Map-Embed) |
| Lighthouse Score | ≥ 95 (alle Kategorien) |

### Maßnahmen
- Inline Critical CSS
- Google Fonts mit `font-display: swap` + `preconnect`
- Lazy-Load für Map-Embed und below-fold Bilder
- Responsive Images mit `srcset`/`sizes`
- Minified HTML/CSS/JS

---

## 9. Dateien & Struktur

```
Buliga_Seite/
├── index.html              # Startseite (Hybrid Scroll-Page)
├── impressum.html           # Impressum
├── datenschutz.html         # Datenschutzerklärung
├── 404.html                 # Custom 404-Seite (brand-konsistent)
├── sitemap.xml              # Sitemap für Suchmaschinen
├── robots.txt               # Crawler-Steuerung
├── css/
│   └── style.css            # Gesamtes Stylesheet (inkl. @media print)
├── js/
│   └── main.js              # Akkordeon, Scroll-Spy, Fade-in, Mobile-Nav, Maps 2-Click
├── img/
│   ├── portrait.webp        # Matei Buliga Portrait (+ .jpg Fallback)
│   ├── praxis.webp          # Praxis-Foto (+ .jpg Fallback)
│   ├── og-image.jpg         # Open Graph Image (1200x630)
│   └── favicon.svg          # Favicon
└── docs/
    └── superpowers/
        └── specs/
            └── 2026-03-29-praxis-buliga-design.md
```

Bilder mit `<picture>` Element: WebP primär, JPEG als Fallback für ältere Browser.

---

## 10. Nicht im Scope

- Dark Mode (Anti-Pattern laut Design-System: Therapie-Websites profitieren nicht davon)
- Blog / Aktuelles
- Online-Buchungssystem (evtl. Phase 2)
- Testimonials (berufsrechtlich nicht erlaubt für Psychotherapeuten)
- CMS-Integration
- Mehrsprachigkeit
