# 📋 Neon Market - Development Roadmap

**Last Updated:** December 10, 2025  
**Status:** In Progress  
**Priority Level:** High

---

## 🎯 Overview

This document outlines the next development phase for the Neon Market e-commerce application. Tasks are organized by priority and complexity to facilitate team collaboration and efficient implementation.

---

## 📌 Task Breakdown

### 1. 🎨 UI/UX Improvements

#### 1.1 Reposition Shopping Cart Button

**Priority:** High  
**Estimated Time:** 30 minutes  
**Assigned To:** TBD

**Objective:**  
Move the shopping cart icon to the far right corner of the top banner for better visual hierarchy and improved user experience.

**Tasks:**

- [ ] Modify `nav.css` to adjust cart container positioning
- [ ] Update flexbox/grid layout in `#top` section
- [ ] Ensure cart icon remains visible and accessible on all screen sizes
- [ ] Test responsiveness (mobile, tablet, desktop)
- [ ] Verify cart badge remains properly positioned

**Files to Modify:**

- `src/nav.css` - Update `.cart-container` positioning
- `src/cart.css` - Adjust cart icon styles if needed

**Technical Notes:**

```css
/* Suggested approach in nav.css */
#top {
 display: flex;
 justify-content: space-between;
 align-items: center;
}

.cart-container {
 margin-left: auto; /* Push to far right */
 order: 3; /* Ensure it's last in flex order */
}
```

**Testing Checklist:**

- [ ] Desktop view (>900px)
- [ ] Tablet view (600-900px)
- [ ] Mobile view (<600px)
- [ ] Badge visibility
- [ ] Click interaction

---

#### 1.2 Implement Product Categories Navigation

**Priority:** High  
**Estimated Time:** 2-3 hours  
**Assigned To:** TBD

**Objective:**  
Create functional product categories with proper navigation and filtering system.

**Phase 1: Define Categories**

- [ ] Research and define 6-8 relevant product categories
  - Suggested: Electronics, Accessories, Gaming, Audio, Wearables, Smart Home, Peripherals, Deals
- [ ] Update navigation menu with category names
- [ ] Create category data structure

**Phase 2: Update Navigation**

- [ ] Replace placeholder text in `index.html` navigation
- [ ] Style active category state
- [ ] Add hover effects for category items
- [ ] Implement smooth transitions

**Phase 3: Add Filtering Logic**

- [ ] Create `categories.js` for category management
- [ ] Add `data-category` attribute to product elements
- [ ] Implement filter function to show/hide products
- [ ] Add "All Products" option to show everything
- [ ] Handle empty category states

**Files to Create/Modify:**

- `index.html` - Update navigation categories
- `src/categories.js` - New file for category logic
- `src/nav.css` - Active state styling
- `src/products.css` - Category filter transitions

**Data Structure:**

```javascript
// categories.js
const categories = [
 { id: "all", name: "All Products", icon: "🏪" },
 { id: "electronics", name: "Electronics", icon: "💻" },
 { id: "gaming", name: "Gaming", icon: "🎮" },
 { id: "audio", name: "Audio", icon: "🎧" },
 { id: "wearables", name: "Wearables", icon: "⌚" },
 { id: "smart-home", name: "Smart Home", icon: "🏠" },
];
```

**Testing Checklist:**

- [ ] All categories display correctly
- [ ] Filter shows/hides correct products
- [ ] "All Products" shows everything
- [ ] Active state highlights current category
- [ ] Smooth transitions between categories
- [ ] Mobile menu integration

---

#### 1.3 Create Carousel for Recent Offers

**Priority:** Medium  
**Estimated Time:** 3-4 hours  
**Assigned To:** TBD

**Objective:**  
Replace static "Nyhetsflik" placeholders with an interactive image carousel showcasing recent offers and promotions.

**Phase 1: Design & Structure**

- [ ] Design carousel layout (3-slide rotation recommended)
- [ ] Gather/create promotional images (1200x400px recommended)
- [ ] Create HTML structure for carousel
- [ ] Plan animation timing (5-7 seconds per slide)

**Phase 2: Implementation**

- [ ] Create `carousel.js` for carousel logic
- [ ] Implement auto-play functionality
- [ ] Add navigation dots/indicators
- [ ] Add previous/next arrow controls
- [ ] Implement swipe support for mobile
- [ ] Add pause-on-hover feature

**Phase 3: Styling**

- [ ] Create `carousel.css` for styles
- [ ] Implement smooth transitions (fade/slide)
- [ ] Add responsive image handling
- [ ] Style navigation controls
- [ ] Add loading states for images

**Files to Create/Modify:**

- `index.html` - Update `#newsPages` section
- `src/carousel.js` - New carousel logic
- `src/carousel.css` - New carousel styles
- `style.css` - Import carousel.css

**HTML Structure:**

```html
<section id="newsPages" class="carousel-container">
 <div class="carousel-track">
  <div class="carousel-slide active">
   <img src="assets/images/offer-1.jpg" alt="Special Offer 1" />
   <div class="carousel-caption">
    <h3>Black Friday Deals</h3>
    <p>Up to 50% off selected items</p>
   </div>
  </div>
  <!-- More slides -->
 </div>
 <div class="carousel-controls">
  <button class="carousel-btn prev">‹</button>
  <button class="carousel-btn next">›</button>
 </div>
 <div class="carousel-indicators">
  <span class="indicator active"></span>
  <span class="indicator"></span>
  <span class="indicator"></span>
 </div>
</section>
```

**Features to Implement:**

- [ ] Auto-advance (5s interval)
- [ ] Manual navigation (arrows)
- [ ] Indicator dots
- [ ] Touch/swipe support
- [ ] Keyboard navigation (arrow keys)
- [ ] Pause on hover
- [ ] Lazy loading images
- [ ] Accessibility (ARIA labels)

**Testing Checklist:**

- [ ] Auto-play works correctly
- [ ] Manual controls function
- [ ] Touch gestures on mobile
- [ ] Smooth transitions
- [ ] Image loading performance
- [ ] Accessibility compliance

---

#### 1.4 Add Footer Section

**Priority:** Medium  
**Estimated Time:** 1-2 hours  
**Assigned To:** TBD

**Objective:**  
Create a professional footer with essential information and links.

**Content to Include:**

- [ ] Company information
- [ ] Quick links (About, Contact, Terms, Privacy)
- [ ] Social media links
- [ ] Newsletter signup (optional)
- [ ] Copyright notice
- [ ] Payment method icons

**Tasks:**

- [ ] Design footer layout (3-column recommended)
- [ ] Create HTML structure in `index.html`
- [ ] Create `footer.css` for styling
- [ ] Add footer links (can be placeholder hrefs)
- [ ] Make responsive for mobile

**Files to Create/Modify:**

- `index.html` - Add `<footer>` content
- `src/footer.css` - New footer styles
- `style.css` - Import footer.css

**Suggested Structure:**

```html
<footer class="site-footer">
 <div class="footer-content">
  <div class="footer-column">
   <h4>About Neon Market</h4>
   <p>Your trusted tech marketplace</p>
   <div class="social-links">
    <!-- Social icons -->
   </div>
  </div>
  <div class="footer-column">
   <h4>Quick Links</h4>
   <ul>
    <li><a href="#">About Us</a></li>
    <li><a href="#">Contact</a></li>
    <li><a href="#">Shipping Info</a></li>
    <li><a href="#">Returns</a></li>
   </ul>
  </div>
  <div class="footer-column">
   <h4>Customer Service</h4>
   <ul>
    <li><a href="#">FAQ</a></li>
    <li><a href="#">Terms of Service</a></li>
    <li><a href="#">Privacy Policy</a></li>
    <li><a href="#">Support</a></li>
   </ul>
  </div>
 </div>
 <div class="footer-bottom">
  <p>&copy; 2025 Neon Market. All rights reserved.</p>
 </div>
</footer>
```

**Testing Checklist:**

- [ ] All links are functional
- [ ] Responsive on mobile
- [ ] Consistent with site theme
- [ ] Readable text contrast
- [ ] Social icons display correctly

---

### 2. 🗂️ Code Organization & Optimization

#### 2.1 Reorganize Repository Structure

**Priority:** High  
**Estimated Time:** 2-3 hours  
**Assigned To:** TBD

**Objective:**  
Implement a standard, scalable directory structure for better code organization and maintainability.

**Current Structure Issues:**

- CSS files mixed in different locations
- No dedicated assets directory
- Legacy files need archiving
- SVG files not organized

**Proposed New Structure:**

```
neon-market/
│
├── index.html                      # Main entry point
├── README.md                       # Documentation
├── .gitignore                      # Git ignore rules
│
├── assets/                         # All static assets
│   ├── images/                     # Image files
│   │   ├── logo/
│   │   │   └── neonmarket-logo.svg
│   │   ├── products/               # Product images
│   │   │   ├── product-1.jpg
│   │   │   └── ...
│   │   ├── carousel/               # Carousel/banner images
│   │   │   ├── offer-1.jpg
│   │   │   └── ...
│   │   └── icons/                  # Icon files
│   │       ├── cart-icon.svg
│   │       └── ...
│   │
│   └── fonts/                      # Custom fonts (if any)
│
├── css/                            # All stylesheets
│   ├── base.css                    # Variables, resets, utilities
│   ├── nav.css                     # Navigation styles
│   ├── layout.css                  # Layout structure
│   ├── products.css                # Product cards
│   ├── cart.css                    # Shopping cart
│   ├── carousel.css                # Carousel (new)
│   ├── footer.css                  # Footer (new)
│   └── style.css                   # Main import file
│
├── js/                             # All JavaScript files
│   ├── cart.js                     # Shopping cart logic
│   ├── nav.js                      # Navigation functionality
│   ├── categories.js               # Category filtering (new)
│   ├── carousel.js                 # Carousel logic (new)
│   └── main.js                     # Main app initialization (new)
│
├── legacy/                         # Archive old/unused files
│   ├── webShop.html
│   ├── webShop.css
│   ├── color-palette.css
│   └── mobile-responsive.css
│
└── docs/                           # Additional documentation
    ├── TODO.md                     # This file
    ├── CONTRIBUTING.md             # Contribution guidelines
    └── CHANGELOG.md                # Version history
```

**Migration Tasks:**

- [ ] Create new directory structure
- [ ] Move CSS files to `css/` directory
- [ ] Move JS files to `js/` directory
- [ ] Move SVG files to `assets/images/`
- [ ] Archive legacy files to `legacy/`
- [ ] Update all file paths in HTML
- [ ] Update CSS import paths
- [ ] Update JavaScript src paths
- [ ] Test that everything still works

**Files to Update:**

- `index.html` - Update all src/href paths
- `style.css` - Update @import paths
- All JavaScript files - Update any file references

**Git Commands:**

```bash
# Use git mv to preserve history
git mv src/nav.css css/nav.css
git mv cart.js js/cart.js
# etc...
```

**Testing Checklist:**

- [ ] All CSS loads correctly
- [ ] All JavaScript executes
- [ ] All images display
- [ ] Cart functionality works
- [ ] Navigation works
- [ ] No console errors
- [ ] Responsive design intact

---

#### 2.2 CSS Code Review & Optimization

**Priority:** Medium  
**Estimated Time:** 3-4 hours  
**Assigned To:** TBD

**Objective:**  
Identify and eliminate CSS redundancies, optimize performance, and improve maintainability.

**Phase 1: Audit & Analysis**

- [ ] Review all CSS files for duplicate rules
- [ ] Identify unused styles
- [ ] Check for conflicting declarations
- [ ] Analyze specificity issues
- [ ] Document redundant patterns

**Phase 2: Consolidation**

- [ ] Merge duplicate selectors
- [ ] Create reusable utility classes
- [ ] Consolidate color values into variables
- [ ] Standardize spacing values
- [ ] Unify naming conventions

**Phase 3: Optimization**

- [ ] Remove unused CSS rules
- [ ] Simplify complex selectors
- [ ] Reduce specificity where possible
- [ ] Optimize animation performance
- [ ] Minify for production (future task)

**Areas to Review:**

**A) Color Definitions**

```css
/* BEFORE: Colors defined in multiple places */
color: #00d4ff;
background: #00d4ff;
border-color: #00d4ff;

/* AFTER: Use CSS variables consistently */
color: var(--accent-cyan);
background: var(--accent-cyan);
border-color: var(--accent-cyan);
```

**B) Spacing Patterns**

```css
/* BEFORE: Inconsistent spacing */
padding: 20px;
margin: 1.5rem;
gap: 24px;

/* AFTER: Use spacing system */
padding: var(--spacing-lg);
margin: var(--spacing-md);
gap: var(--spacing-lg);
```

**C) Duplicate Hover Effects**

```css
/* BEFORE: Repeated hover styles */
.btn:hover {
 transform: translateY(-2px);
}
.card:hover {
 transform: translateY(-2px);
}
.product:hover {
 transform: translateY(-2px);
}

/* AFTER: Utility class */
.hover-lift:hover {
 transform: translateY(-2px);
}
```

**D) Media Query Consolidation**

- [ ] Group media queries by breakpoint
- [ ] Avoid duplicate breakpoint definitions
- [ ] Consider mobile-first approach

**Files to Review:**

- `css/base.css` - Check variable usage
- `css/nav.css` - Navigation redundancies
- `css/layout.css` - Layout patterns
- `css/products.css` - Product card styles
- `css/cart.css` - Cart modal styles

**Tools to Use:**

- Browser DevTools (Coverage tab)
- CSS Stats (cssstats.com)
- Manual code review

**Metrics to Track:**

- [ ] Lines of CSS reduced
- [ ] Number of duplicate rules eliminated
- [ ] CSS file size reduction
- [ ] Specificity conflicts resolved

**Testing After Optimization:**

- [ ] Visual regression testing
- [ ] Cross-browser compatibility
- [ ] Responsive design verification
- [ ] Performance benchmarking
- [ ] Accessibility validation

---

## 📅 Implementation Timeline

### Sprint 1 (Week 1)

- [ ] Task 1.1: Cart button repositioning
- [ ] Task 2.1: Repository reorganization
- [ ] Task 1.2 (Phase 1): Category definition

### Sprint 2 (Week 2)

- [ ] Task 1.2 (Phase 2-3): Category implementation
- [ ] Task 1.4: Footer creation
- [ ] Task 2.2 (Phase 1): CSS audit

### Sprint 3 (Week 3)

- [ ] Task 1.3: Carousel implementation
- [ ] Task 2.2 (Phase 2-3): CSS optimization
- [ ] Final testing and bug fixes

---

## 🧪 Testing Strategy

### Unit Testing

- Test individual functions in isolation
- Verify category filtering logic
- Test carousel navigation functions

### Integration Testing

- Test cart + categories interaction
- Verify navigation + filtering workflow
- Test carousel + responsive design

### User Acceptance Testing

- Test complete shopping flow
- Verify mobile experience
- Check accessibility compliance

### Performance Testing

- Measure page load time
- Test JavaScript execution time
- Verify smooth animations (60fps)

---

## 📚 Documentation Requirements

After completing each task:

- [ ] Update README.md with new features
- [ ] Document any new functions/classes
- [ ] Update code comments
- [ ] Create CHANGELOG.md entry
- [ ] Update TODO.md status

---

## 🤝 Team Collaboration Guidelines

### Before Starting a Task:

1. Assign yourself to the task
2. Create a feature branch: `git checkout -b feature/task-name`
3. Notify team in group chat

### During Development:

1. Commit frequently with clear messages
2. Push to your branch regularly
3. Ask for help if blocked

### After Completing a Task:

1. Test thoroughly
2. Update documentation
3. Create Pull Request
4. Request code review
5. Merge after approval

### Branch Naming Convention:

- `feature/cart-repositioning`
- `feature/categories-navigation`
- `feature/carousel-implementation`
- `refactor/css-optimization`
- `fix/bug-description`

---

## 🐛 Known Issues

Document any bugs or issues discovered during development:

### Current Issues:

- [ ] Cart badge sometimes doesn't update immediately on mobile
- [ ] Long product names overflow on small screens
- [ ] Hamburger menu animation stutters on some devices

---

## 💡 Future Enhancements (Post-Current Tasks)

- Backend integration
- User authentication
- Product search functionality
- Advanced filtering (price range, ratings)
- Product comparison feature
- Dark/light theme toggle
- Multi-language support
- Payment gateway integration

---

## 📞 Contact & Support

**Questions or blockers?**

- Create an issue in the repository
- Contact team members via group chat
- Schedule pair programming session if needed

---

**Last Review Date:** December 10, 2025  
**Next Review Date:** December 17, 2025

---

_This document is a living roadmap and will be updated as tasks are completed and new requirements emerge._
