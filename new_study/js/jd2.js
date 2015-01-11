Array.prototype.each = function(b) {
    if (typeof b != "function") {
        throw new Error("argumets should be a function object!");
    }
    for (var c = 0, a = this.length; c < a; c++) {
        b.call(this, c, this[c]);
    }
};
Array.prototype.isIn = function(b) {
    for (var c = 0, a = this.length; c < a; c++) {
        if (this[c] == b) {
            return true;
        }
    }
    return false;
};
Array.prototype.isEmpty = function() {
    return this.length == 0 ? true : false;
};
Array.prototype.index = function(c) {
    for (var b = 0, a = this.length; b < a; b++) {
        if (this[b] == c) {
            return b;
        }
    }
    return -1;
};
Array.prototype.del = function(b) {
    var a = this.index(b);
    if (a != -1) {
        this.splice(a, 1);
    }
    return this;
};
Array.prototype.aUnique = function(b) {
    if (b.constructor != Array) {
        throw new Error("aUnique:argument error");
    }
    var d = [];
    for (var c = 0, a = b.length; c < a; c++) {
        if (!this.isIn(b[c])) {
            d.push(b[c]);
        }
    }
    return d;
};
String.prototype.subDelete = function(c, a) {
    if (!c) {
        throw new Error("subDelete is no-use!");
    }
    if (!a) {
        return this.slice(c);
    }
    var b = this;
    return this.slice(0, c).concat(this.slice(a));
};
String.prototype.ltrim = function() {
    return this.replace(/(^s*)/g, "");
};
String.prototype.rtrim = function() {
    return this.replace(/(s*$)/g, "");
};
String.prototype.trim = function() {
    return this.rtrim(this.ltrim());
};
String.prototype.replaceAll = function(a, b) {
    return this.replace(new RegExp(a, "gm"), b);
};
Array.prototype.stringFormat = function() {
    for (var b = 0, a = this.length; b < a; b++) {
        if (typeof this[b] == "string") {
            this[b] = '"' + this[b] + '"';
        } else {
            if (this[b] instanceof Array) {
                this[b] = this[b].stringFormat();
            } else {
                if (typeof this[b] == "function") {
                    this[b] = this[b];
                } else {
                    this[b] = c(this[b]);
                }
            }
        }
    }
    return "[" + this.join(",") + "]";
    function c(e) {
        var f = "{";
        for (var d in e) {
            if (e.hasOwnProperty(d)) {
                var g = e[d];
                if (typeof g == "string") {
                    f += d + ':"' + g + '",';
                } else {
                    if (g instanceof Array) {
                        f += d + ":" + g.stringFormat() + ",";
                    } else {
                        if (typeof g == "function") {
                            f += d + ":" + g + ",";
                        } else {
                            f += d + ":" + c(g) + ",";
                        }
                    }
                }
            }
        }
        return f.replace(/,$/, "") + "}";
    }
};
Array.prototype.jBannerEach = function(b) {
    if (typeof b != "function") {
        throw new Error("Array:each argument error!");
    }
    for (var c = 0, a = this.length; c < a; c++) {
        b.call(this, c, this[c]);
    }
};
String.prototype.getQuery = function(a) {
    var b = new RegExp("(^|&)" + a + "=([^&]*)(&|$)"), c = this.substr(this.indexOf("?") + 1).match(b);
    if (c != null) {
        return unescape(c[2]);
    }
    return null;
};
function thick_login(b, a) {
    if (typeof b != "function") {
        throw new Error("Self-defined login argments should be a function!");
    }
    $.extend(jdModelCallCenter, {jshop_login: function(c) {
            $.login({modal: true,complete: function(d) {
                    if (d && d.IsAuthenticated) {
                        b.call(a || this, d);
                    } else {
                        jdModelCallCenter.settings.fn = b;
                    }
                }});
        }});
    $.extend(jdModelCallCenter.settings, {object: this,fn: function() {
            jdModelCallCenter.jshop_login(this);
        }});
    jdModelCallCenter.settings.fn();
}
jQuery.extend(jQuery.easing, {def: "easeOutQuad",easeInQuint: function(g, f, j, i, h) {
        return i * (f /= h) * f * f * f * f + j;
    },easeOutQuint: function(g, f, j, i, h) {
        return i * ((f = f / h - 1) * f * f * f * f + 1) + j;
    },easeInOutQuint: function(g, f, j, i, h) {
        return (f /= h / 2) < 1 ? i / 2 * f * f * f * f * f + j : i / 2 * ((f -= 2) * f * f * f * f + 2) + j;
    },easeOutElastic: function(j, i, p, o, n) {
        var m = 1.70158, l = 0, k = o;
        if (0 == i) {
            return p;
        }
        if (1 == (i /= n)) {
            return p + o;
        }
        if (l || (l = 0.3 * n), k < Math.abs(o)) {
            k = o;
            var m = l / 4;
        } else {
            var m = l / (2 * Math.PI) * Math.asin(o / k);
        }
        return k * Math.pow(2, -10 * i) * Math.sin(2 * (i * n - m) * Math.PI / l) + o + p;
    },easeInOutElastic: function(j, i, p, o, n) {
        var m = 1.70158, l = 0, k = o;
        if (0 == i) {
            return p;
        }
        if (2 == (i /= n / 2)) {
            return p + o;
        }
        if (l || (l = 0.3 * n * 1.5), k < Math.abs(o)) {
            k = o;
            var m = l / 4;
        } else {
            var m = l / (2 * Math.PI) * Math.asin(o / k);
        }
        return 1 > i ? -0.5 * k * Math.pow(2, 10 * (i -= 1)) * Math.sin(2 * (i * n - m) * Math.PI / l) + p : k * Math.pow(2, -10 * (i -= 1)) * Math.sin(2 * (i * n - m) * Math.PI / l) * 0.5 + o + p;
    },easeInCirc: function(g, f, j, i, h) {
        return -i * (Math.sqrt(1 - (f /= h) * f) - 1) + j;
    },easeOutCirc: function(g, f, j, i, h) {
        return i * Math.sqrt(1 - (f = f / h - 1) * f) + j;
    },easeInOutCirc: function(g, f, j, i, h) {
        return (f /= h / 2) < 1 ? -i / 2 * (Math.sqrt(1 - f * f) - 1) + j : i / 2 * (Math.sqrt(1 - (f -= 2) * f) + 1) + j;
    }});
(function(e, f) {
    var b = ".jShareArea{display: none;position: absolute;width: 191px;background-color: #464646;padding-top: 3px;border-radius: 5px;overflow: hidden;z-index:200;}.jShareArea ul {padding-left: 5px;overflow: hidden;}.jShareArea li {float: left;margin: 3px 5px 3px 0;padding: 3px;width: 80px;text-align: center;cursor: pointer;border: solid 1px #464646;color: #bbb;}.jShareArea li:hover {box-shadow: 0 0 1px rgba(102,102,102,.9);border-radius: 2px;border-color: #363636;color: #fff;}.jShareArea li span {float: left;display: block;width: 16px;height: 16px;background: url(http://img14.360buyimg.com/cms/g14/M03/07/07/rBEhVVHw12IIAAAAAAATGyPhlyEAABalQLZrLcAABMz254.gif);}.jShareArea .iconWeibo {background-position: 0 0;}.jShareArea .iconQQ {background-position: 0 -16px;}.jShareArea .icon163 {background-position: 0 -32px;}.jShareArea .iconRenren {background-position: 0 -48px;}.jShareArea .iconQzone {background-position: 0 -64px;}.jShareArea .iconMogujie {background-position: 0 -112px;}.jShareArea .iconKaixin {background-position: 0 -128px;}.jShareArea .iconDouban {background-position: 0 -144px;}.jShareArea li .jText {float: left;margin-left: 5px;font-style: normal;}";
    $(function() {
        $('<style type="text/css">' + b + "</style>").appendTo("head");
    });
    var c = [{title: "新浪微博",icon: "iconWeibo",id: "sinaminiblog"}, {title: "腾讯微博",icon: "iconQQ",id: "qqmb"}, {title: "网易微博",icon: "icon163",id: "neteasemb"}, {title: "人人网",icon: "iconRenren",id: "renren"}, {title: "QQ空间",icon: "iconQzone",id: "qzone"}, {title: "蘑菇街",icon: "iconMogujie",id: "mogujie"}, {title: "开心网",icon: "iconKaixin",id: "kaixin001"}, {title: "豆瓣",icon: "iconDouban",id: "douban"}], a = {"sinaminiblog": "http://v.t.sina.com.cn/share/share.php?appkey=583395093&title={{content}}&url={{url}}&source=bshare&retcode=0&pic={{pic}}","qqmb": "http://v.t.qq.com/share/share.php?title={{content}}&site={{url}}&pic={{pic}}&url={{url}}&appkey=dcba10cb2d574a48a16f24c9b6af610c","neteasemb": "http://t.163.com/article/user/checkLogin.do?source=" + encodeURIComponent("jd.com") + "&info={{content}} {{url}}&images={{pic}}","renren": "http://widget.renren.com/dialog/share?resourceUrl={{url}}&title=&images={{url}}&description={{content}}","qzone": "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={{url}}&title=&pics={{pic}}&summary={{content}}","mogujie": "http://www.mogujie.com/mshare?url={{url}}&content={{content}}&from=mogujie&pic={{pic}}","kaixin001": "http://www.kaixin001.com/rest/records.php?url={{url}}&content={{content}}&pic={{pic}}&aid=100013770&style=111","douban": "http://www.douban.com/recommend/?url={{url}}&title={{content}}&v=1"};
    function d(g) {
        var h = $.extend({}, g);
        this.get = function(i) {
            return h[i];
        };
        this.set = function(j, i) {
            h[j] = i;
        };
        this.init();
    }
    d.prototype = {init: function() {
            this.parseSns(c);
            this.bindEvent();
        },parseSns: function(i) {
            var h = $('<div class="jShareArea J_JShareBoxNode"></div>'), g = "<ul>";
            jQuery.each(i, function(j, k) {
                g += '<li id="' + k.id + '"><span class="' + k.icon + '"></span><em class="jText">' + k.title + "</em></li>";
            });
            g += "</ul>";
            h.html(g);
            jQuery("body").append(h);
            this.set("snsBox", h);
            this.set("snser", h.find("li"));
        },getLink: function(g, j) {
            var i = g, j = j || '{content: "", url: "", pic: ""}';
            if (!i) {
                return "about:blank";
            }
            for (var h in j) {
                var k = new RegExp("{{" + h + "}}", "g");
                i = i.replace(k, j[h]);
            }
            return i;
        },bindEvent: function() {
            var h = this, g = null;
            h.get("triggers").each(function(i, j) {
                jQuery(this).bind(h.get("eventType"), function(k) {
                    h.set("current", jQuery(this));
                    h.setPosition();
                    h.show();
                    k.preventDefault();
                });
                jQuery(this).bind("mousemove", function(k) {
                    return false;
                });
                jQuery(this).bind("mouseout", function(k) {
                    k.preventDefault();
                    if (g) {
                        clearTimeout(g);
                        g = null;
                    }
                    g = setTimeout(function() {
                        h.hide();
                    }, 200);
                });
            });
            h.get("snsBox").bind("mouseover", function(i) {
                if (g) {
                    clearTimeout(g);
                    g = null;
                }
            });
            h.get("snsBox").bind("mousemove", function(i) {
                return false;
            });
            jQuery(document).bind("mousemove", function(i) {
                h.hide();
            });
            h.get("snser").each(function(i, j) {
                jQuery(this).bind("click", function(k) {
                    k.preventDefault();
                    e.open(h.getLink(a[jQuery(this).attr("id")], {"url": e.location.href,"content": $("title").html(),"pic": ""}), "_blank");
                });
            });
        },setPosition: function() {
            var m = this.get("current"), j = this.get("snsBox"), n = m.offset(), k = this.get("offset") || {}, h = 0, i = 0, l = $(e).width(), g = $(e).height();
            j.css("display", "block");
            h = n.left + (m.width() - j.width()) + k.left;
            i = n.top + m.height() + k.top;
            if (h + j.outerWidth() > l) {
                h = l - j.outerWidth();
            }
            if (i + j.outerHeight() > g + $(e).scrollTop()) {
                i = n.top - j.outerHeight();
            }
            j.css({"left": h,"top": i});
            j.css("display", "none");
        },show: function() {
            this.get("snsBox").show();
        },hide: function() {
            this.get("snsBox").hide();
        }};
    jQuery.fn.JShare = function(g) {
        g.triggers = this;
        new d(g);
        return this;
    };
})(window);
(function(c, f) {
    var a = '<div id="J_FollowSuccessMark" style="display:none;position:absolute;z-index:9999;opacity:1;width:24px;height:24px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAMFBMVEUAAAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AACV3M16AAAAD3RSTlMAgDAQ8KBg0ELgwHAgsJC+LfoJAAAAl0lEQVQoz2MYfIA5UVACRYDr//+fMDbTASDB////d5jA+x9Agm3l/99QPs//byCK/f9nqAAjhKX/PwAqwAlhxf9vAHO1BeP/X5QAWusPMhNE/wcBoKEQkxg4wPxfIDOdISYkiv93FGxANtMEZqYCVCAfzGJGuPP+LxDJDTQTCuSdII5xhgnwMMDciQL0vxxAFeC+xEA/AAASoDz+eKRxBgAAAABJRU5ErkJggg==) center center no-repeat;"></div>', d = document.createElement("div"), b = d.style, g = "";
    if ("webkitTransition" in b) {
        g = "webkit";
    } else {
        if ("mozTransition" in b) {
            g = "moz";
        } else {
            if ("oTransition" in b) {
                g = "o";
            }
        }
    }
    function e(h) {
        var i = $.extend({followApi: "http://follow.soa.jd.com/product/follow",getFollower: "http://follow.soa.jd.com/product/queryForCountByPid",item: ".item"}, h);
        this.get = function(j) {
            return i[j];
        };
        this.set = function(k, j) {
            i[k] = j;
        };
        this.init();
    }
    e.prototype = {init: function() {
            this.set("sNum", jQuery(this.get("showNum")));
            this.getNum();
            this.addMark();
            this.bindEvent();
        },getNum: function() {
            var i = this, h = $(this.get("triggers"));
            h.each(function(j, m) {
                var k = $(m), l = k.closest(i.get("item")).attr("skuid");
                jQuery.ajax({url: i.get("getFollower"),dataType: "jsonp",type: "get",data: {productId: l},success: function(n) {
                        if (n.success) {
                            try {
                                k.closest(i.get("item")).find(i.get("showNum")).html(n.data);
                            } catch (o) {
                            }
                        }
                    }});
            });
        },addMark: function() {
            var i = this, h = null;
            if (g || "transition" in b) {
                !$("#J_FollowSuccessMark").length && $("body").append(a);
                h = $("#J_FollowSuccessMark")[0];
                this.set("addOne", jQuery(h));
            }
        },bindEvent: function() {
            var h = this;
            h.get("triggers").each(function(i, j) {
                jQuery(j).bind("click", function(k) {
                    thick_login(function() {
                        h.doFollow(j, i);
                    });
                    k.preventDefault();
                });
            });
        },doFollow: function(j, h) {
            var n = this, l = jQuery(j), m = l.closest(n.get("item")).attr("skuid"), i = l.closest(n.get("item")).find(this.get("showNum")), k = n.get("addOne");
            jQuery.ajax({url: n.get("followApi"),dataType: "jsonp",type: "get",data: {productId: m},success: function(o) {
                    if (o.success) {
                        jQuery.ajax({url: n.get("getFollower"),dataType: "jsonp",type: "get",data: {productId: m},success: function(q) {
                                if (q.success) {
                                    if (k) {
                                        var p = l.offset();
                                        k.css("display", "block");
                                        k.css("left", p.left + (l.width() - k.width()) / 2);
                                        k.css("top", p.top - k.height() / 2);
                                        if (g) {
                                            k.css(g + "Transition", "opacity 1s ease-out, -" + g + "-transform 1s ease-out");
                                            k.css(g + "Transform", "scale(0.2) translate3d(0, -32px, 0)");
                                        } else {
                                            k.css("transition", "opacity 1.5s ease-out, transform 1.5s ease-out");
                                            k.css("transform", "scale(0.2) translate3d(0, -32px, 0)");
                                        }
                                        k.css("opacity", 0);
                                        setTimeout(function() {
                                            k.css("display", "none");
                                            if (g) {
                                                k.css(g + "Transition", "");
                                                k.css(g + "Transform", "scale(1) translate3d(0, 0, 0)");
                                            } else {
                                                k.css("transition", "");
                                                k.css("transform", "scale(1) translate3d(0, 0, 0)");
                                            }
                                            k.css("opacity", 1);
                                        }, 300);
                                        i.html(parseInt(i.html(), 10) + 1);
                                    }
                                } else {
                                    if (console) {
                                        console.log(q.msg);
                                    }
                                }
                            }});
                    } else {
                        if (o.code && o.code === "F0409") {
                            alert("请勿重复关注哦");
                        } else {
                            alert(o.msg);
                        }
                    }
                }});
        }};
    jQuery.fn.JFollow = function(h) {
        h.triggers = this;
        new e(h);
        return this;
    };
})(window);
function getModules() {
    var a = [];
    if ($('script[moduleinit="module"]').length) {
        var b = $('script[moduleinit="module"]').attr("src");
        return (b.substring(b.indexOf("?") + 4, b.indexOf("&"))).split(",");
    }
    return a;
}
(function($, w) {
    w.gJshop_aModules = [];
    function _excute() {
        var _this = this, _function = jQuery(_this).attr("module-function"), _moduleName = jQuery(_this).parents("div[module-name]").attr("module-name"), _param;
        if (typeof _function == "undefined") {
            return;
        }
        try {
            _param = eval("(" + $(_this).attr("module-param") + ")");
        } catch (e) {
            _param = {};
        }
        var _functions = _function.split(",");
        _functions.each(function(index, m) {
            if (jshop.module[_moduleName] && jshop.module[_moduleName][m]) {
                jshop.module[_moduleName][m].call(_this, _param);
            } else {
                if (jshop.module[m]) {
                    jshop.module[m].call(_this, _param);
                }
            }
        });
    }
    function _dialog() {
        var _this = this;
        $(_this).find("[jshop-close]").click(function() {
            var __dialog = $(this).attr("dialog");
            $(_this).find("." + __dialog).fadeOut().trigger("closed");
        });
    }
    function _share() {
        var _this = this, MAP = {sinaminiblog: "http://v.t.sina.com.cn/share/share.php?appkey=583395093&title=#cnt#&url=#href#&source=bshare&retcode=0&pic=",qqmb: "http://v.t.qq.com/share/share.php?title=#cnt#&site=#href#&pic=&url=#href#&appkey=dcba10cb2d574a48a16f24c9b6af610c",renren: "http://widget.renren.com/dialog/share?resourceUrl=#href#&title=&images=&description=#cnt#",qzone: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=#href#&title=&pics=&summary=#cnt#",kaixin001: "http://www.kaixin001.com/rest/records.php?url=#href#&content=#cnt#&pic=&aid=100013770&style=111",douban: "http://www.douban.com/recommend/?url=#href#&title=#cnt#&v=1",neteasemb: "http://t.163.com/article/user/checkLogin.do?source=#source#&info=#cnt# #href#&images=",meilishuo: "http://www.meilishuo.com/meilishuo_share?picurl=&siteurl=#href#&content= #cnt#",mogujie: "http://www.mogujie.com/mshare?url=#href#&content=#cnt#&from=mogujie&pic=",qqxiaoyou: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?to=pengyou&url=#href#&pics=&title=&summary=#cnt#",facebook: "http://www.facebook.com/share.php?src=jd&u=#href#",twitter: "http://twitter.com/intent/tweet?text=#cnt# #href#",googleplus: "https://plus.google.com/share?url=#href#&hl=zh-CN",pinterest: "https://pinterest.com/login/?next=/pin/create/bookmarklet/?media=&url=#href#&alt=&title=#cnt#&is_video=false"}, _vote_con = $(_this).find("[vote-con]"), _cnt = encodeURIComponent(_vote_con.attr("vote-cnt") ? _vote_con.attr("vote-cnt").replace("#title#", $("title").html()) : $("title").html()), _href = encodeURIComponent(_vote_con.attr("vote-url") || document.location.href), _source = encodeURIComponent(_vote_con.attr("vote-source") || "jd.com");
        $(_this).find("[jshop-vote]").each(function(index, n) {
            $(n).click(function() {
                var __url = MAP[$(n).attr("jshop-vote")].replace(/#cnt#/g, _cnt).replace(/#href#/g, _href).replace(/#source#/g, _source), __top = $(window).height() > 400 ? ($(window).height() - 400) / 2 : 50, __left = $(window).width() > 600 ? ($(window).width() - 600) / 2 : 50;
                window.open(__url, "", "height=400, width=600,left=" + __left + ",top=" + __top);
            });
        });
    }
    function _extra_logic() {
        var _this = this;
        _dialog.call(_this);
        _share.call(_this);
    }
    $(function() {
        w.gJshop_aModules = getModules();
        jQuery("div.j-module").each(function(index, n) {
            _extra_logic.call(n);
            _excute.call(n);
        });
    });
    w.moduleRefresh = function() {
        var _this = jQuery("[module-refresh=true]");
        _extra_logic.call(_this);
        _this.closest("[module-name]").find(".j-module").each(function(index, n) {
            _excute.call(n);
        });
        _this.removeAttr("module-refresh");
        _this.removeAttr("onload");
    };
})(jQuery, window);
function validateData(a) {
    if (typeof a != "undefined" && a != "") {
        return true;
    } else {
        return false;
    }
}
var jshop = jshop || {};
jshop.module = {removeBg: function(b) {
        var d = $.extend({defaultClass: "noBg"}, b), c = $(this).find(d.node), e = parseInt(c.parent().width() / c.outerWidth(true)), a = d.defaultClass;
        c.each(function(f, g) {
            if (f && !(((f + 1) / e).toString().indexOf(".") >= 0)) {
                $(g).addClass(a);
            } else {
                if ((f + 1) / e == 1) {
                    $(g).addClass("noBgOne");
                }
            }
        });
    },waterfallFlow: function(b) {
        var h = this, e = jQuery.extend({node: "li",topSpac: 10}, b), c = jQuery(h).find(e.node), g = parseInt(c.parent().width() / parseInt(c.outerWidth(true))), a, f = [];
        c.each(function(k, m) {
            var n = parseInt(k / g), j = k % g, l = j * jQuery(m).outerWidth(true);
            if (n == 0) {
                a = parseInt((j % 2) * e.topSpac);
            } else {
                var i = jQuery(c.get((n - 1) * g + j));
                a = i.outerHeight(true) + parseInt(i.css("top"));
            }
            jQuery(m).css({left: l,top: a});
            f.push(parseInt(jQuery(m).css("top")) + jQuery(m).outerHeight(true));
        });
        function d(j, i) {
            if (j < i) {
                return -1;
            } else {
                if (j > i) {
                    return 1;
                } else {
                    return 0;
                }
            }
        }
        f.sort(d);
        jQuery(h).css("height", f[f.length - 1]);
    },changeStyle: function(b) {
        var e = $.extend({node: "li",defaultClass: "jCurrent",defaultShow: 0}, b), d = $(this).find(e.node), a = e.defaultClass, c = e.defaultShow;
        d.eq(c).addClass(a);
        d.each(function(f, g) {
            $(g).mouseenter(function(h) {
                $(this).addClass(a).siblings().removeClass(a);
            });
        });
    },addEllipsis: function(a) {
        if (!a) {
            return;
        }
        var e = this, d = jQuery.extend({title: "li",count: 20,text: "..."}, a), c = jQuery(e).find(d.title), b = /\s|\,|\.|\!|\'|\"|\;|\:|\t|\n|\r/g;
        c.each(function(i, k) {
            var l = k.firstChild, f = l.nodeValue;
            if (l && l.nodeType == 3 && l.length >= d.count) {
                var j = f.substring(0, d.count - d.text.length);
                var h = f.charAt(d.count - d.text.length);
                if (b.test(h)) {
                    l.nodeValue = j + d.text;
                } else {
                    var g = j.match(b);
                    j = j.substring(0, j.lastIndexOf(g[g.length - 1]) + 1) + d.text;
                    l.nodeValue = j;
                }
            }
        });
    },autoWidth: function(g) {
        var h = $.extend({node: "li",extra: {}}, g || {}), f = this, a = $(f).find(h.node), d = a.eq(0);
        a.css(h.extra);
        var j = parseInt(d.data("outerWidth") || d.outerWidth(true)), c = parseInt(d.data("width") || d.css("width")), i = parseInt(d.parent().parent().width() / j);
        d.data({"outerWidth": j,"width": c});
        var b = j - c;
        var e = (d.parent().parent().width() - b * i - 0.03) / i;
        a.css({width: e});
    },autoFill: function(k) {
        var d = $.extend({autoFillNode: "li",xInner: 0,yInner: 0,minWidth: " ",xOuter: " ",yOuter: " ",isEqual: false,length: ""}, k || {}), g = $(this), e = g.find(d.autoFillNode), h = parseInt(d.xInner), n = parseInt(d.yInner), a = parseInt(d.minWidth) ? parseInt(d.minWidth) : e.width(), f = d.xOuter, l = d.yOuter, j = d.isEqual, c;
        if (f !== 0) {
            if (j) {
                c = e.length;
            } else {
                if (d.length > 0) {
                    c = d.length;
                } else {
                    c = parseInt((g.width() - f * 2) / a);
                }
            }
            var b = (g.width() - (c + 1) * h - f * 2 - c * (parseFloat(e.css("padding-left")) + parseFloat(e.css("padding-right")) + parseFloat(e.css("border-left-width")) + parseFloat(e.css("border-right-width")))) / c;
            if (b < a) {
                return;
            }
            o();
            g.css("padding-left", f);
        }
        if (f === 0) {
            if (j) {
                c = e.length;
            } else {
                if (d.length > 0) {
                    c = d.length;
                } else {
                    c = parseInt(g.width() / a);
                }
            }
            var b = (g.width() - (c - 1) * h - c * (parseFloat(e.css("padding-left")) + parseFloat(e.css("padding-right")) + parseFloat(e.css("border-left-width")) + parseFloat(e.css("border-right-width")))) / c;
            if (b < a) {
                return;
            }
            o();
            m();
        }
        if (f === " ") {
            if (j) {
                c = e.length;
            } else {
                if (d.length > 0) {
                    c = d.length;
                } else {
                    c = parseInt(g.width() / a);
                }
            }
            var b = (g.width() - (c + 1) * h - c * (parseFloat(e.css("padding-left")) + parseFloat(e.css("padding-right")) + parseFloat(e.css("border-left-width")) + parseFloat(e.css("border-right-width")))) / c;
            if (b < a) {
                return;
            }
            o();
        }
        if (l != 0) {
            g.css("padding-bottom", n + l);
            g.css("padding-top", l);
        }
        if (l === 0) {
            i();
        }
        if (l === " ") {
            g.css("padding-bottom", n);
        }
        e.css("width", b);
        function o() {
            g.css("overflow", "hidden");
            if (e.css("margin-left") || e.css("margin-right")) {
                e.css({"margin-left": 0,"margin-right": 0});
            }
            e.css("margin-top", n);
            e.css("margin-left", h);
        }
        function m() {
            e.each(function(p, q) {
                if (p % c === 0) {
                    $(q).css("margin-left", 0);
                }
            });
        }
        function i() {
            var p = [1];
            e.each(function(r, s) {
                for (var q = 0; q < p.length; q++) {
                    if (r >= c * (p[q] - 1) && r < c * p[q]) {
                        $(s).css("margin-top", 0);
                    }
                }
            });
        }
    },tabClass: function(b) {
        var e = $.extend({node: "li",defaultClass: "current"}, b), d = $(this).find(e.node), a = e.defaultClass, c = e.defaultShow;
        if (c) {
            d.eq(c).addClass(a);
        }
        d.bind({mouseenter: function() {
                $(this).addClass(a).siblings().removeClass(a);
            },mouseleave: function() {
                $(this).removeClass(a);
            }});
    },equallyWidth: function(i) {
        var e = $.extend({equallyNode: ".jSortTab span",equallyParentNode: null}, i), h = $(this), a = (h.find(e.equallyParentNode).length > 0) ? h.find(e.equallyParentNode) : h, b = h.find(e.equallyNode), f = b.eq(0);
        var k = parseInt(f.data("outerWidth") || f.outerWidth(true)), d = parseInt(f.data("width") || f.css("width")), j = b.length;
        f.data({"outerWidth": k,"width": d});
        var c = k - d;
        var g = (a.width() - c * j - 0.03) / j;
        b.css({width: g});
    },changePhoto: function(b) {
        var e = $.extend({changePhotoNode: ".jPic img",smallPhoto: ".jScrollWrap li",title: ".jDesc a",defaultClass: "jCurrent",eventType: "click"}, b || {}), f = $(this), a = f.find(e.changePhotoNode), c = f.find(e.smallPhoto), d = f.find(e.title);
        a.attr("src", c.eq(0).attr("data-src"));
        a.parent().attr("href", c.eq(0).attr("data-href"));
        d.attr("href", c.eq(0).attr("data-href"));
        c.eq(0).addClass(e.defaultClass);
        c[e.eventType](function() {
            var g = this;
            a.attr("src", $(g).attr("data-src"));
            a.parent().attr("href", $(g).attr("data-href"));
            d.attr("href", $(g).attr("data-href"));
            $(g).addClass(e.defaultClass).siblings().removeClass(e.defaultClass);
        });
    },movePhoto: function(i) {
        var b = $.extend({movePhotoNode: ".jScrollWrap li",arrowPrev: ".jScrollPrev",arrowNext: ".jScrollNext",defaultClass: "disabled"}, i || {}), g = $(this), c = g.find(b.movePhotoNode), d = g.find(b.arrowPrev), f = g.find(b.arrowNext), e = parseInt(c.parent().parent().width() / c.width()), h = 0, a = c.length;
        if (a > e) {
            d.addClass(b.defaultClass).show();
            f.show();
            c.parent().css("width", c.width() * a);
        }
        f.click(function() {
            var j = this;
            if (a - e) {
                d.removeClass(b.defaultClass);
            }
            if (h < a - e) {
                h++;
                c.parent().animate({left: -c.eq(0).outerWidth(true) * h}, function() {
                    if (h + e == a) {
                        $(j).addClass(b.defaultClass);
                    }
                });
            }
        });
        d.click(function() {
            var j = this;
            if (h + e <= a) {
                f.removeClass(b.defaultClass);
            }
            if (h > 0) {
                h--;
                c.parent().animate({left: -c.eq(0).outerWidth(true) * h}, function() {
                    if (!h) {
                        $(j).addClass(b.defaultClass);
                    }
                });
            }
        });
    },hideNode: function(b) {
        var d = $.extend({currentNode: ".jLeftPic",changeNode: ".jMiddlePic",defaultClass: "jCurrent",enterTime: 200,leaveTime: 100}, b || {}), e = $(this), c = e.find(d.currentNode), a = e.find(d.changeNode);
        if (d.enterTime < 0 || d.leaveTime < 0) {
            return;
        }
        c.mouseenter(function() {
            a.animate({opacity: 0}, d.enterTime, function() {
                a.addClass(d.defaultClass);
            });
        });
        c.mouseleave(function() {
            a.removeClass(d.defaultClass);
            a.animate({opacity: 1}, d.leaveTime, function() {
            });
        });
    },fullHeight: function(b) {
        var d = $.extend({fullHeightNode: "li",fullNode: ".jShade"}, b), c = $(this).find(d.fullHeightNode), a;
        c.bind({mouseenter: function() {
                a = $(this).find(d.fullNode);
                a.css({height: $(this).height()});
            }});
    },ridLazy: function(a) {
        $(a).find("img.J_imgLazyload").each(function() {
            $(this).attr("src", $(this).attr("original"));
            $(this).removeAttr("original");
            $(this).removeClass("J_imgLazyload");
        });
        setTimeout(function() {
            skuIdPriceObj.localPriceRefresh(a);
        }, 0);
    },middle: function(e) {
        var d = $.browser.msie && $.browser.version == "6.0", b = d ? "absolute" : "fixed", a = $(window).width(), c = $(window).height();
        $(e).css({left: parseInt((a - $(e).outerWidth()) / 2) + "px",top: parseInt((c - $(e).outerHeight()) / 2) + (this.bIsIE6 ? $(window).scrollTop() : 0) + "px",position: b});
        return e;
    },positionLayout: function(args) {
        if (args == undefined) {
            if (validateData($(this).attr("module-param"))) {
                var args = eval("(" + $(this).attr("module-param") + ")");
            }
        }
        var _this = this, param = $.extend({node: ".btn-coll",nodeParent: ".layout"}, args), node = $(_this).find(param.node), nodeParent = $(_this).parents(param.nodeParent);
        nodeParent.css({position: "relative"});
        node.appendTo(nodeParent).siblings(param.node).remove();
    },notity: function(a) {
        var b = $.extend({notityNode: ".jshop_jiangjia"}, a || {}), c = this;
        NotifyPop.init = function(l, j) {
            var g = this, i = this.serializeUrl(location.href), k = /from=weibo/.test(location.href) ? location.search.replace(/\?/, "") : "", h;
            if (/from=weibo/.test(location.href)) {
                h = i.param.type;
                this.setThickBox(h, k);
            }
            l.bind("click", function() {
                var d = this, e = $(this).attr("id"), f = $(this).attr("data-type") || 2;
                g.sku = $(this).attr("data-sku");
                g.checkLogin(function(m) {
                    if (!m.IsAuthenticated) {
                        jdModelCallCenter.settings.fn = function() {
                            g.checkLogin(function(n) {
                                if (n.IsAuthenticated) {
                                    g._userPin = n.Name;
                                    g.setThickBox(f, k);
                                }
                            });
                        };
                        jdModelCallCenter.login();
                    } else {
                        g._userPin = m.Name;
                        g.setThickBox(f, k);
                    }
                });
                return false;
            }).attr("href", "#none").removeAttr("target");
        };
        $(c).find(b.notityNode).each(function(d, e) {
            NotifyPop.init($(e));
        });
    },tab: function(g) {
        var c = $.extend({tabNode: ".jSortTab span",arrow: ".jSortTabArrow",defaultClass: "current",tabContent: ".jSortContent ul",isNeedWidth: true,eventType: "mouseenter"}, g), e = this, h = $(e).find(c.tabNode), d = $(e).find(c.tabContent), i = $(e).find(c.arrow), f = 0;
        var a = true;
        h.eq(0).addClass(c.defaultClass);
        d.eq(0).addClass(c.defaultClass).data("lazyload", true);
        var b = (h.parent().parent().width() - 0.03) / h.length;
        if (c.isNeedWidth) {
            h.css({width: b});
        }
        i.css({width: b});
        h.each(function(j, k) {
            $(k)[c.eventType](function() {
                f = j;
                if (a) {
                    a = false;
                    $(this).addClass(c.defaultClass).siblings().removeClass(c.defaultClass);
                    d.eq(f).addClass(c.defaultClass).siblings().removeClass(c.defaultClass);
                    if (i.length) {
                        i.animate({left: (f) * b}, 300, function() {
                            a = true;
                            if (f != j) {
                                h.eq(f).trigger(c.eventType);
                            }
                        });
                    } else {
                        a = true;
                        if (f != j) {
                            h.eq(f).trigger(c.eventType);
                        }
                    }
                }
                if (!d.eq(f).data("lazyload")) {
                    jshop.module.ridLazy(d.eq(f).data("lazyload", true));
                }
            });
        });
    },tabShow: function(j) {
        var e = $.extend({eventNode: ".jClick",parentNode: ".jSortContent",childNode: "ul",defaultClass: "current",eventType: "click",num: 0,tabTime: 500,subFunction: "circle"}, j), h = $(this), k = h.find(e.eventNode), o = h.find(e.parentNode), b = h.find(e.childNode), c = e.defaultClass, a = e.eventType, f = (e.num === Number && e.num <= g) ? e.num : 0, n = e.tabTime, i = e.subFunction, g = b.length, m = true;
        b.eq(f).addClass(c);
        k[a](function() {
            if (e.subFunction) {
                l[e.subFunction].call(h);
            }
            d();
        });
        var l = {circle: function() {
                f = (f + 1) % g;
            },direction: function() {
                if (m) {
                    f++;
                    if (f == g - 1) {
                        m = false;
                    }
                } else {
                    f--;
                    if (f == 0) {
                        m = true;
                    }
                }
            },random: function() {
                f = parseInt(Math.random() * g);
            }};
        function d() {
            b.eq(f).addClass(c).siblings().removeClass(c);
            b.animate({opacity: 0}, 0, function() {
            });
            b.eq(f).animate({opacity: 1}, e.tabTime, function() {
            });
        }
    },slide: function(c) {
        var x = this, k = $.extend({imgArea: ".jbannerImg",imgNodeArea: ".jImgNodeArea",imgNode: ".jbannerImg li",tabArea: ".jbannerTab",tabNode: ".jbannerTab span",arrowLeft: ".jPreOut",arrowRight: ".jNextOut",arrowLeftOver: "jPreOver",arrowRightOver: "jNextOver",defaultClass: "show",slideDirection: "left",timer: "3",subFunction: "transparentEffect",eventType: "click",showArrow: 1,isCircular: false,isTabAvailable: true,isHoverStop: true}, c), v = $(x).find(k.imgArea), u = $(x).find(k.imgNode), A = $(x).find(k.tabArea), w = $(x).find(k.tabNode), s = k.defaultClass, n = k.eventType, o = !k.timer * 1000 ? 3000 : k.timer * 1000, b, q = $(x).find(k.imgNodeArea + ">ul"), e = $(x).find(k.imgNodeArea), m = k.isFull;
        var j = 0, D = 1, l = null, B = 0, h = null, g = null, f = false;
        if (!u.length) {
            return;
        }
        jshop.module.ridLazy($(x));
        if (k.isHoverStop) {
            v.bind({mouseenter: function() {
                    f = true;
                    i();
                },mouseleave: function() {
                    f = false;
                    l = setTimeout(r, o);
                }});
        }
        var F = {transparentEffect: function() {
                $(x).css({"background-color": u.eq(j).attr("background")});
                y();
                if (k.isTabAvailable) {
                    a();
                }
                E();
                if (k.showArrow != 1) {
                    p();
                }
                g = C;
                l = setTimeout(r, o);
            },moveEffect: function() {
                var G = (k.slideDirection == "top") ? true : false;
                b = (G) ? "scrollTop" : "scrollLeft";
                $(x).css({"background-color": u.eq(j).attr("background")});
                if (G) {
                    e.css({height: 20000});
                    u.css({width: u.attr("width"),height: u.attr("height")});
                    B = u.height();
                    v[0][b] = j * B;
                } else {
                    e.css({width: 20000});
                    u.css({width: u.attr("width"),height: u.attr("height"),"float": "left"});
                    B = u.width();
                    v[0][b] = j * B;
                }
                y();
                if (k.isTabAvailable) {
                    a();
                }
                E();
                if (k.showArrow != 1) {
                    p();
                }
                g = z;
                l = setTimeout(r, o);
            }};
        if (F[k.subFunction]) {
            F[k.subFunction].call(x);
        }
        function y() {
            v.css({width: u.attr("width"),height: u.attr("height")});
            u.eq(0).addClass(s);
            w.eq(0).addClass(s);
            d();
            $(window).resize(function() {
                d();
            });
        }
        function d() {
            var G = v.width() - $(x).width();
            if (G > 0) {
                v.css({"margin-left": -G / 2});
            } else {
                v.css("margin", "0 auto");
            }
        }
        function a() {
            w.each(function(G, H) {
                $(H)[n](function() {
                    u.eq(j).removeClass(s);
                    w.eq(j).removeClass(s);
                    j = G;
                    u.eq(j).addClass(s);
                    w.eq(j).addClass(s);
                    g();
                    return false;
                });
            });
        }
        function i() {
            clearTimeout(l);
            l = null;
            q.clearQueue();
            u.eq(j).clearQueue();
        }
        function r() {
            if (k.isCircular) {
                if (j < u.length - 1) {
                    t([u, w], s, true);
                } else {
                    j = -1;
                    t([u, w], s, true);
                }
            } else {
                if (D == 1) {
                    if (j < u.length - 1) {
                        t([u, w], s, true);
                    } else {
                        D = 0;
                        t([u, w], s, false);
                    }
                } else {
                    if (j > 0) {
                        t([u, w], s, false);
                    } else {
                        D = 1;
                        t([u, w], s, true);
                    }
                }
            }
            g();
        }
        function p() {
            var H = $(x).find(k.arrowLeft), G = $(x).find(k.arrowRight);
            $(x).bind({mouseover: function() {
                    H.show();
                    G.show();
                },mouseout: function() {
                    H.hide();
                    G.hide();
                }});
        }
        function E() {
            var J = $(x).find(k.arrowLeft), G = $(x).find(k.arrowRight), H = k.arrowLeftOver, I = k.arrowRightOver;
            J.bind({click: function() {
                    if (j != 0) {
                        t([u, w], s, false);
                        g();
                    } else {
                        if (k.isCircular) {
                            t([u, w], s, false);
                            j = u.length;
                            t([u, w], s, false);
                            g();
                        }
                    }
                    return false;
                },mouseover: function() {
                    $(this).addClass(H);
                },mouseout: function() {
                    $(this).removeClass(H);
                }});
            G.bind({click: function() {
                    if (j < u.length - 1) {
                        t([u, w], s, true);
                        g();
                    } else {
                        if (k.isCircular) {
                            j = -1;
                            t([u, w], s, true);
                            g();
                        }
                    }
                    return false;
                },mouseover: function() {
                    $(this).addClass(I);
                },mouseout: function() {
                    $(this).removeClass(I);
                }});
        }
        function C() {
            u.animate({opacity: 0}, 0, function() {
            });
            $(x).css({"background-color": u.eq(j).attr("background")});
            u.eq(j).animate({opacity: 1}, 1000, function() {
                i();
                if (f) {
                    return;
                }
                l = setTimeout(r, o);
            });
        }
        function z() {
            var G = (j * B) - v[0][b], H = G > 0 ? Math.ceil(G / 10) : Math.floor(G / 10);
            v[0][b] += H;
            if (H == 0) {
                u.eq(j).addClass(s);
                w.eq(j).addClass(s);
                H = null;
                i();
                if (!f) {
                    l = setTimeout(r, o);
                }
            } else {
                h = setTimeout(z, 30);
            }
            $(x).css({"background-color": u.eq(j).attr("background")});
        }
        function t(G, I, H) {
            G.each(function(J, K) {
                K.eq(j).removeClass(I);
            });
            H ? (j++) : (j--);
            G.each(function(J, K) {
                K.eq(j).addClass(I);
            });
        }
    },operateNode: function(j) {
        var e = $.extend({operateNode: "li",operateParentNode: null,defaultClass: "jCurrent",length: 0,subFunction: null,number: [],callBack: null}, j || {}), i = $(this), f = i.find(e.operateNode), a = (i.find(e.operateParentNode).length > 0) ? i.find(e.operateParentNode) : i.parent().parent().parent(), c = e.defaultClass, g = e.number, b = (e.length != 0) ? e.length : parseInt(a.outerWidth(true) / f.outerWidth(true)), d = typeof (e.callBack) === "function" ? e.callBack : function(m) {
            m.addClass(c);
        };
        if (f.length === 0) {
            return;
        }
        var l = 0;
        var k = $(f[0]).offset().top;
        f.each(function(m, o) {
            if (m > 0) {
                l++;
                var n = $(o).offset().top;
                if (k !== n) {
                    return false;
                } else {
                    k = n;
                }
            }
        });
        var h = {getNode: function() {
                return f.map(function(n, o) {
                    for (var m = 0; m < g.length; m++) {
                        if (n + 1 === g[m]) {
                            return o;
                        }
                    }
                });
            },getAllOdd: function() {
                return f.map(function(m, n) {
                    if (m % 2 === 0) {
                        return n;
                    }
                });
            },getAllEven: function() {
                return f.map(function(m, n) {
                    if (m % 2 === 1) {
                        return n;
                    }
                });
            },getColumn: function() {
                return f.map(function(n, o) {
                    for (var m = 0; m < g.length; m++) {
                        if (n % b === g[m] - 1) {
                            return o;
                        }
                    }
                });
            },getRow: function() {
                return f.map(function(n, o) {
                    for (var m = 0; m < g.length; m++) {
                        if (n >= b * (g[m] - 1) && n < b * g[m]) {
                            return o;
                        }
                    }
                });
            },getRowOdd: function() {
                return f.map(function(m, n) {
                    if (m % b % 2 === 0) {
                        return n;
                    }
                });
            },getRowEven: function() {
                return f.map(function(m, n) {
                    if (m % b % 2 === 1) {
                        return n;
                    }
                });
            },getFirst: function() {
                return f.eq(0);
            },getLast: function() {
                return f.eq(f.length - 1);
            },getRowFirst: function() {
                return f.map(function(m, n) {
                    if (m % b === 0) {
                        return n;
                    }
                });
            },getRowLast: function() {
                return f.map(function(m, n) {
                    if (m % b === b - 1) {
                        return n;
                    }
                });
            },getRowFirstAndLast: function() {
                return f.map(function(m, n) {
                    if (m % b === 0 || m % b === b - 1) {
                        return n;
                    }
                });
            }};
        if (h[e.subFunction]) {
            d(h[e.subFunction]());
        }
    },countdown: (function() {
        var c = null, b = [], a = 0;
        return function(e) {
            var h = this, f = $.extend({hasDay: true,dayCnt: ".days",hourCnt: "hours",minuteCnt: ".minutes",secondCnt: ".seconds"}, e || {}), i = [];
            function k() {
                if (!f.countdownInfo) {
                    return;
                }
                d();
                $(h).data("cutTime", i).data("arg", f);
                setTimeout(function() {
                    b = $('[module-function*="countdown"]').toArray();
                }, 0);
                if (!c) {
                    getServerTime(function(m) {
                        if (typeof m != "undefined") {
                            var l = m.split(" "), n = l[2];
                            n += " " + l[1] + ", ";
                            n += l[3] + " " + l[4];
                            a = new Date() - new Date(n) - 8 * 3600 * 1000;
                        }
                        g();
                    });
                }
            }
            function j(o) {
                var m = o.split(" "), n = m[0].split("-"), l = m[1].split(":");
                return new Date(Number(n[0]), (Number(n[1]) + 11) % 12, Number(n[2]), Number(l[0]), Number(l[1]), Number(l[2]));
            }
            function d() {
                var l = f.countdownInfo;
                if (l.constructor == String) {
                    i.push(j(l));
                } else {
                    $.each(l, function(m, n) {
                        i.push(j(n));
                    });
                }
            }
            function g() {
                c = setInterval(function() {
                    for (var p = 0, q = b.length; p < q; p++) {
                        var t = $(b[p]), s = t.data("cutTime"), u = t.data("arg"), l = parseInt((s[0] - new Date() + a) / 1000);
                        if (l < 0) {
                            s.shift();
                            if (s.length === 0) {
                                b.splice(p, 1);
                                q--;
                                p--;
                            } else {
                                t.data("cutTime", s);
                            }
                            t.closest("[module-name]").trigger("countdownchange");
                        } else {
                            var r = Math.floor(l / (24 * 3600)), o = Math.floor(l / 3600) - (u.hasDay ? r * 24 : 0), n = Math.floor(l % 3600 / 60), m = l % 60;
                            if (u.hasDay) {
                                t.find(u.dayCnt).html(r > 9 ? r : "0" + r);
                            }
                            t.find(u.hourCnt).html(o > 9 ? o : "0" + o);
                            t.find(u.minuteCnt).html(n > 9 ? n : "0" + n);
                            t.find(u.secondCnt).html(m > 9 ? m : "0" + m);
                        }
                    }
                }, 1000);
            }
            k();
        };
    })(),loop: function(n) {
        var h = this, l = $(h), o = $.extend({auto: false,next: ".next",prev: ".prev",container: ".con",item: ".item"}, n), b = l.find(o.container), i = 0, k = 0, p = false, g = 0, c = 1, j = null, d = o.duration || 1000;
        function f() {
            b.css({overflow: "hidden",position: "relative"});
            l.find(o.item).css("float", "left");
        }
        function e() {
            var t = b.html(), q = o.height || b.height();
            l.find(o.item).remove();
            b.height(q);
            j = $("<div></div>").prependTo(b).css({width: (k + 2 * c) * i,height: q,position: "absolute",left: 0,top: 0}).html(t);
            if (o.conCls) {
                j.addClass(o.conCls);
            }
            var u = l.find(o.item);
            for (var s = k - 1, r = k - c; s >= r; s--) {
                u.eq(s).clone(true).prependTo(j);
            }
            for (var s = 0; s < c; s++) {
                u.eq(s).clone(true).appendTo(j);
            }
            j.css("left", -c * i);
        }
        function a() {
            l.find(o.next).click(function() {
                if (p) {
                    return;
                }
                p = true;
                g += c;
                j.animate({left: -g * i}, d, function() {
                    if (g >= k + c) {
                        g = g - k;
                        j.css("left", -(g) * i);
                    }
                    p = false;
                });
            });
            l.find(o.prev).click(function() {
                if (p) {
                    return;
                }
                p = true;
                g -= c;
                j.animate({left: -g * i}, d, function() {
                    if (g < c) {
                        g = g + k;
                        j.css("left", -g * i);
                    }
                    p = false;
                });
            });
            if (o.eventType) {
                l.find(o.item).each(function(q, r) {
                    $(r)[o.eventType](function() {
                        o.handle(r, q, c);
                    });
                });
            }
        }
        function m() {
            f();
            if (!l.find(o.item).length) {
                return;
            }
            c = Math.ceil(b.width() / l.find(o.item).outerWidth(true));
            i = l.find(o.item).outerWidth(true);
            k = l.find(o.item).length;
            g = c;
            if (l.find(o.item).length < c) {
                return;
            }
            e();
            a();
        }
        m();
    },hoverAnimate: function(b) {
        var e = $.extend({node: "li .jItem",cssValueOne: [{width: 235,height: 365,marginTop: -10,opacity: 1}, {width: 235,height: 355,marginTop: -5,opacity: 0.9}, {width: 235,height: 365,marginTop: -10,opacity: 1}],cssValueTwo: [{width: 235,height: 345,marginTop: 0,opacity: 1}],timerOne: 100,timerTwo: 100}, b || {}), f = $(this), d = f.find(e.node), a = e.cssValueOne, c = e.cssValueTwo;
        d.bind({mouseenter: function() {
                var i = a.length, h = 0, j = $(this);
                function g() {
                    var k = arguments.callee;
                    j.animate(a[h], e.timerOne, function() {
                        h++;
                        if (h == i) {
                            return;
                        }
                        k();
                    });
                }
                g();
            },mouseleave: function() {
                var i = c.length, h = 0, j = $(this);
                j.stop(true);
                function g() {
                    var k = arguments.callee;
                    j.animate(c[h], e.timerTwo, function() {
                        h++;
                        if (h == i) {
                            return;
                        }
                        k();
                    });
                }
                g();
            }});
    },getProTag: function(a) {
        var d = $.extend({node: "li",tagNode: ".jSlogan",tagValue: {1: "直降",3: "返券",4: "赠京豆",5: "赠品",11: "会员特价",22: "京豆优惠购"},dataNum: 40,url: "http://ad.3.cn/flags/mgets?callback=getPromotionTag&skuids=J_981821,J_1057746",urlNum: 26}, a), b = $(this), c = b.find(d.node);
        if (!c.length) {
            return;
        }
        function e() {
            var j = [];
            c.each(function(i, k) {
                j.push("J_" + $(k).attr("skuid"));
            });
            var f = Math.ceil(j.length / d.dataNum);
            for (var h = 0; h < f; h++) {
                var g = j.slice(h * d.dataNum, Math.min(j.length, (h + 1) * d.dataNum));
                $.ajax({url: d.url.substr(0, d.urlNum),data: {skuids: g.join(",")},dataType: "jsonp",success: function(i) {
                        $.each(i, function(k, o) {
                            var m = "";
                            for (var l = 0; l < o.pf.length; l++) {
                                if (d.tagValue[o.pf[l]]) {
                                    m += "<span>" + d.tagValue[o.pf[l]] + "</span>";
                                }
                            }
                            b.find(d.node + "[skuid=" + o.pid + "]").find(d.tagNode).html(m);
                        });
                    }});
            }
        }
        e();
    },moveNode: function(l) {
        var e = $.extend({moveNode: ".scroll-area li",arrowPrev: ".arrow-left",arrowNext: ".arrow-right",disabled: "disabled",showNum: "",cssValue: "margin-left",isLoop: true,isScreen: true,timer: 1}, l || {}), j = $(this), f = j.find(e.moveNode), h = j.find(e.arrowPrev), i = j.find(e.arrowNext), o = (e.showNum > 0) ? parseInt(e.showNum) : Math.ceil(f.parent().parent().width() / f.outerWidth(true)), k = 0, d = e.isScreen ? Math.ceil(f.length / o) : f.length, a = true, c = e.isScreen ? o * f.eq(0).outerWidth(true) : f.eq(0).outerWidth(true), n = e.isScreen ? 1 : o, b = !(e.timer > -1 && e.timer < 5) ? 1000 : e.timer * 1000;
        if (d > n) {
            h.show().addClass(e.disabled);
            i.show();
            f.parent().css("width", c * d * 10);
            if (e.isLoop) {
                m();
            }
        }
        function m() {
            for (var p = 0; p < o; p++) {
                f.eq(p).clone().appendTo(f.parent());
                f.eq(f.length - 1 - p).clone().prependTo(f.parent());
            }
            f.parent().css(e.cssValue, -c * n + parseInt(f.parent().css(e.cssValue)));
        }
        var g = {};
        f.parent().data("cssInitValue", parseInt(f.parent().css(e.cssValue)));
        i.click(function() {
            if (!e.isLoop) {
                if (k == 0) {
                    a = true;
                }
            }
            if (a) {
                a = false;
                k++;
                g[e.cssValue] = -c * k + f.parent().data("cssInitValue");
                f.parent().animate(g, b, function() {
                    a = true;
                    if (!e.isLoop) {
                        if (k > 0) {
                            h.removeClass(e.disabled);
                        }
                        if (k + n == d) {
                            i.addClass(e.disabled);
                            a = false;
                        }
                    } else {
                        if (k == d) {
                            k = 0;
                            f.parent().css(e.cssValue, f.parent().data("cssInitValue"));
                        }
                    }
                });
            }
        });
        h.click(function() {
            if (!e.isLoop) {
                a = (k > 0) ? true : false;
            }
            if (a) {
                a = false;
                k--;
                g[e.cssValue] = -c * k + f.parent().data("cssInitValue");
                f.parent().animate(g, b, function() {
                    a = true;
                    if (!e.isLoop) {
                        if (k < d - 1) {
                            i.removeClass(e.disabled);
                        }
                        if (k == 0) {
                            h.addClass(e.disabled);
                            a = false;
                        }
                    } else {
                        if (k < 0) {
                            k = d - 1;
                            f.parent().css(e.cssValue, f.parent().data("cssInitValue") + (-c * k));
                        }
                    }
                });
            }
        });
    },addToCart: function(b) {
        var g = $.extend({node: "li",img: ".jPic img",cart: ".jBtnArea a",property: "data-sku",jdCart: "#settleup-2013",cartNum: "#shopping-amount",timer: 500}, b || {}), e = $(this), d = e.find(g.node), f = $(g.jdCart), a = f.find(g.cartNum);
        d.each(function(j, k) {
            var h = $(k).find(g.img), l = $(k).find(g.cart);
            l.click(function() {
                c.add(l, $(k).attr(g.property), h, f, a, g.timer);
            });
        });
        var c = {ele: null,sku: null,ptype: null,pcount: null,add: function(i, h, j, l, k, o, n, m) {
                0 != h && (this.ele = i, this.sku = h, this.ptype = m || 1, this.pcount = n || 1, this.img = j, this.jdCart = l, this.cartNum = k, this.timer = o, this.versonAnimate());
            },versonAnimate: function() {
                var w = this;
                clearTimeout(w.timer);
                w.timer = null;
                this.addToCart();
                var v = w.img, u = v.height(), s = v.width(), r = v.offset().left, q = v.offset().top, p = $(document).scrollTop(), o = w.jdCart.offset().left + 50, n = w.jdCart.offset().top, m = $('<div class="flyGoods jGoodsRecommend20140909" style="position:absolute;z-index: 10;"></div>'), k = 25;
                var x = $(w.ele);
                m.html(v.clone()).css({left: r + s / 2 - k + Math.round(40 * Math.random() + 0 - 20),top: q + u / 2 - 1 + Math.round(40 * Math.random() + 0 - 20)});
                m.appendTo("body");
                m.animate({top: x.offset().top,left: x.offset().left + x.width() - 50}, w.timer, "easeOutCirc", function() {
                    m.animate({left: o,top: n,opacity: 0.1}, w.timer, "easeInOutQuint", function() {
                        w.getCartNum();
                        m.remove();
                    });
                });
            },addToCart: function() {
                var h = "http://cart.jd.com/cart/dynamic/reBuyForOrderCenter.action?wids={PID}&nums={PCOUNT}";
                h = h.replace("{PID}", this.sku).replace("{PCOUNT}", this.pcount).replace("{PTYPE}", this.ptype), jQuery.ajax({url: h,dataType: "jsonp"});
            },getCartNum: function() {
                var h = this;
                jQuery.ajax({url: "http://cart.jd.com/cart/miniCartServiceNew.action",data: {method: "GetCart"},dataType: "jsonp",success: function(i) {
                        try {
                            h.cartNum.html(i.Cart.Num);
                        } catch (j) {
                        }
                    }});
            }};
    },estimation: function(c) {
        var e = $.extend({skuNode: "li",starNode: ".j-star",rateNote: ".j-rate",countNode: ".j-count",commentNode: ".j-comment",skuName: "skuid"}, c), f = $(this), a = f.find(e.skuNode), b = [];
        if (a.length === 0) {
            return;
        }
        a.each(function(g, h) {
            b.push(h.getAttribute(e.skuName));
        });
        for (var d = 0; d < b.length; d += 10) {
            $.ajax({url: "http://act.jshop.jd.com/recommend.html",type: "GET",dataType: "jsonp",data: {"type": 0,"skuIds": b.slice(d, d + 10).join(",")},success: function(g) {
                    if (g && g.length > 0) {
                        for (var j = 0; j < g.length; j++) {
                            var k = f.find(e.skuNode + "[" + e.skuName + "='" + g[j].skuId + "']"), h = "";
                            k.find(e.rateNote).text(g[j].rate * 10000 / 100);
                            k.find(e.countNode).text(g[j].count);
                            k.find(e.commentNode).text(g[j].comment).attr("title", g[j].comment);
                            if (g[j].rate >= 0.95) {
                                h = "star5";
                            } else {
                                if (g[j].rate >= 0.9 && g[j].rate < 0.95) {
                                    h = "star4";
                                } else {
                                    if (g[j].rate >= 0.85 && g[j].rate < 0.9) {
                                        h = "star3";
                                    } else {
                                        if (g[j].rate >= 0.8 && g[j].rate < 0.85) {
                                            h = "star2";
                                        } else {
                                            if (g[j].rate >= 0.75 && g[j].rate < 0.8) {
                                                h = "star1";
                                            } else {
                                                h = "star0";
                                            }
                                        }
                                    }
                                }
                            }
                            k.find(e.starNode).addClass(h);
                        }
                    }
                }});
        }
    },goodsFollow: function(a) {
        var c = this, b = $.extend({node: ".J-follow",showNum: ".J-follow-num"}, a);
        $(c).find(b.node).JFollow(b);
    },goodsShare: function(a) {
        var c = this, b = $.extend({node: ".J-share",eventType: "mouseover",offset: {top: 0,left: 0}}, a);
        $(c).find(b.node).JShare({eventType: b.eventType,offset: b.offset});
    },marqueeLeft: function(e) {
        var a = $.extend({node: ".scroll-area",tr: "tr",td: "td",speed: 20}, e || {}), c = $(this), d = c.find(a.node)[0], f = $(d).find("tr")[0], h = $(d).find("td")[0];
        if (h.offsetWidth >= d.offsetWidth) {
            g();
            var i = setInterval(b, a.speed);
            d.onmouseover = function() {
                clearInterval(i);
            };
            d.onmouseout = function() {
                i = setInterval(b, a.speed);
            };
        }
        function g() {
            var j = document.createElement("td");
            j.innerHTML = h.innerHTML;
            f.appendChild(j);
        }
        function b() {
            if (h.offsetWidth - d.scrollLeft <= 0) {
                d.scrollLeft -= h.offsetWidth;
            } else {
                d.scrollLeft++;
            }
        }
    }};
function getServerTime(b) {
    var a = "/getServerTime.html";
    $.ajax({url: a,type: "GET",cache: false,complete: function(c, d) {
            if (b) {
                b(c.getResponseHeader("Date"));
            }
        }});
}
jQuery.fn.extend({adaptiveLayout: function(c) {
        if (jQuery(this).data("adaptiveLayout")) {
            return;
        }
        var b = jQuery.extend({node: null}, c), e = jQuery(this).find(b.node), f = parseInt(e.parent().width() / e.outerWidth(true)), g = jQuery.browser.msie && parseInt(jQuery.browser.version) <= 7 ? "i" : "", a = arguments[1] == "padding" ? "p" : "m", d = arguments[2] == 0.5 ? "OneHalf" : "One";
        switch (f) {
            case 10:
                jQuery(e).addClass(g + "qTen" + d).addClass(a + d);
                break;
            case 9:
                jQuery(e).addClass(g + "qNine" + d).addClass(a + d);
                break;
            case 8:
                jQuery(e).addClass(g + "qEight" + d).addClass(a + d);
                break;
            case 7:
                jQuery(e).addClass(g + "qSeven" + d).addClass(a + d);
                break;
            case 6:
                jQuery(e).addClass(g + "qSix" + d).addClass(a + d);
                break;
            case 5:
                jQuery(e).addClass(g + "qFive" + d).addClass(a + d);
                break;
            case 4:
                jQuery(e).addClass(g + "qFour" + d).addClass(a + d);
                break;
            case 3:
                jQuery(e).addClass(g + "qThree" + d).addClass(a + d);
                break;
            case 2:
                jQuery(e).addClass(g + "qTwo" + d).addClass(a + d);
                break;
            case 1:
                jQuery(e).addClass(g + "qOne" + d).addClass(a + d);
                break;
            default:
                if (jQuery(".app_edit_page_operate20130305")[0]) {
                    jQuery(this).defaultMessage();
                }
        }
        jQuery(this).data("adaptiveLayout", true);
    },insertMessage: function() {
        jQuery(this).prepend(jQuery("<div class='message_remind'>你选择的模板不适合这个布局，请重新选择模板！</div>").show());
    },defaultMessage: function() {
        var a = this;
        jQuery(this).insertMessage();
        setTimeout(function() {
            jQuery(a).find(".message_remind").remove();
        }, 10000);
    },imgOnload: function(a, b) {
        jQuery(this).parents(".mc").eq(0).adaptiveLayout({node: "li"}, a, b);
    }});
