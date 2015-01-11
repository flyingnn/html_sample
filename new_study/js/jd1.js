(function($) {
    jshop.module.UserDefine = {};
    $.extend(jshop.module.UserDefine, jshop.module);
    $.extend(jshop.module.UserDefine, {sideSlip: function(args) {
            var imgs = $(this).find("img");
            imgs.each(function(index, n) {
                $(n).attr("src", $(n).attr("original"));
                $(n).removeAttr("original");
                $(n).removeClass("J_imgLazyload");
            });
            if (args == undefined) {
                if (validateData($(this).attr("module-param"))) {
                    var args = eval("(" + $(this).attr("module-param") + ")");
                }
            }
            var _this = this, param = $.extend({vertical: "top",verticalValue: 170,horizontal: "left",horizontalValue: 0,zindex: 10}, args), vertical = param.vertical, verticalValue = param.verticalValue, horizontal = param.horizontal, horizontalValue = param.horizontalValue, zindex = param.zindex;
            var count = 0;
            for (var i in param) {
                count++;
            }
            if (count == 5 && vertical == "top" && verticalValue >= 170 && horizontal == "right") {
                setInterval(function() {
                    verticalValue += (getTop() + param.verticalValue - verticalValue) / 20;
                    $(_this).css({"position": "absolute","top": verticalValue,"right": horizontalValue,"zIndex": zindex});
                }, 20);
            }
            if (count == 5 && vertical == "top" && verticalValue >= 170 && horizontal == "left") {
                setInterval(function() {
                    verticalValue += (getTop() + param.verticalValue - verticalValue) / 20;
                    $(_this).css({"position": "absolute","top": verticalValue,"left": horizontalValue,"zIndex": zindex});
                }, 20);
            }
            if (count == 5 && vertical == "bottom" && horizontal == "right") {
                var a = $(window).height() - $(_this).height() - param.verticalValue, b = a;
                setInterval(function() {
                    a += (getTop() + b - a) / 20;
                    $(_this).css({"position": "absolute","top": a,"right": horizontalValue,"zIndex": zindex});
                }, 20);
            }
            if (count == 5 && vertical == "bottom" && horizontal == "left") {
                var a = $(window).height() - $(_this).height() - param.verticalValue, b = a;
                setInterval(function() {
                    a += (getTop() + b - a) / 20;
                    $(_this).css({"position": "absolute","top": a,"left": horizontalValue,"zIndex": zindex});
                }, 20);
            }
            if (count == 5 && vertical == "bottom" && horizontal == "middle") {
                var a = $(window).height() - $(_this).height() - param.verticalValue, b = a;
                setInterval(function() {
                    a += (getTop() + b - a) / 20;
                    $(_this).css({"position": "absolute","top": a,"left": horizontalValue,"margin-left": -($(_this).width() / 2),"zIndex": zindex});
                }, 20);
            }
            function getTop() {
                return (document.documentElement.scrollTop || document.body.scrollTop || 0) - (document.documentElement.clientTop || document.body.clientTop || 0);
            }
        },addFavorite: function(args) {
            if (args == undefined) {
                if (validateData($(this).attr("module-param"))) {
                    var args = eval("(" + $(this).attr("module-param") + ")");
                }
            }
            var _this = this, param = $.extend({title: "京东商城",url: "http://www.jd.com"}, args), title = param.title, url = param.url;
            $(_this).css("cursor", "pointer");
            $(_this).click(function(e) {
                if (document.all) {
                    window.external.AddFavorite(url, title);
                } else {
                    if (window.sidebar) {
                        window.sidebar.addPanel(title, url, "");
                    } else {
                        alert("对不起，您的浏览器不支持此操作!\n请您使用菜单栏或Ctrl+D收藏本站。");
                    }
                }
            });
        },autoCenter: function(args) {
            var _this = $(this), param = $.extend({autoMiddleNode: ".userDefinedArea"}, args || {}), node = _this.find(param.autoMiddleNode);
            alignCenter();
            $(window).resize(function() {
                alignCenter();
            });
            function alignCenter() {
                var extra = node.width() - _this.width();
                if (extra > 0) {
                    node.css({"margin-left": -extra / 2});
                } else {
                    node.css("margin", "0 auto");
                }
            }
        }});
})(jQuery);
(function($) {
    jshop.module.imgShow = {};
    $.extend(jshop.module.imgShow, jshop.module);
    $.extend(jshop.module.imgShow, {showImg: function(args) {
            var silde = true;
            var param = $.extend({timer: 0,node: "li",nodeChild: ".jItem",imgNodeArea: ".jPic",imgNode: ".jPic a",defaultClass: "current",slideDirection: "left",subFunction: "moveEffect"}, args), _this = this, imgArea = $(_this).find(param.node), nodeChild = $(_this).find(param.nodeChild), defaultClass = param.defaultClass, currentNode = imgArea.eq(0).find(param.imgNode), _duration = parseInt(parseFloat(param.timer || 0) * 1000);
            if (!imgArea.length) {
                return;
            }
            var index = 0, moveRange = 0, partTime = null, animate = null;
            var isTop = (param.slideDirection == "top") ? true : false;
            var enterFlag = [], count = 0;
            var banner = {transparentEffect: function() {
                    init();
                    animate = transparent;
                    _event();
                },moveEffect: function() {
                    imgArea.each(function(i, n) {
                        var imgNodeArea = $(n).find(param.imgNodeArea);
                        if (isTop) {
                            imgNodeArea.css({height: 100000});
                            imgNodeArea.children().css({width: imgNodeArea.width(),height: "auto","float": "none",display: "block"});
                        } else {
                            imgNodeArea.css({width: 100000});
                            imgNodeArea.children().css({width: imgNodeArea.find("img").width(),height: "100%","float": "left",display: "block"});
                        }
                    });
                    init();
                    animate = oneImgMove;
                    _event();
                }};
            jshop.module.ridLazy(_this);
            if (banner[param.subFunction]) {
                banner[param.subFunction].call(_this);
            }
            function init() {
                imgArea.css({width: currentNode.find("img").width(),height: currentNode.find("img").height()});
                nodeChild.css({width: currentNode.find("img").width(),height: currentNode.find("img").height()});
            }
            function _event() {
                imgArea.each(function(index, n) {
                    var _ele = $(n);
                    _ele.data("index", 0);
                    _ele.data("count", 0);
                    _ele.data("animating", false);
                    _ele.data("direction", 1);
                    _ele.bind({mouseenter: function() {
                            var _this = this, _area = $(this), _count = _area.data("count") + 1, _node = _area.find(param.imgNode);
                            _area.data("count", _count), currentNode = _area.find(param.imgNode);
                            if (!_area.data("animating")) {
                                _area.data("direction", 1);
                                _area.data("index", 1);
                                currentNode.removeClass(defaultClass).eq(1).addClass(defaultClass);
                                animate.call(_this);
                            }
                        },mouseleave: function() {
                            var _this = this, _area = $(this), _count = _area.data("count") + 1, _node = _area.find(param.imgNode);
                            _area.data("count", _count), currentNode = _area.find(param.imgNode);
                            if (!_area.data("animating")) {
                                _area.data("direction", 2);
                                _area.data("index", 0);
                                currentNode.removeClass(defaultClass).eq(0).addClass(defaultClass);
                                animate.call(_this);
                            }
                        }});
                });
            }
            function transparent() {
                var _this = this, _area = $(_this), _index = _area.data("index");
                _currentnode = _area.find(param.imgNode);
                _area.data("animating", true);
                _currentnode.animate({opacity: 0}, 0, function() {
                });
                _currentnode.eq(_index).animate({opacity: 1}, _duration, function() {
                    _area.data("animating", false);
                    var _count = _area.data("count"), _direction = _area.data("direction");
                    if (_direction == 1) {
                        if (_count % 2 == 0) {
                            _area.data("direction", 2);
                            _area.data("index", 0);
                            _area.find(param.imgNode).removeClass(defaultClass).eq(0).addClass(defaultClass);
                            animate.call(_this);
                        }
                    } else {
                        if (_count % 2 == 1) {
                            _area.data("direction", 1);
                            _area.data("index", 1);
                            _area.find(param.imgNode).removeClass(defaultClass).eq(1).addClass(defaultClass);
                            animate.call(_this);
                        }
                    }
                });
            }
            function oneImgMove() {
                var _this = this, _area = $(_this), _css = {}, _index = _area.data("index");
                _area.data("animating", true);
                if (isTop) {
                    _css.marginTop = -_index * _area.find(param.imgNode).height() + "px";
                } else {
                    _css.marginLeft = -_index * _area.find(param.imgNode).width() + "px";
                }
                _area.find(param.imgNodeArea).animate(_css, _duration, function() {
                    _area.data("animating", false);
                    var _count = _area.data("count"), _direction = _area.data("direction");
                    if (_direction == 1) {
                        if (_count % 2 == 0) {
                            _area.data("direction", 2);
                            _area.data("index", 0);
                            _area.find(param.imgNode).removeClass(defaultClass).eq(0).addClass(defaultClass);
                            animate.call(_this);
                        }
                    } else {
                        if (_count % 2 == 1) {
                            _area.data("direction", 1);
                            _area.data("index", 1);
                            _area.find(param.imgNode).removeClass(defaultClass).eq(1).addClass(defaultClass);
                            animate.call(_this);
                        }
                    }
                });
            }
        },autoLayout: function(args) {
            if (args == undefined) {
                if (validateData($(this).attr("module-param"))) {
                    var args = eval("(" + $(this).attr("module-param") + ")");
                }
            }
            var param = $.extend({node: "li",extra: {}}, args), _this = this, elems = $(_this).find(param.node), elem = elems.eq(0);
            elem.css(param.extra);
            var outerWidth = parseInt(elem.data("outerWidth") || elem.outerWidth(true)), width = parseInt(elem.data("width") || elem.css("width")), qty = parseInt(elem.parent().parent().width() / outerWidth);
            elem.data({"outerWidth": outerWidth,"width": width});
            var extraWidth = outerWidth - width;
            var newWidth = (elem.parent().parent().width() - extraWidth * qty) / qty - 0.1;
            elems.css({width: newWidth});
        },autoImgShow: function() {
            if (validateData($(this).attr("module-param"))) {
                var args = eval("(" + $(this).attr("module-param") + ")");
            }
            var param = $.extend({}, args);
            jshop.module.imgShow.showImg.call(this, param);
            jshop.module.imgShow.autoLayout.call(this, param);
        }});
})(jQuery);
(function(b, a) {
    jshop.module.shopAtten = {};
    b.extend(jshop.module.shopAtten, {follow: function(i) {
            var x = b.extend({coll: ".jshop-btn-coll",node: "li",default_pop: ".j_default"}, i || {}), z = this, D = "http://follow.soa.jd.com/vender/follow?venderId=", g = null, o = null, h = false, n = null, u, m, s;
            function q() {
                if (b(z).parents(".mc:first").find("#j-follow-cnt").length) {
                    n = b(z).parents(".mc:first").find("#j-follow-cnt");
                    n.find(".icon_close").unbind("click").click(function() {
                        A();
                    });
                }
            }
            function F() {
                b(z).find(x.node + " " + x.coll).click(function() {
                    s = b(this).attr("shopurl");
                    if (n) {
                        n.find(".p1>a,.p3>a").attr("href", s);
                    }
                    G.call(this);
                });
            }
            function G() {
                g = b(this).attr("shopid");
                function H() {
                    b.ajax({async: false,url: D + g,dataType: "jsonp",success: function(I) {
                            C(I);
                        },error: function() {
                            B(data);
                        }});
                }
                b.login({modal: true,complete: function(I) {
                        if (I != null && I.IsAuthenticated != null && I.IsAuthenticated) {
                            jdModelCallCenter.settings.fn();
                            jdModelCallCenter.settings.fn = null;
                        }
                    }});
                jdModelCallCenter.settings.fn = function() {
                    H();
                };
            }
            function C(H) {
                b('<link rel="stylesheet" type="text/css" href="http://misc.360buyimg.com/product/skin/2012/product-attention.css"/>').appendTo("head");
                o = b(z).parents(".mc:first").find(x.default_pop);
                r(H);
            }
            function r(H) {
                switch (H.code) {
                    case "F10000":
                        j();
                        break;
                    case "F0409":
                        E();
                        break;
                    case "F0410":
                        B("followMaxDiv", 1);
                        break;
                    default:
                        B("followFailDiv", 2);
                }
            }
            function B(H, I) {
                if (n) {
                    try {
                        n.find(".p1,.p2,.p3").hide();
                        if (I == 1) {
                            n.find(".p3").show();
                        } else {
                            n.find(".p2").show();
                        }
                        y();
                    } catch (J) {
                        f(H);
                    }
                } else {
                    f(H);
                }
            }
            function j() {
                c(function() {
                    if (n) {
                        n.find(".p2,.p3").hide();
                        n.find(".p1").show();
                        y();
                    } else {
                        k();
                    }
                });
            }
            function y() {
                l(n);
                p();
                b(".thickdiv").show();
                n.show();
            }
            function A() {
                n.hide();
                b(".thickdiv").hide();
            }
            function e(H, I) {
                b(".thickbox").html("");
                b.jdThickBox({width: 510,height: 260,title: "关注店铺",_box: "btn_coll_shop_pop",source: H}, function() {
                    I();
                });
            }
            function k() {
                var H = "http://follow.soa.jd.com/vender/queryTagForListByCount?count=5";
                b.ajax({async: false,url: H,dataType: "jsonp",success: function(I) {
                        d(I);
                    }});
            }
            function d(L) {
                var K = L.data, J = '<ul id="oldTags" class="att-tag-list">';
                for (var I = 0, H = K.length; I < H; I++) {
                    J += '<li isnewadd="true"><a href="javascript:;" isCheck="false">' + decodeURIComponent(K[I]) + "</a><li>";
                }
                J += '</ul><ul id="newTags" class="att-tag-list att-tag-list-save">';
                J += '<li id="att-tag-new" class="att-tag-new"><input id="newTag" type="text" placeholder="自定义" maxLength="10" /><span>保存</span></li></ul>';
                o.find("#followTags").html(J);
                e(o.find("#followSuccessDiv").html(), function() {
                    var M = b("#btn_coll_shop_pop"), N = b("#attention-tags").find(".mc");
                    M.find(".thickcon").css("height", "auto");
                    M.css("height", "auto");
                    b("#newTag").val(b("#newTag").attr("placeholder"));
                    b("#newTag").focus(function() {
                        if (b.trim(b(this).val()) == b(this).attr("placeholder")) {
                            b(this).val("");
                        }
                    }).keyup(function() {
                        b(this).val(b(this).val().substring(0, 10));
                    }).blur(function() {
                        if (b(this).val() == "") {
                        }
                    });
                    b("#newTag").next("span").click(function() {
                        w();
                    });
                    b("#oldTags li").click(function() {
                        v(this);
                    });
                    b("#attention-tags .att-tag-btn>a:first").click(function() {
                        var Q = "", P = 0;
                        b("#oldTags,#newTags").find("a").each(function(R, S) {
                            if (b(S).attr("ischeck") == "true") {
                                P++;
                                if (Q != "") {
                                    Q += ",";
                                }
                                Q += b(S).html();
                            }
                        });
                        if (Q == "") {
                            t("请至少提供一个标签");
                        }
                        if (P > 3) {
                            t("标签最多可选3个");
                        }
                        Q = encodeURIComponent(Q);
                        var O = "http://follow.soa.jd.com/vender/editTag";
                        b.ajax({url: O,dataType: "jsonp",data: {venderId: g,tagNames: Q},success: function(R) {
                                if (R.code == "F10000") {
                                    b("#follow_error_msg").removeClass();
                                    b("#follow_error_msg").addClass("hl_green fl");
                                    b("#follow_error_msg").html("设置成功");
                                    b("#follow_error_msg").show();
                                    setTimeout(function() {
                                        b("#follow_error_msg").hide();
                                        b(".thickclose").click();
                                    }, 5000);
                                } else {
                                    if (R.code == "F0410") {
                                        t("设置的标签数超过最大限制");
                                    } else {
                                        t("设置失败");
                                    }
                                }
                            },error: function() {
                                t("设置失败");
                            }});
                    });
                });
            }
            function w() {
                var J = b("#newTag").val(), H = "标签由数字、字母、汉字组成";
                function I(M) {
                    var L = /[\u4e00-\u9fa5]|[0-9]|[a-z]|[A-Z]+/g, K = M.match(L);
                    return !!K;
                }
                if (J.length > 10 || J.trim().length > 10) {
                    t(H);
                    return false;
                }
                if (!I(J)) {
                    t(H);
                    return false;
                }
                if (J == b("#newTag").attr("placeholder")) {
                    return false;
                }
                b('<li isNewAdd="true"><a class="current" href="javascript:;" isCheck="true">' + J + "</a></li>").click(function() {
                    v(this);
                }).insertBefore(b("#att-tag-new"));
                if (b("#newTags li[isNewAdd]").length >= 3) {
                    b("#att-tag-new").hide();
                }
                b("#newTag").val("");
            }
            function v(I) {
                var H = b(I).find("a").attr("isCheck");
                if ("undefined" == typeof H || H == "false") {
                    b(I).find("a").attr("isCheck", "true");
                    b(I).find("a").addClass("current");
                } else {
                    b(I).find("a").attr("isCheck", "false");
                    b(I).find("a").removeClass("current");
                }
            }
            function t(H) {
                b("#follow_error_msg").html(H);
                b("#follow_error_msg").show();
                if (u) {
                    clearTimeout(u);
                }
                u = setTimeout(function() {
                    b("#follow_error_msg").hide();
                }, 3000);
            }
            function E() {
                if (n) {
                    n.find(".p1,.p2,.p3").hide();
                    n.find(".p3").show();
                    y();
                } else {
                    c(function() {
                        f("followedDiv", "已关注过该店铺");
                    });
                }
            }
            function c(I) {
                var H = "http://follow.soa.jd.com/vender/queryForCount";
                b.ajax({url: H,dataType: "jsonp",async: false,success: function(J) {
                        o.find("#followSuccessDiv #followedNum,#followedDiv #followedNum").html("您已关注" + J.data + "个店铺，");
                        I();
                    }});
            }
            function f(H, I) {
                b(".thickbox").html("");
                b.jdThickBox({width: 300,height: 80,title: I || "关注失败",source: o.find("#" + H).html()});
            }
            function l(I) {
                var J = I.outerWidth(), H = I.outerHeight();
                I.css({position: "absolute",left: (b(window).width() - J) / 2 + b(window).scrollLeft() + "px",top: (b(window).height() - H) / 2 + b(window).scrollTop() + "px",zIndex: 10000005});
            }
            function p() {
                if (!b(".thickdiv").length) {
                    b('<div class="thickdiv"></div>').appendTo("body");
                }
            }
            q();
            F();
        }});
})(jQuery, window);
(function(b, a) {
    a.jshop.module.sidePanel = a.jshop.module.sidePanel || {};
    b.extend(a.jshop.module.sidePanel, {base: function(r) {
            var l = b(this), g = b.extend({horizontal: 1,top: 0,show: false,animate: "normal"}, r || {}), n = l.find(".J-container"), j = n.height(), e = 609, m = false, i = 1000, h = null, c;
            var q = {normal: {show: function() {
                        n.show();
                    },hide: function() {
                        n.hide();
                    }},fade: {show: function() {
                        n.fadeIn(i);
                    },hide: function() {
                        n.fadeOut(i);
                    }},fadeH: {show: function() {
                        n.animate({"height": g.height + "px"}, i);
                    },hide: function() {
                        n.animate({"height": "0px"}, i, function() {
                            n.show();
                        });
                    }},fadeW: {show: function() {
                        n.animate({"width": g.width + "px"}, i);
                    },hide: function() {
                        n.animate({"width": "0px"}, i, function() {
                            n.show();
                        });
                    }}};
            function p() {
                if (l.parents("[instanceid]").data("panel")) {
                    l.parents("[instanceid]").data("panel").remove();
                }
                l.parents("[instanceid]").data("panel", n);
                c = q[g.animate] || q.normal;
                jshop.module.ridLazy(l);
                o();
            }
            function o() {
                if (1 == g.horizontal) {
                    n.css({right: "50%",marginRight: "505px"});
                } else {
                    if (2 == g.horizontal) {
                        n.css({left: "50%",marginLeft: "505px"});
                    } else {
                        n.css({margin: "0 auto",maxWidth: "990px",left: "50%",marginLeft: -g.width / 2 + "px"});
                    }
                }
                h = g.horizontal < 3 ? g.top : (g.horizontal == 4 ? 2 : b(window).height() - g.height - 2);
                n.css({position: "fixed",zIndex: 7,top: h + "px",overflow: "hidden"});
                if (g.height) {
                    n.height(g.height);
                }
                if (g.width) {
                    n.width(g.width);
                }
                if (g.show === 1) {
                    if (b(window).scrollTop() < e) {
                        c.hide();
                    } else {
                        if (g.horizontal == 4) {
                            if (b(window).scrollTop() >= 176) {
                                n.show();
                            }
                            m = true;
                        } else {
                            n.show();
                            m = true;
                        }
                    }
                    f();
                } else {
                    if (g.horizontal == 4) {
                        c.hide();
                        if (b(window).scrollTop() >= 175) {
                            c.show();
                            m = true;
                        }
                        b(window).scroll(function() {
                            if (!m && b(this).scrollTop() >= 176) {
                                c.show();
                                m = true;
                            }
                            if (m && b(this).scrollTop() < 176) {
                                c.hide();
                                m = false;
                            }
                        });
                    } else {
                        c.hide();
                        c.show();
                        m = true;
                    }
                }
                if (b.browser.msie && b.browser.version.match(/6/)) {
                    n.css("position", "absolute");
                    k();
                }
            }
            function k() {
                b(window).scroll(function() {
                    if (m) {
                        n.css("top", h + b(this).scrollTop() + "px");
                    }
                });
                b(window).resize(function() {
                    h = g.horizontal < 3 ? g.top : (g.horizontal == 4 ? 2 : b(window).height() - g.height - 2);
                    if (m) {
                        n.css("top", h + b(this).scrollTop() + "px");
                    }
                    return;
                });
            }
            function f() {
                b(window).scroll(function() {
                    if (!m && b(this).scrollTop() >= e) {
                        c.show();
                        m = true;
                    }
                    if (m && b(this).scrollTop() < e) {
                        c.hide();
                        m = false;
                    }
                });
            }
            function d() {
                var s = (b("#service-2013").length ? b("#service-2013").offset().top : b("body").height()) - g.height - g.top;
                b(window).scroll(function() {
                    if (b(this).scrollTop() >= s) {
                        n.css({top: s - b(this).scrollTop() + g.top + "px"});
                    } else {
                        n.css({top: g.top + "px"});
                    }
                });
            }
            p();
        }});
})(jQuery, window);
(function(b, a) {
    a.jshop.module.Countdown = a.jshop.module.Countdown || {};
    b.extend(a.jshop.module.Countdown, {_timer: null,_sysTime: null,_countdownList: [],base: (function() {
            var d = null, e = null, c = null;
            return function(g) {
                var l = b(this), h = b.extend({hasDay: true,dayCnt: "",hourCnt: "",minuteCnt: "",secondCnt: ""}, g || {}), f = null;
                function i() {
                    if (!h.countDownInfo) {
                        return;
                    }
                    j();
                    l.data("cutTime", f).data("arg", h).data("over", false);
                    c = b('[module-name="Countdown"] .j-module').toArray();
                    if (!d) {
                        a.getServerTime(function(m) {
                            var n = new Date() - m;
                            if (!d) {
                                k();
                            }
                        });
                    }
                }
                function j() {
                    var p = h.countDownInfo, m = p.split(" "), o = m[0].split("-"), n = m[1].split(":");
                    f = new Date(Number(o[0]), (Number(o[1]) + 11) % 12, Number(o[2]), Number(n[0]), Number(n[1]), Number(n[2]));
                }
                function k() {
                    d = setInterval(function() {
                        for (var o = 0, r = c.length; o < r; o++) {
                            var q = b(c[o]), n = q.data("cutTime"), v = q.data("arg"), s = parseInt((n - new Date() + e) / 1000);
                            if (s < 0) {
                                c.splice(o, 1);
                                break;
                            }
                            var u = Math.floor(s / (24 * 3600)), m = Math.floor(s / 3600) - (v.hasDay ? u * 24 : 0), t = Math.floor(s % 3600 / 60), p = s % 60;
                            if (v.hasDay) {
                                q.find(v.dayCnt).html(u > 9 ? u : "0" + u);
                            }
                            q.find(v.hourCnt).html(m > 9 ? m : "0" + m);
                            q.find(v.minuteCnt).html(t > 9 ? t : "0" + t);
                            q.find(v.secondCnt).html(p > 9 ? p : "0" + p);
                        }
                    }, 1000);
                }
                i();
            };
        })()});
    a.getServerTime = function(d) {
        var c = "http://act.jshop.jd.com/serverTime.html";
        b.ajax({url: c,dataType: "jsonp",success: function(e) {
                d(e.nowTime ? new Date(e.nowTime) : new Date());
            }});
    };
})(jQuery, window);



(function(a) {
    window.$ = a;
    a.fn.extend({toggleBackground: function(c, b) {
            a(this).mouseover(function() {
                a(this).css("background-color", c || "");
            }).mouseout(function() {
                a(this).css("background-color", b || "");
            });
        },toggleStyle: function(b, c, d) {
            a(this).mouseover(function() {
                a(this).addClass(b || "");
            }).mouseout(function() {
                a(this).addClass(c || "");
            }).click(function() {
                a(this).addClass(d || "");
            });
        }});
})(jQuery);
(function() {
    if (jQuery.fn.lazyLoad) {
        return;
    }
    jQuery.fn.lazyLoad = function(b) {
        var a = jQuery.extend({defClass: "J_imgLazyload",defScreen: 2,container: "body",orginalSrc: "original"}, b || {}), c = (function() {
            if (a.container.constructor == String) {
                return jQuery(a.container + " ." + a.defClass);
            } else {
                if (a.container.constructor == Array) {
                    var g = new Array();
                    for (var f = 0, e = a.container.length; f < e; f++) {
                        if (jQuery(a.container[f] + " ." + a.defClass).length > 0) {
                            g.concat(jQuery(a.container[f]));
                        }
                    }
                    return g;
                } else {
                    return {};
                }
            }
        })();
        function d() {
            var h = jQuery(window).scrollTop() + document.documentElement.clientHeight * a.defScreen;
            for (var g = 0, e = c.length; g < e; g++) {
                var f = jQuery(c[g]);
                if (!f.hasClass(a.defClass) || !f.parents("[instanceid]").length || f.is(":hidden")) {
                    continue;
                }
                if (f.offset().top < h) {
                    f.removeClass(a.defClass);
                    f.attr("src", f.attr(a.orginalSrc));
                    f.removeAttr(a.orginalSrc);
                }
            }
        }
        jQuery(window).scroll(d).resize(d);
        d();
    };
    jQuery(function() {
        jQuery("body").lazyLoad();
    });
})();
jshop.component = jshop.component || {};
function SkuIdPriceGetting() {
    var e = [], i, k, h, f = 0, b = "";
    var j = function() {
        i = "http://p.3.cn/prices/mgets?skuids=", k = "&type=2&callback=callBackPriceService" + (!!readCookie("ipLoc-djd") ? "&area=" + readCookie("ipLoc-djd") : "");
        if ($("#JSHOP_CHANNEL_FLAG").val() == "ept") {
            i = "http://jprice.jd.com/eptprice/";
            k = "-USD-1.html";
        }
        if ($("#JSHOP_CHANNEL_FLAG").val() == "newEpt") {
            i = "http://ipi.360buy.jd.com/getPriceRange.html?callback=callBackPriceService";
            k = "";
        }
        var l = $('span[jshop="price"]');
        $.each(l, function(m, o) {
            e.push($(o));
        });
        $(window).scroll(c);
    };
    var c = function() {
        h = $(window).scrollTop() + document.documentElement.clientHeight * 2;
        if (e.length == 0) {
            return;
        }
        var p = [];
        for (var o = 0, l = e.length; o < l; o++) {
            var n = e[o].parents("[instanceid]"), q = n.offset().top;
            if ((n.attr("module-name") == "qualityWeekly" && q < h) || (e[o].offset().top >= q && e[o].offset().top < h)) {
                if ($("#JSHOP_CHANNEL_FLAG").val() == "ept" || $("#JSHOP_CHANNEL_FLAG").val() == "newEpt") {
                    a(e[o]);
                } else {
                    var m = $(e[o]).attr("jdprice") || $(e[o]).attr("jsprice") || $(e[o]).attr("jskuprice");
                    if (m) {
                        b += "J_" + m + ",";
                        f++;
                        if (f == 20) {
                            g(b);
                        }
                    }
                }
            } else {
                p.push(e[o]);
            }
        }
        g(b);
        e = p;
        delete p;
        if (!e.length) {
            $(window).unbind("scroll,resize", c);
        }
    };
    window.callBackPriceService = function(m) {
        var n = 0;
        for (var l = 0; l < m.length; l++) {
            n = m[l].id.substr(2);
            m[l].id = n;
            getNumPriceService(m[l]);
        }
    };
    var g = function(m) {
        var l = m.substr(m, m.length - 1);
        if (l) {
            d(l);
        }
        f = 0;
        b = "";
    };
    var d = function(m) {
        var l = document.createElement("script");
        l.setAttribute("src", i + m + k);
        document.getElementsByTagName("head")[0].appendChild(l);
    };
    var a = function(o) {
        if ($("#JSHOP_CHANNEL_FLAG").val() == "newEpt") {
            var m = $(o).attr("jdprice") || $(o).attr("jsprice") || $(o).attr("jskuprice"), l = $(o).attr("currency") || "USD";
            $.ajax({url: "http://ipi.360buy.jd.com/getPriceRange.html",dataType: "jsonp",type: "POST",data: {json: '{"pid":' + m + ',"currency":' + '"' + l + '"}'},success: function(q) {
                    if (!q.hprice) {
                        return;
                    }
                    var p = q.hprice >= 0 ? q.hprice : "<span class='jdNumNo'>" + noPriceTag + "</span>", r = q.lprice >= 0 ? q.lprice : "<span class='jsNumNo'>" + noPriceTag + "</span>";
                    jQuery("span[jsprice=" + q.pid + "]").each(function() {
                        if ($(this).attr("currency") === l) {
                            $(this).html(p);
                        }
                    });
                    jQuery("span[jdprice=" + q.pid + "]").each(function() {
                        if ($(this).attr("currency") === l) {
                            $(this).html(r);
                        }
                    });
                }});
        } else {
            var m = $(o).attr("jdprice") || $(o).attr("jsprice") || $(o).attr("jskuprice"), n = document.createElement("script");
            n.type = "text/javascript";
            n.src = i + m + k;
            (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(n);
        }
    };
    this.localPriceRefresh = function(n) {
        var p = $(n).find('span[jshop="price"]');
        f = 0;
        for (var o = 0, l = p.length; o < l; o++) {
            if ($("#JSHOP_CHANNEL_FLAG").val() == "ept" || $("#JSHOP_CHANNEL_FLAG").val() == "newEpt") {
                a(p[o]);
            } else {
                var m = $(p[o]).attr("jdprice") || $(p[o]).attr("jsprice") || $(p[o]).attr("jskuprice");
                if (m) {
                    b += "J_" + m + ",";
                    f++;
                    if (f == 20) {
                        g(b);
                    }
                }
            }
        }
        g(b);
    };
    j();
    c();
}
function getNewEptPromInfo() {
    var d = $(".jNum[saprice]"), b = d.eq(0).attr("currency"), a = [], c = "";
    $(".jNum[saprice]").each(function(e, f) {
        a.push(f.getAttribute("saprice"));
    });
    c = '{"currency":"' + b + '","pidList":' + "[" + a.join(",") + "]}";
    if (a.length > 0) {
        $.ajax({url: "http://ipr.360buy.jd.com/getBatchPrdPromo.html",dataType: "jsonp",type: "POST",data: {json: c},success: function(j) {
                if (j && j.prdList) {
                    var f = j.prdList;
                    for (var h = 0, e = f.length; h < e; h++) {
                        if (f[h].promoTag == 1) {
                            var k = f[h].promoInfo;
                            var m = handlePromInfo(k);
                            var g = f[h].pid;
                            if (k.promoType == 1) {
                                var l = d.filter("[saprice='" + g + "']");
                                if (l.attr("type") === "discount") {
                                    l.text(Number(k.discount.toFixed(2)));
                                    l.closest(".jNumWrap").show();
                                    l.removeClass("jNum");
                                }
                            } else {
                                if (k.promoType == 2) {
                                    var l = d.filter("[saprice='" + g + "']");
                                    if (l.attr("type") === "rate") {
                                        l.text(~~k.discountRate);
                                        l.closest(".jNumWrap").show();
                                        l.removeClass("jNum");
                                    }
                                }
                            }
                        }
                    }
                }
            },error: function(e) {
                var f = 0;
            }});
    }
}
function handlePromInfo(c) {
    var d = c.cname;
    var b = c.quota;
    var a = "";
    if (c.promoType == 1) {
        a = c.discount;
    }
    if (c.promoType == 2) {
        a = c.discountRate;
    }
    if (d == "" || b == "" || a == "") {
        return "";
    }
    return d + " Category purchase " + b + " deals " + a;
}
var skuIdPriceObj;
jQuery(function() {
    skuIdPriceObj = new SkuIdPriceGetting();
    getNewEptPromInfo();
});
function getNumPriceService(b) {
    if (!b) {
        return;
    }
    var a = "暂无定价";
    jshop.component.setJdPrice(b, a);
    jshop.component.setSalePrice(b, a);
    jshop.component.setSkuPrice(b, a);
    jshop.component.setSavePrice(b);
    jshop.component.getSaveSalePrice(b);
    jshop.component.getDiscountSalePrice(b);
    jshop.component.getDiscountSkuPrice(b);
}
function getEptPriceService(b) {
    if (!b) {
        return;
    }
    var a = "No Price";
    jshop.component.setJdPrice(b, a);
    jshop.component.setSalePrice(b, a);
    jshop.component.setSkuPrice(b, a);
    jshop.component.setSavePrice(b);
    jshop.component.setDiscountPrice(b);
}
jshop.component.getScript = function(b, e) {
    var d = new Array();
    var c = document.getElementsByTagName("head")[0] || document.documentElement;
    var d = $("script", c);
    if (d.length > 0) {
        d.each(function(f, g) {
            if (g.src == b) {
                $(g).remove();
            }
            return true;
        });
    }
    var a = document.createElement("script");
    a.type = "text/javascript";
    a.src = b;
    c.appendChild(a);
};
jshop.component.arrayUnique = function(b) {
    var h = {};
    var g = [];
    var f = {};
    for (var c = 0, a = b.length; c < a; c++) {
        var e = b.eq(c), d = e.attr("jdprice") || e.attr("jsprice") || e.attr("jskuprice");
        if (typeof d != "undefined" && d != "") {
            if (h[d] == undefined) {
                h[d] = e.offset().top;
                g.push(e);
                f[d] = g.length - 1;
            } else {
                if (h[d] > e.offset().top) {
                    h[d] = e.offset().top;
                    g[f[d]] = e;
                }
            }
        }
    }
    return g;
};
jshop.component.getPrice = function(a) {
    if (!a) {
        return;
    }
    skuIdPriceObj.localPriceRefresh(a);
};
jshop.component.setPrice = function(g, e, b) {
    var f = b ? b.find("span[jshop='price']") : jQuery("span[jshop='price']");
    var c = jshop.component.arrayUnique(f);
    for (var d = 0, a = c.length; d < a; d++) {
        var h = g + c[d] + e;
        jshop.component.getScript(h, function() {
        });
    }
};
jshop.component.setJdPrice = function(c, a) {
    if (!c) {
        return;
    }
    if (c.p) {
        var b = c.p >= 0 ? c.p : "<span class='jdNumNo'>" + a + "</span>";
    } else {
        if (c.skuId) {
            var b = c.jdPrice ? c.jdPrice.amount : "<span class='jdNumNo'>" + a + "</span>";
        }
    }
    var d = jQuery("span[jdprice=" + (c.id || c.skuId) + "]");
    $.each(d, function(e, f) {
        $(f).html(b);
    });
};
jshop.component.setSalePrice = function(c, a) {
    if (!c) {
        return;
    }
    if (c.m) {
        var b = c.m >= 0 ? c.m : "<span class='jsNumNo'>" + a + "</span>";
    } else {
        if (c.skuId) {
            var b = c.salesPrice ? c.salesPrice.amount : "<span class='jsNumNo'>" + a + "</span>";
        }
    }
    var d = jQuery("span[jsprice=" + (c.id || c.skuId) + "]");
    $.each(d, function(e, f) {
        $(f).html(b);
    });
};
jshop.component.setSkuPrice = function(c, a) {
    if (!c) {
        return;
    }
    if (c.m) {
        var b = c.m >= 0 ? c.m : "<span class='jsNumNo'>" + a + "</span>";
    } else {
        if (c.skuId) {
            var b = c.skuPrice ? c.skuPrice.amount : "<span class='jsNumNo'>" + a + "</span>";
        }
    }
    var d = jQuery("span[jskuprice=" + (c.id || c.skuId) + "]");
    $.each(d, function(e, f) {
        $(f).html(b);
    });
};
jshop.component.setDiscountPrice = function(b) {
    function e(i, g) {
        if (i == 0 || g == 0) {
            return "";
        }
        var f = ((i - g) / i) * 100;
        var h = Math.round(f);
        return h;
    }
    if (!b) {
        return;
    }
    if (b.m) {
        var d = b.p >= 0 ? b.p : 0;
        var a = b.m >= 0 ? b.m : 0;
    } else {
        if (b.skuId) {
            var d = b.jdPrice ? b.jdPrice.amount : 0;
            var a = b.skuPrice ? b.skuPrice.amount : 0;
        }
    }
    var c = jQuery("span[diprice=" + (b.id || b.skuId) + "]");
    $.each(c, function(f, g) {
        $(g).html(e(a, d));
    });
};
jshop.component.setSavePrice = function(c) {
    function b(g, h) {
        if (h == 0 || g == 0) {
            return "";
        }
        var f = g - h;
        if (f < 0 || f == 0) {
            f = "0";
        }
        f = f.toString().match(/\d+(\.\d{1,2})?/)[0];
        return f;
    }
    if (!c) {
        return;
    }
    if (c.m) {
        var e = c.p >= 0 ? c.p : 0;
        var a = c.m >= 0 ? c.m : 0;
    } else {
        if (c.skuId) {
            var e = c.jdPrice ? c.jdPrice.amount : 0;
            var a = c.skuPrice ? c.skuPrice.amount : 0;
        }
    }
    var d = jQuery("span[saprice=" + (c.id || c.skuId) + "]");
    $.each(d, function(f, g) {
        $(g).html(b(a, e));
    });
};
jshop.component.getSaveSalePrice = function(c) {
    function a(g, h) {
        if (h == 0 || g == 0) {
            return "";
        }
        var f = g - h;
        if (f < 0 || f == 0) {
            f = "0";
        }
        f = f.toString().match(/\d+(\.\d{1,2})?/)[0];
        return f;
    }
    if (!c) {
        return;
    }
    if (c.m) {
        var e = c.p >= 0 ? c.p : 0;
        var b = c.m >= 0 ? c.m : 0;
    } else {
        if (c.skuId) {
            var e = c.jdPrice ? c.jdPrice.amount : 0;
            var b = c.salesPrice ? c.salesPrice.amount : 0;
        }
    }
    var d = jQuery("span[ssprice=" + (c.id || c.skuId) + "]");
    $.each(d, function(f, g) {
        $(g).html(a(b, e));
    });
};
jshop.component.getDiscountSalePrice = function(b) {
    function e(i, g) {
        if (i == 0 || g == 0) {
            return "";
        }
        var f = (g / i) * 10;
        var h = new Number(f);
        return h.toFixed(1);
    }
    if (!b) {
        return;
    }
    if (b.m) {
        var d = b.p >= 0 ? b.p : 0;
        var a = b.m >= 0 ? b.m : 0;
    } else {
        if (b.skuId) {
            var d = b.jdPrice ? b.jdPrice.amount : 0;
            var a = b.salesPrice ? b.salesPrice.amount : 0;
        }
    }
    var c = jQuery("span[dsaleprice=" + (b.id || b.skuId) + "]");
    $.each(c, function(f, g) {
        $(g).html(e(a, d));
    });
};
jshop.component.getDiscountSkuPrice = function(b) {
    function e(i, g) {
        if (i == 0 || g == 0) {
            return "";
        }
        var f = (g / i) * 10;
        var h = new Number(f);
        return h.toFixed(1);
    }
    if (!b) {
        return;
    }
    if (b.m) {
        var d = b.p >= 0 ? b.p : 0;
        var a = b.m >= 0 ? b.m : 0;
    } else {
        if (b.skuId) {
            var d = b.jdPrice ? b.jdPrice.amount : 0;
            var a = b.skuPrice ? b.skuPrice.amount : 0;
        }
    }
    var c = jQuery("span[dskuprice=" + (b.id || b.skuId) + "]");
    $.each(c, function(f, g) {
        $(g).html(e(a, d));
    });
};
jQuery(function() {
    try {
        var b = jQuery("#pageInstance_appId").val();
        var a = jQuery("#pageInstance_id").val();
        if (b && a) {
            log(1, 8, b, a);
        }
    } catch (c) {
    }
});
jQuery(function() {
    var c = /^\d+$/;
    var b = ["360buy.com/product/", "book.360buy.com/", "mvd.360buy.com/", "e.360buy.com/", "minitiao.com/product/", "ehaoyao.com/product/", "360top.com/product/", "en.360buy.com/product/", "jd.com/product/", "book.jd.com/", "mvd.jd.com/", "e.jd.com/", "item.jd.com/"];
    jQuery.each(b, function(e, f) {
        jdProductStr = f;
        var d = jQuery("[href*='" + jdProductStr + "']");
        jQuery.each(d, function(h, k) {
            var g = k.href;
            var j = g.substring(g.lastIndexOf("/") + 1, g.lastIndexOf("."));
            if (c.test(j)) {
                jQuery(k).bind("click", function() {
                    try {
                        var i = jQuery("#pageInstance_appId").val();
                        if (i) {
                            reClickCube(i, j);
                        }
                    } catch (l) {
                    }
                });
            }
        });
    });
    var a = ["360buy.com/purchase/InitCart.aspx", "360buy.com/InitCart.aspx", "360buy.com/cart/addSkuToCart.action", "jd.com/purchase/InitCart.aspx", "jd.com/InitCart.aspx", "jd.com/cart/addSkuToCart.action"];
    jQuery.each(a, function(d, f) {
        var g = f;
        var e = jQuery("[href*='" + g + "']");
        jQuery.each(e, function(j, o) {
            var h = o.href;
            var m = h.substring(h.indexOf("pid="));
            if (m.indexOf("&") > -1) {
                var k = m.split("&");
                if (k.length > 0) {
                    m = k[0].substring(k[0].indexOf("pid=") + 4);
                }
            } else {
                m = m.substring(m.indexOf("pid=") + 4);
            }
            if (c.test(m)) {
                var l = jQuery(o).attr("onclick");
                jQuery(o).unbind("click").removeAttr("onclick");
                jQuery(o).bind("click", function() {
                    try {
                        var i = jQuery("#pageInstance_appId").val();
                        if (i) {
                            reClickCube(i, m);
                        }
                    } catch (n) {
                    }
                }).bind("click", l || function() {
                });
            }
        });
    });
});
/*$(function() {
    function a() {
        var b = $(".layoutcontainer").attr("isfixed"), d = $(".layoutcontainer").offset().top, c = typeof gConfig != "undefined";
        var b = parseInt(b);
        if (b) {
            $(window).scroll(function() {
                var e = $(this).scrollTop();
                if (e >= d) {
                    $(".layoutcontainer").css("background-attachment", "fixed");
                } else {
                    $(".layoutcontainer").css("background-attachment", "scroll");
                }
            });
        }
    }
    a();
    if (typeof NotifyPop != "undefined") {
        NotifyPop.init($(".notice-store"));
    }
});*/
if (typeof jdModelCallCenter != "undefined") {
    jdModelCallCenter.init = function() {
        var b = this;
        $.ajax({url: ("https:" == document.location.protocol ? "https://" : "http://") + "passport." + pageConfig.FN_getDomain() + "/new/helloService.ashx?m=ls&sso=0",dataType: "jsonp",scriptCharset: "gbk",success: function(a) {
                b.tbClose();
                a && a.info && $("#loginbar").html(a.info);
                b.settings.fn();
            }});
    };
}
$.fn.extend({tab: function(b) {
        var a = $.extend({focus: "d-current",handle: function() {
            },item: "li",event: "click"}, b || {}), d = $(this), c = d.find(a.item);
        if (!c.length) {
            return;
        }
        c.each(function(e, f) {
            $(f).bind(a.event, function() {
                c.removeClass(a.focus);
                $(this).addClass(a.focus);
                a.handle.call(f, e);
            });
        });
        c.eq(0).trigger(a.event);
    }});
(function() {
    var e = '<div id="whole">' + '<div id="followSuccessDiv">' + '<div class="tips" id="success"> <h2>关注成功！</h2>' + '<p><em id="followNum"></em>' + '<a target="_blank" href="http://t.jd.com/vender/followVenderList.action">查看我的关注&gt;&gt;</a>' + "</p>" + "</div>" + '<div id="attention-tags">' + '<div class="mt">' + "<h4>选择标签<em>（最多可选3个）</em></h4>" + '<div class="extra"></div>' + "</div>" + '<div class="mc">' + '<div id="followTags" ></div>' + '<div class="att-tag-btn">' + '<a href="javascript:followSubmit()" class="att-btn-ok">确定</a>' + '<a class="att-btn-cancal" href="javascript:jdThickBoxclose()">取消</a>' + '<span id="follow_error_msg"  class="att-tips fl"></span>' + "</div>" + "</div>" + "</div>" + "</div>" + '<div id="followTopicSuccessDiv">' + '<div id="att-mod-success">' + '<div class="att-img fl"><img src="http://misc.360buyimg.com/201007/skin/df/i/icon_correct.jpg" alt=""/></div>' + '<div class="att-content"><h2>关注成功</h2>' + '<p><em id="followTopicNum" ></em>' + '<a target="_blank" href="http://t.jd.com/activity/followActivityList.action">查看我的关注 &gt;&gt;</a>' + "</p>" + "</div>" + '<div class="att-tag-btn">' + '<a class="att-btn-cancal" href="javascript:jdThickBoxclose()" onclick="jdThickBoxclose()">关闭</a>' + "</div>" + "</div>" + "</div>" + '<div id="followFailDiv" >' + '<div id="att-mod-again">' + '<div class="att-img fl">' + '<img src="http://misc.360buyimg.com/201007/skin/df/i/icon_sigh.jpg" alt=""/>' + "</div>" + '<div class="att-content"><h2>关注失败</h2>' + '<p><a id="followFailSeeFollowUrl" target="_blank" href="http://t.jd.com/vender/followVenderList.action">查看我的关注 &gt;&gt;</a></p>' + "</div>" + '<div class="att-tag-btn"><a class="att-btn-cancal" href="javascript:jdThickBoxclose()">关闭</a></div>' + "</div>" + "</div>" + '<div id="followMaxDiv">' + '<div id="att-mod-again">' + '<div class="att-img fl">' + '<img src="http://misc.360buyimg.com/201007/skin/df/i/icon_sigh.jpg" />' + "</div>" + '<div class="att-content">' + "<h2>关注数量达到最大限制</h2>" + '<p><a id="followMaxSeeFollowUrl" target="_blank" href="http://t.jd.com/vender/followVenderList.action">查看我的关注 &gt;&gt;</a></p>' + "</div>" + '<div class="att-tag-btn"><a class="att-btn-cancal" href="javascript:jdThickBoxclose()">关闭</a></div>' + "</div>" + "</div>" + '<div id="followedDiv">' + '<div id="att-mod-again">' + '<div class="att-img fl">' + '<img src="http://misc.360buyimg.com/201007/skin/df/i/icon_sigh.jpg"/>' + "</div>" + '<div class="att-content">' + '<h2 id="followedTitle">已关注过该店铺</h2>' + '<p><em id="followedNum"></em>' + '<a id="followedSeeFollowUrl" target="_blank" href="http://t.jd.com/vender/followVenderList.action">查看我的关注 &gt;&gt;</a>' + "</p>" + "</div>" + '<div class="att-tag-btn"><a class="att-btn-cancal" href="javascript:jdThickBoxclose()">关闭</a></div></div>' + "</div>" + "</div>", j;
    followVM = null;
    function b() {
        jdModelCallCenter.settings.fn = function() {
            d();
        };
        $.login({modal: true,complete: function(p) {
                if (p != null && p.IsAuthenticated != null && p.IsAuthenticated) {
                    jdModelCallCenter.settings.fn();
                }
            }});
    }
    function d() {
        if (!followVM) {
            followVM = $(e);
        }
        $.ajax({url: "http://follow.soa.jd.com/vender/follow",data: {venderId: j},type: "POST",dataType: "jsonp",success: function(p) {
                if (p.code == "F10000") {
                    g();
                } else {
                    if (p.code == "F0409") {
                        o();
                    } else {
                        if (p.code == "F0410") {
                            m();
                        } else {
                            f();
                        }
                    }
                }
            },error: function() {
                f();
            }});
    }
    function g() {
        $.ajax({url: "http://follow.soa.jd.com/vender/queryForCount",type: "POST",dataType: "jsonp",success: function(p) {
                if (p.code == "F10000") {
                    followVM.find("#followNum").html("您已关注" + p.data + "个店铺");
                }
                k();
            },error: function() {
                f();
            }});
    }
    function o() {
        $.ajax({url: "http://follow.soa.jd.com/vender/queryForCount",type: "POST",dataType: "jsonp",success: function(p) {
                if (p.code == "F10000") {
                    followVM.find("#followedNum").html("您已关注" + p.data + "个店铺");
                }
                $.jdThickBox({width: 300,height: 80,title: "提示",source: followVM.find("#followedDiv").html()});
            },error: function() {
                f();
            }});
    }
    function m() {
        $.jdThickBox({width: 300,height: 80,title: "提示",source: followVM.find("#followMaxDiv").html()});
    }
    function k() {
        $.ajax({async: false,url: "http://follow.soa.jd.com/vender/queryTagForListByCount?count=5",dataType: "jsonp",success: function(p) {
                i(p);
                l();
            },error: function(p) {
                f();
            }});
    }
    function i(s) {
        var r = '<ul id="oldTags" class="att-tag-list">';
        for (var q = 0, p = s.data.length; q < p; q++) {
            r += '<li><a href="javascript:;" onclick="chooseTag(this)">' + decodeURIComponent(s.data[q]) + "</a></li>";
        }
        r += "</ul>";
        r += '<ul id="newTags" class="att-tag-list att-tag-list-save">';
        r += '<li id="att-tag-new" class="att-tag-new"><input id="newTag" type="text" placeholder="自定义" onfocus="newTagOnfocus" onkeyup="checkLength(this)" maxLength="10" /><span onclick="saveNewTag()">添加</span></li>';
        r += "</ul>";
        followVM.find("#followTags").html(r);
    }
    function f() {
        $.jdThickBox({width: 300,height: 80,title: "提示",source: followVM.find("#followFailDiv").html()});
    }
    function l() {
        $.jdThickBox({width: 510,height: 260,title: "提示",_box: "btn_coll_shop_pop",source: followVM.find("#followSuccessDiv").html()}, function() {
            var p = $("#btn_coll_shop_pop"), q = $("#attention-tags").find(".mc");
            p.find(".thickcon").css("height", "auto");
            p.css("height", "auto");
            $("#newTag").val($("#newTag").attr("placeholder"));
        });
    }
    function h() {
        var p = "", r = 0;
        $("#oldTags").find("a").each(function(s, t) {
            if ("true" == $(this).attr("isCheck")) {
                r++;
                if (p == "") {
                    p = $(this).html();
                } else {
                    p = p + "," + $(this).html();
                }
            }
        });
        $("#newTags").find("a").each(function(s, t) {
            if ("true" == $(this).attr("isCheck")) {
                r++;
                if (p == "") {
                    p = $(this).html();
                } else {
                    p = p + "," + $(this).html();
                }
            }
        });
        if (p == "") {
            a("请至少提供1个标签");
            return;
        }
        if (r > 3) {
            a("最多可选择3个标签");
            return;
        }
        p = encodeURIComponent(p);
        var q = "http://follow.soa.jd.com/vender/editTag";
        $.ajax({async: false,url: q,dataType: "jsonp",data: {venderId: j,tagNames: p},success: function(s) {
                if (s.code == "F10000") {
                    $("#follow_error_msg").removeClass();
                    $("#follow_error_msg").addClass("hl_green fl");
                    $("#follow_error_msg").html("设置成功");
                    $("#follow_error_msg").show();
                    setTimeout(function() {
                        jdThickBoxclose();
                    }, 5000);
                } else {
                    if (s.code == "F0410") {
                        a("设置的标签数超过最大限制");
                    } else {
                        a("设置失败");
                    }
                }
            },error: function(s, t) {
                a("设置失败");
            }});
    }
    function c(r) {
        var p = /[\u4e00-\u9fa5]|[0-9]|[a-z]|[A-Z]/g, q = r.match(p), s = 0;
        if (q != null) {
            s = r.match(p).length;
        }
        if (s != r.length) {
            return false;
        }
        return true;
    }
    function a(p) {
        $("#follow_error_msg").removeClass();
        $("#follow_error_msg").addClass("att-tips fl");
        $("#follow_error_msg").html(p);
        $("#follow_error_msg").show();
        setTimeout(function() {
            $("#follow_error_msg").hide();
        }, 3000);
    }
    function n() {
        var r = $("#newTag").val();
        if (r.length > 10 || r.trim().length > 10) {
            a("标签数字、字母、汉字组成");
            return;
        }
        r = r.trim();
        var q = c(r);
        if (!q) {
            a("标签数字、字母、汉字组成");
            return;
        }
        if (r == "" || r == $("#newTag").attr("placeholder")) {
            a("请输入自定义名称！");
            $("#newTag").val($("#newTag").attr("placeholder"));
            return;
        }
        $("<li isNewAdd='true' ><a class='current' href='javascript:void(0)' onclick='chooseTag(this)' isCheck='true' >" + r + "</a></li>").insertBefore($("#att-tag-new"));
        var p = $("li[isNewAdd]");
        if (p.length >= 3) {
            $("#att-tag-new").attr("style", "display:none");
        }
        $("#newTag").val($("#newTag").attr("placeholder"));
    }
    $(function() {
        $("body").delegate(".shop-attention", "click", function() {
            j = $(this).attr("shopid");
            if (typeof j == "undefined") {
                return;
            }
            b();
        });
    });
    window.saveNewTag = n;
    window.followSubmit = h;
})();
function newTagOnfocus() {
    var a = $("#newTag").val();
    a = a.trim();
    if (a == $("#newTag").attr("placeholder")) {
        $("#newTag").val("");
    }
}
function checkLength(a) {
    if (a.value.length > 10) {
        a.value = a.value.substring(0, 10);
    }
}
function chooseTag(b) {
    var a = jQuery(b).attr("isCheck");
    if ("undefined" == typeof a || a == "false") {
        jQuery(b).attr("isCheck", "true").addClass("current");
    } else {
        jQuery(b).attr("isCheck", "false").removeClass("current");
    }
}
