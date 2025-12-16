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