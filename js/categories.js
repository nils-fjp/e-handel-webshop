// =============================================
// CATEGORIES.JS - Product Category Management
// =============================================

class CategoryManager {
    constructor() {
        this.currentCategory = 'all';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.showAllProducts();
    }

    setupEventListeners() {
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

    filterByCategory(category) {
        this.currentCategory = category;

        const products = document.querySelectorAll('.product');

        let visibleCount = 0;

        products.forEach(product => {
            const productCategory = product.dataset.category;

            if (category === 'all' || productCategory === category) {
                product.style.display = 'grid';
                product.style.animation = 'fadeIn 0.3s ease';
                visibleCount++;
            } else {
                product.style.display = 'none';
            }
        });

        this.emitCategoryChange(category, visibleCount);
    }

    showAllProducts() {
        this.filterByCategory('all');
    }

    setActiveLink(activeLink) {
        const allLinks = document.querySelectorAll('nav a[data-category]');
        allLinks.forEach(link => {
            link.classList.remove('active');
        });

        activeLink.classList.add('active');
    }

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

    getCurrentCategory() {
        return this.currentCategory;
    }

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

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.CategoryManager = new CategoryManager();
    });
} else {
    window.CategoryManager = new CategoryManager();
}
