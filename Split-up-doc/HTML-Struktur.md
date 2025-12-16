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