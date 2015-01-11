Array.prototype.each = function(b) {
    if (typeof b != "function") {
        throw new Error("argumets should be a function object!");
    }
    for (var c = 0, a = this.length; c < a; c++) {
        b.call(this, c, this[c]);
    }
};

(function() {
    var a = this;
    a.jshop = a.jshop || {};
    a.js = a.jshop;
    
})();
//-----------------------------------------
var jshop = jshop || {};
jshop.module = jshop.module || {};

//----------------------------------------
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



//------------------------

(function($){
        jshop.module.UserDefine={};
        $.extend(jshop.module.UserDefine,jshop.module);
        $.extend(jshop.module.UserDefine,{
                sideSlip:function(args){
                        var imgs=$(this).find("img");
                        imgs.each(function(index,n){$(n).attr("src",$(n).attr("original"));$(n).removeAttr("original");
                        $(n).removeClass("J_imgLazyload");});
                        if(args==undefined){
                                if(validateData($(this).attr("module-param"))){
                                        var args=eval("("+$(this).attr("module-param")+")");
                                }
                        }
                        var _this=this,
                                param=$.extend({vertical:"top",verticalValue:170,horizontal:"left",horizontalValue:0,zindex:10},args),
                                vertical=param.vertical,verticalValue=param.verticalValue,horizontal=param.horizontal,horizontalValue=param.horizontalValue,
                                zindex=param.zindex;
                        var count=0;
                        for(var i in param){count++;}
                        if(count==5&&vertical=="top"&&verticalValue>=170&&horizontal=="right"){
                                setInterval(function(){
                                        verticalValue+=(getTop()+param.verticalValue-verticalValue)/20;
                                        $(_this).css({"position":"absolute","top":verticalValue,"right":horizontalValue,"zIndex":zindex});
                                },20);
                        }
                        if(count==5&&vertical=="top"&&verticalValue>=170&&horizontal=="left"){
                                setInterval(function(){
                                        verticalValue+=(getTop()+param.verticalValue-verticalValue)/20;
                                        $(_this).css({"position":"absolute","top":verticalValue,"left":horizontalValue,"zIndex":zindex});
                                },20);
                        }
                        if(count==5&&vertical=="bottom"&&horizontal=="right"){
                                var a=$(window).height()-$(_this).height()-param.verticalValue,b=a;
                                setInterval(function(){
                                        a+=(getTop()+b-a)/20;$(_this).css({"position":"absolute","top":a,"right":horizontalValue,"zIndex":zindex});
                                },20);
                        }
                        if(count==5&&vertical=="bottom"&&horizontal=="left"){
                                var a=$(window).height()-$(_this).height()-param.verticalValue,b=a;
                                setInterval(function(){
                                        a+=(getTop()+b-a)/20;$(_this).css({"position":"absolute","top":a,"left":horizontalValue,"zIndex":zindex});
                                        },20);
                        }
                        if(count==5&&vertical=="bottom"&&horizontal=="middle"){
                                var a=$(window).height()-$(_this).height()-param.verticalValue,b=a;
                                setInterval(function(){
                                        a+=(getTop()+b-a)/20;
                                        $(_this).css({"position":"absolute","top":a,"left":horizontalValue,"margin-left":-($(_this).width()/2),"zIndex":zindex});
                                },20);
                        }
                        function getTop(){
                                return(document.documentElement.scrollTop||document.body.scrollTop||0)-(document.documentElement.clientTop||document.body.clientTop||0);
                        }
                }
                ,addFavorite:function(args){
                        if(args==undefined){
                                if(validateData($(this).attr("module-param"))){
                                        var args=eval("("+$(this).attr("module-param")+")");
                                }
                        }
                        var _this=this,param=$.extend({title:"京东商城",url:"http://www.jd.com"},args),title=param.title,url=param.url;
                        $(_this).css("cursor","pointer");
                        $(_this).click(function(e){
                                if(document.all){
                                        window.external.AddFavorite(url,title);
                                }else{
                                        if(window.sidebar){
                                                window.sidebar.addPanel(title,url,"");
                                        }else{
                                                alert("对不起，您的浏览器不支持此操作!\n请您使用菜单栏或Ctrl+D收藏本站。");
                                        }
                                }}
                        );
                },
                autoCenter:function(args){
                        var _this=$(this),param=$.extend({autoMiddleNode:".userDefinedArea"},args||{}),node=_this.find(param.autoMiddleNode);
                        alignCenter();
                        $(window).resize(function(){
                                alignCenter();
                        });
                        function alignCenter(){
                                var extra=node.width()-_this.width();
                                if(extra>0){
                                        node.css({"margin-left":-extra/2});
                                }else{
                                        node.css("margin","0 auto");
                                }
                        }
                }}
        );
})(jQuery);