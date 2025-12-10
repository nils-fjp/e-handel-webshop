// =============================================
// MAIN.JS - Application Entry Point
// Neon Market E-Commerce Application
// =============================================

/**
 * Main application controller
 * Initializes all modules and manages the application lifecycle
 */

// =============================================
// APPLICATION STATE
// =============================================

const App = {
    // Store references to all module instances
    modules: {
        cart: null,
        navigation: null,
        categories: null,
        carousel: null
    },
    
    // Application configuration
    config: {
        appName: 'Neon Market',
        version: '1.0.0',
        debug: true // Set to false in production
    },
    
    // =========================================
    // INITIALIZATION
    // =========================================
    
    /**
     * Initialize the application
     * Called when DOM is fully loaded
     */
    init() {
        this.log('🚀 Initializing Neon Market...');
        
        try {
            // Initialize all modules in order
            this.initCart();
            this.initNavigation();
            this.initCategories();
            this.initCarousel();
            
            // Setup global event listeners
            this.setupGlobalEvents();
            
            this.log('✅ Application initialized successfully!');
            this.logModuleStatus();
            
        } catch (error) {
            this.error('❌ Failed to initialize application:', error);
        }
    },
    
    // =========================================
    // MODULE INITIALIZATION
    // =========================================
    
    /**
     * Initialize Shopping Cart
     * The cart is already initialized in cart.js
     * We just need to get a reference to it
     */
    initCart() {
        this.log('🛒 Initializing shopping cart...');
        
        // Cart is already created in cart.js as window.myCart
        // We just store a reference to it
        if (window.myCart) {
            this.modules.cart = window.myCart;
            this.log('✓ Shopping cart connected');
        } else {
            this.error('✗ Shopping cart not found!');
        }
    },
    
    /**
     * Initialize Navigation
     * Navigation is already handled in nav.js
     */
    initNavigation() {
        this.log('🧭 Initializing navigation...');
        
        // Navigation functionality is already in nav.js
        // Check if hamburger menu exists
        const hamburger = document.getElementById('hamburger');
        if (hamburger) {
            this.modules.navigation = {
                hamburger: hamburger,
                isActive: false
            };
            this.log('✓ Navigation system connected');
        } else {
            this.log('⚠ Navigation elements not found');
        }
    },
    
    /**
     * Initialize Categories
     * This connects to categories.js when it exists
     */
    initCategories() {
        this.log('📂 Initializing categories...');
        
        // Check if CategoryManager exists (from categories.js)
        if (window.CategoryManager) {
            this.modules.categories = window.CategoryManager;
            this.log('✓ Categories module connected');
        } else {
            this.log('⚠ Categories module not yet implemented');
        }
    },
    
    /**
     * Initialize Carousel
     * This connects to carousel.js when it exists
     */
    initCarousel() {
        this.log('🎠 Initializing carousel...');
        
        // Check if Carousel exists (from carousel.js)
        if (window.Carousel) {
            this.modules.carousel = window.Carousel;
            this.log('✓ Carousel module connected');
        } else {
            this.log('⚠ Carousel module not yet implemented');
        }
    },
    
    // =========================================
    // GLOBAL EVENT HANDLERS
    // =========================================
    
    /**
     * Setup global event listeners
     */
    setupGlobalEvents() {
        this.log('🎧 Setting up global events...');
        
        // Handle window resize with debounce
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                this.onResize();
            }, 250);
        });
        
        // Handle page visibility change
        document.addEventListener('visibilitychange', () => {
            this.onVisibilityChange();
        });
        
        // Handle online/offline status
        window.addEventListener('online', () => this.onOnline());
        window.addEventListener('offline', () => this.onOffline());
        
        // Handle errors globally
        window.addEventListener('error', (e) => {
            this.error('Global error caught:', e.error);
        });
        
        
        // Setup back-to-top button
        this.setupBackToTop();
        this.log('✓ Global events configured');
    },
    
    /**
     * Handle window resize
     */
    onResize() {
        const width = window.innerWidth;
        this.log(`📐 Window resized: ${width}px`);
        
        // You can add responsive logic here
        if (width < 600) {
            // Mobile view
        } else if (width < 900) {
            // Tablet view
        } else {
            // Desktop view
        }
    },
    
    /**
     * Handle page visibility change
     */
    onVisibilityChange() {
        if (document.hidden) {
            this.log('👁️ Page hidden');
            // Pause animations, auto-play, etc.
            if (this.modules.carousel && this.modules.carousel.pause) {
                this.modules.carousel.pause();
            }
        } else {
            this.log('👁️ Page visible');
            // Resume animations, auto-play, etc.
            if (this.modules.carousel && this.modules.carousel.resume) {
                this.modules.carousel.resume();
            }
        }
    },
    
    /**
     * Handle online status
     */
    onOnline() {
        this.log('🌐 Connection restored');
        this.showNotification('You are back online!', 'success');
    },
    
    /**
     * Handle offline status
     */
    onOffline() {
        this.log('📡 Connection lost');
        this.showNotification('You are offline. Cart data is saved locally.', 'warning');
    },
    
    // =========================================
    // UTILITY METHODS
    // =========================================
    
    /**
     * Console logging with app prefix
     */
    log(...args) {
        if (this.config.debug) {
            console.log(`[${this.config.appName}]`, ...args);
        }
    },
    
    /**
     * Error logging
     */
    error(...args) {
        console.error(`[${this.config.appName} ERROR]`, ...args);
    },
    
    /**
     * Warning logging
     */
    warn(...args) {
        console.warn(`[${this.config.appName} WARN]`, ...args);
    },
    
    /**
     * Get module instance
     */
    getModule(name) {
        return this.modules[name] || null;
    },
    
    /**
     * Check if module is loaded
     */
    isModuleLoaded(name) {
        return this.modules[name] !== null;
    },
    
    /**
     * Log module status
     */
    logModuleStatus() {
        this.log('📊 Module Status:');
        console.table({
            'Shopping Cart': this.isModuleLoaded('cart') ? '✓ Loaded' : '✗ Not loaded',
            'Navigation': this.isModuleLoaded('navigation') ? '✓ Loaded' : '✗ Not loaded',
            'Categories': this.isModuleLoaded('categories') ? '✓ Loaded' : '⚠ Pending',
            'Carousel': this.isModuleLoaded('carousel') ? '✓ Loaded' : '⚠ Pending'
        });
    },
    
    /**
     * Show notification to user
     */
    showNotification(message, type = 'info') {
        // You can implement a custom notification system here
        // For now, we'll just log it
        this.log(`💬 Notification [${type}]:`, message);
    },

    /**
     * Setup back to top button functionality
     */
    setupBackToTop() {
        const backToTopBtn = document.getElementById('backToTop');
        
        if (!backToTopBtn) {
            this.warn('Back to top button not found');
            return;
        }
        
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        // Scroll to top on click
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        this.log('✓ Back to top button initialized');
    }
};

// =============================================
// APPLICATION STARTUP
// =============================================

/**
 * Start application when DOM is ready
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        App.init();
    });
} else {
    // DOM is already ready
    App.init();
}

// =============================================
// EXPOSE TO GLOBAL SCOPE
// =============================================

// Make App available globally for debugging
window.NeonMarket = App;

// =============================================
// CONSOLE WELCOME MESSAGE
// =============================================

console.log(`
%c╔═══════════════════════════════════════╗
║                                       ║
║         🌟 NEON MARKET 🌟            ║
║                                       ║
║         Version: ${App.config.version}                ║
║                                       ║
╚═══════════════════════════════════════╝

%cWelcome to Neon Market! 🛒
%cType 'NeonMarket' in console to access the app controller.
%cAvailable commands:
  • NeonMarket.getModule('cart')     - Access shopping cart
  • NeonMarket.modules                - View all modules
  • NeonMarket.config                 - View configuration
`,
'color: #00d4ff; font-weight: bold; font-size: 12px;',
'color: #00ff88; font-weight: bold; font-size: 14px;',
'color: #94a3b8; font-size: 11px;',
'color: #64748b; font-size: 10px; font-family: monospace;'
);