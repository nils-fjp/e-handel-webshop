# 📘 Neon Market - Komplett Teknisk Dokumentation

## 📚 Innehållsförteckning

1. [Introduktion](#introduktion)
2. [Projektstruktur](#projektstruktur)
3. [HTML-Struktur](#html-struktur)
4. [CSS-System](#css-system)
5. [JavaScript-Moduler](#javascript-moduler)
6. [Dataflöde](#dataflöde)
7. [Felsökning](#felsökning)
8. [Vanliga Frågor](#vanliga-frågor)

---

## 🎯 Introduktion

Neon Market är en modern e-handelsapplikation byggd med ren HTML, CSS och JavaScript. Detta dokument förklarar **varje rad kod** på ett sätt som är lätt att förstå för juniorutvecklare.

### Vad lär du dig här?

- ✅ Hur HTML-strukturen fungerar
- ✅ Hur CSS-variabler och modulärt CSS fungerar
- ✅ Hur JavaScript-moduler kommunicerar
- ✅ Hur shopping cart-funktionaliteten fungerar
- ✅ Hur responsiv design implementeras

---

## 📂 Projektstruktur

```
neon-market/
│
├── index.html              # Huvudfil (startsida)
│
├── css/                    # Alla stilfiler
│   ├── style.css          # Huvudstil (importerar alla andra)
│   ├── base.css           # Variabler och grundstilar
│   ├── nav.css            # Navigation och header
│   ├── layout.css         # Layout för main-sektioner
│   ├── products.css       # Produktkort
│   ├── cart.css           # Kundvagn
│   ├── carousel.css       # Bildspel
│   └── footer.css         # Sidfot
│
├── js/                     # Alla JavaScript-filer
│   ├── main.js            # Huvudkontroller
│   ├── nav.js             # Navigationsfunktioner
│   ├── cart.js            # Kundvagnsfunktioner
│   ├── categories.js      # Kategorifiltrering
│   └── carousel.js        # Bildspelsfunktioner
│
└── assets/                 # Bilder och filer
    └── images/
        └── svg/
```

### Varför denna struktur?

1. **Separation of Concerns**: Varje fil har ett specifikt ansvar
2. **Moduläritet**: Lätt att hitta och ändra specifik funktionalitet
3. **Skalbarhet**: Enkelt att lägga till nya funktioner
4. **Underhållbarhet**: Junior-utvecklare kan läsa och förstå koden

---

## 🏗️ HTML-Struktur

### Översikt av index.html

HTML-filen är uppdelad i logiska sektioner:

```html
<!DOCTYPE html>
<html>
  <head>...</head>        <!-- Metadata och CSS-länkar -->
  <body>
    <header>...</header>   <!-- Logo, navigation, kundvagn -->
    <main>
      <section id="newsPages">...</section>   <!-- Bildspel -->
      <section id="products">...</section>    <!-- Produkter -->
    </main>
    <div class="cart-modal">...</div>        <!-- Kundvagnsmodal -->
    <footer>...</footer>                      <!-- Sidfot -->
    <script>...</script>                      <!-- JavaScript -->
  </body>
</html>
```

---

### 1. HEAD-Sektion (rad 3-13)

#### 1.1 Meta Tags

```html
<meta charset="UTF-8" />
```
**Vad gör den?** Talar om för webbläsaren hur den ska läsa tecken (UTF-8 = universellt).

**Varför behöver vi den?** Så att emojis (🛒), svenska tecken (åäö) och andra specialtecken visas korrekt.

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```
**Vad gör den?** Gör sidan responsiv på mobila enheter.

**Teknisk förklaring:**
- `width=device-width`: Sätt bredden till enhetens bredd
- `initial-scale=1.0`: Ingen inzoomning när sidan laddas

**Utan denna?** Sidan skulle se liten ut på mobilen, som om det var en desktop-sida.

#### 1.2 Favicon (rad 6-10)

```html
<link rel="shortcut icon" href="assets/images/svg/neonmarket-logo.svg" type="image/x-icon" />
```
**Vad är en favicon?** Den lilla ikonen som visas i webbläsarens flik.

**Var används den?**
- Webbläsarens flik
- Bokmärken
- Historik

#### 1.3 Title (rad 11)

```html
<title>Neon Market</title>
```
**Vad visas?** Texten i webbläsarens flik (ovanför adressen).

#### 1.4 CSS-Länk (rad 12)

```html
<link rel="stylesheet" href="css/style.css" />
```
**Viktig detalj:** Vi länkar endast **EN** CSS-fil (`style.css`).

**Men vi har 8 CSS-filer?** Ja! `style.css` **importerar** alla andra:

```css
/* I style.css */
@import url("base.css");
@import url("nav.css");
/* osv... */
```

**Fördelar:**
- ✅ Organiserad kod
- ✅ En enda HTTP-request (snabbare)
- ✅ Lätt att underhålla

---

### 2. HEADER-Sektion (rad 15-44)

Header-sektionen innehåller:
1. Logo
2. Hamburgermeny (mobil)
3. Kundvagnsikon

#### 2.1 Top-Bar (#top)

```html
<div id="top">
```
**Syfte:** Container för logo, hamburgarmeny och cart.

**CSS-koppling (nav.css rad 26-31):**
```css
#top {
    padding: var(--spacing-md) var(--spacing-lg);
    display: flex;                    /* Flex layout */
    justify-content: space-between;   /* Space mellan element */
    align-items: center;              /* Vertikal centrering */
}
```

**Flex Layout Förklaring:**

```
┌─────────────────────────────────────────────┐
│  [Logo]              [Hamburger]    [Cart]  │
│    ↑                      ↑            ↑     │
│  flex-start          flex-middle    flex-end│
└─────────────────────────────────────────────┘
```

**På mobil (<900px) - nav.css rad 171-186:**
```css
#top {
    gap: var(--spacing-sm);  /* Mellanrum mellan element */
}

.logo { flex: 0 0 auto; }           /* Logo: fast storlek */
.hamburger-menu { flex: 0 0 auto; } /* Hamburger: fast storlek */
.cart-container { margin-left: auto; } /* Cart: långt till höger */
```

#### 2.2 Logo (rad 17-21)

```html
<logo class="logo">
    <a href="#" title="Neon Market">
        <img src="assets/images/svg/neonmarket-logo.svg" alt="neonmarket-logo" />
    </a>
</logo>
```

**Attribut-förklaring:**
- `href="#"`: Går till toppen av sidan
- `title="..."`: Tooltip när man hovrar över logo
- `alt="..."`: Text om bilden inte laddas (viktigt för tillgänglighet)

**CSS-styling (nav.css rad 33-43):**
```css
.logo {
    font-size: 1.75rem;                  /* Storlek */
    font-weight: 800;                    /* Tjock text */
    font-family: "Space Grotesk", sans-serif;  /* Font */
}

.logo a {
    background: var(--accent-gradient);   /* Gradient bakgrund */
    -webkit-background-clip: text;        /* Klipp gradient till text */
    -webkit-text-fill-color: transparent; /* Gör text transparent */
    text-decoration: none;                /* Ta bort understreck */
}
```

**Gradient-effekt:**
```css
/* Från base.css rad 21-26 */
--accent-gradient: linear-gradient(
    135deg,              /* Vinkel */
    #00d4ff 0%,         /* Cyan */
    #0066ff 50%,        /* Blå */
    #6366f1 100%        /* Lila */
);
```

#### 2.3 Hamburgermeny (rad 23)

```html
<div class="hamburger-menu" id="hamburger">☰</div>
```

**Varför ID och class?**
- **Class** (`.hamburger-menu`): För styling i CSS
- **ID** (`#hamburger`): För att hitta elementet i JavaScript

**CSS - Dold på desktop (nav.css rad 131-143):**
```css
.hamburger-menu {
    display: none;  /* DOLD som standard */
    /* Styling... */
}

/* På mobil (<900px) */
@media (max-width: 900px) {
    .hamburger-menu {
        display: flex;  /* VISA på mobil */
    }
}
```

**JavaScript-funktionalitet (nav.js rad 2-17):**
```javascript
// 1. Hitta hamburger-knappen och nav-menyn
const hamburger = document.querySelector(".hamburger-menu");
const navLinks = document.getElementById("main-nav");

// 2. Lägg till click-lyssnare
hamburger.addEventListener("click", () => {
    // 3. Toggla "active" class (öppna/stäng)
    navLinks.classList.toggle("active");
});
```

**Vad händer när man klickar?**

```
Steg 1: Användare klickar på ☰
        ↓
Steg 2: JavaScript togglar .active på <nav>
        ↓
Steg 3: CSS visar/döljer menyn (nav.css rad 216-219)
```

```css
#navList {
    max-height: 0;     /* Dold */
    opacity: 0;
}

#navList.active {
    max-height: 500px; /* Synlig */
    opacity: 1;
}
```

#### 2.4 Kundvagnsikon (rad 26-31)

```html
<div class="cart-container">
    <div class="cart-icon" id="cartIcon">
        🛒
        <span class="cart-badge" id="cartBadge">0</span>
    </div>
</div>
```

**Struktur:**
```
cart-container (container)
  └── cart-icon (kundvagnsikon)
        ├── 🛒 (emoji)
        └── cart-badge (siffra)
```

**CSS för badge (cart.css rad 30-46):**
```css
.cart-badge {
    position: absolute;    /* Absolut positionering */
    top: -8px;            /* 8px ovanför kundvagn */
    right: -8px;          /* 8px till höger om kundvagn */
    background: var(--accent-gradient); /* Gradient bakgrund */
    border-radius: 50%;   /* Cirkel */
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;  /* Centrera siffran vertikalt */
    justify-content: center; /* Centrera siffran horisontellt */
    font-size: 0.75rem;   /* Liten text */
}
```

**JavaScript-uppdatering (cart.js rad 114-125):**
```javascript
updateBadge() {
    // 1. Hitta badge-elementet
    const badge = document.getElementById('cartBadge');
    
    // 2. Räkna totala antal produkter
    const total = this.getTotalItems();
    
    // 3. Uppdatera texten
    badge.textContent = total;
    
    // 4. Visa/dölj badge
    if (total > 0) {
        badge.style.display = 'flex'; // VISA om >0
    } else {
        badge.style.display = 'none'; // DÖLJ om 0
    }
}
```

**Task 1.1 - Cart Repositioning:**

**Problem:** Cart och hamburger överlappade på mobil.

**Lösning (nav.css rad 177-186):**
```css
@media (max-width: 900px) {
    #top {
        gap: var(--spacing-sm); /* Mellanrum mellan element */
    }
    
    /* Ge varje element fast storlek */
    .logo { flex: 0 0 auto; }
    .hamburger-menu { flex: 0 0 auto; }
    .cart-container { flex: 0 0 auto; }
}
```

**Före:**
```
[Logo]    [☰🛒]  <- Överlappning!
```

**Efter:**
```
[Logo]     [☰]      [🛒]  <- Perfekt mellanrum
```

---

### 3. NAVIGATION (rad 34-43)

```html
<nav id="main-nav">
    <ul>
        <li><a href="#" data-category="all">🏪 All Products</a></li>
        <li><a href="#" data-category="electronics">💻 Electronics</a></li>
        <!-- osv... -->
    </ul>
</nav>
```

#### 3.1 Data-Attribut (data-category)

**Vad är data-attribut?**
Anpassade HTML-attribut som börjar med `data-`.

**Varför använda dem?**
- ✅ Lagra extra information i HTML
- ✅ Lätt att läsa med JavaScript
- ✅ Förstör inte HTML-semantiken

**Exempel:**
```html
<a href="#" data-category="gaming">🎮 Gaming</a>
```

**Läsa med JavaScript (categories.js rad 21-30):**
```javascript
// 1. Hitta alla länkar med data-category
const categoryLinks = document.querySelectorAll('nav a[data-category]');

// 2. För varje länk
categoryLinks.forEach(link => {
    // 3. Lägg till click-lyssnare
    link.addEventListener('click', (e) => {
        // 4. Läs data-category värdet
        const category = link.dataset.category; // "gaming"
        
        // 5. Filtrera produkter
        this.filterByCategory(category);
    });
});
```

#### 3.2 Task 1.2 - Kategori Implementation

**6 kategorier implementerade:**

| Emoji | Kategori | data-category | Produktantal |
|-------|----------|---------------|--------------|
| 🏪 | All Products | `all` | 9 |
| 💻 | Electronics | `electronics` | 1 |
| 🎮 | Gaming | `gaming` | 3 |
| 🎧 | Audio | `audio` | 2 |
| ⌚ | Wearables | `wearables` | 1 |
| 🖱️ | Accessories | `accessories` | 2 |

**Filtreringslogik (categories.js rad 38-56):**
```javascript
filterByCategory(category) {
    // 1. Spara nuvarande kategori
    this.currentCategory = category;
    
    // 2. Hitta alla produkter
    const products = document.querySelectorAll('.product');
    let visibleCount = 0;
    
    // 3. Gå igenom varje produkt
    products.forEach(product => {
        // 4. Läs produktens kategori
        const productCategory = product.dataset.category;
        
        // 5. Visa om matchning eller "all"
        if (category === 'all' || productCategory === category) {
            product.style.display = 'grid'; // VISA
            visibleCount++;
        } else {
            product.style.display = 'none'; // DÖLJ
        }
    });
    
    console.log(`${visibleCount} products visible`);
}
```

**Exempel - Click på "Gaming":**

```
Steg 1: User klickar på 🎮 Gaming
        ↓
Steg 2: JavaScript läser data-category="gaming"
        ↓
Steg 3: Filtrera alla .product element
        ↓
Steg 4: VISA produkter med data-category="gaming"
        DÖLJ alla andra produkter
        ↓
Resultat: Endast 3 gaming-produkter visas
```

---

### 4. MAIN CONTENT (rad 46-onward)

#### 4.1 Carousel Section (Task 1.3)

```html
<section id="newsPages">
    <div class="newsPage">...</div>  <!-- Slide 1 -->
    <div class="newsPage">...</div>  <!-- Slide 2 -->
    <div class="newsPage">...</div>  <!-- Slide 3 -->
</section>
```

**3 professionella slides:**

**Slide 1: Black Friday**
```html
<div class="newsPage">
    <div class="carousel-icon">💥</div>
    <div class="carousel-content">
        <h2 class="carousel-title">Black Friday Mega Sale</h2>
        <p class="carousel-subtitle">Up to 70% off...</p>
        <a href="#" class="carousel-cta">Shop Now</a>
    </div>
    <span class="offer-badge">🔥 HOT DEAL</span>
</div>
```

**CSS för badges (carousel.css rad 310-323):**
```css
.offer-badge {
    position: absolute;
    top: var(--spacing-lg);
    right: var(--spacing-lg);
    background: var(--error);  /* Röd */
    padding: var(--spacing-xs) var(--spacing-md);
    border-radius: 20px;
    animation: pulse 2s infinite;  /* Pulsera */
    z-index: 2;  /* Ovanför annat innehåll */
}

@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }  /* Väx lite */
}
```

**Carousel JavaScript (carousel.js):**

**Konstruktor (rad 10-32):**
```javascript
constructor(selector, options = {}) {
    // 1. Hitta container
    this.container = document.querySelector(selector); // #newsPages
    
    // 2. Konfiguration
    this.config = {
        autoPlay: true,        // Auto-växla slides
        interval: 5000,        /* 5 sekunder per slide */
        pauseOnHover: true     // Pausa när man hovrar
    };
    
    // 3. State
    this.currentSlide = 0;     // Nuvarande slide (börjar på 0)
    this.slides = [];          // Array av alla slides
    this.isPlaying = false;    // Spelar carousel?
    this.timer = null;         // Timer för auto-play
    
    // 4. Initiera
    this.init();
}
```

**Init-metod (rad 38-58):**
```javascript
init() {
    // 1. Hämta alla slides
    this.slides = Array.from(
        this.container.querySelectorAll('.newsPage')
    );
    
    // 2. Setup slides (dölj alla utom första)
    this.setupSlides();
    
    // 3. Skapa controls (pilar och prickar)
    this.createControls();
    
    // 4. Setup event listeners
    this.setupEventListeners();
    
    // 5. Starta auto-play
    if (this.config.autoPlay) {
        this.play();
    }
}
```

**Setup Slides (rad 64-76):**
```javascript
setupSlides() {
    this.slides.forEach((slide, index) => {
        slide.classList.remove('active');
        
        // Dölj alla slides utom första (index 0)
        slide.style.display = index === 0 ? 'flex' : 'none';
        slide.style.opacity = index === 0 ? '1' : '0';
    });
    
    // Markera första som active
    if (this.slides.length > 0) {
        this.slides[0].classList.add('active');
    }
}
```

**Create Controls (rad 82-98):**
```javascript
createControls() {
    // Skapa indicator-container
    const indicatorsDiv = document.createElement('div');
    indicatorsDiv.className = 'carousel-indicators';
    
    // För varje slide, skapa en prick
    this.slides.forEach((_, index) => {
        const indicator = document.createElement('span');
        indicator.className = 'carousel-indicator';
        
        // Första pricken är active
        if (index === 0) indicator.classList.add('active');
        
        // Spara slide-nummer i attribut
        indicator.dataset.slide = index;
        
        indicatorsDiv.appendChild(indicator);
    });
    
    this.container.appendChild(indicatorsDiv);
}
```

**Go To Slide (rad 124-156):**
```javascript
goToSlide(index) {
    // 1. Hämta current och next slides
    const currentSlide = this.slides[this.currentSlide];
    const nextSlide = this.slides[index];
    
    // 2. Fade out current
    currentSlide.style.opacity = '0';
    setTimeout(() => {
        currentSlide.style.display = 'none';
        currentSlide.classList.remove('active');
    }, 500); // Vänta 500ms för fade-animation
    
    // 3. Fade in next
    nextSlide.style.display = 'flex';
    setTimeout(() => {
        nextSlide.style.opacity = '1';
        nextSlide.classList.add('active');
    }, 50); // Kort delay
    
    // 4. Uppdatera indicators (prickar)
    this.indicators[this.currentSlide].classList.remove('active');
    this.indicators[index].classList.add('active');
    
    // 5. Spara nya index
    this.currentSlide = index;
}
```

**Auto-Play (rad 179-191):**
```javascript
play() {
    if (this.isPlaying) return; // Already playing
    
    this.isPlaying = true;
    
    // Sätt timer - nästa slide var 5:e sekund
    this.timer = setInterval(() => {
        this.next(); // Gå till nästa
    }, this.config.interval); // 5000ms = 5 sekunder
}

next() {
    // Räkna ut nästa index (loopa runt)
    const nextIndex = (this.currentSlide + 1) % this.slides.length;
    this.goToSlide(nextIndex);
}
```

**Exempel - Auto-Play Timeline:**

```
0s:  Slide 1 synlig
     ↓ (vänta 5s)
5s:  Fade out Slide 1, Fade in Slide 2
     ↓ (vänta 5s)
10s: Fade out Slide 2, Fade in Slide 3
     ↓ (vänta 5s)
15s: Fade out Slide 3, Fade in Slide 1 (loop)
```

---

## 🎨 CSS-System

### 1. Base.css - Design Token System

#### 1.1 Varför CSS-variabler?

**Traditionell CSS:**
```css
.button1 { background: #00d4ff; }
.button2 { background: #00d4ff; }
.link { color: #00d4ff; }
/* Ändra färg = ändra 3 ställen! */
```

**Med CSS-variabler:**
```css
:root {
    --accent-cyan: #00d4ff;
}

.button1 { background: var(--accent-cyan); }
.button2 { background: var(--accent-cyan); }
.link { color: var(--accent-cyan); }
/* Ändra färg = ändra 1 ställe! */
```

#### 1.2 Färgpalett (base.css rad 12-29)

```css
:root {
    /* Huvudfärger */
    --primary-dark: #0a0e27;      /* Mörkblå bakgrund */
    --secondary-dark: #151b3d;    /* Något ljusare */
    --surface: #1a2142;           /* Kort-bakgrund */
    --surface-elevated: #222a4f;  /* Hovered kort */
    
    /* Accentfärger */
    --accent-cyan: #00d4ff;       /* Cyan/ljusblå */
    --accent-blue: #0066ff;       /* Blå */
    --accent-purple: #6366f1;     /* Lila */
    
    /* Gradient - kombinerar alla accentfärger */
    --accent-gradient: linear-gradient(
        135deg,
        #00d4ff 0%,    /* Cyan */
        #0066ff 50%,   /* Blå */
        #6366f1 100%   /* Lila */
    );
}
```

**Gradient-visualisering:**
```
Cyan (#00d4ff)  →  Blå (#0066ff)  →  Lila (#6366f1)
     0%               50%               100%
     ←──────── 135° diagonal ────────→
```

#### 1.3 Spacing System (base.css rad 47-52)

```css
--spacing-xs: 0.5rem;   /* 8px - extra small */
--spacing-sm: 1rem;     /* 16px - small */
--spacing-md: 1.5rem;   /* 24px - medium */
--spacing-lg: 2rem;     /* 32px - large */
--spacing-xl: 3rem;     /* 48px - extra large */
--spacing-2xl: 4rem;    /* 64px - 2x extra large */
```

**Varför rem istället för px?**

```
px = absolut (alltid samma storlek)
rem = relativ (baserad på root font-size)

root font-size: 16px (standard)
1rem = 16px
2rem = 32px
osv...

Fördel: Om användaren ändrar font-size,
        skalas hela sidan proportionellt!
```

**Användning:**
```css
.button {
    padding: var(--spacing-md);  /* 24px padding */
    margin-bottom: var(--spacing-lg);  /* 32px margin */
}
```

#### 1.4 Transitions (base.css rad 54-57)

```css
--transition-fast: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
--transition-base: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow: 0.5s cubic-bezier(0.4, 0, 0.2, 1);
```

**Vad är cubic-bezier?**

En easing-funktion som bestämmer *hur* en animation rör sig.

```
cubic-bezier(0.4, 0, 0.2, 1)
             ↑   ↑  ↑   ↑
             P1x P1y P2x P2y

Resulterar i: Snabb start → Långsam slut
(Smooth, naturlig känsla)
```

**Alternativ:**
```css
linear     /* Konstant hastighet */
ease       /* Standard (slow-fast-slow) */
ease-in    /* Slow start */
ease-out   /* Slow end */
```

**Användning:**
```css
.button {
    transition: all var(--transition-base);
    /* = all 0.3s cubic-bezier(...) */
}

.button:hover {
    transform: translateY(-2px);
    /* Smooth animation på 0.3s */
}
```

---

### 2. Responsiv Design

#### 2.1 Breakpoints

Projektet använder **2 huvudsakliga breakpoints:**

```css
@media (max-width: 900px) {
    /* Tablet och mindre */
}

@media (max-width: 600px) {
    /* Mobil */
}
```

**Varför dessa värden?**

```
>900px:  Desktop     (mus + tangentbord)
600-900: Tablet      (touch + större skärm)
<600px:  Mobil       (touch + liten skärm)
```

#### 2.2 Mobile-First vs Desktop-First

Detta projekt använder **Desktop-First**:

```css
/* Desktop (standard) */
.element {
    width: 1200px;
}

/* Tablet */
@media (max-width: 900px) {
    .element {
        width: 100%; /* Override för tablet */
    }
}

/* Mobil */
@media (max-width: 600px) {
    .element {
        width: 100%; /* Override för mobil */
    }
}
```

**Mobile-First skulle vara:**
```css
/* Mobil (standard) */
.element {
    width: 100%;
}

/* Tablet */
@media (min-width: 600px) {
    .element {
        width: 768px;
    }
}

/* Desktop */
@media (min-width: 900px) {
    .element {
        width: 1200px;
    }
}
```

---

## 🛒 Shopping Cart System

### Översikt

Kundvagnen är en **Class-baserad struktur** som hanterar:
- ✅ Lägg till produkter
- ✅ Ta bort produkter
- ✅ Ändra antal
- ✅ Beräkna totalt pris
- ✅ Spara i localStorage
- ✅ Visa/dölj modal

### Cart.js - Struktur

```javascript
class ShoppingCart {
    constructor() { ... }          // Initiera cart
    
    // localStorage
    loadFromStorage() { ... }
    saveToStorage() { ... }
    
    // CRUD operations
    addItem() { ... }
    removeItem() { ... }
    changeQuantity() { ... }
    clearAll() { ... }
    
    // Calculations
    calculateTotals() { ... }
    getTotalItems() { ... }
    
    // Display
    updateDisplay() { ... }
    updateBadge() { ... }
    updateItemsList() { ... }
    
    // UI
    openModal() { ... }
    closeModal() { ... }
    showNotification() { ... }
}
```

### 1. Constructor (rad 6-11)

```javascript
constructor() {
    // 1. Initiera items array
    this.items = [];
    
    // 2. Ladda från localStorage
    this.loadFromStorage();
    
    // 3. Setup alla knappar
    this.setupButtons();
}
```

**Vad händer när sidan laddas:**

```
1. new ShoppingCart() körs
   ↓
2. this.items = []
   ↓
3. loadFromStorage() läser localStorage
   ↓
4. this.items = [saved items] eller []
   ↓
5. setupButtons() kopplar event listeners
   ↓
6. Cart är redo!
```

### 2. LocalStorage (rad 18-32)

**Vad är localStorage?**

En plats i webbläsaren där du kan spara data **permanent**.

```javascript
// Spara
localStorage.setItem('key', 'value');

// Läsa
const value = localStorage.getItem('key');

// Ta bort
localStorage.removeItem('key');
```

**Load From Storage (rad 18-29):**
```javascript
loadFromStorage() {
    // 1. Försök läsa från localStorage
    const savedCart = localStorage.getItem('cartItems');
    
    // 2. Om det finns något sparat
    if (savedCart) {
        // Parse JSON string till JavaScript object
        this.items = JSON.parse(savedCart);
    } else {
        // Annars, tom array
        this.items = [];
    }
    
    // 3. Uppdatera display
    this.updateDisplay();
}
```

**JSON.parse() förklaring:**

```javascript
// localStorage sparar endast STRINGS
// Vi måste konvertera:

// JavaScript Array
const items = [
    { id: '1', name: 'Laptop', price: 999 }
];

// Convert to JSON String
const jsonString = JSON.stringify(items);
// Result: '[{"id":"1","name":"Laptop","price":999}]'

// Save to localStorage
localStorage.setItem('cartItems', jsonString);

// ─────────────────────

// Load from localStorage
const savedString = localStorage.getItem('cartItems');
// Returns: '[{"id":"1","name":"Laptop","price":999}]'

// Convert back to JavaScript Array
const items = JSON.parse(savedString);
// Result: [{ id: '1', name: 'Laptop', price: 999 }]
```

**Save To Storage (rad 34-36):**
```javascript
saveToStorage() {
    // Convert items array to JSON string and save
    localStorage.setItem('cartItems', JSON.stringify(this.items));
}
```

### 3. Add Item (rad 43-72)

```javascript
addItem(id, name, price) {
    // 1. Kolla om produkten redan finns
    let found = false;
    
    // 2. Gå igenom alla items
    for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].id === id) {
            // Produkt finns! Öka quantity
            this.items[i].quantity = this.items[i].quantity + 1;
            found = true;
            break; // Sluta loopa
        }
    }
    
    // 3. Om produkten INTE finns
    if (!found) {
        // Skapa nytt item object
        const newItem = {
            id: id,
            name: name,
            price: parseFloat(price), // Konvertera string till number
            quantity: 1
        };
        
        // Lägg till i array
        this.items.push(newItem);
    }
    
    // 4. Spara, uppdatera, visa
    this.saveToStorage();
    this.updateDisplay();
    this.showNotification(name);
    this.animateCartIcon();
}
```

**Exempel - Lägg till produkt:**

```
Initial state:
this.items = []

User klickar: "Add Gaming Laptop" ($1299.99)
↓
addItem('msi-laptop', 'Gaming Laptop', '1299.99')
↓
Loop: items är tom, found = false
↓
Skapa newItem:
{
    id: 'msi-laptop',
    name: 'Gaming Laptop',
    price: 1299.99,
    quantity: 1
}
↓
this.items = [newItem]
↓
saveToStorage() → Spara i localStorage
updateDisplay() → Visa i UI
showNotification() → "Gaming Laptop added to cart"
animateCartIcon() → Bounce animation
```

**Scenario 2 - Lägg till SAMMA produkt:**

```
Current state:
this.items = [
    { id: 'msi-laptop', name: 'Gaming Laptop', quantity: 1 }
]

User klickar: "Add Gaming Laptop" IGEN
↓
addItem('msi-laptop', 'Gaming Laptop', '1299.99')
↓
Loop: items[0].id === 'msi-laptop' → MATCH!
↓
items[0].quantity = 1 + 1 = 2
found = true
↓
this.items = [
    { id: 'msi-laptop', quantity: 2 }  ← quantity ökade
]
↓
saveToStorage() → Uppdatera localStorage
updateDisplay() → Uppdatera UI
```

### 4. Calculate Totals (rad 103-124)

```javascript
calculateTotals() {
    // 1. Initiera subtotal
    let subtotal = 0;
    
    // 2. Summera alla produkter
    for (let i = 0; i < this.items.length; i++) {
        // Pris × Antal för varje produkt
        const itemTotal = this.items[i].price * this.items[i].quantity;
        subtotal = subtotal + itemTotal;
    }
    
    // 3. Beräkna frakt
    let shipping = 0;
    if (subtotal > 0 && subtotal <= 1000) {
        shipping = 25;  // $25 shipping om under $1000
    }
    // Om subtotal > $1000: FREE SHIPPING!
    
    // 4. Total = Subtotal + Frakt
    const total = subtotal + shipping;
    
    // 5. Returnera object
    return {
        subtotal: subtotal,
        shipping: shipping,
        total: total
    };
}
```

**Exempel - Beräkning:**

```
Cart innehåll:
Item 1: Gaming Laptop × 1 = $1299.99
Item 2: Mouse × 2 = $79.99 × 2 = $159.98
                              ─────────
                    Subtotal: $1459.97

Shipping:
subtotal ($1459.97) > $1000 → FREE SHIPPING ($0)

Total: $1459.97 + $0 = $1459.97
```

**Användning:**
```javascript
const totals = this.calculateTotals();
console.log(totals.subtotal);  // 1459.97
console.log(totals.shipping);  // 0
console.log(totals.total);     // 1459.97
```

### 5. Update Display (rad 131-135)

```javascript
updateDisplay() {
    this.updateBadge();      // Uppdatera cart badge (antal)
    this.updateItemsList();  // Uppdatera item-lista
    this.updateTotals();     // Uppdatera prices
}
```

Detta är **huvudmetoden** som synkroniserar UI med data.

**När körs den?**
- ✅ Efter addItem()
- ✅ Efter removeItem()
- ✅ Efter changeQuantity()
- ✅ Efter clearAll()
- ✅ Vid loadFromStorage()

### 6. Update Items List (rad 145-172)

```javascript
updateItemsList() {
    const cartBody = document.getElementById('cartBody');
    const emptyMessage = document.getElementById('cartEmpty');
    const footer = document.getElementById('cartFooter');
    
    // 1. Ta bort gamla items
    const oldItems = cartBody.querySelectorAll('.cart-item');
    for (let i = 0; i < oldItems.length; i++) {
        oldItems[i].remove();
    }
    
    // 2. Om cart är tom
    if (this.items.length === 0) {
        emptyMessage.style.display = 'block';  // Visa "Empty cart"
        footer.style.display = 'none';         // Dölj footer
        return; // Sluta här
    }
    
    // 3. Cart har items
    emptyMessage.style.display = 'none';  // Dölj "Empty cart"
    footer.style.display = 'block';       // Visa footer
    
    // 4. Lägg till varje item
    for (let i = 0; i < this.items.length; i++) {
        const itemHTML = this.createItemHTML(this.items[i]);
        cartBody.appendChild(itemHTML);
    }
}
```

**Create Item HTML (rad 177-219):**

```javascript
createItemHTML(item) {
    // 1. Skapa div element
    const div = document.createElement('div');
    div.className = 'cart-item';
    
    // 2. Sätt innerHTML
    div.innerHTML = `
        <div class="cart-item-image">
            <span style="font-size: 2rem;">📦</span>
        </div>
        <div class="cart-item-info">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">$${item.price.toFixed(2)}</div>
            <div class="cart-item-quantity">
                <button class="quantity-btn" data-id="${item.id}" data-action="decrease">−</button>
                <span class="quantity-value">${item.quantity}</span>
                <button class="quantity-btn" data-id="${item.id}" data-action="increase">+</button>
            </div>
        </div>
        <div class="cart-item-actions">
            <button class="cart-item-remove" data-id="${item.id}">🗑️</button>
        </div>
    `;
    
    // 3. Hitta knappar i den nya HTML:en
    const decreaseBtn = div.querySelector('[data-action="decrease"]');
    const increaseBtn = div.querySelector('[data-action="increase"]');
    const removeBtn = div.querySelector('.cart-item-remove');
    
    // 4. Lägg till event listeners
    decreaseBtn.addEventListener('click', () => {
        this.changeQuantity(item.id, -1);  // Minska med 1
    });
    
    increaseBtn.addEventListener('click', () => {
        this.changeQuantity(item.id, 1);   // Öka med 1
    });
    
    removeBtn.addEventListener('click', () => {
        this.removeItem(item.id);          // Ta bort helt
    });
    
    // 5. Returnera färdigt element
    return div;
}
```

**Template String förklaring:**

```javascript
// Gamla sättet (string concatenation)
const html = '<div class="name">' + item.name + '</div>';

// Nya sättet (template string)
const html = `<div class="name">${item.name}</div>`;
              ↑                   ↑         ↑
           backtick            ${...} = inject variable
```

**Exempel - Create Item HTML för Gaming Laptop:**

```javascript
item = {
    id: 'msi-laptop',
    name: 'Gaming Laptop',
    price: 1299.99,
    quantity: 2
}

createItemHTML(item) körs
↓
Genererar denna HTML:

<div class="cart-item">
    <div class="cart-item-image">📦</div>
    <div class="cart-item-info">
        <div class="cart-item-name">Gaming Laptop</div>
        <div class="cart-item-price">$1299.99</div>
        <div class="cart-item-quantity">
            <button data-id="msi-laptop" data-action="decrease">−</button>
            <span>2</span>
            <button data-id="msi-laptop" data-action="increase">+</button>
        </div>
    </div>
    <div class="cart-item-actions">
        <button data-id="msi-laptop">🗑️</button>
    </div>
</div>
↓
Event listeners läggs till på knappar:
- Click på "−" → changeQuantity('msi-laptop', -1)
- Click på "+" → changeQuantity('msi-laptop', 1)
- Click på "🗑️" → removeItem('msi-laptop')
↓
Element returneras och läggs till i cartBody
```

---

## 📊 Dataflöde

### Komplett flöde - Lägg till produkt i cart

```
┌─────────────────────────────────────────────┐
│ 1. USER ACTION                               │
│    User klickar på "Add to Cart"            │
└────────────┬────────────────────────────────┘
             ↓
┌─────────────────────────────────────────────┐
│ 2. HTML EVENT                                │
│    <button class="add-to-cart-btn">         │
│    Event: click                              │
└────────────┬────────────────────────────────┘
             ↓
┌─────────────────────────────────────────────┐
│ 3. JAVASCRIPT EVENT LISTENER (cart.js:327) │
│    addEventListener('click', (event) => {   │
│        const product = event.target         │
│                       .closest('.product'); │
│        const id = product.dataset.id;       │
│        const name = product.dataset.name;   │
│        const price = product.dataset.price; │
│        this.addItem(id, name, price);       │
│    })                                        │
└────────────┬────────────────────────────────┘
             ↓
┌─────────────────────────────────────────────┐
│ 4. ADD ITEM METHOD (cart.js:43-72)         │
│    addItem(id, name, price) {               │
│        // Kolla om finns                    │
│        // Lägg till eller öka quantity      │
│        this.saveToStorage();                │
│        this.updateDisplay();                │
│        this.showNotification(name);         │
│        this.animateCartIcon();              │
│    }                                         │
└────────────┬────────────────────────────────┘
             ↓
┌─────────────────────────────────────────────┐
│ 5. SAVE TO STORAGE (cart.js:34-36)         │
│    localStorage.setItem(                    │
│        'cartItems',                         │
│        JSON.stringify(this.items)           │
│    );                                        │
└────────────┬────────────────────────────────┘
             ↓
┌─────────────────────────────────────────────┐
│ 6. UPDATE DISPLAY (cart.js:131-135)        │
│    updateBadge()     → Visa antal i badge   │
│    updateItemsList() → Uppdatera lista      │
│    updateTotals()    → Uppdatera priser     │
└────────────┬────────────────────────────────┘
             ↓
┌─────────────────────────────────────────────┐
│ 7. UPDATE BADGE (cart.js:114-125)          │
│    badge.textContent = getTotalItems();     │
│    badge.style.display = (total > 0)        │
│        ? 'flex' : 'none';                   │
└────────────┬────────────────────────────────┘
             ↓
┌─────────────────────────────────────────────┐
│ 8. SHOW NOTIFICATION (cart.js:239-248)     │
│    notification.classList.add('show');      │
│    setTimeout(() => {                       │
│        notification.classList.remove('show');│
│    }, 3000);                                 │
└────────────┬────────────────────────────────┘
             ↓
┌─────────────────────────────────────────────┐
│ 9. ANIMATE CART ICON (cart.js:253-259)     │
│    icon.classList.add('bounce');            │
│    setTimeout(() => {                       │
│        icon.classList.remove('bounce');     │
│    }, 500);                                  │
└────────────┬────────────────────────────────┘
             ↓
┌─────────────────────────────────────────────┐
│ 10. USER SEES RESULT                        │
│     ✓ Badge uppdaterad (1 → 2)              │
│     ✓ Notification: "Product added!"        │
│     ✓ Cart icon bounce animation            │
│     ✓ Data sparat i localStorage            │
└─────────────────────────────────────────────┘
```

---

## 🔧 Felsökning

### Problem 1: Cart badge visar inte antal

**Symptom:** Badge visar alltid "0"

**Möjliga orsaker:**
1. localStorage inte sparat
2. getTotalItems() returnerar fel värde
3. updateBadge() körs inte

**Debugging:**
```javascript
// 1. Kolla localStorage
console.log(localStorage.getItem('cartItems'));
// Förväntat: '[{"id":"...","quantity":1}]'

// 2. Kolla items array
console.log(window.myCart.items);
// Förväntat: [{id: "...", quantity: 1}]

// 3. Kolla getTotalItems()
console.log(window.myCart.getTotalItems());
// Förväntat: 1 eller mer

// 4. Testa updateBadge() manuellt
window.myCart.updateBadge();
```

### Problem 2: Produkter filtreras inte

**Symptom:** Click på kategori gör ingenting

**Möjliga orsaker:**
1. categories.js inte laddad
2. data-category saknas på länkar
3. Event listener inte kopplad

**Debugging:**
```javascript
// 1. Kolla om CategoryManager finns
console.log(window.CategoryManager);
// Förväntat: CategoryManager object

// 2. Kolla data-category attribut
document.querySelectorAll('nav a[data-category]').forEach(link => {
    console.log(link.dataset.category);
});
// Förväntat: "all", "gaming", "audio", etc.

// 3. Testa manuellt
window.CategoryManager.filterByCategory('gaming');
// Förväntat: Endast gaming-produkter visas
```

### Problem 3: Carousel roterar inte

**Symptom:** Slides växlar inte automatiskt

**Möjliga orsaker:**
1. carousel.js inte laddad
2. autoPlay: false
3. JavaScript-fel

**Debugging:**
```javascript
// 1. Kolla om Carousel finns
console.log(window.Carousel);
// Förväntat: Carousel object

// 2. Kolla config
console.log(window.Carousel.config);
// Förväntat: { autoPlay: true, interval: 5000, ... }

// 3. Kolla om timer körs
console.log(window.Carousel.isPlaying);
// Förväntat: true

// 4. Manuellt starta
window.Carousel.play();
```

---

## ❓ Vanliga Frågor

### Fråga 1: Varför används `this` i JavaScript?

**Svar:**

`this` refererar till det aktuella objektet.

```javascript
class ShoppingCart {
    constructor() {
        this.items = [];  // this = detta ShoppingCart-objekt
    }
    
    addItem(id, name, price) {
        this.items.push({...});  // this = samma objekt
        this.updateDisplay();    // this = samma objekt
    }
}

const cart = new ShoppingCart();
// När vi kallar cart.addItem(),
// så är 'this' inuti addItem() = cart-objektet
```

**Utan `this`:**
```javascript
class ShoppingCart {
    constructor() {
        items = [];  // ERROR! Variabel existerar inte
    }
}
```

**Med `this`:**
```javascript
class ShoppingCart {
    constructor() {
        this.items = [];  // Skapar property på objektet
    }
}
```

---

### Fråga 2: Vad är skillnaden mellan `let`, `const` och `var`?

```javascript
// var (gammal stil - undvik!)
var name = 'John';
var name = 'Jane';  // OK - kan re-declare

// let (modern - för värden som ändras)
let count = 0;
count = 1;        // OK - kan ändra
let count = 2;    // ERROR - kan inte re-declare

// const (modern - för värden som inte ändras)
const PI = 3.14;
PI = 3.15;        // ERROR - kan inte ändra
const PI = 3.16;  // ERROR - kan inte re-declare
```

**När använda vad?**

```javascript
// const - som standard
const items = [];
const name = 'John';

// let - om värdet ska ändras
let count = 0;
count++;  // OK

// var - ALDRIG (föråldrat)
```

**Special case med const och arrays/objects:**

```javascript
// Detta är OK:
const items = [];
items.push('item1');  // OK - ändrar innehållet
items[0] = 'new';     // OK - ändrar innehållet

// Detta är ERROR:
const items = [];
items = ['new array'];  // ERROR - försöker ändra referensen
```

---

### Fråga 3: Varför `arrow functions` (=>) istället för `function`?

**Regular function:**
```javascript
button.addEventListener('click', function() {
    this.addItem();  // ERROR! 'this' är button, inte cart
});
```

**Arrow function:**
```javascript
button.addEventListener('click', () => {
    this.addItem();  // OK! 'this' är cart
});
```

**Arrow functions "ärver" `this` från omgivande kontext:**

```javascript
class ShoppingCart {
    setupButtons() {
        const button = document.querySelector('.btn');
        
        // Regular function
        button.addEventListener('click', function() {
            console.log(this);  // button element
        });
        
        // Arrow function
        button.addEventListener('click', () => {
            console.log(this);  // ShoppingCart object
        });
    }
}
```

---

### Fråga 4: Vad är JSON och varför används det?

**JSON = JavaScript Object Notation**

Ett textformat för att lagra och överföra data.

```javascript
// JavaScript Object
const user = {
    name: 'John',
    age: 30,
    active: true
};

// Convert to JSON String
const jsonString = JSON.stringify(user);
// Result: '{"name":"John","age":30,"active":true}'

// Convert back to JavaScript Object
const userObject = JSON.parse(jsonString);
// Result: { name: 'John', age: 30, active: true }
```

**Varför behövs det?**

1. **localStorage** sparar endast strings
2. **HTTP APIs** skickar endast strings
3. **JSON** är universellt format

```javascript
// Utan JSON (fel!)
localStorage.setItem('user', user);
// Sparar: "[object Object]" ❌

// Med JSON (rätt!)
localStorage.setItem('user', JSON.stringify(user));
// Sparar: '{"name":"John","age":30}' ✓
```

---

### Fråga 5: Vad är DOM och querySelectorAll?

**DOM = Document Object Model**

HTML som JavaScript kan manipulera:

```html
<div id="box" class="container">
    <p>Hello</p>
</div>
```

```javascript
// DOM representation:
document
  └── body
        └── div#box.container
              └── p
                    └── "Hello"
```

**querySelector vs querySelectorAll:**

```javascript
// querySelector - returnerar FÖRSTA matchningen
const firstButton = document.querySelector('.button');
// Result: <button class="button">...</button>

// querySelectorAll - returnerar ALLA matchningar
const allButtons = document.querySelectorAll('.button');
// Result: NodeList [<button>, <button>, <button>]

// Loop genom alla
allButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log('Clicked!');
    });
});
```

**CSS-selectors i JavaScript:**

```javascript
// ID
document.querySelector('#myId')

// Class
document.querySelector('.myClass')

// Element
document.querySelector('button')

// Kombinationer
document.querySelector('button.primary')  // button MED class "primary"
document.querySelector('.cart .item')     // .item INUTI .cart
document.querySelector('[data-id="1"]')   // element med data-id="1"
```

---

### Fråga 6: Varför så många CSS-filer?

**Single File (dåligt):**
```css
/* style.css - 5000 lines */
/* Header styles */
header { ... }
.logo { ... }

/* Products */
.product { ... }

/* Cart */
.cart-modal { ... }

/* Problem: Svårt att hitta och underhålla! */
```

**Multiple Files (bra):**
```css
/* nav.css - 250 lines */
/* ENDAST navigation */

/* products.css - 180 lines */
/* ENDAST products */

/* cart.css - 420 lines */
/* ENDAST cart */

/* Fördel: Lätt att hitta specifik style! */
```

**Import-system:**
```css
/* style.css */
@import url("base.css");     /* Variabler först */
@import url("nav.css");      /* Sedan navigation */
@import url("products.css"); /* Sedan products */
/* osv... */
```

---

## 🎓 Sammanfattning

### Vad har vi lärt oss?

1. ✅ **HTML-struktur**
   - Semantisk markup
   - Data-attribut
   - Accessibility

2. ✅ **CSS-system**
   - CSS-variabler
   - Modulär arkitektur
   - Responsiv design
   - Animations

3. ✅ **JavaScript**
   - Classes och objektorienterad programmering
   - Event listeners
   - DOM-manipulation
   - localStorage
   - Moduler

4. ✅ **Best Practices**
   - Separation of concerns
   - DRY (Don't Repeat Yourself)
   - Mobile-first thinking
   - Progressive enhancement

### Nästa steg

1. **Experimentera**: Ändra färger, spacing, animationer
2. **Lägg till features**: Wishlist, search, product reviews
3. **Förbättra**: Loading states, error handling
4. **Deploy**: Publicera på GitHub Pages eller Netlify

---

## 📚 Referenser

### Dokumentation
- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS-Tricks](https://css-tricks.com/)
- [JavaScript.info](https://javascript.info/)

### Verktyg
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)
- [VS Code](https://code.visualstudio.com/)
- [Git & GitHub](https://github.com/)

---

**📝 Dokumentversion:** 1.0.0  
**👤 Skapad för:** Junior-utvecklare  
**📅 Datum:** December 2025  
**🏢 Projekt:** Neon Market E-Commerce

---

*Detta dokument täcker grunden. Fortsätt experimentera och lära dig!* 🚀  