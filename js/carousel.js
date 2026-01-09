// =============================================
// CAROUSEL.JS - Image Carousel/Slideshow
// =============================================

/**
 * Carousel Class
 * Handles automatic slideshow for news/offers section
 */
class Carousel {
    constructor(selector, options = {}) {
        this.container = document.querySelector(selector);
        if (!this.container) {
            console.warn("[Carousel] Container not found:", selector);
            return;
        }

        // Configuration
        this.config = {
            autoPlay: options.autoPlay !== false,  // If not specified, defaults to true
            interval: options.interval || 5000,  // Time between slides (5 seconds default)
            transitionSpeed: options.transitionSpeed || 500,  // Animation speed (0.5s default)
            pauseOnHover: options.pauseOnHover !== false,  // Pause on mouse hover (true default)
        };

        this.currentSlide = 0;  // Current slide index (starts at 0)
        this.slides = [];  // Array to store the slides
        this.isPlaying = false;  // Whether autoplay is active
        this.timer = null;  // Reference to setInterval/setTimeout

        this.init();  // Call initialization method
    }

    /**
     * Initialize carousel
     */
    init() {
        console.log("[Carousel] Initializing...");

        // Get slides
        this.slides = Array.from(this.container.querySelectorAll(".news-page"));

        if (this.slides.length === 0) {
            console.warn("[Carousel] No slides found");
            return;
        }

        // Setup slides
        this.setupSlides();

        // Create controls
        this.createControls();

        // Setup event listeners
        this.setupEventListeners();

        // Start autoplay if enabled
        if (this.config.autoPlay) {
            this.play();
        }

        console.log(
            "[Carousel] ✓ Initialized with",
            this.slides.length,
            "slides"
        );
    }

    /**
     * Setup initial slide state
     */
    setupSlides() {
        this.slides.forEach((slide, index) => {
            slide.classList.toggle("active", index === 0);
        });
    }

    /**
     * Create navigation controls
     */
    createControls() {
        // Create navigation arrows
        const prevButton = document.createElement("button");
        prevButton.className = "carousel-arrow carousel-arrow-left";
        prevButton.type = "button";
        prevButton.setAttribute("aria-label", "Previous slide");
        prevButton.textContent = "<";

        const nextButton = document.createElement("button");
        nextButton.className = "carousel-arrow carousel-arrow-right";
        nextButton.type = "button";
        nextButton.setAttribute("aria-label", "Next slide");
        nextButton.textContent = ">";

        this.container.appendChild(prevButton);
        this.container.appendChild(nextButton);
        this.prevButton = prevButton;
        this.nextButton = nextButton;

        // Create indicators
        const indicatorsDiv = document.createElement("div");
        indicatorsDiv.className = "carousel-indicators";

        this.slides.forEach((_, index) => {
            const indicator = document.createElement("span");
            indicator.className = "carousel-indicator";
            if (index === 0) indicator.classList.add("active");
            indicator.dataset.slide = index;
            indicatorsDiv.appendChild(indicator);
        });

        this.container.appendChild(indicatorsDiv);
        this.indicators = indicatorsDiv.querySelectorAll(".carousel-indicator");
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Arrow clicks
        if (this.prevButton && this.nextButton) {
            this.prevButton.addEventListener("click", () => this.previous());
            this.nextButton.addEventListener("click", () => this.next());
        }

        // Indicator clicks
        this.indicators.forEach((indicator) => {
            indicator.addEventListener("click", () => {
                const slideIndex = parseInt(indicator.dataset.slide);
                this.goToSlide(slideIndex);
            });
        });

        // Pause on hover
        if (this.config.pauseOnHover) {
            this.container.addEventListener("mouseenter", () => this.pause());
            this.container.addEventListener("mouseleave", () => this.play());
        }

        // Keyboard navigation
        document.addEventListener("keydown", (e) => {
            if (e.key === "ArrowLeft") this.previous();
            if (e.key === "ArrowRight") this.next();
        });
    }

    /**
     * Go to specific slide
     */
    goToSlide(index) {
        // Validate index is within bounds
        if (index < 0 || index >= this.slides.length) return;

        // Get references to current and next slide elements
        const currentSlide = this.slides[this.currentSlide];
        const nextSlide = this.slides[index];
        
        // Remove active class from current slide and add to next slide
        currentSlide.classList.remove("active");
        nextSlide.classList.add("active");

        // Update indicator dots to reflect current slide
        this.indicators[this.currentSlide].classList.remove("active");
        this.indicators[index].classList.add("active");

        // Update current slide index
        this.currentSlide = index;
    }

    /**
     * Go to next slide
     */
    next() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }

    /**
     * Go to previous slide
     */
    previous() {
        const prevIndex =
            (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }

    /**
     * Start autoplay
     */
    play() {
        if (this.isPlaying) return;

        this.isPlaying = true;
        this.timer = setInterval(() => {
            this.next();
        }, this.config.interval);

        console.log("[Carousel] Playing");
    }

    /**
     * Pause autoplay
     */
    pause() {
        if (!this.isPlaying) return;

        this.isPlaying = false;
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }

        console.log("[Carousel] Paused");
    }

    /**
     * Stop carousel
     */
    stop() {
        this.pause();
        this.goToSlide(0);
    }
}

// =============================================
// INITIALIZE CAROUSEL
// =============================================

// Wait for DOM to be ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCarousel);
} else {
    initCarousel();
}

function initCarousel() {
    // Create carousel instance
    window.Carousel = new Carousel("#news-pages", {
        autoPlay: true,
        interval: 5000,
        pauseOnHover: true,
    });

    console.log("[Carousel] Module loaded");
}
