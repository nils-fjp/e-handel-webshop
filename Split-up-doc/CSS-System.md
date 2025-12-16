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