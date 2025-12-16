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