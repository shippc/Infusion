(function () {
    "use strict";

    function initializeApplication() {
        enableJavaScriptStyles();
        initializeMenu();
        initializeCarousels();
        initializeDemonstrationForm();
    }

    function enableJavaScriptStyles() {
        document.body.classList.remove("no-js");
        document.body.classList.add("js");
    }

    function initializeMenu() {
        const navigation = document.querySelector(".header__nav");
        const menuButton = document.querySelector(".header__btnMenu");

        if (
            typeof Menu !== "function" ||
            !navigation ||
            !menuButton
        ) {
            return;
        }

        try {
            new Menu({
                container: navigation,
                toggleBtn: menuButton,
                widthEnabled: 1024
            });
        } catch (error) {
            console.error("Não foi possível inicializar o menu:", error);
        }
    }

    function initializeCarousels() {
        if (typeof Carousel !== "function") {
            console.error(
                "O arquivo carousel.js não foi carregado corretamente."
            );

            return;
        }

        initializeInterfaceCarousel();
        initializeTestimonialCarousel();
    }

    function initializeInterfaceCarousel() {
        const container = document.querySelector(
            ".laptop-slider .slideshow"
        );

        if (!container) {
            return;
        }

        try {
            new Carousel({
                container,
                items: "figure",
                previousButton: ".prev",
                nextButton: ".next",
                autoplay: true,
                interval: 4000
            });
        } catch (error) {
            console.error(
                "Não foi possível inicializar o carrossel de interfaces:",
                error
            );
        }
    }

    function initializeTestimonialCarousel() {
        const container = document.querySelector(
            ".quote-slideshow"
        );

        if (!container) {
            return;
        }

        try {
            new Carousel({
                container,
                items: "figure",
                previousButton: ".prev",
                nextButton: ".next",
                autoplay: true,
                interval: 6000
            });
        } catch (error) {
            console.error(
                "Não foi possível inicializar o carrossel de depoimentos:",
                error
            );
        }
    }

    function initializeDemonstrationForm() {
        const form = document.querySelector(".contact-form");

        if (!form) {
            return;
        }

        form.addEventListener("submit", function (event) {
            event.preventDefault();

            console.info(
                "Formulário demonstrativo: nenhuma mensagem foi enviada."
            );
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initializeApplication
        );
    } else {
        initializeApplication();
    }
})();