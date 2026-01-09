# 📘 Neon Market - Teknisk dokumentation (uppdaterad)

## 📚 Innehållsförteckning

1. [Introduktion](#introduktion)
2. [Snabbstart](#snabbstart)
3. [Projektstruktur](#projektstruktur)
4. [HTML-struktur](#html-struktur)
5. [CSS-system](#css-system)
6. [JavaScript-moduler](#javascript-moduler)
7. [Dataflöden](#dataflöden)
8. [Lagring och global state](#lagring-och-global-state)
9. [Tillgångar och legacy](#tillgångar-och-legacy)
10. [Begränsningar och noter](#begränsningar-och-noter)

---

## 🎯 Introduktion

Neon Market är en statisk e-handelsdemo byggd med ren HTML, CSS och JavaScript.
All data finns i `index.html` och uppdateras i DOM:en. Ingen backend eller build-
process används. Kundvagnen och tema-valet sparas i `localStorage`.

---

## ⚡ Snabbstart

- Öppna `index.html` i en webbläsare.
- Inga bygghanterare eller paket krävs.
- Produktbilder och loggor laddas från `assets/`.
- Typsnitt hämtas via Google Fonts i `css/base.css` (fallback till systemfont).

---

## 📂 Projektstruktur

```text
e-handel-webshop/
├── index.html
├── README.md
├── css/
│   ├── style.css           # Importerar alla CSS-moduler
│   ├── base.css            # Design tokens, reset, bakgrund, utilities
│   ├── header.css          # Header, nav, tema-knapp, hamburger
│   ├── cart.css            # Kundvagn, modal, badge, notiser
│   ├── carousel.css        # Nyhetskarusell
│   ├── products.css        # Produktkort och grid
│   └── footer.css          # Footer + back-to-top
├── js/
│   ├── themeToggle.js      # Light/dark mode
│   ├── nav.js              # Hamburger-menyn
│   ├── cart.js             # ShoppingCart-logik
│   ├── categories.js       # Filtrering via kategorier
│   ├── carousel.js         # Karusell/slider
│   └── main.js             # App-init, globala events
├── assets/
│   └── images/
│       ├── png/            # Produktbilder
│       └── svg/            # Loggor och favicon
├── docs/
│   └── neon-market-dokumentation.md
└── legacy/                 # Äldre prototyp (ej aktivt använd)
    ├── webShop.html
    ├── webShop.css
    ├── base.css
    ├── layout.css
    ├── color-palette.css
    ├── mobile-responsive.css
    └── TODO.md
```

---

## 🏗️ HTML-struktur

### Grundlayout

```html
<header>
  <section id="top">...</section>
  <section id="categories">...</section>
</header>
<main>
  <section id="news-pages">...</section>
  <section id="products">...</section>
</main>
<footer>...</footer>
```

### Header och navigation

- `#top` innehåller logotyp, tema-knapp, hamburger och kundvagn.
- Logotypen använder två SVG:er:
  - `.logo-full` (desktop)
  - `.logo-mobile` (mobil, synlig vid <= 600px)
- `#theme-toggle` styr light/dark mode via `themeToggle.js`.
- `#hamburger` togglar mobilmenyn genom att lägga på `.active` på `#nav-list`.
- Kundvagnsikonen `#cartIcon` och badge `#cartBadge` uppdateras av `cart.js`.

```html
<section id="categories">
  <nav id="main-nav">
    <ul id="nav-list">
      <li><a data-category="all">...</a></li>
      ...
    </ul>
  </nav>
</section>
```

`data-category` används av `categories.js` för filtrering.

### Nyhetskarusell

- Sektion: `#news-pages`
- Varje slide: `.news-page`
- Innehåll: `.carousel-icon`, `.carousel-title`, `.carousel-subtitle`, `.carousel-cta`, `.offer-badge`
- `carousel.js` skapar pilar och indikatorer dynamiskt.

### Produkter

Varje produktkort har:

- `.product` med dataset:
  - `data-id`, `data-name`, `data-price`, `data-category`
- `.product-image` med `img` (`loading="lazy"`, `decoding="async"`)
- `.product-title`, `.product-description`
- `.product-price` med `.regular-price` + `.discount-price`
- `.add-to-cart-btn`

`data-price` används av kundvagnen (detta är rabattpriset).

### Footer, back-to-top och modal

- `footer` innehåller 4 kolumner, sociala länkar och newsletter-form.
- `#backToTop` visas när sidan scrollas längre än 300px.
- Kundvagnsmodal:
  - `#cartModal` -> `.cart-panel` -> `.cart-header`, `.cart-body`, `.cart-footer`
  - `#cartBody`, `#cartEmpty`, `#cartFooter`, `#cartSubtotal`, `#cartShipping`, `#cartTotal`
- Notis/Toast: `#cartNotification`.

### Script-ordning

HTML laddar JS-filer i denna ordning:

1. `js/themeToggle.js` (defer)
2. `js/nav.js`
3. `js/cart.js`
4. `js/categories.js`
5. `js/carousel.js`
6. `js/main.js`

`main.js` ansluter till de globala instanserna som skapas av övriga filer.

---

## 🎨 CSS-system

### style.css (entry)

`css/style.css` importerar alla modul-filer i rätt ordning:

```css
@import url("base.css");
@import url("header.css");
@import url("cart.css");
@import url("carousel.css");
@import url("products.css");
@import url("footer.css");
```

`layout.css` finns inte längre i root-arkitekturen; allt som tidigare låg där är
migrerat till `base.css` och respektive modul.

### base.css

- Design tokens via CSS-variabler (`--primary-dark`, `--accent-gradient`, etc).
- `body.light-mode` byter färger för ljust tema.
- Global reset (`* { margin: 0; padding: 0; }`).
- Bakgrundseffekt via `body::before` (grid + glow).
- `main` container med maxbredd 1400px.
- Utility-klasser: `.text-gradient`, `.glow`, `.glow-hover`.

### header.css

- Sticky header med blur och skugga.
- Responsiv top-rad med logo, tema-knapp, hamburger och cart.
- Mobilmeny via `#nav-list.active` vid <= 900px.
- Logoswitch vid <= 600px.

### carousel.css

- `#news-pages` har fast höjd och `overflow: hidden`.
- `.news-page.active` styr synlig slide.
- Pilar (`.carousel-arrow`) och indikatorer (`.carousel-indicator`).
- `offer-badge` med pulserande animation.

### products.css

- Grid-layout med `auto-fill` och `clamp()`.
- Produktkort med bild, titel, beskrivning och prisrad.
- Spinner på bilder via `.product-image::before` som försvinner när `.is-loaded` sätts.

### cart.css

- Ikon och badge i header.
- Modal/overlay via `.cart-modal` och `.cart-modal.active`.
- Kundvagnsraders grid, quantity-knappar, remove-knapp.
- `.add-to-cart-btn` och "Added!"-state.
- Toast-notis (`.cart-notification.show`) och bounce-animation på cart-ikon.

### footer.css

- 4-kolumns grid med länkar och newsletter.
- Footer-bottom med betalningsikoner.
- Back-to-top-knapp (`.back-to-top.visible`).

---

## 🧠 JavaScript-moduler

### themeToggle.js

- Läser `localStorage.theme` och `prefers-color-scheme`.
- Togglar `body.light-mode`.
- Uppdaterar text/aria på `#theme-toggle`.

### nav.js

- Togglar mobilmeny genom att lägga på `active` på `#nav-list`.
- Stänger menyn när en länk klickas.

### cart.js

- `ShoppingCart`-klass med `items`-array.
- Sparar till `localStorage` (`cartItems`).
- Funktioner: `addItem`, `removeItem`, `changeQuantity`, `clearAll`, `checkout`.
- Fraktlogik: 25 USD om subtotal > 0 och <= 1000, annars 0.
- UI: modal öppna/stänga, badge, totals, toast-notis, bounce-animation.
- Skapar global instans: `window.myCart`.

### categories.js

- `CategoryManager` filtrerar `.product` baserat på `data-category`.
- Lägger `active`-klass på vald kategori.
- Skapar `CustomEvent('categoryChanged')` för framtida integration.
- Injectar enkel CSS för fade-in och active-state.
- Skapar global instans: `window.CategoryManager`.

### carousel.js

- `Carousel` hanterar `.news-page` slides.
- Skapar pilar och indikatorer dynamiskt.
- Auto-play var 5:e sekund och paus vid hover.
- Lyssnar på `ArrowLeft`/`ArrowRight`.
- Skapar global instans: `window.Carousel`.

### main.js

- `App` initierar och loggar modulers status.
- Hanterar:
  - `resize` (debounce)
  - `visibilitychange` (pausar/återupptar karusell)
  - `online/offline`
  - global error-loggning
  - back-to-top logik
  - `initProductImages` (sätter `.is-loaded` när bild är klar)
- Exponeras som `window.NeonMarket` för debugging.

---

## 📊 Dataflöden

### 1) Add to cart

1. Klick på `.add-to-cart-btn`.
2. `cart.js` läser `data-id`, `data-name`, `data-price` från `.product`.
3. `addItem()` uppdaterar `items`, sparar till `localStorage`.
4. `updateDisplay()` uppdaterar badge, lista och totals.
5. UI-feedback: toast + bounce + "Added!"-knapp i 2 sekunder.

### 2) Kategorifilter

1. Klick på nav-länk (`data-category`).
2. `CategoryManager.filterByCategory()` visar/döljer `.product`.
3. Aktiv länk får `active`-klass och fade-in animation.
4. Event `categoryChanged` triggas.

### 3) Karusell

1. `Carousel` initieras på `#news-pages`.
2. Första slidens `.news-page` får `active`.
3. Pilar/indikatorer skapas.
4. Auto-play kör `next()` var 5:e sekund (om inte pausad).

### 4) Tema

1. `themeToggle.js` läser `localStorage` och systempreferens.
2. `body.light-mode` togglas.
3. Knappens ikon och `aria-label` uppdateras.

### 5) Back-to-top

1. `main.js` lyssnar på scroll.
2. Vid > 300px visas `#backToTop`.
3. Klick scrollar mjukt till toppen.

---

## 💾 Lagring och global state

- `localStorage.cartItems` lagrar kundvagnens innehåll.
- `localStorage.theme` lagrar light/dark val.
- Globala objekt:
  - `window.myCart`
  - `window.CategoryManager`
  - `window.Carousel`
  - `window.NeonMarket`

---

## 🖼️ Tillgångar och legacy

- `assets/images/svg/` innehåller loggor och favicon.
- `assets/images/png/` innehåller produktbilder.
- `legacy/` innehåller äldre prototypfiler och används inte av `index.html`.

---

## ⚠️ Begränsningar och noter

- Ingen backend, ingen API-integration.
- Checkout är en `alert()`-demo (ingen riktig betalning).
- `App.showNotification()` loggar bara till console.
- `style.css` använder `@import` (flera CSS-requests i browsern).
- Kategorien och produkter är statiska i HTML.

---

**Dokumentversion:** 1.1.0  
**Senast uppdaterad:** 2026-01-09  
**Projekt:** Neon Market E-Commerce
