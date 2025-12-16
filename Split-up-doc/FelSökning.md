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