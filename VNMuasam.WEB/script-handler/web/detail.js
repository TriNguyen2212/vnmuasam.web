call_ajax = false;
var arr4Tab = ['#thong-tin-chung', '#thong-so-ky-thuat', '#chinh-sach-doi-tra', '#chinh-sach-bao-hanh'];
var storePopupContent;
$(document).ready(function () {
    //var open_order = jQuery.cookie('open_orders');
    //var open_combo = jQuery.cookie('open_combo');
    //var dt_combo = jQuery.cookie('data_combo');
    //var size_order = jQuery.cookie('size_orders');
    //var color_order = jQuery.cookie('color_orders');
    //var supplier_id = parseInt($("#supplier_id").val());
    //var product_id = parseInt($('#product_id').val());
    //var link_detail = $('#link_detail').val();
    //var product_name = $("#ga_product_name").val();
    //console.log(link_detail);
    var sys_input_check_dbt = $(".sys_input_check_dbt");
    //var dataEmit = "2015,9,22,10,0,0";
    //var arrDateData = dataEmit.split(",");
    //var destDay = new Date(arrDateData[0], arrDateData[1] - 1, arrDateData[2], arrDateData[3], arrDateData[4], arrDateData[5]);
    //window.history.pushState(null, null, link_detail + location.search + location.hash);
    //comment.loadComment(1, product_id);
    //customer.loadRatting(1, product_id);
    //console.log('DevMode:' + DEVMODE);
    //if (!DEVMODE) {
    //    ga('require', 'ec');
    //    ga('ec:addProduct', {
    //        'id': product_id,
    //        'name': $("#ga_product_name").val(),
    //        'category': $("#ga_category_id").val(),
    //        'price': $("#ga_product_price").val(),
    //        'quantity': 0
    //    });
    //    ga('ec:setAction', 'detail');
    //    ga('send', 'pageview');
    //};
    $(".sys_btn_order").on('click dbclick', function () {
        var product_num = parseInt($("#buy_number").val());
        var product_size = 0;
        var product_color = 0;
        if (product_num == 0 || product_num == undefined) {
            alert('Bạn chưa chọn số lượng sản phẩm cần mua.')
        }
        var sys_size_item = $(".sys_size_item");
        var sys_img_thumb_color = $(".sys_img_thumb_color");
        if (sys_size_item.length > 0) {
            var size = 0;
            sys_size_item.each(function () {
                if ($(this).hasClass('active')) {
                    product_size = parseInt($(this).attr('data-attr-id'));
                    if (product_size != 0 || product_size != NaN) {
                        size = 1;
                    }
                    return false;
                }
            });
            if (size == 0) {
                var iz = 1;
                $(".sys_tip_size_color").css("color", "red");
                setTimeout(function () {
                    $(".sys_tip_size_color").css("color", "");
                }, 111);
                var showTip = setInterval(function () {
                    $(".sys_tip_size_color").css("color", "red");
                    setTimeout(function () {
                        $(".sys_tip_size_color").css("color", "");
                    }, 111);
                    iz++;
                    if (iz == 3) {
                        clearInterval(showTip);
                    }
                }, 333);
                return false;
            }
        }
        if (sys_img_thumb_color.length > 0) {
            var color = 0;
            sys_img_thumb_color.each(function () {
                if ($(this).hasClass('active')) {
                    product_color = parseInt($(this).attr('data-attr-id'));
                    if (product_color != 0 || product_color != NaN) {
                        color = 1;
                    }
                    return false;
                }
            });
            if (color == 0) {
                var iz = 1;
                $(".sys_tip_size_color").css("color", "red");
                setTimeout(function () {
                    $(".sys_tip_size_color").css("color", "");
                }, 111);
                var showTip = setInterval(function () {
                    $(".sys_tip_size_color").css("color", "red");
                    setTimeout(function () {
                        $(".sys_tip_size_color").css("color", "");
                    }, 111);
                    iz++;
                    if (iz == 3) {
                        clearInterval(showTip);
                    }
                }, 333);
                return false;
            }
        }
        var product_sid = '';
        var product_idx = parseInt($('#product_id').val());
        var ids = [];
        if ($(".ck_support").length > 0) {
            $(".ck_support").each(function () {
                if ($(this).is(':checked')) {
                    ids.push(parseInt($(this).val()));
                }
            })
        }
        /*if(ids.length > 0){
            ids.push(product_idx);
        }*/
        product_sid = ids.toString();
        cart.addCart(product_idx, product_num, product_size, product_color, product_sid);
        console.log('Pre:');
        console.log(product_id + '-' + $("#ga_product_name").val() + '-' + $("#ga_category_id").val() + '-' + product_num);

        if (!DEVMODE) {
            ga('require', 'ec');
            ga('ec:addProduct', {
                'id': product_id,
                'name': $("#ga_product_name").val(),
                'category': $("#ga_category_id").val(),
                'price': $("#ga_category_id").val(),
                'quantity': product_num
            });
            ga('ec:setAction', 'add');
            var tracking = $(this).data('tracking');
            ga('send', 'event', 'UX', 'click', tracking);     // Send data using an event.
            console.log('add product');

        };
    });
    $(".sys_btn_order_bottom").on('click dbclick', function () {
        var product_num = parseInt($("#buy_number_bottom").val());
        var product_size = 0;
        var product_color = 0;
        if (product_num == 0 || product_num == undefined) {
            alert('Bạn chưa chọn số lượng sản phẩm cần mua.')
        }
        var sys_size_item = $(".sys_size_item");
        var sys_img_thumb_color = $(".sys_img_thumb_color");
        if (sys_size_item.length > 0) {
            var size = 0;
            sys_size_item.each(function () {
                if ($(this).hasClass('active')) {
                    product_size = parseInt($(this).attr('data-attr-id'));
                    if (product_size != 0 || product_size != NaN) {
                        size = 1;
                    }
                    return false;
                }
            });
            if (size == 0) {
                var iz = 1;
                $(".sys_tip_size_color").css("color", "red");
                setTimeout(function () {
                    $(".sys_tip_size_color").css("color", "");
                }, 111);
                var showTip = setInterval(function () {
                    $(".sys_tip_size_color").css("color", "red");
                    setTimeout(function () {
                        $(".sys_tip_size_color").css("color", "");
                    }, 111);
                    iz++;
                    if (iz == 3) {
                        clearInterval(showTip);
                    }
                }, 333);
                return false;
            }
        }
        if (sys_img_thumb_color.length > 0) {
            var color = 0;
            sys_img_thumb_color.each(function () {
                if ($(this).hasClass('active')) {
                    product_color = parseInt($(this).attr('data-attr-id'));
                    if (product_color != 0 || product_color != NaN) {
                        color = 1;
                    }
                    return false;
                }
            });
            if (color == 0) {
                var iz = 1;
                $(".sys_tip_size_color").css("color", "red");
                setTimeout(function () {
                    $(".sys_tip_size_color").css("color", "");
                }, 111);
                var showTip = setInterval(function () {
                    $(".sys_tip_size_color").css("color", "red");
                    setTimeout(function () {
                        $(".sys_tip_size_color").css("color", "");
                    }, 111);
                    iz++;
                    if (iz == 3) {
                        clearInterval(showTip);
                    }
                }, 333);
                return false;
            }
        }
        var product_sid = '';
        var product_idx = parseInt($('#product_id').val());
        var ids = [];
        if ($(".ck_support").length > 0) {
            $(".ck_support").each(function () {
                if ($(this).is(':checked')) {
                    ids.push(parseInt($(this).val()));
                }
            })
        }
        /*        if(ids.length > 0){
                    ids.push(product_idx);
                }*/
        product_sid = ids.toString()
        cart.addCart(product_idx, product_num, product_size, product_color, product_sid);
        if (!DEVMODE) {
            ga('require', 'ec');
            ga('ec:addProduct', {
                'id': product_id,
                'name': $("#ga_product_name").val(),
                'category': $("#ga_category_id").val(),
                'price': $("#ga_category_id").val(),
                'quantity': product_num
            });
            ga('ec:setAction', 'add');
            var tracking = $(this).data('tracking');
            ga('send', 'event', 'UX', 'click', tracking);     // Send data using an event.
        };
    });
    $("#sys_buy_all").on('click dbclick', function () {
        var product_num = 1;//parseInt($("#buy_number").val());
        var product_size = 0;
        var product_color = 0;
        if (product_num == 0 || product_num == undefined) {
            alert('Bạn chưa chọn số lượng sản phẩm cần mua.')
        }
        var sys_size_item = $(".sys_size_item");
        var sys_img_thumb_color = $(".sys_img_thumb_color");
        if (sys_size_item.length > 0) {
            var size = 0;
            sys_size_item.each(function () {
                if ($(this).hasClass('active')) {
                    product_size = parseInt($(this).attr('data-attr-id'));
                    if (product_size != 0 || product_size != NaN) {
                        size = 1;
                    }
                    return false;
                }
            });
            if (size == 0) {
                var iz = 1;
                $(".sys_tip_size_color").css("color", "red");
                setTimeout(function () {
                    $(".sys_tip_size_color").css("color", "");
                }, 111);
                var showTip = setInterval(function () {
                    $(".sys_tip_size_color").css("color", "red");
                    setTimeout(function () {
                        $(".sys_tip_size_color").css("color", "");
                    }, 111);
                    iz++;
                    if (iz == 3) {
                        clearInterval(showTip);
                    }
                }, 333);
                return false;
            }
        }
        if (sys_img_thumb_color.length > 0) {
            var color = 0;
            sys_img_thumb_color.each(function () {
                if ($(this).hasClass('active')) {
                    product_color = parseInt($(this).attr('data-attr-id'));
                    if (product_color != 0 || product_color != NaN) {
                        color = 1;
                    }
                    return false;
                }
            });
            if (color == 0) {
                var iz = 1;
                $(".sys_tip_size_color").css("color", "red");
                setTimeout(function () {
                    $(".sys_tip_size_color").css("color", "");
                }, 111);
                var showTip = setInterval(function () {
                    $(".sys_tip_size_color").css("color", "red");
                    setTimeout(function () {
                        $(".sys_tip_size_color").css("color", "");
                    }, 111);
                    iz++;
                    if (iz == 3) {
                        clearInterval(showTip);
                    }
                }, 333);
                return false;
            }
        }
        var aryId = [];
        if (product_id == 0 || product_id == NaN) {
            alert('Bạn chưa chọn sản phẩm để đặt hàng.');
            return false;
        }
        $(".sys_input_check_dbt").each(function () {
            if ($(this).prop("checked")) {
                aryId.push(parseInt($(this).data('product')));
            }
        });
        var product_sid = aryId.toString();
        cart.addCart(product_id, product_num, product_size, product_color, product_sid);
        if (!DEVMODE) {
            ga('require', 'ec');
            ga('ec:addProduct', {
                'id': product_id,
                'name': $("#ga_product_name").val(),
                'category': $("#ga_category_id").val(),
                'price': $("#ga_category_id").val(),
                'quantity': product_num
            });
            ga('ec:setAction', 'add');
            ga('send', 'event', 'UX', 'click', 'add to cart');     // Send data using an event.
        };
    });

    $(".sys_datcoc").on('click', function () {
        $(".sys_btn_order").trigger('click');
    })

    /*$("#sys_buy_all").on('click dbclick',function(){
        var $this = $(this);
        var combo = [];
        var $i = 0;
        $(".sys_input_check_dbt").each(function () {
            if($(this).prop("checked") && parseInt($(this).data('product')) > 0 && parseInt($(this).data('product')) != product_id) {
                combo[$i] = parseInt($(this).data('product'));
                $i++
            }
        });
        if(combo.length > 0 && call_ajax == false){
            $.ajax({
                url: WEB_ROOT + '/payCombo/add',
                data: {
                    product_id : product_id,
                    product_combo : JSON.stringify(combo)
                },
                type: 'POST',
                dataType: 'json',
                beforeSend: function () {
                    call_ajax = true;
                    $this.addClass("disabled");
                    $("#sys_btn_order").addClass("disabled");
                },
                error: function () {
                    alert('Lỗi hệ thống')
                    $this.removeClass("disabled");
                    $("#sys_btn_order").removeClass("disabled");
                    call_ajax = false;
                },
                success: function (res) {
                    if (res.success == 1) {
                        window.location.href = res.link;
                    } else {
                        alert(res.mess);
                        $this.removeClass("disabled");
                        $("#sys_btn_order").removeClass("disabled");
                    }
                    call_ajax = false;
                }
            });
        }else{
            $("#sys_btn_order").trigger('click');
        }
    });*/

    /*    if (open_order == 1) {
            jQuery.cookie('open_orders', 0, {path: '/', domain: COOKIE_DOMAIN});
            jQuery.cookie('size_orders', 0, {path: '/', domain: COOKIE_DOMAIN});
            jQuery.cookie('color_orders', 0, {path: '/', domain: COOKIE_DOMAIN});
            $(".sys_size_item[data-attr-id=" + size_order + "]").addClass('active');
            $(".sys_img_thumb_color[data-attr-id=" + color_order + "]").addClass('active');
            $("#sys_btn_order").trigger("click");
        }
        if(open_combo == 1){
            jQuery.cookie('open_combo', 0, {path: '/', domain: COOKIE_DOMAIN});
            $("#sys_buy_all").trigger("click");
        }*/
    var sys_size_item = $(".sys_size_item");
    var sys_img_thumb_color = $(".sys_img_thumb_color");
    //Chọn size
    if (sys_size_item.length > 0) {
        sys_size_item.on("click", function () {
            sys_size_item.removeClass("active");
            $(this).addClass("active");

            if (sys_img_thumb_color.length > 0) {
                if ($(".sys_img_thumb_color.active").length > 0) {
                    $(".sys_tip_size_color").parent().hide();
                } else {
                    $(".sys_tip_size_color").children("b").html("màu");
                }
            } else {//ko co size
                $(".sys_tip_size_color").parent().hide();
            }
        });
    }
    //Chọn màu:
    if (sys_img_thumb_color.length > 0) {
        sys_img_thumb_color.on("click", function () {
            sys_img_thumb_color.removeClass("active");
            $(this).addClass("active");
            var attr_id = $(this).attr('data-attr-id');
            $('#sys_attr_' + attr_id).trigger('mouseover');
            if (sys_size_item.length > 0) {
                if ($(".sys_size_item.active").length > 0) {
                    $(".sys_tip_size_color").parent().hide();
                } else {
                    $(".sys_tip_size_color").children("b").html("size");
                }
            } else {//ko co size
                $(".sys_tip_size_color").parent().hide();
            }
        });
    }
    $(".sys_open_popup_login").on("click dbclick", function () {
        data_order = $(this).attr('data-order');
        data_combo = $(this).data('combo');
        if (data_order) {
            $("#mung83-the-popup").find(".modal_close").trigger('click');
            var product_id = parseInt($(this).attr('data-id'));
            var product_num = parseInt($("#buy_number").val());
            var product_size = 0;
            var product_color = 0;
            if (product_num == 0 || product_num == undefined) {
                alert('Bạn chưa chọn số lượng sản phẩm cần mua.')
            }
            var sys_size_item = $(".sys_size_item");
            var sys_img_thumb_color = $(".sys_img_thumb_color");

            if (sys_size_item.length > 0) {
                var size = 0;
                sys_size_item.each(function () {
                    if ($(this).hasClass('active')) {
                        product_size = parseInt($(this).attr('data-attr-id'));
                        if (product_size != 0 || product_size != NaN) {
                            size = 1;
                        }
                        return false;
                    }
                });
                if (size == 0) {
                    var iz = 1;
                    $(".sys_tip_size_color").css("color", "red");
                    setTimeout(function () {
                        $(".sys_tip_size_color").css("color", "");
                    }, 111);
                    var showTip = setInterval(function () {
                        $(".sys_tip_size_color").css("color", "red");
                        setTimeout(function () {
                            $(".sys_tip_size_color").css("color", "");
                        }, 111);
                        iz++;
                        if (iz == 3) {
                            clearInterval(showTip);
                        }
                    }, 333);
                    return false;
                }
            }
            if (sys_img_thumb_color.length > 0) {
                var color = 0;
                sys_img_thumb_color.each(function () {
                    if ($(this).hasClass('active')) {
                        product_color = parseInt($(this).attr('data-attr-id'));
                        if (product_color != 0 || product_color != NaN) {
                            color = 1;
                        }
                        return false;
                    }
                });
                if (color == 0) {
                    var iz = 1;
                    $(".sys_tip_size_color").css("color", "red");
                    setTimeout(function () {
                        $(".sys_tip_size_color").css("color", "");
                    }, 111);
                    var showTip = setInterval(function () {
                        $(".sys_tip_size_color").css("color", "red");
                        setTimeout(function () {
                            $(".sys_tip_size_color").css("color", "");
                        }, 111);
                        iz++;
                        if (iz == 3) {
                            clearInterval(showTip);
                        }
                    }, 333);
                    return false;
                }
            }
            if (product_id == 0 || product_id == NaN) {
                alert('Bạn chưa chọn sản phẩm để đặt hàng.');
                //$(this).removeClass("disabled");
                return false;
            }
        }
        customer.openPopupInfo('Để mua hàng bạn cần đăng nhập');
    });

    $("#sys_open_login_another").on('click dbclick', function () {
        customer.openPopupLogin();
    });
    $(".sys_open_popup_info").on('click', function () {
        customer.openPopupInfo('Để đặt câu hỏi bạn cần đăng nhập')
    });
    $(".sys_like_open_popup_info").on('click', function () {
        customer.openPopupInfo('Để thêm sản phẩm yêu thích bạn cần đăng nhập')
    });
    //rating
    $("#sys_ra_grp_btn_user_rate").css("left", $("#sys_ra_grp_btn_user_rate").siblings("#sys_grp_col_star_rate").width() + 40).addClass("active");
    var sys_star_to_make_rate_sm = $(".sys_star_to_make_rate_sm");
    sys_star_to_make_rate_sm.on("mouseenter", function () {
        var idx = $(this).index();
        $(this).addClass("checked");//.parents(".option-item-rated").find(".op-rated-score").hide().end().find(".sys_rate_option_score").removeClass("checked").eq(idx).addClass("checked");
        $(this).siblings().each(function () {
            if ($(this).index() < idx) {
                $(this).addClass("checked");
            } else {
                $(this).removeClass("checked");
            }
        });
    }).on("click", function () {
        var idx = $(this).index();
        var getUid = $(this).parent().attr("data-uid");
        var getCriteriaIdx = $(this).parents(".option-item-rated").attr("data-criteria-idx");
        if (getUid == 0) {
            customer.openPopupInfo('Để đánh giá bạn cần đăng nhập!');
        } else {
            customer.openPopupRatting();
            if (getCriteriaIdx == 0) getCriteriaIdx = -1;
            $("#sys_rate_cus_" + getCriteriaIdx).find(".sys_star_em_for_rate").eq(idx).trigger("click");
        }
    });
    $("#sys_btn_write_review").on("click", function () {
        customer.openPopupRatting();
    });
    $("#sys_btn_open_login_review").on('click', function () {
        customer.openPopupInfo('Để đánh giá bạn cần đăng nhập!');
    });

    //$(".sys_star_to_make_rate_sm").tooltipster({
    //    delay: 0,
    //    theme: "theme-rate-tip",
    //    speed: 0
    //});
    $("#sys_send_comment").on('click dbclick', function () {
        $(this).addClass('disabled');
        comment.createNewComment(product_id);
    });
    $("#sys_load_comment").on('click dbclick', function () {
        var p = $(this).attr('data-page');
        comment.loadComment(p, product_id);
    });
    //Bay xuong muc Binh luan
    $("#sys_jumb_comment").on("click", function () {
        if (typeof _user_management !== 'undefined' && typeof _user_management === 'function') {
            _user_management.track('2', { object_id: product_id, object_name: 'product' })
        }
        var getHeadHeight = $("#header").find(".header-mid").outerHeight();
        $("html, body").animate({
            scrollTop: $("#sys_comments_area").offset().top - getHeadHeight
        }, 666, function () { });
        return false;
    });

    //Bay xuong muc Chính sách bảo hành
    $("#sys_jumb_warranty").on("click", function () {
        var getHeadHeight = $("#header").find(".header-mid").outerHeight();
        $(".sys_tabbable").find(".t-lbl").removeClass("active").end().find("#sys_warranty_tab").addClass("active").end().find(".tab-content-item").removeClass("active").end().find("#chinh-sach-bao-hanhx").addClass("active")
        $("html, body").animate({
            scrollTop: $(".full-desc-content-col").offset().top - getHeadHeight
        }, 666, function () { });
        return false;
    });

    //Bay xuong muc Chính sách bảo hành
    $(".sys_jumb_change_deal").on("click", function () {
        var getHeadHeight = $("#header").find(".header-mid").outerHeight();
        $(".sys_tabbable").find(".t-lbl").removeClass("active").end().find("#sys_policy_tab").addClass("active").end().find(".tab-content-item").removeClass("active").end().find("#chinh-sach-doi-trax").addClass("active")
        $("html, body").animate({
            scrollTop: $(".full-desc-content-col").offset().top - getHeadHeight
        }, 666, function () { });
        if (typeof _user_management !== 'undefined' && typeof _user_management === 'function') {
            _user_management.track('9', { object_id: product_id, object_name: 'product' });
        }
        return false;
    });

    //Zoom
    if ($("#sys_img_zoom_place").length > 0) {
        $("#sys_img_zoom_place").one("load", function () {
            $("#sys_img_zoom_place").elevateZoom({
                gallery: 'sys_col_list_thumb',
                galleryActiveClass: "active",
                loadingIcon: "/assets/images/loading.gif",
                zoomWindowPosition: "sys_placeholder_zoom",
                zoomWindowHeight: $("#sys_center_img").height(),
                zoomWindowWidth: $("#sys_placeholder_zoom").width(),
                borderSize: 0
            });
        }).each(function () {
            if (this.complete) $(this).load();
        });
        $("#sys_center_img").on("mouseenter", ".sys_show_img_big", function () {
            $(this).find("div").remove();
        });
    }

    var sys_col_list_thumb = $("#sys_col_list_thumb");
    if (sys_col_list_thumb.length > 0) {
        //hover vao thumb -> zoom
        sys_col_list_thumb.on('mouseenter', ".sys_wrap_thumb_img", function () {
            $(".sys_wrap_thumb_img").removeClass('active');
            $(this).addClass('active');
            $(this).children("a").trigger("click");
            $("#sys_img_zoom_place").parent().attr("data-image-to", $(this).find("a").attr("data-zoom-image"));
        });
        var configThumbPerPage = 10,
            viewportHeightAvaiable = $("#sys_center_img").height(),
            slideThumbPageCurrent = 1,
            configItemHeight = sys_col_list_thumb.find(".sys_wrap_thumb_img").outerHeight(true),
            cloneThumbItem = sys_col_list_thumb.children(".sys_wrap_thumb_img").last().clone();
        sys_col_list_thumb.css("max-height", viewportHeightAvaiable);
        cloneThumbItem = cloneThumbItem.html("").css("visibility", "hidden");
        configThumbPerPage = Math.floor(viewportHeightAvaiable / configItemHeight);
        var lastSlideItem = sys_col_list_thumb.children(".sys_wrap_thumb_img").length % configThumbPerPage,
            slideThumbPageTotal = Math.ceil(sys_col_list_thumb.children(".sys_wrap_thumb_img").length / configThumbPerPage);
        if (sys_col_list_thumb.children(".sys_wrap_thumb_img").length > configThumbPerPage)
            $("#sys_btn_slide_thumbs").show();
        if (lastSlideItem != 0) {
            for (var p = lastSlideItem; p < configThumbPerPage; p++) {
                var cloneThumbHtml = cloneThumbItem.prop('outerHTML');
                $(cloneThumbHtml).insertBefore("#sys_btn_slide_thumbs");
            }
        }
        sys_col_list_thumb.children(".sys_wrap_thumb_img").each(function (idx, val) {
            idx++;
            if (idx > configThumbPerPage) {
                $(this).hide();
            }
            $(this).addClass("sys_thumb_slide_" + (Math.floor((idx - 1) / configThumbPerPage) + 1));
        });
        $("#sys_btn_slide_thumbs").on("click", function () {
            if (slideThumbPageCurrent != slideThumbPageTotal) {
                slideThumbPageCurrent++
            } else {
                slideThumbPageCurrent = 1;
            }
            sys_col_list_thumb.children(".sys_wrap_thumb_img").hide();
            sys_col_list_thumb.children(".sys_thumb_slide_" + slideThumbPageCurrent).show();
        });
    }
    $(".sys_show_img_big").on("click dbclick", function () {
        if (typeof _user_management !== 'undefined' && typeof _user_management === 'function') {
            _user_management.track('1', { object_id: product_id, object_name: 'product' })
        }
        var wW = $(window).width(),
                wH = $(window).height(),
                configPaddingBodyToPopup = { top: 30, left: 30 },
                configPaddingPopupToContent = 15,
                configBorderTransparentWidth = 7,
                contentHeight = (wH - 2 * configPaddingPopupToContent - 2 * configPaddingBodyToPopup.top - 2 * configBorderTransparentWidth);
        if (storePopupContent == undefined) {
            storePopupContent = $("#sys_popup_img_content").html();
            $("#sys_popup_img_content").html("");
        }

        var getIMGBIG = $("#sys_img_zoom_place").parent().attr("data-image-to");
        var getIdxThumbActive = $("#sys_col_list_thumb").find(".active").index();

        $.popupCommon({
            attrId: "sys_popup_show_img",
            extendClass: "popups-show-img",
            widthPop: (wW - 2 * configPaddingBodyToPopup.left),
            successOpen: function () {
                $("#sys_popup_show_img").find(".main-content").html(storePopupContent).end()
                        .find(".sys_inner_thumb").parent().css("max-height", contentHeight).end().end()
                        .find(".sys_big_column").find(".cell-center").height(contentHeight);
                $("#zoom-popup").attr("src", getIMGBIG);
                $(".sys_inner_thumb").find("img").eq(getIdxThumbActive).addClass("active");

                $(".sys_inner_thumb").on("click", "img", function () {
                    $(".sys_inner_thumb img").removeClass("active");
                    $(".sys_big_column").find("img").attr("src", $(this).attr("data-img-big"));
                    $(this).addClass("active").siblings().removeClass("active");
                });
                $(".sys_next_big_img").on("click", function () {
                    var imgActive = $(".sys_inner_thumb").find("img.active");
                    (imgActive.next().length > 0) ? imgActive.next().trigger("click") : $(".sys_inner_thumb").find("img").first().trigger("click");
                });
            }
        });
    });

    //Xem thêm Mô tả chi tiết
    // var sys_wd_fulltext_content = $("#sys_wd_fulltext_content");
    // if(sys_wd_fulltext_content.height() > 2 * ($(window).height())){
    //     sys_wd_fulltext_content.addClass("hide-desc").height(1.5 * ($(window).height()));
    //     var sys_btn_more_full_desc = $("#sys_btn_more_full_desc");
    //     sys_btn_more_full_desc.show().on("click",function(){
    //         sys_wd_fulltext_content.toggleClass("show-desc");
    //         $(this).toggleClass("showed");
    //     });
    // }

    // check Hash: 4 tab
    var getHash = window.location.hash;
    if (arr4Tab.indexOf(getHash) >= 0) {
        var tabIdx = arr4Tab.indexOf(getHash);
        var sys_tab_detail_info = $("#sys_tab_detail_info");
        var getHeadHeight = $("#header").find(".header-mid").outerHeight();
        sys_tab_detail_info.find(".t-lbl").removeClass("active").eq(tabIdx).addClass("active");
        sys_tab_detail_info.find(".tab-content-item").removeClass("active").eq(tabIdx).addClass("active");
        $("html, body").animate({ scrollTop: sys_tab_detail_info.offset().top - getHeadHeight }, 0);
    }
    //console.log("hash: "+window.location.hash);


    //Countdown iPhone 4s


    //$('#sys_countdown_ip4s').countdown({
    //    until: destDay,
    //    onExpiry:function(){
    //        $("#sys_wrap_countdown_time").fadeOut(function(){
    //            $("#sys_btn_order").removeClass('disabled');
    //        });
    //    }
    //});




    /*var plusSymbol = $('<span class="dbt-plus">+</span>');
    var sys_dbt_check_option = $("#sys_dbt_check_option");
    var sys_input_check_dbt = $(".sys_input_check_dbt");
    var total_check_dbt = sys_input_check_dbt.length;
    var total_price_item_checked = 0;
    var total_price_item_parent = 0;
    sys_dbt_check_option.data("total-item",total_check_dbt);
    sys_input_check_dbt.each(function () {
        if($(this).prop("checked")) {
            total_price_item_checked += parseInt($(this).val());
            total_price_item_parent += parseInt($(this).data('parent'));
        }else{
            var getTarget = $("#sys_product_dbt_" + $(this).data('idx'));
            getTarget.fadeOut();
            getTarget.prev().fadeOut();
        }
    });
    sys_dbt_check_option.data("total-price",total_price_item_checked);
    sys_dbt_check_option.data("total-parent",total_price_item_parent);
    sys_dbt_check_option.data("total-save",total_price_item_parent-total_price_item_checked);
    $("#sys_total_price_dbt").html(total_price_item_checked.formatMoney(0, ",", "."));
    if(total_price_item_parent > total_price_item_checked){
        $("#sys_total_price_parent").html(total_price_item_parent.formatMoney(0, ",", "."));
        $("#sys_total_price_save").html('(tiết kiệm ' + (total_price_item_parent - total_price_item_checked).formatMoney(0, ",", ".") + ')');
    }else{
        $(".total-parent-val").fadeOut();
        $("#sys_total_price_save").fadeOut();
    }
    sys_input_check_dbt.on("change", function (e) {
        var getIdx = $(this).parents(".bdt-check-item").index();
        var getTarget = $("#sys_product_dbt_" + $(this).data('idx'));
        if($(this).prop("checked")){
            sys_dbt_check_option.data("total-item",++total_check_dbt);
            total_price_item_checked += parseInt($(this).val());
            total_price_item_parent += parseInt($(this).data('parent'));
            sys_dbt_check_option.data("total-price",total_price_item_checked);
            sys_dbt_check_option.data("total-parent",total_price_item_parent);
            sys_dbt_check_option.data("total-save",total_price_item_parent-total_price_item_checked);
            getTarget.fadeIn(function () {
                $("#sys_total_price_dbt").html(total_price_item_checked.formatMoney(0, ",", "."));
                if(total_price_item_parent > total_price_item_checked){
                    $("#sys_total_price_parent").html(total_price_item_parent.formatMoney(0, ",", "."));
                    $("#sys_total_price_save").html('(tiết kiệm ' + (total_price_item_parent - total_price_item_checked).formatMoney(0, ",", ".") + ')');
                    $(".total-parent-val").fadeIn();
                    $("#sys_total_price_save").fadeIn();
                }else{
                    $(".total-parent-val").fadeOut();
                    $("#sys_total_price_save").fadeOut();
                }
                $("#sys_dbt_total_price").hide().fadeIn();
            });
            getTarget.prev().fadeIn();
        }else{
            sys_dbt_check_option.data("total-item",--total_check_dbt);
            total_price_item_checked -= parseInt($(this).val());
            total_price_item_parent -= parseInt($(this).data('parent'));
            sys_dbt_check_option.data("total-price",total_price_item_checked);
            sys_dbt_check_option.data("total-parent",total_price_item_parent);
            sys_dbt_check_option.data("total-save",total_price_item_parent-total_price_item_checked);
            getTarget.fadeOut(function () {
                $("#sys_total_price_dbt").html(total_price_item_checked.formatMoney(0, ",", "."));
                if(total_price_item_parent > total_price_item_checked){
                    $("#sys_total_price_parent").html(total_price_item_parent.formatMoney(0, ",", "."));
                    $("#sys_total_price_save").html('(tiết kiệm ' + (total_price_item_parent - total_price_item_checked).formatMoney(0, ",", ".") + ')');
                    $(".total-parent-val").fadeIn();
                    $("#sys_total_price_save").fadeIn();
                }else{
                    $(".total-parent-val").fadeOut();
                    $("#sys_total_price_save").fadeOut();
                }
                $("#sys_dbt_total_price").hide().fadeIn();
            });
            getTarget.prev().fadeOut();
        }
    });*/
    $(".sys_input_check_dbt").on("change", function (e) {
        var total_price = 0;
        $(".sys_input_check_dbt").each(function () {
            if ($(this).prop("checked")) {
                total_price += parseInt($(this).val());
                var getTarget = $("#sys_product_dbt_" + $(this).data('product'));
                getTarget.fadeIn();
                getTarget.prev().fadeIn();
            } else {
                var getTarget = $("#sys_product_dbt_" + $(this).data('product'));
                getTarget.fadeOut();
                getTarget.prev().fadeOut();
            }
        });
        $("#sys_total_price_dbt").html(total_price.formatMoney(0, ",", "."))
    });
    $(".sys_btn_like_product").on('click dbclick', function () {
        customer.addProductCustomerLike(product_id)
    });
    $(".sys_btn_unlike_product").on('click dbclick', function () {
        customer.removeProductCustomerLike(product_id)
    });
    $("#sys_log_logo_ncc, #sys_log_logo_fpt").on('click', function () {
        var provider_id = $(this).data('provider');
        if (typeof _user_management !== 'undefined' && typeof _user_management === 'function') {
            _user_management.track('3', { object_id: provider_id, object_name: 'provider' });
        }
    });
    $(".fb-send").on('click', function () {
        if (typeof _user_management !== 'undefined' && typeof _user_management === 'function') {
            _user_management.track('4', { object_id: product_id, object_name: 'product' });
        }
    });
    $(".fb-like").on('click', function () {
        if (typeof _user_management !== 'undefined' && typeof _user_management === 'function') {
            _user_management.track('5', { object_id: product_id, object_name: 'product' });
        }
    });
    $("#buy_number").on('change', function () {
        if (typeof _user_management !== 'undefined' && typeof _user_management === 'function') {
            _user_management.track('6', { object_id: product_id, object_name: 'product' });
        }
    });
    $(".btn-muangay, .btn-datcoc").on('click', function () {
        if (typeof _user_management !== 'undefined' && typeof _user_management === 'function') {
            _user_management.track('7', { object_id: product_id, object_name: 'product' });
        }
    });
    $("#sys_view_product_shop").on('click', function () {
        var provider_id = $(this).data('provider');
        _user_management.track('8', { object_id: provider_id, object_name: 'provider' });
    });
    $("#sys_cs_gia_vanchuyen").on('click', function () {
        if (typeof _user_management !== 'undefined' && typeof _user_management === 'function') {
            _user_management.track('10', { object_id: product_id, object_name: 'product' });
        }
    });
    $("#sys_check_imei").on('click', function () {
        if (typeof _user_management !== 'undefined' && typeof _user_management === 'function') {
            _user_management.track('11', { object_id: product_id, object_name: 'product' });
        }
    });
    $(".sys_open_popup_info, #sys_send_comment").on('click', function () {
        if (typeof _user_management !== 'undefined' && typeof _user_management === 'function') {
            _user_management.track('44', { object_id: product_id, object_name: 'product' });
        }
    });
    $(".sys_star_to_make_rate_sm").on('click', function () {
        if (typeof _user_management !== 'undefined' && typeof _user_management === 'function') {
            _user_management.track('45', { object_id: product_id, object_name: 'product' });
        }
    });
    $("#sys_btn_open_login_review,#sys_btn_write_review").on('click', function () {
        if (typeof _user_management !== 'undefined' && typeof _user_management === 'function') {
            _user_management.track('46', { object_id: product_id, object_name: 'product' });
        }
    });
    $("#sys_btn_more_full_desc").on('click', function () {
        if (typeof _user_management !== 'undefined' && typeof _user_management === 'function') {
            _user_management.track('50', { object_id: product_id, object_name: 'product' });
        }
    });
    $("#sys_infomation_tab").on('click', function () {
        if (typeof _user_management !== 'undefined' && typeof _user_management === 'function') {
            _user_management.track('47', { object_id: product_id, object_name: 'product' });
        }
    });
    $("#sys_technical_tab").on('click', function () {
        if (typeof _user_management !== 'undefined' && typeof _user_management === 'function') {
            _user_management.track('48', { object_id: product_id, object_name: 'product' });
        }
    });
    $("#sys_policy_tab").on('click', function () {
        if (typeof _user_management !== 'undefined' && typeof _user_management === 'function') {
            _user_management.track('49', { object_id: product_id, object_name: 'product' });
        }
    });
    $("#sys_warranty_tab").on('click', function () {
        if (typeof _user_management !== 'undefined' && typeof _user_management === 'function') {
            _user_management.track('293', { object_id: product_id, object_name: 'product' });
        }
    });


});

