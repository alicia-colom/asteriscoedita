var appMaster = {

    preLoader: function(){
        imageSources = []
        $('img').each(function() {
            var sources = $(this).attr('src');
            imageSources.push(sources);
        });
        if($(imageSources).load()){
            $('.pre-loader').fadeOut('slow');
        }
    },

    smoothScroll: function() {
        // Smooth Scrolling
        $('a[href*=#]:not([href=#carousel-example-generic])').click(function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {

                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    },

    reviewsCarouselOwl: function() {
      $("#owl-blog").owlCarousel({
        items: 4
      });
    },

    /*
    reviewsCarousel: function() {
        // Reviews Carousel
        $('.review-filtering').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 5000
        });
    },
    */
    screensCarousel: function() {
        // Screens Carousel
        $('.filtering').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            dots: false,
            responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            }, {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }, {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        });

        $('.js-filter-all').on('click', function() {
            $('.filtering').slickUnfilter();
            $('.filter a').removeClass('active');
            $(this).addClass('active');
        });

        $('.js-filter-one').on('click', function() {
            $('.filtering').slickFilter('.one');
            $('.filter a').removeClass('active');
            $(this).addClass('active');
        });

        $('.js-filter-two').on('click', function() {
            $('.filtering').slickFilter('.two');
            $('.filter a').removeClass('active');
            $(this).addClass('active');
        });

        $('.js-filter-three').on('click', function() {
            $('.filtering').slickFilter('.three');
            $('.filter a').removeClass('active');
            $(this).addClass('active');
        });

        $('.js-filter-four').on('click', function() {
            $('.filtering').slickFilter('.four');
            $('.filter a').removeClass('active');
            $(this).addClass('active');
        });
    },

    animateScript: function() {
        $('.scrollpoint.sp-effect1').waypoint(function(){$(this).toggleClass('active');$(this).toggleClass('animated fadeInLeft');},{offset:'100%'});
        $('.scrollpoint.sp-effect2').waypoint(function(){$(this).toggleClass('active');$(this).toggleClass('animated fadeInRight');},{offset:'100%'});
        $('.scrollpoint.sp-effect3').waypoint(function(){$(this).toggleClass('active');$(this).toggleClass('animated fadeInDown');},{offset:'100%'});
        $('.scrollpoint.sp-effect4').waypoint(function(){$(this).toggleClass('active');$(this).toggleClass('animated fadeIn');},{offset:'100%'});
        $('.scrollpoint.sp-effect5').waypoint(function(){$(this).toggleClass('active');$(this).toggleClass('animated fadeInUp');},{offset:'100%'});
    },

    revSlider: function() {

        var docHeight = $(window).height();


        var mainSlider = $('.tp-banner').revolution({
            delay: 9000,
            startwidth: 1170,
            startheight: docHeight,
            hideThumbs: 10,
            touchenabled: false,
            fullWidth: "on",
            hideTimerBar: "on",
            fullScreen: "on",
            onHoverStop: "off",
            fullScreenOffsetContainer: ""
        });

    },
/* Hemos desactivado esta opcion para que el menu sea estatico.

    scrollMenu: function(){
        var num = 50; //number of pixels before modifying styles

        $(window).bind('scroll', function () {
            if ($(window).scrollTop() > num) {
                $('nav').addClass('scrolled');

            } else {
                $('nav').removeClass('scrolled');
            }
        });
    },
*/
    placeHold: function(){
        // run Placeholdem on all elements with placeholders
        Placeholdem(document.querySelectorAll('[placeholder]'));
    },

    contactForm: function(){
      $('#contact-form').validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            },
            message: {
                required: true,
                minlength: 2
            }
        },
        messages: {
            name: {
                required: "¿No tienes nombre?",
                minlength: "Tu nombre debe tener al menos dos caracteres"
            },
            email: {
                required: "Si no nos indicas tu email no podremos contactar contigo",
                email: "El email que nos has indicado parece no ser válido"
            },
            message: {
                required: "Debes indicarnos en qué podemos ayudarte",
                minlength: "¿Eso es todo?"
            }
        },
        submitHandler: function(form) {
            $(form).ajaxSubmit({
                type:"POST",
                data: $(form).serialize(),
                url:"send_email_contact.php",
                success: function() {
                    //$('#contact :input').attr('disabled', 'disabled');
                    //$('#contact-form').fadeTo( "slow", 0.15, function() {
                        //$(this).find(':input').css('cursor','default');
                        //$(this).find('label').css('cursor','default');
                        $('#success-form').fadeIn("slow",1);
                    //});
                },
                error: function() {
                    //$('#contact-form').fadeTo( "slow", 0.15, function() {
                        $('#error-form').fadeIn("slow",1);
                    //});
                }
            });
          }
        });
      }
}; // AppMaster


$(document).ready(function() {

    appMaster.smoothScroll();

    appMaster.reviewsCarouselOwl();

    appMaster.screensCarousel();

    appMaster.animateScript();

    appMaster.revSlider();

/* Hemos desactivado esta opcion para que el menu sea estatico.
    appMaster.scrollMenu();
*/

    appMaster.placeHold();

    appMaster.contactForm();
});
