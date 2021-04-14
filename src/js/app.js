/**
 *
 * Powr-Full app.js
 *
 *
 */

/* init App */
window.onload = (event) => {
    // start animation of the hero
    heroStartAnimation();
    startAnimations();
    initTestimonialSlider();
    initIsotope();
};

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const scroller = document.querySelector(".scroller");
// Smooth scroll setup
const bodyScrollBar = Scrollbar.init(scroller, {
    damping: 0.05,
    delegateTo: document
});

bodyScrollBar.setPosition(0, 0);
bodyScrollBar.track.xAxis.element.remove();

// How to get them to work together
ScrollTrigger.scrollerProxy(".scroller", {
    scrollTop(value) {
        if (arguments.length) {
            bodyScrollBar.scrollTop = value;
        }
        return bodyScrollBar.scrollTop;
    },
});

bodyScrollBar.addListener(ScrollTrigger.update);

ScrollTrigger.defaults({ scroller: scroller });

function initParallaxEffect() {
    var scroll = new LocomotiveScroll({
        el: document.querySelector("[data-scroll-container]"),
        smooth: true,
    });
}

/**
Init animation
******************************** */
function heroStartAnimation() {
    const $html = document.querySelector("html");
    const $pageBg = document.querySelector(".page__bg");
    const $hero = document.querySelector(".hero");
    const $hero_title = document.querySelector(".hero__title");
    const $pageHeader = document.querySelector(".page-header");
    const $drops = document.querySelectorAll(".drop");

    //$html.classList.add("scroll-disabled");

    var htl = gsap.timeline();
    htl.to($pageBg, 1.5, {
        opacity: 1,
        x: 0,
    });
    htl.to($hero_title, 1.5, {
        opacity: 1,
        y: 0,
    });
    htl.to($pageHeader, 1, {
        opacity: 1,
    });
    htl.to(
        $drops,
        1,
        {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            onComplete: function () {
                var scene = document.getElementById("drops");
                var parallaxInstance = new Parallax(scene);
            },
        },
        "-=1"
    );
}

/**
 *
 * Animations other section
 *
 */
// step triggers and animations
const featuredSection = document.querySelector(".block--featured");
const featuredLeft = document.querySelector(".featured-items__left");
const featuredRight = document.querySelector(".featured-items__right");

ScrollTrigger.create({
    trigger: featuredSection,
    start: "bottom bottom",
    onEnter: function () {
        gsap.to(featuredLeft, 1, { opacity: 1, x: 0 });
        gsap.to(featuredRight, 1, { opacity: 1, x: 0 });
    },
});

const portfolio = document.getElementById("portfolio");
ScrollTrigger.create({
    trigger: portfolio,
    start: "center center",
    onEnter: function () {
        gsap.to(portfolio, 1, { opacity: 1, y: 0 });
    },
});

const clients = document.querySelector(".block--clients");
ScrollTrigger.create({
    trigger: clients,
    start: "center center",
    onEnter: function () {
        gsap.to(clients, 1, { opacity: 1, y: 0 });
    },
});

const testis = document.querySelector(".block--testimonials");
ScrollTrigger.create({
    trigger: testis,
    start: "center center",
    onEnter: function () {
        gsap.to(testis, 1, { opacity: 1, y: 0 });
    },
});

const contactBlock = document.querySelector(".contact");
const handGraphics = document.querySelector(".hand-graphics");

ScrollTrigger.create({
    trigger: contactBlock,
    start: "center center",
    onEnter: function () {
        gsap.to(contactBlock, 1, { opacity: 1, y: 0 });
        gsap.to(handGraphics, 1, { css: { left: "-220px", opacity: 1 } });
    },
});

const testimonialBlock = document.querySelector(".block--testimonials");
const iconsGraphics = document.querySelector(".icons-graphics");
ScrollTrigger.create({
    trigger: testimonialBlock,
    start: "center center",
    onEnter: function () {
        gsap.to(iconsGraphics, 1, { css: { right: "-120px", opacity: 1 } });
    },
});

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
            listenModalClose();
            lockedScroll();
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
const portfolioSlider = new Swiper(".showcase-modal__slider", {
    slidesPerView: 1,
    spaceBetween: 80,
    navigation: false,
});

let portfolioThumbs = document.querySelectorAll(".showcase-modal__thumbs a");
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

/**
 * Mouse Events
 */

//document.addEventListener('mousemove', setMouseCirclePos);

// function setMouseCirclePos(e) {
//     let x = e.clientX;
//     let y = e.clientY;

//     let element = document.querySelector("#mouseCircle");
//     let compStyle = window.getComputedStyle(element);
//     let h = compStyle.getPropertyValue("height");
//     let w = compStyle.getPropertyValue("width");
//     setTimeout(function () {
//         element.style.top = y - parseInt(h) / 2 + "px";
//         element.style.left = x - parseInt(w) / 2 + "px";
//     }, 100);
// }

/**
 *
 * Tile parallax animations
 */

var maxWidth = 992;
function startAnimations() {
    if (window.innerWidth >= 720) {
        // animation to top of the page section
        gsap.set("#appService", { scale: 0.5, opacity: 0, left: "70%" });
        gsap.set("#brandingService", {
            scale: 0.5,
            opacity: 0,
            right: "70%",
        });
        gsap.set("#websiteService", { scale: 0.65, opacity: 1 });
    }

    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: "#services",
            start: "center center",
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
 * Words animations
 *
 */
function wordsAnimation() {
    var words = document.getElementsByClassName("word__item");
    var wordArray = [];
    var currentWord = 0;

    words[currentWord].style.opacity = 1;
    for (var i = 0; i < words.length; i++) {
        splitLetters(words[i]);
    }

    function changeWord() {
        var cw = wordArray[currentWord];
        var nw =
            currentWord == words.length - 1
                ? wordArray[0]
                : wordArray[currentWord + 1];
        for (var i = 0; i < cw.length; i++) {
            animateLetterOut(cw, i);
        }

        for (var i = 0; i < nw.length; i++) {
            nw[i].className = "letter behind";
            nw[0].parentElement.style.opacity = 1;
            animateLetterIn(nw, i);
        }

        currentWord = currentWord == wordArray.length - 1 ? 0 : currentWord + 1;
    }

    function animateLetterOut(cw, i) {
        setTimeout(function () {
            cw[i].className = "letter out";
        }, i * 80);
    }

    function animateLetterIn(nw, i) {
        setTimeout(function () {
            nw[i].className = "letter in";
        }, 340 + i * 80);
    }

    function splitLetters(word) {
        var content = word.innerHTML;
        word.innerHTML = "";
        var letters = [];
        for (var i = 0; i < content.length; i++) {
            var letter = document.createElement("span");
            letter.className = "letter";
            letter.innerHTML = content.charAt(i);
            word.appendChild(letter);
            letters.push(letter);
        }

        wordArray.push(letters);
    }

    setTimeout(function () {
        changeWord();

        setInterval(changeWord, 2000);
    }, 500);
}

// Start wordsAnimation delayed
setTimeout(function () {
    wordsAnimation();
}, 1700);

/**
 *
 * Scrolling jump
 *
 */
let allMenuItems = document.querySelectorAll(".js-menu a");
[].forEach.call(allMenuItems, function (item) {
    item.addEventListener("click", function (e) {
        var target = item.getAttribute("href");
        const targetEl = document.querySelector(target);
        const targetRect = targetEl.getBoundingClientRect();

        console.log(targetRect.top);

        gsap.to(bodyScrollBar, {
            scrollTo: targetRect.top,
            duration: 1
        });

        // if supported by the browser we can even update the URL.
        if (window.history && window.history.pushState) {
            history.pushState("", document.title, target);
        }
    });
});

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
