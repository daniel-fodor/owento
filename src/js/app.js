/**
 *
 * Owento app.js
 *
 *
 */
let locoScroll;
let currentYaxis = 0;
let body = document.querySelector("body");

/* init App */
window.onload = (event) => {
    body.classList.add("scroll-disabled");
    loader();
};

function loader(cb) {

    setTimeout(function() {
        scrollBarInit();
        // video Init
        const video = new Video();
        video.init();
    }, 3000);

}

function Video() {
    this.player = document.querySelector("#heroPlayer");

    this.init = () => {
        let heroPlayer = new Plyr(this.player);
        let hero = document.querySelector(".hero-player");
        let heroSound = document.querySelector(".js-hero-sound");
        let soundOn = document.querySelector("#sound-on");
        let soundOff = document.querySelector("#sound-off");

        // at the start everything was muted
        soundOn.style.display = "none";

        heroPlayer.on('ready', event => {
            body.classList.remove("scroll-disabled");
            document.querySelector(".init-loader--wrapper").remove();

            heroPlayer.play();

            heroStartAnimation();

            ScrollTrigger.create({
                trigger: hero,
                start: "0 0",
                onEnter:() => heroPlayer.play(),
                onLeave:() => heroPlayer.pause(),
                onEnterBack:() => heroPlayer.play()
            });
        });

        heroSound.addEventListener("click", function() {
            if ( heroPlayer.volume == 1) {
                heroPlayer.volume = 0;
                soundOn.style.display = "none";
                soundOff.style.display = "block";
            } else {
                heroPlayer.volume = 1;
                soundOn.style.display = "block";
                soundOff.style.display = "none";
            }
        });
    }
}

function scrollBarInit() {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    var md = new MobileDetect(window.navigator.userAgent);

    let lerpVal = 0.05;
    /* set lerpValue for devices */
    if (md.mobile() || md.tablet() ) {
        lerpVal = 0.1;
    } else {
        lerpVal = 0.05;
    }

    locoScroll = new LocomotiveScroll({
        el: document.querySelector(".scroller"),
        smooth: true,
        lerp: lerpVal,
        smartphone: {
            smooth: true
        },
        tablet: {
            smooth: true
        }
    });

    ScrollTrigger.scrollerProxy(".scroller", {
        scrollTop(value) {
            if (arguments.length) {
                locoScroll.scrollTo(value, 0, 0);
            }
            return locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight,
            };
        },
        pinType: document.querySelector(".scroller").style.transform ? "transform" : "fixed"
    });

    locoScroll.on("scroll", ScrollTrigger.update);
    ScrollTrigger.defaults({ scroller: ".scroller" });
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // refresh when all images were loaded
    startAnimations();
    initTestimonialSlider();
    initIsotope();
    sectionAnimations();
    navigation(locoScroll);

    imagesLoaded(document.querySelector(".page-wrapper"), function (instance) {
        ScrollTrigger.refresh();
    });
}

/**
Init animation
******************************** */
function heroStartAnimation() {
    const $pageHeader = document.querySelector(".page-header");
    var htl = gsap.timeline();
    htl.to($pageHeader, 2, {
        opacity: 1,
        delay: 4
    });
}


/**
 *
 * Animations other section
 *
 */

function sectionAnimations() {
    // step triggers and animations
    const servicesSection = document.querySelector(".block--what-we-do");
    const servicesBox = document.querySelectorAll(".block--what-we-do .list-box");

    gsap.to(servicesBox, 1.5, {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        scrollTrigger: {
            trigger: servicesSection,
            start: "0 30%",
        },
    });


    const featuredSection = document.querySelector(".block--featured");
    const featuredLeft = document.querySelector(".featured-items__left");
    const featuredRight = document.querySelector(".featured-items__right");
    gsap.to(featuredLeft, 1, {
        opacity: 1,
        x: 0,
        scrollTrigger: {
            trigger: featuredSection,
            start: "0 20%",
        },
    });
    gsap.to(featuredRight, 1, {
        opacity: 1,
        x: 0,
        scrollTrigger: {
            trigger: featuredSection,
            start: "0 20%",
        },
    });

    const portfolio = document.getElementById("portfolio");
    gsap.to(portfolio, 1, {
        opacity: 1,
        y: 0,
        scrollTrigger: {
            trigger: portfolio,
            start: "top 60%",
        },
    });

    const clients = document.querySelector(".block--clients");
    const clientsBlock = document.querySelector(
        ".block--clients .block__inner"
    );
    gsap.to(clientsBlock, 1, {
        opacity: 1,
        y: 0,
        scrollTrigger: {
            trigger: clients,
            start: "0 50%",
        },
    });

    const testis = document.querySelector(".block--testimonials");
    gsap.to(testis, 1, {
        opacity: 1,
        y: 0,
        scrollTrigger: {
            trigger: testis,
            start: "0 60%",
        },
    });

    const contactBlock = document.querySelector(".contact");
    const handGraphics = document.querySelector(".hand-graphics");
    gsap.to(contactBlock, 1, {
        opacity: 1,
        y: 0,
        scrollTrigger: {
            trigger: contactBlock,
            start: "0 50%",
        },
    });
    gsap.to(handGraphics, 1, {
        css: { left: "-220px", opacity: 1 },
        scrollTrigger: {
            trigger: contactBlock,
            start: "0 50%",
        },
    });

    const testimonialBlock = document.querySelector(".block--testimonials");
    const iconsGraphics = document.querySelector(".icons-graphics");
    gsap.to(iconsGraphics, 1, {
        css: { right: "-120px", opacity: 1 },
        scrollTrigger: {
            trigger: testimonialBlock,
            start: "0 50%",
        },
    });
}

/**
 * Modal working
 ******************************** */
let currentElement = null;
var portfolioItems = document.querySelectorAll(".portfolio-items__item");
[].forEach.call(portfolioItems, (item) => {
    item.addEventListener("click", (e) => {
        e.preventDefault();
        currentElement = item;
        showModal();
    });
});

function listenModalClose() {
    var modalClose = document.querySelector(".showcase-modal__close");
    modalClose.addEventListener("click", function () {
        locoScroll.scrollTo({top: currentYaxis});
        gsap.to(showCaseModal, 0.3, {
            autoAlpha: 0,
            scale: 0.95,
            onComplete: function () {
                allowedScroll();
                gsap.set(showCaseModal, { zIndex: -1000 });
            },
        });
    });
}

function showModal() {
    var showCaseModal = document.getElementById("showCaseModal");
    showCaseModal.style.display = "block";
    gsap.to(showCaseModal, 0.3, {
        autoAlpha: 1,
        scale: 1,
        zIndex: 9000,
        onComplete: function () {
            lockedScroll();
            initPortfolioSlider();
            listenModalClose();
        },
    });
}

function lockedScroll() {
    var html = document.querySelector("html");
    html.classList.add("scroll-disabled");
}

function allowedScroll() {
    var html = document.querySelector("html");
    html.classList.remove("scroll-disabled");
}

/**
 *
 * Modal slider
 *
 */
function initPortfolioSlider() {
    const portfolioSlider = new Swiper(".showcase-modal__slider", {
        slidesPerView: 1,
        spaceBetween: 80,
        navigation: false,
        mousewheel: false,
        observer: true,
        observeParents: true,
        init: false,
    });

    portfolioSlider.on("init", () => {
        let itemFirst = document.querySelector(".showcase-modal__body");

        let offset = locoScroll.scroll.instance.scroll.y;
        currentYaxis =  offset;

        OverlayScrollbars(itemFirst, {});
    });
    portfolioSlider.init();

    let portfolioThumbs = document.querySelectorAll(
        ".showcase-modal__thumbs a"
    );
    [].forEach.call(portfolioThumbs, (item) => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            removePortfolioActive();
            let index = item.dataset.step;
            portfolioSlider.slideTo(index - 1);
            item.classList.add("active");
        });
    });

    function removePortfolioActive() {
        let portfolioThumbs = document.querySelectorAll(
            ".showcase-modal__thumbs a"
        );
        [].forEach.call(portfolioThumbs, (item) => {
            item.classList.remove("active");
        });
    }
}

/**
 *
 * Tile parallax animations
 */

function startAnimations() {

        // animation to top of the page section
        gsap.set("#appService", { scale: 0.5, opacity: 0, left: "70%" });
        gsap.set("#brandingService", {
            scale: 0.5,
            opacity: 0,
            right: "70%",
        });
        gsap.set("#websiteService", { scale: 0.65, opacity: 1 });

    const timeline = gsap.timeline({
        paused: true,
        scrollTrigger: {
            trigger: ".services-boxes",
            start: "center 50%",
            pin: true,
            scrub: true,
        },
    });

    timeline
        .to(
            "#appService",
            1,
            {
                scale: 1,
                opacity: 1,
                left: "50%",
            },
            "servicesLabel"
        )
        .to(
            "#brandingService",
            1,
            {
                scale: 1,
                opacity: 1,
                right: "50%",
            },
            "servicesLabel"
        )
        .to(
            "#websiteService",
            1,
            {
                scale: 1,
            },
            "servicesLabel"
        );
}

// window.addEventListener("resize", e => {
//     ScrollTrigger.refresh();
//   });

// if( !tooSmall ) {
//
// }

// $(window).resize( function() {
//     var wWidth = window.innerWidth;
//     if( wWidth < maxWidth ) {
//         if( controller !== null && controller !== undefined ) {
//             // completely destroy the controller
//             controller = controller.destroy( true );
//             // if needed, use jQuery to manually remove styles added to DOM elements by GSAP etc. here
//         }
//     } else if( wWidth >= maxWidth ) {
//         if( controller === null || controller === undefined ) {
//             // reinitialize ScrollMagic only if it is not already initialized
//             startAnimations();
//         }
//     }
// });

/**
 *
 * Testimonial slider
 *
 */

function initTestimonialSlider() {
    const swiper = new Swiper(".js-testimonials-carousel", {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 80,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
}

/**
 *
 * FORM handler
 *
 */
let inputs = document.querySelectorAll("input");
let textarea = document.querySelectorAll("textarea");

[].forEach.call(inputs, function (input) {
    input.addEventListener("focus", function (e) {
        let label = input.previousElementSibling;
        label.classList.add("is-active");
    });

    input.addEventListener("blur", function (e) {
        let label = input.previousElementSibling;
        if (input.value.length == 0) {
            label.classList.remove("is-active");
        }
    });
});

[].forEach.call(textarea, function (textarea) {
    textarea.addEventListener("focus", function (e) {
        let label = textarea.previousElementSibling;
        label.classList.add("is-active");
    });

    textarea.addEventListener("blur", function (e) {
        let label = textarea.previousElementSibling;
        if (textarea.value.length == 0) {
            label.classList.remove("is-active");
        }
    });
});


/**
 *
 * Scrolling jump
 *
 */
function navigation(locoScroll) {
    let allMenuItems = document.querySelectorAll(".js-menu a");
    [].forEach.call(allMenuItems, function (item) {
        item.addEventListener("click", function (e) {

            if (item.getAttribute("id") === "contactLink") {
                return true;
            }

            e.preventDefault();
            var target = item.getAttribute("href");
            const targetEl = document.querySelector(target);
            const targetRect = targetEl.getBoundingClientRect();

            locoScroll.scrollTo(targetEl);

            // gsap.to(locoScroll, {
            //     scrollTo: targetRect.top,
            //     duration: 1,
            // });

            // if supported by the browser we can even update the URL.
            if (window.history && window.history.pushState) {
                history.pushState("", document.title, target);
            }
        });
    });
}

/**
 *
 * Isotope init
 *
 */
function initIsotope() {
    var portfolioItem = document.querySelector(".portfolio-items");
    var portfolioGrid = new Isotope(portfolioItem, {
        itemSelector: ".portfolio-items__item",
        percentPosition: true,
        layoutMode: "fitRows",
        fitRows: {
            gutter: 30,
        },
    });

    portfolioGrid.on( 'arrangeComplete', function() {
        ScrollTrigger.refresh(); // it will update locoscroll too
    } );

    var portfolioItems = document.querySelectorAll(".portfolio-categories a");
    [].forEach.call(portfolioItems, (item) => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            removePortfolioActiveClass();
            item.parentNode.classList.add("active");
            var filterValue = item.dataset.filter;
            portfolioGrid.arrange({ filter: filterValue });
        });
    });
}

function removePortfolioActiveClass() {
    let portfolioItems = document.querySelectorAll(".portfolio-categories a");
    [].forEach.call(portfolioItems, (item) => {
        item.parentNode.classList.remove("active");
    });
}
