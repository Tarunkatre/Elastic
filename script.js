function init() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });


    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

    document.addEventListener("wheel", function (dets) {

        if (dets.deltaY > 0) {
            gsap.to("#nav", {
                top: "-100px",
                duration: .3,
                ease: Power0.easeNone,
            })
        }

        if (dets.deltaY < 0) {
            gsap.to("#nav", {
                top: "0px",
                duration: .3,
                ease: Power0.easeNone,
            })
        }

    })

}
init();


gsap.to("#loader img", {
    opacity: 1,
    stagger: 0.2    ,
    zIndex:1000
})
gsap.to("#nav", {
    opacity: 1,
    delay: 4,
})

gsap.to("#loader", {
    transform: "translateY(-100%)",
    duration: 1.5,
    delay: 3.5,
    ease: "cubic - bezier(0.19, 1, 0.22, 1)",
})
gsap.from("#container1 h2", {
    transform: "translateY(100%)",
    delay: 4,
    duration: 1.5,
    stagger: 0.1,
})
gsap.to("#page2", {
    transform: "scaleX(1)",
    scrollTrigger: {
        trigger: "#page2",
        scroller: "#main",
        start: "top 90%",
        end: "top 20%",
        scrub: 1,
    }
})
gsap.to("#box7 h1", {
    transform: "translateX(-162%)",
    duration: 2,
    scrollTrigger: {
        trigger: "#page7",
        scroller: "#main",
        start: "bottom bottom",
        end: "bottom top",
        scrub: 2,
        pin: true,
        anticipatePin: 1,
    }
})
gsap.from("#page3 h1", {
    opacity: 0,
    duration: 0.5,
    transform: "translateY(100%)",
    stagger: 0.2,
    scrollTrigger: {
        trigger: "#page3",
        scroller: "#main",
        start: "top 60%",
        end: "top 60%",
    }
})
gsap.from("#page9 h1", {
    opacity: 0,
    duration: 1,
    transform: "translateY(100%)",
    stagger: 0.2,
    scrollTrigger: {
        trigger: "#page9",
        scroller: "#main",
        start: "top 60%",
        end: "top 60%",
    }
})
 




