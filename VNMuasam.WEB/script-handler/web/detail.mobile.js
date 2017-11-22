$(document).ready(function () {
    var t = parseInt($("#product_id").val());
    new Swiper(".mod-slide", {
        pagination: ".swiper-pagination",
        paginationClickable: !0,
        nextButton: ".swiper-button-next",
        prevButton: ".swiper-button-prev",
        lazyLoading: !0,
        lazyLoadingInPrevNext: !0
    }),
    new Swiper(".vSwiper", {
        paginationClickable: !0,
        slidesPerView: 3.5,
        spaceBetween: 10,
        loop: !0,
        loopedSlides: 4,
        calculateHeight: !0,
        lazyLoading: !0,
        lazyLoadingInPrevNext: !0
    });
    $(".att_quantity_decrease").on("click", function (t) {
        var e = parseInt($(".att_quantity_val").val());
        if (t.preventDefault(),
        !(e > 1))
            return !1;
        e -= 1,
        $(".att_quantity_val").val(e)
    }),
    $(".att_quantity_increase").on("click", function (t) {
        var e = parseInt($(".att_quantity_val").val());
        if (t.preventDefault(),
        !(e >= 1))
            return !1;
        e += 1,
        $(".att_quantity_val").val(e)
    }),
    $(window).scroll(function () {
        $(window).scrollTop() > 100 ? $(".detail__nav").addClass("fixed") : $(".detail__nav").removeClass("fixed")
    });
    var e = $(".tech_detail_nav a")
      , a = $(".tech_detail_nav li").size()
      , i = $(".tech_detail_content");
    e.on("click", function (t) {
        t.preventDefault();
        var a = $(this).attr("href");
        e.removeClass("active"),
        $(this).addClass("active"),
        i.not(a).hide(),
        $(a).fadeIn()
    }),
    $(".tech_detail_nav").addClass("tech_detail_nav_" + a);
    var n = $(".detail__nav a")
      , r = $(".detail__content");
    n.on("click", function (t) {
        t.preventDefault();
        var e = $(this).attr("href")
          , a = $(".detail__nav li a.active")
          , i = a.attr("href");
        if (n.removeClass("active"),
        $(this).addClass("active"),
        r.not(e).hide(),
        a.parent().index() > $(this).parent().index())
            $(i).show(),
            $(i).css("position", "relative").css("right", "0"),
            $(i).animate({
                right: "-100%"
            }, 150, function () {
                $(i).css("right", 0).removeAttr("style").hide()
            }),
            $(e).show(),
            $(e).css("position", "relative").css("left", "-2500px"),
            $(e).animate({
                left: "0"
            }, 500);
        else {
            if (a.parent().index() == $(this).parent().index())
                return !1;
            $(i).show(),
            $(i).css("position", "relative").css("left", "0"),
            $(i).animate({
                left: "-100%"
            }, 150, function () {
                $(i).css("left", 0).removeAttr("style").hide()
            }),
            $(e).show(),
            $(e).css("position", "relative").css("right", "-2500px"),
            $(e).animate({
                right: "0"
            }, 500)
        }
    }),
    $(".in-detail-page").on("swipeleft", function (t) {
        var e = $(".detail__nav li a")
          , a = $(".detail__nav li:first-child a")
          , i = $(".detail__nav li a.active")
          , n = i.attr("href")
          , c = a.attr("href")
          , s = i.parent().next();
        if (dIndex = i.parent().next().children("a").attr("href"),
        !(i.parent().next("li").length > 0))
            return r.not(dIndex).hide(),
            e.removeClass("active"),
            a.trigger("click"),
            $(c).show(),
            !1;
        r.not(dIndex).hide(),
        e.removeClass("active"),
        s.children("a").trigger("click"),
        $(n).show(),
        $(n).css("position", "relative").css("left", "0"),
        $(n).animate({
            left: "-100%"
        }, 50, function () {
            $(n).css("left", 0).removeAttr("style").hide()
        }),
        $(dIndex).show(),
        $(dIndex).css("position", "relative").css("right", "-1500px"),
        $(dIndex).animate({
            right: "0"
        }, 600)
    }).on("swiperight", function (t) {
        var e = $(".detail__nav li a")
          , a = $(".detail__nav li:last-child a")
          , i = $(".detail__nav li a.active")
          , n = i.attr("href")
          , c = a.attr("href")
          , s = i.parent().prev();
        if (dIndex = i.parent().prev().children("a").attr("href"),
        !(i.parent().prev("li").length > 0))
            return r.not(dIndex).hide(),
            e.removeClass("active"),
            a.trigger("click"),
            $(c).show(),
            !1;
        r.not(dIndex).hide(),
        e.removeClass("active"),
        s.children("a").trigger("click"),
        $(n).show(),
        $(n).css("position", "relative").css("right", "0"),
        $(n).animate({
            right: "-100%"
        }, 50, function () {
            $(n).css("right", 0).removeAttr("style").hide()
        }),
        $(dIndex).show(),
        $(dIndex).css("position", "relative").css("left", "-1500px"),
        $(dIndex).animate({
            left: "0"
        }, 600)
    }),
    $(".in-detail-page .mod-slides").on("click", function (t) {
        t.preventDefault(),
        $(this).toggleClass("fixed")
    }),
    $(".detail__content .param img").one("click", function (t) {
        t.preventDefault(),
        $(this).wrap("<div class='detail__wrap-img'></div>")
    }),
    $(".detail__content").on("click", ".detail__wrap-img", function (t) {
        t.preventDefault(),
        $(this).toggleClass("fixed")
    }),
    $(".sys_btn_like_product").on("click dbclick", function () {
        customer.addProductCustomerLike(t)
    }),
    $(".sys_btn_unlike_product").on("click dbclick", function () {
        customer.removeProductCustomerLike(t)
    }),
    //comment.loadComment(1, t),
    $("#sys_send_comment").on("click dbclick", function () {
        comment.createNewComment(t)
    }),
    $("#sys_load_comment").on("click dbclick", function () {
        var e = $(this).attr("data-page");
        comment.loadComment(e, t)
    }),
    $("#sys_quantity").on("keydown", function (t) {
        -1 !== $.inArray(t.keyCode, [46, 8, 9, 27, 13, 110, 190]) || /65|67|86|88/.test(t.keyCode) && (!0 === t.ctrlKey || !0 === t.metaKey) || 35 <= t.keyCode && 40 >= t.keyCode || (t.shiftKey || 48 > t.keyCode || 57 < t.keyCode) && (96 > t.keyCode || 105 < t.keyCode) && t.preventDefault()
    }),
    $(".sys_btn_order").on("click dbclick", function () {
        var e = parseInt($("#sys_quantity").val())
          , a = 0
          , i = 0;
        0 != e && void 0 != e || cart.openPopupIn("Bạn chưa chọn số lượng sản phẩm cần mua.");
        var n = $(".sys_size_item")
          , r = $(".sys_img_thumb_color");
        if (n.length > 0) {
            var c = 0;
            if (n.each(function () {
                if ($(this).hasClass("active"))
                    return 0 == (a = parseInt($(this).attr("data-attr-id"))) && NaN == a || (c = 1),
                    !1
            }),
            0 == c)
                return cart.openPopupIn("Bạn chưa chọn size sản phẩm"),
                !1
        }
        if (r.length > 0) {
            var s = 0;
            if (r.each(function () {
                if ($(this).hasClass("active"))
                    return 0 == (i = parseInt($(this).attr("data-attr-id"))) && NaN == i || (s = 1),
                    !1
            }),
            0 == s)
                return cart.openPopupIn("Bạn chưa chọn màu sản phẩm"),
                !1
        }
        var o = parseInt($("#product_id").val());
        cart.addCart(o, e, a, i, ""),
        DEVMODE || (ga("require", "ec"),
        ga("ec:addProduct", {
            id: t,
            name: $("#ga_product_name").val(),
            category: $("#ga_category_id").val(),
            price: $("#ga_product_price").val(),
            quantity: e
        }),
        ga("ec:setAction", "add"),
        ga("send", "event", "UX", "click", "add to cart"))
    }),
    $(".sys_btn_payment").on("click dbclick", function () {
        var e = parseInt($("#sys_quantity").val())
          , a = 0
          , i = 0;
        0 != e && void 0 != e || cart.openPopupIn("Bạn chưa chọn số lượng sản phẩm cần mua.");
        var n = $(".sys_size_item")
          , r = $(".sys_img_thumb_color");
        if (n.length > 0) {
            var c = 0;
            if (n.each(function () {
                if ($(this).hasClass("active"))
                    return 0 == (a = parseInt($(this).attr("data-attr-id"))) && NaN == a || (c = 1),
                    !1
            }),
            0 == c)
                return cart.openPopupIn("Bạn chưa chọn size sản phẩm"),
                !1
        }
        if (r.length > 0) {
            var s = 0;
            if (r.each(function () {
                if ($(this).hasClass("active"))
                    return 0 == (i = parseInt($(this).attr("data-attr-id"))) && NaN == i || (s = 1),
                    !1
            }),
            0 == s)
                return cart.openPopupIn("Bạn chưa chọn màu sản phẩm"),
                !1
        }
        var o = parseInt($("#product_id").val());
        cart.createCartAndTransaction(o, e, a, i, ""),
        DEVMODE || (ga("require", "ec"),
        ga("ec:addProduct", {
            id: t,
            name: $("#ga_product_name").val(),
            category: $("#ga_category_id").val(),
            price: $("#ga_product_price").val(),
            quantity: e
        }),
        ga("ec:setAction", "add"),
        ga("send", "event", "UX", "click", "add to cart"))
    }),
    $("#sys_quantity2").length > 0 && $("#sys_quantity2").on("keyup change", function () {
        $(this).attr({
            width: "auto",
            size: $(this).val().length
        })
    })
});
