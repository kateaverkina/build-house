$(document).ready(function () {

    new WOW({
        animateClass: 'animate__animated'
    }).init();


    new Swiper(".swiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 2,
        autoplay: {
            delay: 3000
        },

        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 4,
        },
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },

        breakpoints: {
            850: {
                slidesPerView: 2,
            },
            320: {
                slidesPerView: 1,
                spaceBetween: 0,
            }
        }
    });

    function showInfo () {
        $('.swiper-slide-info').css('display', 'flex');
    }
    let swiperSlide = $('.swiper-slide');

    swiperSlide.each(() => {
        if (swiperSlide.hasClass('swiper-slide-active')) {
           showInfo();
        }
    })


    $('.magnific-popup').magnificPopup({
        type: 'image',
    });


    let more = $('.more');
    function showMore() {
            $('.more-projects').show();
            more.hide();
    }
    more.on('click', showMore);


    let projects = $('.projects');
    function scrollDown() {
        projects[0].scrollIntoView({behavior: "smooth"});
    }

    $('.arrow').on('click', scrollDown);


    let order = $('.order');
    function getConsultation() {
        $('html, body').animate({
            scrollTop: order.offset().top
        }, 4000);
    }

    $('.phone-call').on('click', getConsultation);
    $('.main-btn').on('click', getConsultation);
    $('.project-btn').on('click', getConsultation);
    $('.step-order').on('click', getConsultation);


    let menu = $('.menu');
    function menuOpen() {
        menu.addClass('animate__animated animate__fadeInLeft');
        menu.show();
    }
    function menuClose() {
        menu.hide();
    }

    $('.burger').on('click', menuOpen);

    $('.close').on('click', menuClose);


    let menuItem = $('.menu-item');
    let menuItemCatalog = $('#menu-item-catalog');
    let menuItemProjects = $('#menu-item-projects');
    let menuItemTechnologies = $('#menu-item-technologies');
    let menuItemTerms = $('#menu-item-terms');
    let menuItemFeedback = $('#menu-item-feedback');

    function menuItemAddActive (menuItemActive) {
        menuItem.removeClass('menu-item-active');
        menuItemActive.addClass('menu-item-active');
    }

    menuItemCatalog.on('click', () => {
        menuItemAddActive(menuItemCatalog);
    });

    menuItemProjects.on('click', () => {
        menuItemAddActive(menuItemProjects);
        scrollDown();
    });

    menuItemTechnologies.on('click', () => {
        menuItemAddActive(menuItemTechnologies);
        $('html, body').animate({
            scrollTop: $('.technologies').offset().top
        }, 3000);
    });

    menuItemTerms.on('click', () => {
        menuItemAddActive(menuItemTerms);
        $('html, body').animate({
            scrollTop: $('.terms').offset().top
        }, 4000);
    });

    menuItemFeedback.on('click', () => {
        menuItemAddActive(menuItemFeedback);
    });

    let technologyDot = $('.technology-dot');
    let technology = $('.technology');
    
    function removeActiveDot() {
        technologyDot.removeClass('active-dot');
        technology.css('display', 'none');
    }

    technologyDot.each((index, dot) => {
        $(dot).on('click', () => {
            removeActiveDot();
            $(dot).addClass('active-dot');
            $(technology[index]).css('display', 'block');
        })
    })

    let popup = $('.popup');
    function showPopup() {
        popup.addClass('popup-active');
        popup.show();
    }

    function hidePopup() {
        popup.hide();
    }

    $('.map-btn').on('click', showPopup);

    $('.popup-close').on('click', hidePopup);


    let loader = $('.loader');
    function loaderOpen() {
        loader.css('display', 'flex');
    }

    function loaderClose() {
        loader.hide();
    }

    function hideForm() {
        $('#order-form').remove();
        $('.order-image').remove();
        $('#order-success').show();
    }

    function hideFormPopup() {
        $('#popup-form').remove();
        $('#popup-success').show();
    }


    let phone = $('.input-phone');
    phone.inputmask({"mask": "(999) 999-9999"});


    function formValidation (name, phone, checkbox, checkboxText, callback) {
        let hasError = false;

        $('.error-input').hide();

        if (!name.val()) {
            name.css('border-color', 'red');
            name.next().show();
            hasError = true;
        } else if (name.val()) {
            name.css('border-color', 'white');
        }
        if (!phone.val()) {
            phone.css('border-color', 'red');
            phone.next().show();
            hasError = true;
        } else if (phone.val()) {
            phone.css('border-color', 'white');
        }

        if (!checkbox.prop('checked')) {
            checkboxText.css('color', 'red');
            hasError = true;
        } else if (checkbox.prop('checked')) {
            checkboxText.css('color', 'white');
        }

        if (!hasError) {
            loaderOpen();
            $.ajax({
                method: "POST",
                url: "https://testologia.site/checkout",
                data: {name: name.val(), phone: phone.val()}
            })
                .done(function (msg) {
                    setTimeout(() => {
                        loaderClose();
                        console.log(msg);
                        if (msg.success) {
                            callback();
                        } else {
                            alert("Возникла ошибка");
                        }
                    }, 1000);
                });
            clearForm();

        }

        function clearForm() {
            name.val("");
            phone.val("");
            checkbox.prop('checked', false);
        }
    }

    $('#submit').on('click', () => {
        let name = $('#name');
        let phone = $('#input-phone');
        let checkbox = $('#checkbox-input');
        let checkboxText = $('#checkbox-text');

        formValidation(name, phone, checkbox, checkboxText, hideForm);
    });

    $('#popup-submit').on('click', () => {
        let name = $('#name-popup');
        let phone = $('#input-phone-popup');
        let checkbox = $('#checkbox-input-popup');
        let checkboxText = $('#checkbox-text-popup');

        formValidation(name, phone, checkbox, checkboxText, hideFormPopup);
    });

});





