(function() {
    var a = this;
    a.jshop = a.jshop || {};
    a.js = a.jshop;
    (function(e, f) {
        var h = (function() {
            return {addFavorite: function(o, j) {
                    var m = j;
                    var l = o;
                    try {
                        if (document.all) {
                            window.external.AddFavorite(m, l);
                        } else {
                            if (window.sidebar) {
                                window.sidebar.addPanel(l, m, "");
                            } else {
                                alert("对不起，您的浏览器不支持此操作!\n请您使用菜单栏或Ctrl+D收藏本站。");
                            }
                        }
                    } catch (n) {
                        alert("对不起，您的浏览器不支持此操作!\n请您使用菜单栏或Ctrl+D收藏本站。");
                    }
                },jdShowRecommend: function(p, q, l, n, r) {
                    var o = "在" + r + '中有一篇文章"' + q + '"感觉不错，分享一下！';
                    var m = "";
                    var j = p;
                    if (j == "site-qzone") {
                        url = "http://v.t.qq.com/share/share.php?source=1000002&site=http://www.jd.com&title=" + o + "&pic=" + l + "&url=" + n + m;
                    }
                    if (j == "site-sina") {
                        url = "http://v.t.sina.com.cn/share/share.php?appkey=2445336821&title=" + o + "&pic=" + l + "&url=" + n + m;
                    }
                    if (j == "site-renren") {
                        url = "http://share.renren.com/share/buttonshare/post/1004?title=" + q + "&content=" + o + "&pic=" + l + "&url=" + n + m;
                    }
                    if (j == "site-kaixin") {
                        url = "http://www.kaixin001.com/repaste/share.php?rtitle=" + q + "&rcontent=" + o + "&rurl=" + n + m;
                    }
                    if (j == "site-douban") {
                        url = "http://www.douban.com/recommend/?title=" + q + "&comment=" + o + "&url=" + n + m;
                    }
                    window.open(encodeURI(url), "", "height=400, width=600");
                }};
        })();
        var k = (function() {
            return {};
        })();
        var g = (function() {
            return {marquee: function(m, l, j) {
                    j.innerHTML = l.innerHTML;
                    if (j.offsetTop - m.scrollTop <= 0) {
                        m.scrollTop -= l.offsetHeight;
                    } else {
                        m.scrollTop++;
                    }
                },slide: function(j) {
                    f("#" + j["wrapperId"]).jdSlide({width: j["width"],height: j["height"],type: j["image"],pics: j["pics"]});
                },shades: (function() {
                    function m(r, p, t) {
                        var u = r.getElementsByTagName(p);
                        for (var s = 0, v = u.length, q = []; s < v; s++) {
                            if (u[s].className == t) {
                                q.push(u[s]);
                            }
                        }
                        if (q.length == 1) {
                            q = q[0];
                        }
                        return q;
                    }
                    function j(p, q) {
                        try {
                            if (p != null) {
                                p.style.filter = "alpha(opacity=100)";
                            }
                            if (p.filters) {
                                p.filters.alpha.opacity = Math.round(q);
                            } else {
                                p.style.opacity = q / 100;
                            }
                        } catch (n) {
                        }
                    }
                    function l(s, n, t, p, w, o, r, v, u) {
                        this.slides = [];
                        this.over = false;
                        this.S = this.S0 = n;
                        this.iW = t;
                        this.iH = p;
                        this.oP = w;
                        this.imgWidth = v;
                        this.imgHeight = u;
                        document.getElementById(s).style.width = o + "px";
                        document.getElementById(s).style.height = r + "px";
                        document.getElementById(s).style.position = "absolute";
                        document.getElementById(s).style.overflow = "hidden";
                        this.oc = document.getElementById(s);
                        this.frm = m(this.oc, "div", "slide");
                        this.NF = this.frm.length;
                        this.resize();
                        for (var q = 0; q < this.NF; q++) {
                            this.frm[q].style.zIndex = "1";
                            this.frm[q].style.position = "absolute";
                            this.frm[q].style.background = "#000";
                            this.slides[q] = new Slide(this, q);
                        }
                        this.oc.parent = this;
                        this.view = this.slides[0];
                        this.Z = this.mx;
                        this.oc.onmouseout = function() {
                            this.parent.mouseout();
                            return false;
                        };
                    }
                    l.prototype = {run: function() {
                            this.Z += this.over ? (this.mn - this.Z) * 0.5 : (this.mx - this.Z) * 0.5;
                            this.view.calc();
                            var n = this.NF;
                            while (n--) {
                                this.slides[n].move();
                            }
                        },resize: function() {
                            this.wh = this.oc.clientWidth;
                            this.ht = this.oc.clientHeight;
                            this.wr = this.wh * this.iW;
                            this.r = this.ht / this.wr;
                            this.mx = this.wh / this.NF;
                            this.mn = (this.wh * (1 - this.iW)) / (this.NF - 1);
                        },mouseout: function() {
                            this.over = false;
                            j(this.view.img, this.oP);
                        }};
                    Slide = function(n, o) {
                        this.parent = n;
                        this.N = o;
                        this.x0 = this.x1 = o * n.mx;
                        this.v = 0;
                        this.loaded = false;
                        this.cpt = 0;
                        this.start = new Date();
                        this.obj = n.frm[o];
                        this.img = this.obj.getElementsByTagName("img")[0];
                        this.bkg = document.createElement("div");
                        this.bkg.className = "backgroundText";
                        if (o == 0) {
                            this.obj.style.borderLeft = "none";
                        }
                        this.obj.style.left = Math.floor(this.x0) + "px";
                        this.img.style.width = n.imgWidth + "px";
                        this.img.style.height = n.imgHeight + "px";
                        j(this.img, n.oP);
                        this.obj.parent = this;
                        this.obj.onmouseover = function() {
                            this.parent.over();
                            return false;
                        };
                    };
                    Slide.prototype = {calc: function() {
                            var o = this.parent;
                            for (var n = 0; n <= this.N; n++) {
                                o.slides[n].x1 = n * o.Z;
                            }
                            for (var n = this.N + 1; n < o.NF; n++) {
                                o.slides[n].x1 = o.wh - (o.NF - n) * o.Z;
                            }
                        },move: function() {
                            var p = this.parent;
                            var o = (this.x1 - this.x0) / p.S;
                            if (this.N && Math.abs(o) > 0.5) {
                                this.obj.style.left = Math.floor(this.x0 += o) + "px";
                            }
                            var n = (this.N < p.NF - 1) ? p.slides[this.N + 1].x0 - this.x0 : p.wh - this.x0;
                            if (Math.abs(n - this.v) > 0.5) {
                                this.bkg.style.top = Math.floor(2 + p.ht - (n - p.Z) * p.iH * p.r) + "px";
                                this.v = n;
                                this.cpt++;
                            } else {
                                if (!this.pro) {
                                    this.pro = true;
                                    var q = new Date() - this.start;
                                    if (this.cpt > 1) {
                                        p.S = Math.max(2, (28 / (q / this.cpt)) * p.S0);
                                    }
                                }
                            }
                            if (!this.loaded) {
                                if (this.img.complete) {
                                    this.img.style.visibility = "visible";
                                    this.loaded = true;
                                }
                            }
                        },over: function() {
                            this.parent.resize();
                            this.parent.over = true;
                            j(this.parent.view.img, this.parent.oP);
                            this.parent.view = this;
                            this.start = new Date();
                            this.cpt = 0;
                            this.pro = false;
                            this.calc();
                            j(this.img, 100);
                        }};
                    return {init: function(q, p, o, n, r) {
                            if (r == null || r == undefined) {
                                r = 100;
                            }
                            var s = new l("slider", 12, 1.84 / 3, 1 / 3.2, r, q, p, o, n);
                            setInterval(function() {
                                s.run();
                            }, 10);
                        }};
                })(),slider2: (function() {
                    var l = function(n) {
                        return typeof n === "string" ? document.getElementById(n) : n;
                    };
                    var m = function(n, o) {
                        return (o || document).getElementsByTagName(n);
                    };
                    var j = function(n) {
                        this.initialize(n);
                    };
                    j.prototype = {initialize: function(z) {
                            var t = this;
                            this._id = z["id"];
                            this._width = z["width"];
                            this._height = z["height"];
                            var x = z["imgArr"];
                            this._div = document.createElement("div");
                            var o = "width:" + this._width + "px;height:" + this._height + "px;";
                            this._div.setAttribute("style", o);
                            this._div.setAttribute("id", "box");
                            document.getElementById(this._id).appendChild(this._div);
                            var p = document.createElement("div");
                            var w = "width:" + this._width + "px;height:" + this._height + "px;";
                            p.className = "list";
                            p.setAttribute("style", w);
                            this._div.appendChild(p);
                            var n = document.createElement("ul");
                            p.appendChild(n);
                            var v = document.createDocumentFragment();
                            var q = "width:" + this._width + "px;height:" + this._height + "px;";
                            var y = "width:" + this._width + "px;height:" + this._height + "px;";
                            for (var r = 0; r < x.length; r++) {
                                var s = document.createElement("li");
                                s.setAttribute("style", y);
                                var u = document.createElement("img");
                                u.setAttribute("style", q);
                                u.setAttribute("src", x[r].src);
                                u.setAttribute("onclick", "window.open('" + x[r].href + "')");
                                u.setAttribute("alt", x[r].alt);
                                s.appendChild(u);
                                v.appendChild(s);
                            }
                            n.appendChild(v);
                            this.oBox = l(this._div);
                            this.oUl = m("ul", this.oBox)[0];
                            this.aImg = m("img", this.oBox);
                            this.timer = null;
                            this.autoTimer = null;
                            this.iNow = 0;
                            this.creatBtn();
                            this.aBtn = m("li", this.oCount);
                            this.toggle();
                            this.autoTimer = setInterval(function() {
                                t.next();
                            }, 3000);
                            this.oBox.onmouseover = function() {
                                clearInterval(t.autoTimer);
                            };
                            this.oBox.onmouseout = function() {
                                t.autoTimer = setInterval(function() {
                                    t.next();
                                }, 3000);
                            };
                            for (var r = 0; r < this.aBtn.length; r++) {
                                this.aBtn[r].index = r;
                                this.aBtn[r].onmouseover = function() {
                                    t.iNow = this.index;
                                    t.toggle();
                                };
                            }
                        },creatBtn: function() {
                            this.oCount = document.createElement("ul");
                            this.oFrag = document.createDocumentFragment();
                            this.oCount.className = "count";
                            for (var n = 0; n < this.aImg.length; n++) {
                                var o = document.createElement("li");
                                o.innerHTML = n + 1;
                                this.oFrag.appendChild(o);
                            }
                            this.oCount.appendChild(this.oFrag);
                            this.oBox.appendChild(this.oCount);
                        },toggle: function() {
                            for (var n = 0; n < this.aBtn.length; n++) {
                                this.aBtn[n].className = "";
                            }
                            this.aBtn[this.iNow].className = "current";
                            this.doMove(-(this.iNow * this.aImg[0].offsetHeight));
                        },next: function() {
                            this.iNow++;
                            this.iNow == this.aBtn.length && (this.iNow = 0);
                            this.toggle();
                        },doMove: function(o) {
                            var n = this;
                            clearInterval(n.timer);
                            n.timer = setInterval(function() {
                                var p = (o - n.oUl.offsetTop) / 6;
                                p = p > 0 ? Math.ceil(p) : Math.floor(p);
                                n.oUl.offsetTop == o ? clearInterval(n.timer) : (n.oUl.style.top = n.oUl.offsetTop + p + "px");
                            }, 40);
                        }};
                    return {init: function(n) {
                            new j(n);
                        }};
                })(),slider3: function() {
                }};
        })();
        var c = (function() {
            return {sonny: function(j, o) {
                    if (typeof option == "function") {
                        o = option;
                        option = {};
                    }
                    var l = f.extend({current: "curr",delay: 50,index: 0}, option || {});
                    var n = this;
                    var m = null;
                    f.each(this, function(p) {
                        f(this).bind("mouseover", function() {
                            if (m != null) {
                                clearTimeout(m);
                            }
                            var q = f(this);
                            m = setTimeout(function() {
                                n.eq(l.index).removeClass(l.current);
                                l.index = p;
                                n.eq(l.index).addClass(l.current);
                                if (o) {
                                    o(q);
                                }
                            }, l.delay);
                        });
                    });
                },sonnyCallback: function(j) {
                    j.find("img").each(function() {
                        var l = f(this).attr("src2");
                        f(this).attr("src", l);
                        f(this).removeAttr("src2");
                    });
                }};
        })();
        var d = (function() {
            return {changeHref: function(m, l) {
                    var j = f("#" + m);
                    j.attr("href", j.attr("href") + "&page=" + f("#" + l).val());
                }};
        })();
        var b = (function() {
            return {};
        })();
        var i = (function() {
            return {_setValue: function(l, j) {
                    f("#" + l).val(j);
                    f(document.forumForm).submit();
                },setPage: function(j) {
                    this._setValue("page", j);
                },search: function() {
                    var j = f("#fserch").val();
                    this._setValue("subject", j);
                },toPage: function(j) {
                    this.setPage(f("#" + j).val());
                },order: function(j) {
                    this._setValue("sortFiled", j);
                }};
        })();
        e.util = h;
        e.common = k;
        e.ef = g;
        e.baby = c;
        e.art = d;
        e.nav = b;
        e.forum = i;
    })(a.jshop, jQuery);
})();
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
