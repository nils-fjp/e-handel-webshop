// =============================================
// CATEGORIES.JS - Product Category Management
// =============================================

/**
 * Category Manager Class
 * Handles product filtering by category
 */
class CategoryManager {
    constructor() {
        this.currentCategory = 'all';
        this.init();
    }
    
    /**
     * Initialize the category manager
     */
    init() {
        console.log('[Categories] Initializing category manager...');
        this.setupEventListeners();
        this.showAllProducts(); // Show all products initially
        console.log('[Categories] ✓ Category manager ready');
    }
    
    /**
     * Setup event listeners for category links
     */
    setupEventListeners() {
        // Get all navigation links with data-category attribute
        const categoryLinks = document.querySelectorAll('nav a[data-category]');
        
        categoryLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const category = link.dataset.category;
                this.filterByCategory(category);
                this.setActiveLink(link);
            });
        });
    }
    
    /**
     * Filter products by category
     */
    filterByCategory(category) {
        console.log(`[Categories] Filtering by: ${category}`);
        this.currentCategory = category;
        
        const products = document.querySelectorAll('.product');
        let visibleCount = 0;
        
        products.forEach(product => {
            const productCategory = product.dataset.category;
            
            if (category === 'all' || productCategory === category) {
                product.style.display = 'grid';
                // Add fade-in animation
                product.style.animation = 'fadeIn 0.3s ease';
                visibleCount++;
            } else {
                product.style.display = 'none';
            }
        });
        
        console.log(`[Categories] ${visibleCount} products visible`);
        
        // Emit custom event for other modules
        this.emitCategoryChange(category, visibleCount);
    }
    
    /**
     * Show all products
     */
    showAllProducts() {
        this.filterByCategory('all');
    }
    
    /**
     * Set active state on clicked link
     */
    setActiveLink(activeLink) {
        // Remove active class from all links
        const allLinks = document.querySelectorAll('nav a[data-category]');
        allLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to clicked link
        activeLink.classList.add('active');
    }
    
    /**
     * Emit category change event
     */
    emitCategoryChange(category, count) {
        const event = new CustomEvent('categoryChanged', {
            detail: {
                category: category,
                productCount: count,
                timestamp: new Date()
            }
        });
        document.dispatchEvent(event);
    }
    
    /**
     * Get current category
     */
    getCurrentCategory() {
        return this.currentCategory;
    }
    
    /**
     * Get product count by category
     */
    getProductCount(category = null) {
        const cat = category || this.currentCategory;
        
        if (cat === 'all') {
            return document.querySelectorAll('.product').length;
        }
        
        return document.querySelectorAll(`.product[data-category="${cat}"]`).length;
    }
}

// =============================================
// INITIALIZE WHEN DOM IS READY
// =============================================

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCategories);
} else {
    initCategories();
}

function initCategories() {
    // Create category manager instance
    window.CategoryManager = new CategoryManager();
    
    // Add CSS animation if not already present
    addCategoryAnimations();
}

/**
 * Add CSS animations for category filtering
 */
function addCategoryAnimations() {
    // Check if animation already exists
    if (document.getElementById('category-animations')) {
        return;
    }
    
    const style = document.createElement('style');
    style.id = 'category-animations';
    style.textContent = `
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        nav a[data-category].active {
            border-color: var(--accent-cyan) !important;
            color: var(--accent-cyan) !important;
            background: rgba(0, 212, 255, 0.1) !important;
        }
    `;
    document.head.appendChild(style);
}

// =============================================
// EXPORT FOR USE IN OTHER MODULES
// =============================================

// Make available globally
console.log('[Categories] Module loaded');