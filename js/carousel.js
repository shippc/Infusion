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

    if (!this.items || this.items.length === 0) {
        return;
    }

    this.showPreviousSlide = this.showPreviousSlide.bind(this);
    this.showNextSlide = this.showNextSlide.bind(this);
    this.handleKeyboard = this.handleKeyboard.bind(this);

    this.init();
}

Carousel.prototype.init = function () {
    var self = this;
    var hasMultipleSlides = this.items.length > 1;

    this.container.setAttribute("tabindex", "0");
    this.container.setAttribute("aria-live", "polite");

    Array.prototype.forEach.call(this.items, function (item, index) {
        item.classList.toggle("show", index === 0);
        item.setAttribute("aria-hidden", index === 0 ? "false" : "true");
    });

    if (this.previousButton) {
        this.previousButton.removeAttribute("style");
        this.previousButton.hidden = !hasMultipleSlides;
        this.previousButton.addEventListener("click", this.showPreviousSlide);
    }

    if (this.nextButton) {
        this.nextButton.removeAttribute("style");
        this.nextButton.hidden = !hasMultipleSlides;
        this.nextButton.addEventListener("click", this.showNextSlide);
    }

    this.container.addEventListener("keydown", this.handleKeyboard);

    if (!hasMultipleSlides) {
        self.container.removeAttribute("tabindex");
    }
};

Carousel.prototype.showSlide = function (index) {
    var totalItems = this.items.length;

    this.currentIndex = (index + totalItems) % totalItems;

    Array.prototype.forEach.call(
        this.items,
        function (item, itemIndex) {
            var isCurrentSlide = itemIndex === this.currentIndex;

            item.classList.toggle("show", isCurrentSlide);
            item.setAttribute(
                "aria-hidden",
                isCurrentSlide ? "false" : "true"
            );
        }.bind(this)
    );
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
    }

    if (event.key === "ArrowRight") {
        event.preventDefault();
        this.showNextSlide();
    }
};