let owlCarouselHandler = {
    init: function () {
        this.expert();
        this.quote();
    },
    expert: function () {
        const expertCarousel = $("#expert-carousel");

        expertCarousel.owlCarousel({
            dots: false,
            loop: true,
            autoplay: true,
            autoplayTimeout: 2000,
            responsive: {
                0: {
                    items: 1,
                },
                768: {
                    items: 2,
                },
                1024: {
                    items: 3,
                }
            }
        });
    },
    quote: function () {
        const  quoteCarousel = $("#quote-carousel");

        let owl = quoteCarousel.owlCarousel(
            {
                items: 1,
                loop: true,
                autoplay: true,
                autoplayTimeout: 2000,
                dots: true,
                dotsContainer: '#carousel-custom-dots',
                nav: false,
                dotsEach: true,
                dotsData: true
            }
        );

        $(".owl-dot").click(function () {
            owl.trigger("to.owl.carousel", [$(this).index(), 300]);
        });

        owl.on('changed.owl.carousel', function() {
            let items = document.querySelectorAll(".owl-dot");

            // set opacity 0.6 for not active
            items.forEach(item => {
                item.style.opacity = "0.6";
            });

            // set opacity 1 for not active
            let activeItem = document.querySelector(".owl-dot.active");
            activeItem.style.opacity = "1";
        });
    }
};

$(document).ready(function () {
    owlCarouselHandler.init();
});

let animationHandler = {
    counter: function () {
        let counterNumbers = document.querySelectorAll(".count-number"),
            animateValue = function(counterNumber) {
            let data = counterNumber.getAttribute("data-to"),
                speed = counterNumber.getAttribute("data-speed"),
                current = 0;

            const stepTime = Math.abs(Math.floor(speed / data)),
                timer = setInterval(function () {
                    current = current + 1;
                    counterNumber.innerHTML = current + "";
                    if (current == data) {
                        clearInterval(timer);
                    }
                }, stepTime);
        };

        counterNumbers.forEach(counterNumber => {
            animateValue(counterNumber);
        });
    },
    progress: function () {
        let progressList = document.querySelectorAll(".progress");

        let progressAnimation = function(progressItem) {
            let valueOfPercent = progressItem.getAttribute("data-value"),
                progressBar = progressItem.querySelector(".progress-bar");

            let currentValue = 0;

            let idleTimer = setInterval(() => {
                currentValue++;

                if (currentValue == valueOfPercent) {
                    clearInterval(idleTimer);
                    idleTimer = null;
                }

                progressBar.style.width = currentValue + "%";
                progressBar.innerText = currentValue + "%";

            }, 20);
        };

        progressList && progressList.forEach(progressItem => {
            progressAnimation(progressItem);
        });
    }
};

//region handle for menu section
let headerHandler = {
    init: function() {
        this.clickButton();
        this.menuCollapse();
    },
    clickButton: function() {
        const btnHamburger = document.querySelector("#btn-hamburger"),
            menuList = document.querySelector("#nav-mobile");

        btnHamburger.addEventListener("click", () => {
            menuList.classList.toggle("collapse");
        });
    },
    menuCollapse: function () {
        const itemLinks = document.querySelectorAll("#nav-mobile .nav__item.drop-down .item__link");
        itemLinks && itemLinks.forEach(itemLink => {
            itemLink.addEventListener("click", function () {
                let dropDown = itemLink.nextElementSibling;
                dropDown.classList.toggle("collapse");
                itemLink.classList.toggle("collapse");
            })
        });

        const itemLinksLevels_1 = document.querySelectorAll("#nav-mobile .nav__item.drop-down .item__link--level-1");
        itemLinksLevels_1 && itemLinksLevels_1.forEach(itemLinksLevel_1 => {
            itemLinksLevel_1.addEventListener("click", function () {
                let dropDown = itemLinksLevel_1.nextElementSibling;
                dropDown.classList.toggle("collapse");
                itemLinksLevel_1.classList.toggle("collapse");
            })
        });
    }
};

let preLoader = {
    init: function () {
        this.active();
    },
    active: function () {
        setTimeout(() => {
            const preLoader = document.querySelector(".preloader");
            if (preLoader) {
                preLoader.style.display = "none";
            }
        }, 4000);
    }
};

const wow = {
    init: function() {
      this.wowJS();
    },
    wowJS: function () {
        const items = document.querySelectorAll('.wow');

        function wowEffect(entry) {
            entry.style.visibility = 'visible';

            const nameOfAnimation =  entry.getAttribute("animation-name");

            if (nameOfAnimation) {
                animationHandler[nameOfAnimation]();
            } else {
                const animationName = entry.dataset.animate,
                    durations = entry.dataset.duration || 1,
                    timingFunction = entry.dataset.timing || 'ease-out',
                    animationIterations = entry.dataset.type || 'forwards',
                    delays = entry.dataset.delay || 0;

                entry.style.animation = `${animationName} ${durations}s ${timingFunction} ${animationIterations} ${delays}s`;
            }
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    wowEffect(entry.target);
                    observer.unobserve(entry.target);
                }
            })
        });

        items.forEach(item => {
            item.style.visibility = 'hidden';
            observer.observe(item);
        })
    }
};

preLoader.init();
headerHandler.init();
wow.init();