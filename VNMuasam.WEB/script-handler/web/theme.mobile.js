
$(function () {
    $(".h-cate-item.dock-bottom").hover(function () {
        $(this).toggleClass('active');
    });
    $(".menu-expand").length > 0 && $(".menu-expand").on("click", function (e) {
        e.preventDefault(),
        $(".expand-wrapper").toggleClass("is-open"),
        $(".icon_search").removeClass("active"),
        $(this).toggleClass("active")
    });
    $(".icon_search").on('click', function () {
        $(".expand-wrapper").removeClass('is-open');
        $(".header__search-input").trigger('click');
        $(".header__search-input").focus();
        $(".in-home-page .fixed-nav li a").removeClass('active');
        $(this).addClass('active');
        if ($(".header__search").hasClass('fixed')) {
            $(".go-home").on('click', function (e) {
                e.preventDefault();
                $('.header__search_close').trigger('click');
            });
        }
    });
    $(".header__submenu").on("click", function (e) {
        e.preventDefault(),
        $(".header__dropdown").fadeToggle("fast")
    });
    $(".sys_lazy_load").length > 0 && $(".sys_lazy_load").lazyload({
        effect: "fadeIn",
        threshold: 50
    });
    $("#back2top").length > 0 && ($(window).scroll(function () {
        $(window).scrollTop() > 20 ? $("#back2top").fadeIn() : $("#back2top").fadeOut()
    }));
    $("#back2top").click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 500)
    });
    $(".header__search").length > 0 && ($(".header__search").on("click", ".header__search-input", function (e) {
        e.preventDefault(),
        $("body").addClass("is-fixed"),
        $(this).parent().addClass("fixed");
        var a = $(this).offset().top;
        $("html, body").animate({
            scrollTop: a - 10
        }, "slow")
    }));
    $(".header__search_close").on("click", function (e) {
        e.preventDefault(),
        $(".header__search_clear").hide(),
        $("body").removeClass("is-fixed"),
        $(".header__search").removeClass("fixed"),
        $("html, body").animate({
            scrollTop: 0
        }, "slow"),
        $(".header__search_typing").hide(),
        $(".container-page").hasClass("in-home-page") || $(".header__search").addClass("header__search-hide"),
        $(".icon_search").removeClass("active")
    }); 
    $(".header__search_clear").on("click", function (e) {
        e.preventDefault(),
        $(this).hide(),
        $(".header__search-input").val(""),
        $(".header__search_typing").hide(),
        $(".header__search_typing").find("ul").html("")
    });
});