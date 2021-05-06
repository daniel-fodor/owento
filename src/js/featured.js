/**
 *
 * Powr-Full featured.js
 *
 *
 */

let locoScroll;

window.onload = (event) => {

    scrollBarInit();

};

function scrollBarInit() {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    locoScroll = new LocomotiveScroll({
        el: document.querySelector(".scroller"),
        smooth: true,
        lerp: 0.05,
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

    imagesLoaded(document.querySelector(".page-wrapper"), function (instance) {
        ScrollTrigger.refresh();

        // animations
        actionbgToWhite();
        actionHero();
        actionFeatured01();
        actionFeatured02();
        actionFeatured03();
        actionFeatured04();
    });
}

/**
 * Set background white when scrolling over the dashboard
 */
function actionbgToWhite() {
    const blockThree = document.querySelector(".featured-block--03");
    const page = document.querySelector(".page--subpage");

    gsap.to(page, 1, {
        backgroundColor: "#fff",
        scrollTrigger: {
            trigger: blockThree,
            start: "top 90%",
            toggleActions: "play none none reverse"
        },
    });
}

function actionHero() {
    const logo = document.querySelector(".hero--featured__logo");
    const coinBadge1 = document.querySelector(".coin-badge--1");
    const coinBadge2 = document.querySelector(".coin-badge--2");

    gsap.to(logo, 1.5, {
        opacity: 1,
        y: 0,
        delay: 0.2
    });

    // badges
    gsap.to(coinBadge1, 2, {
        opacity: 1,
        y: 0,
        delay: 0.7,
        ease: Expo.easeOut
    });

    gsap.to(coinBadge2, 2, {
        opacity: 1,
        y: 0,
        delay: 1,
        ease: Expo.easeOut
    });

}

function actionFeatured01() {
    const featuredBlock01 = document.querySelector(".featured-block--01");
    const blockTitle = document.querySelector(".featured-block--01 .block-title");
    const blockTitleNumber = document.querySelector(".featured-block--01 .block-title .number");
    const coverImg = document.querySelector(".featured-block--01 .cover-img");


    gsap.to(blockTitle, 2, {
        opacity: 1,
        x: 0,
        scrollTrigger: {
            trigger: featuredBlock01,
            start: "top 90%",
            end: "center 0%",
            scrub: 1,
        },
    });

    gsap.to(coverImg, 2, {
        opacity: 1,
        y: 0,
        scrollTrigger: {
            trigger: featuredBlock01,
            start: "top 90%",
        },
    });

    gsap.to(blockTitleNumber, 1.5, {
        y: 0,
        scrollTrigger: {
            trigger: featuredBlock01,
            start: "top 20%",
        },
    });

}

function actionFeatured02() {
    const featuredBlock02 = document.querySelector(".featured-block--02");
    const blockTitle = document.querySelector(".featured-block--02 .block-title");
    const projectValues = document.querySelectorAll(".project-values__item");
    const blockTitleNumber = document.querySelector(".featured-block--02 .block-title .number");

    gsap.to(blockTitle, 2, {
        opacity: 1,
        x: 0,
        scrollTrigger: {
            trigger: featuredBlock02,
            start: "top 90%",
            end: "+=900px",
            scrub: 1,
        },
    });

    gsap.to(projectValues, 1.5, {
        opacity: 1,
        y: 0,
        stagger: 0.35,
        scrollTrigger: {
            trigger: featuredBlock02,
            start: "center 90%",
        },
    });

    gsap.to(blockTitleNumber, 1.5, {
        y: 0,
        scrollTrigger: {
            trigger: featuredBlock02,
            start: "top 90%",
        },
    });

}

function actionFeatured03() {
    const featuredBlock03 = document.querySelector(".featured-block--03");
    const blockTitle = document.querySelector(".featured-block--03 .block-title");
    const dashboardImg = document.querySelector(".featured-block--03 .img-wrapper");
    const moreScreensParent = document.querySelectorAll(".featured-block--03 .more-screens");
    const moreScreens = document.querySelectorAll(".featured-block--03 .more-screens-col");
    const blockTitleNumber = document.querySelector(".featured-block--03 .block-title .number");

    gsap.to(blockTitle, 2, {
        opacity: 1,
        x: 0,
        scrollTrigger: {
            trigger: featuredBlock03,
            start: "top 100%",
            end: "+=800px",
            scrub: 1
        },
    });

    gsap.to(dashboardImg, 1.5, {
        opacity: 1,
        y: 0,
        scrollTrigger: {
            trigger: featuredBlock03,
            start: "top 20%",
        },
    });

    gsap.to(moreScreens, 1.5, {
        opacity: 1,
        x: 0,
        scrollTrigger: {
            trigger: moreScreensParent,
            start: "top 100%"
        },
    });

    gsap.to(blockTitleNumber, 1.5, {
        y: 0,
        scrollTrigger: {
            trigger: featuredBlock03,
            start: "top 80%",
        },
    });
}


function actionFeatured04() {
    const featuredBlock04 = document.querySelector(".featured-block--04");
    const blockTitle = document.querySelector(".featured-block--04 .block-title");
    const blockTitleNumber = document.querySelector(".featured-block--04 .block-title .number");

    gsap.to(blockTitle, 2, {
        opacity: 1,
        x: 0,
        scrollTrigger: {
            trigger: featuredBlock04,
            start: "top 90%",
            end: "+=80%",
            scrub: 1
        },
    });

    gsap.to(blockTitleNumber, 1.5, {
        y: 0,
        scrollTrigger: {
            trigger: featuredBlock04,
            start: "top 90%",
        },
    });

}

