// =============================================
// REMOVED CODE REFERENCE
// Date: 2026-02-11
// =============================================
//
// This file preserves stub/placeholder methods, dead code,
// and excessive console.log calls that were removed from
// the production source files during a cleanup pass.
//
// Kept here for reference only. None of this code is
// loaded by the application.
//
// =============================================

// =============================================================================
// FROM: js/main.js
// =============================================================================

// --- Stub: App.showNotification() ---
// Was a placeholder that only logged to console. Never displayed anything to
// the user. Called by onOnline() and onOffline().
//
// showNotification(message, type = 'info') {
//     // You can implement a custom notification system here
//     // For now, we'll just log it
//     this.log(`💬 Notification [${type}]:`, message);
// },

// --- Stub: App.onResize() ---
// Had empty if/else branches for mobile/tablet/desktop breakpoints.
// The comment said "You can add responsive logic here" but nothing was
// implemented. The debounced resize listener that called it was also removed.
//
// onResize() {
//     const width = window.innerWidth;
//     this.log(`📐 Window resized: ${width}px`);
//
//     // You can add responsive logic here
//     if (width < 600) {
//         // Mobile view
//     } else if (width < 900) {
//         // Tablet view
//     } else {
//         // Desktop view
//     }
// },

// --- Stub: App.onOnline() / App.onOffline() ---
// These only called the stub showNotification() above, so they did nothing
// visible. The online/offline event listeners were also removed.
//
// onOnline() {
//     this.log('🌐 Connection restored');
//     this.showNotification('You are back online!', 'success');
// },
//
// onOffline() {
//     this.log('📡 Connection lost');
//     this.showNotification('You are offline. Cart data is saved locally.', 'warning');
// },

// --- Dead code: App.onVisibilityChange() ---
// Paused/resumed carousel on tab visibility change. The carousel already
// handles pause-on-hover itself, and the visibility handler added no real
// value beyond a console log. Removed along with the visibilitychange listener.
//
// onVisibilityChange() {
//     if (document.hidden) {
//         this.log('👁️ Page hidden');
//         if (this.modules.carousel && this.modules.carousel.pause) {
//             this.modules.carousel.pause();
//         }
//     } else {
//         this.log('👁️ Page visible');
//         if (this.modules.carousel && this.modules.carousel.resume) {
//             this.modules.carousel.resume();
//         }
//     }
// },

// --- Dead code: App.warn() ---
// Only called once (for missing back-to-top button, which always exists).
// Removed as part of the debug logging cleanup.
//
// warn(...args) {
//     console.warn(`[${this.config.appName} WARN]`, ...args);
// },

// --- Dead code: App.getModule() / App.isModuleLoaded() ---
// Never called by any code in the application. Existed only for potential
// console debugging.
//
// getModule(name) {
//     return this.modules[name] || null;
// },
//
// isModuleLoaded(name) {
//     return this.modules[name] !== null;
// },

// --- Dead code: App.logModuleStatus() ---
// Printed a console.table of module status on every page load.
// Pure debug noise.
//
// logModuleStatus() {
//     this.log('📊 Module Status:');
//     console.table({
//         'Shopping Cart': this.isModuleLoaded('cart') ? '✓ Loaded' : '✗ Not loaded',
//         'Navigation': this.isModuleLoaded('navigation') ? '✓ Loaded' : '✗ Not loaded',
//         'Categories': this.isModuleLoaded('categories') ? '✓ Loaded' : '⚠ Pending',
//         'Carousel': this.isModuleLoaded('carousel') ? '✓ Loaded' : '⚠ Pending'
//     });
// },

// --- Dead code: App.log() / App.error() ---
// Debug logging helpers with emoji prefixes. Every single init* method
// called this.log() multiple times. All removed.
//
// log(...args) {
//     if (this.config.debug) {
//         console.log(`[${this.config.appName}]`, ...args);
//     }
// },
//
// error(...args) {
//     console.error(`[${this.config.appName} ERROR]`, ...args);
// },

// --- Dead code: App.config ---
// Only used by the log/error/warn helpers and the console banner.
// All removed.
//
// config: {
//     appName: 'Neon Market',
//     version: '1.0.0',
//     debug: true // Set to false in production
// },

// --- Dead code: Console welcome banner ---
// A large ASCII-art banner printed to the console on every page load.
//
// console.log(`
// %c╔═══════════════════════════════════════╗
// ║                                       ║
// ║         🌟 NEON MARKET 🌟            ║
// ║                                       ║
// ║         Version: ${App.config.version}                ║
// ║                                       ║
// ╚═══════════════════════════════════════╝
//
// %cWelcome to Neon Market! 🛒
// %cType 'NeonMarket' in console to access the app controller.
// %cAvailable commands:
//   • NeonMarket.getModule('cart')     - Access shopping cart
//   • NeonMarket.modules                - View all modules
//   • NeonMarket.config                 - View configuration
// `,
// 'color: #00d4ff; font-weight: bold; font-size: 12px;',
// 'color: #00ff88; font-weight: bold; font-size: 14px;',
// 'color: #94a3b8; font-size: 11px;',
// 'color: #64748b; font-size: 10px; font-family: monospace;'
// );

// =============================================================================
// FROM: js/cart.js
// =============================================================================

// No stubs removed, but excessive console.log calls were present
// in the original cart.js only via the App.log() pathway — the
// cart itself did not have its own console.log calls.

// =============================================================================
// FROM: js/categories.js
// =============================================================================

// --- Debug console.log calls removed ---
//
// console.log('[Categories] Initializing category manager...');
// console.log('[Categories] ✓ Category manager ready');
// console.log(`[Categories] Filtering by: ${category}`);
// console.log(`[Categories] ${visibleCount} products visible`);
// console.log('[Categories] Module loaded');

// --- Dead code: addCategoryAnimations() ---
// Injected a <style> element into the DOM from JavaScript.
// The fadeIn keyframes and .active link styles have been moved
// to their proper CSS files (products.css and header.css).
//
// function addCategoryAnimations() {
//     if (document.getElementById('category-animations')) {
//         return;
//     }
//
//     const style = document.createElement('style');
//     style.id = 'category-animations';
//     style.textContent = `
//         @keyframes fadeIn {
//             from {
//                 opacity: 0;
//                 transform: translateY(20px);
//             }
//             to {
//                 opacity: 1;
//                 transform: translateY(0);
//             }
//         }
//
//         nav a[data-category].active {
//             border-color: var(--accent-cyan) !important;
//             color: var(--accent-cyan) !important;
//             background: rgba(0, 212, 255, 0.1) !important;
//         }
//     `;
//     document.head.appendChild(style);
// }

// =============================================================================
// FROM: js/carousel.js
// =============================================================================

// --- Debug console.log calls removed ---
//
// console.log("[Carousel] Initializing...");
// console.log("[Carousel] ✓ Initialized with", this.slides.length, "slides");
// console.log("[Carousel] Playing");
// console.log("[Carousel] Paused");
// console.log("[Carousel] Module loaded");
// console.warn("[Carousel] Container not found:", selector);
// console.warn("[Carousel] No slides found");

// =============================================================================
// FROM: js/nav.js
// =============================================================================

// --- Debug console.log calls removed ---
//
// console.log("[Nav] Menu toggled:", navList.classList.contains("active"));
// console.log("[Nav] Menu closed after link click");
// console.log("[Nav] ✓ Navigation initialized");
// console.error("[Nav] ✗ Hamburger or navList not found!");
// console.log("[Nav] Hamburger:", hamburger);
// console.log("[Nav] NavList:", navList);
