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
            autoPlay: options.autoPlay !== false,
            interval: options.interval || 5000,
            transitionSpeed: options.transitionSpeed || 500,
            pauseOnHover: options.pauseOnHover !== false,
        };

        this.currentSlide = 0;
        this.slides = [];
        this.isPlaying = false;
        this.timer = null;

        this.init();
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
            slide.classList.remove('active');
            // Ensure all slides have display: flex for proper layout
            slide.style.display = 'flex';
            
            // Use opacity and visibility instead of display to prevent reflow
            if (index === 0) {
                slide.style.opacity = '1';
                slide.style.visibility = 'visible';
                slide.style.position = 'relative';
                slide.style.zIndex = '1';
                slide.classList.add('active');
            } else {
                slide.style.opacity = '0';
                slide.style.visibility = 'hidden';
                slide.style.position = 'absolute';
                slide.style.top = '0';
                slide.style.left = '0';
                slide.style.width = '100%';
                slide.style.zIndex = '0';
            }
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
        if (index < 0 || index >= this.slides.length) return;

        const currentSlide = this.slides[this.currentSlide];
        const nextSlide = this.slides[index];
        
        // Fade out current - no more display changes!
        currentSlide.style.opacity = '0';
        currentSlide.style.visibility = 'hidden';
        currentSlide.style.zIndex = '0';
        
        setTimeout(() => {
            currentSlide.style.position = 'absolute';
            currentSlide.style.top = '0';
            currentSlide.style.left = '0';
            currentSlide.style.width = '100%';
            currentSlide.classList.remove('active');
        }, this.config.transitionSpeed);
        
        // Fade in next - smooth transition
        nextSlide.style.position = 'relative';
        nextSlide.style.visibility = 'visible';
        nextSlide.style.zIndex = '1';
        
        setTimeout(() => {
            nextSlide.style.opacity = "1";
            nextSlide.classList.add("active");
        }, 50);

        // Update indicators
        this.indicators[this.currentSlide].classList.remove("active");
        this.indicators[index].classList.add("active");

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
// ADD CAROUSEL STYLES
// =============================================

function addCarouselStyles() {
    // Check if styles already exist
    if (document.getElementById("carousel-styles")) {
        return;
    }

    const style = document.createElement("style");
    style.id = "carousel-styles";
    style.textContent = `
        .news-page {
            transition: opacity 0.5s ease;
        }
        
        .carousel-indicators {
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 10px;
            z-index: 10;
        }
        
        .carousel-indicator {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            border: 2px solid rgba(255, 255, 255, 0.5);
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .carousel-indicator:hover {
            background: rgba(255, 255, 255, 0.5);
            transform: scale(1.2);
        }
        
        .carousel-indicator.active {
            background: var(--accent-cyan, #00d4ff);
            border-color: var(--accent-cyan, #00d4ff);
            box-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
        }
        
        #news-pages {
            position: relative;
        }
    `;
    document.head.appendChild(style);
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
    // Add styles
    addCarouselStyles();

    // Create carousel instance
    window.Carousel = new Carousel("#news-pages", {
        autoPlay: true,
        interval: 5000,
        pauseOnHover: true,
    });

    console.log("[Carousel] Module loaded");
}
