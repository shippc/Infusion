function Carousel(config) {
    this.container = typeof config.container === "string"
        ? document.querySelector(config.container)
        : config.container;

    if (!this.container) {
        return;
    }

    this.items = typeof config.items === "string"
        ? this.container.querySelectorAll(config.items)
        : config.items;

    this.previousButton = typeof config.previousButton === "string"
        ? this.container.querySelector(config.previousButton)
        : config.previousButton;

    this.nextButton = typeof config.nextButton === "string"
        ? this.container.querySelector(config.nextButton)
        : config.nextButton;

    this.currentIndex = 0;
    this.autoplay = config.autoplay ?? false;
    this.interval = config.interval ?? 5000;
    this.timer = null;

    if (!this.items || this.items.length === 0) {
        return;
    }

    this.showPreviousSlide = this.showPreviousSlide.bind(this);
    this.showNextSlide = this.showNextSlide.bind(this);
    this.handleKeyboard = this.handleKeyboard.bind(this);
    this.startAutoplay = this.startAutoplay.bind(this);
    this.stopAutoplay = this.stopAutoplay.bind(this);
    this.restartAutoplay = this.restartAutoplay.bind(this);

    this.init();
}

Carousel.prototype.init = function () {
    const hasMultipleSlides = this.items.length > 1;

    this.container.setAttribute("tabindex", "0");
    this.container.setAttribute("aria-live", "polite");

    this.items.forEach((item, index) => {
        const isCurrentSlide = index === 0;

        item.classList.toggle("show", isCurrentSlide);
        item.setAttribute("aria-hidden", String(!isCurrentSlide));
    });

    if (this.previousButton) {
        this.previousButton.removeAttribute("style");
        this.previousButton.hidden = !hasMultipleSlides;

        this.previousButton.addEventListener("click", () => {
            this.showPreviousSlide();
            this.restartAutoplay();
        });
    }

    if (this.nextButton) {
        this.nextButton.removeAttribute("style");
        this.nextButton.hidden = !hasMultipleSlides;

        this.nextButton.addEventListener("click", () => {
            this.showNextSlide();
            this.restartAutoplay();
        });
    }

    this.container.addEventListener("keydown", this.handleKeyboard);

    this.container.addEventListener("mouseenter", this.stopAutoplay);
    this.container.addEventListener("mouseleave", this.startAutoplay);

    this.container.addEventListener("focusin", this.stopAutoplay);
    this.container.addEventListener("focusout", this.startAutoplay);

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            this.stopAutoplay();
            return;
        }

        this.startAutoplay();
    });

    if (hasMultipleSlides) {
        this.startAutoplay();
    } else {
        this.container.removeAttribute("tabindex");
    }
};

Carousel.prototype.showSlide = function (index) {
    const totalItems = this.items.length;

    this.currentIndex = (index + totalItems) % totalItems;

    this.items.forEach((item, itemIndex) => {
        const isCurrentSlide = itemIndex === this.currentIndex;

        item.classList.toggle("show", isCurrentSlide);
        item.setAttribute("aria-hidden", String(!isCurrentSlide));
    });
};

Carousel.prototype.showPreviousSlide = function () {
    this.showSlide(this.currentIndex - 1);
};

Carousel.prototype.showNextSlide = function () {
    this.showSlide(this.currentIndex + 1);
};

Carousel.prototype.handleKeyboard = function (event) {
    if (event.key === "ArrowLeft") {
        event.preventDefault();
        this.showPreviousSlide();
        this.restartAutoplay();
    }

    if (event.key === "ArrowRight") {
        event.preventDefault();
        this.showNextSlide();
        this.restartAutoplay();
    }
};

Carousel.prototype.startAutoplay = function () {
    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!this.autoplay || prefersReducedMotion || this.timer) {
        return;
    }

    this.timer = window.setInterval(() => {
        this.showNextSlide();
    }, this.interval);
};

Carousel.prototype.stopAutoplay = function () {
    if (!this.timer) {
        return;
    }

    window.clearInterval(this.timer);
    this.timer = null;
};

Carousel.prototype.restartAutoplay = function () {
    this.stopAutoplay();
    this.startAutoplay();
};