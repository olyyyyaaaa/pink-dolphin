// #topnav1

function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}


function myFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("mySearch");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myMenu");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}


// ===========#menu==============\

function myFunction1() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("mySearch-1");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myMenu-1");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}


// ======================menu-2====================

$(document).ready(function ($) {
    "use strict";


    var book_table = new Swiper(".book-table-img-slider", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        speed: 2000,
        effect: "coverflow",
        coverflowEffect: {
            rotate: 3,
            stretch: 2,
            depth: 100,
            modifier: 5,
            slideShadows: false,
        },
        loopAdditionSlides: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    var team_slider = new Swiper(".team-slider", {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        speed: 2000,

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1.2,
            },
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 3,
            },
        },
    });

    jQuery(".filters").on("click", function () {
        jQuery("#menu-dish").removeClass("bydefault_show");
    });
    $(function () {
        var filterList = {
            init: function () {
                $("#menu-dish").mixItUp({
                    selectors: {
                        target: ".dish-box-wp",
                        filter: ".filter",
                    },
                    animation: {
                        effects: "fade",
                        easing: "ease-in-out",
                    },
                    load: {
                        filter: ".all, .breakfast, .lunch, .dinner",
                    },
                });
            },
        };
        filterList.init();
    });

    jQuery(".menu-toggle").click(function () {
        jQuery(".main-navigation").toggleClass("toggled");
    });

    jQuery(".header-menu ul li a").click(function () {
        jQuery(".main-navigation").removeClass("toggled");
    });

    gsap.registerPlugin(ScrollTrigger);

    var elementFirst = document.querySelector('.site-header');
    ScrollTrigger.create({
        trigger: "body",
        start: "30px top",
        end: "bottom bottom",

        onEnter: () => myFunction(),
        onLeaveBack: () => myFunction(),
    });

    function myFunction() {
        elementFirst.classList.toggle('sticky_head');
    }

    var scene = $(".js-parallax-scene").get(0);
    var parallaxInstance = new Parallax(scene);


});


jQuery(window).on('load', function () {
    $('body').removeClass('body-fixed');

    //activating tab of filter
    let targets = document.querySelectorAll(".filter");
    let activeTab = 0;
    let old = 0;
    let dur = 0.4;
    let animation;

    for (let i = 0; i < targets.length; i++) {
        targets[i].index = i;
        targets[i].addEventListener("click", moveBar);
    }

    // initial position on first === All 
    gsap.set(".filter-active", {
        x: targets[0].offsetLeft,
        width: targets[0].offsetWidth
    });

    function moveBar() {
        if (this.index != activeTab) {
            if (animation && animation.isActive()) {
                animation.progress(1);
            }
            animation = gsap.timeline({
                defaults: {
                    duration: 0.4
                }
            });
            old = activeTab;
            activeTab = this.index;
            animation.to(".filter-active", {
                x: targets[activeTab].offsetLeft,
                width: targets[activeTab].offsetWidth
            });

            animation.to(targets[old], {
                color: "#0d0d25",
                ease: "none"
            }, 0);
            animation.to(targets[activeTab], {
                color: "#fff",
                ease: "none"
            }, 0);

        }

    }
});



new Vue({
    el: "#app",
    data() {
        return {
            currentCardBackground: Math.floor(Math.random() * 25 + 1), // just for fun :D
            cardName: "",
            cardNumber: "",
            cardMonth: "",
            cardYear: "",
            cardCvv: "",
            minCardYear: new Date().getFullYear(),
            amexCardMask: "#### ###### #####",
            otherCardMask: "#### #### #### ####",
            cardNumberTemp: "",
            isCardFlipped: false,
            focusElementStyle: null,
            isInputFocused: false
        };
    },
    mounted() {
        this.cardNumberTemp = this.otherCardMask;
        document.getElementById("cardNumber").focus();
    },
    computed: {
        getCardType() {
            let number = this.cardNumber;
            let re = new RegExp("^4");
            if (number.match(re) != null) return "visa";

            re = new RegExp("^(34|37)");
            if (number.match(re) != null) return "amex";

            re = new RegExp("^5[1-5]");
            if (number.match(re) != null) return "mastercard";

            re = new RegExp("^6011");
            if (number.match(re) != null) return "discover";

            re = new RegExp('^9792')
            if (number.match(re) != null) return 'troy'

            return "visa"; // default type
        },
        generateCardNumberMask() {
            return this.getCardType === "amex" ? this.amexCardMask : this.otherCardMask;
        },
        minCardMonth() {
            if (this.cardYear === this.minCardYear) return new Date().getMonth() + 1;
            return 1;
        }
    },
    watch: {
        cardYear() {
            if (this.cardMonth < this.minCardMonth) {
                this.cardMonth = "";
            }
        }
    },
    methods: {
        flipCard(status) {
            this.isCardFlipped = status;
        },
        focusInput(e) {
            this.isInputFocused = true;
            let targetRef = e.target.dataset.ref;
            let target = this.$refs[targetRef];
            this.focusElementStyle = {
                width: `${target.offsetWidth}px`,
                height: `${target.offsetHeight}px`,
                transform: `translateX(${target.offsetLeft}px) translateY(${target.offsetTop}px)`
            }
        },
        blurInput() {
            let vm = this;
            setTimeout(() => {
                if (!vm.isInputFocused) {
                    vm.focusElementStyle = null;
                }
            }, 300);
            vm.isInputFocused = false;
        }
    }
});

