var DOMAIN = 'http://api.miyamibao.com/v1/';
var Route = {
    AUTH_URL: DOMAIN+'app/auth',
    GAME_URL: DOMAIN+'parent/students/game',
    TASK_URL: DOMAIN+"parent/students/task/ajax"
};
var mag = [];
var browser = {
    versions: function() {
        var u = navigator.userAgent;
        var app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1,
            presto: u.indexOf('Presto') > -1,
            webKit: u.indexOf('AppleWebKit') > -1,
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
            mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/),
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
            iPhone: u.indexOf('iPhone') > -1,
            iPad: u.indexOf('iPad') > -1,
            iPod: u.indexOf('iPod') > -1,
            webApp: u.indexOf('Safari') == -1
        };

    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
};

function getParams(){
    var url = location.search;
    var data = {};
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var params = str.split("&");
        for(var i = 0; i < params.length; i ++) {
            data[params[i].split("=")[0]]=unescape(params[i].split("=")[1]);
        }
    }
    return data;
}

var App = {
    data: {"token": '','student_id':'','category_id':'','trade_status':''},
    //跳转到支付
    goPay:function(res){
        if (browser.versions.android) {
            Android.gotopay(res);
        } else if (browser&&(browser.versions.iPhone || browser.versions.iPad || browser.versions.iPod)){
            window.location.href = 'jsback:gotopay='+res;
        }else{
            console.log('不支持的平台');
        }
    },
    //默认的返回或关闭
    jsBack:function(opt){
        if(!opt){
            opt = 'close';
        }
        try {
            if (browser && browser.versions.android) {
                Android.doback(opt);
            } else if (browser && (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad)) {
                window.location.href = "jsback:doback=" + opt;
            }
        } catch (e) {
            console.log(e);
        }
    },
    //显示头信息
    showHeader:function(){
        if (browser.versions.android) {
            Android.showhomeheader();
        } else if (browser&&(browser.versions.iPhone || browser.versions.iPad || browser.versions.iPod)){
            window.location.href="jsback:showhomeheader"
        }else{
            console.log('不支持的平台');
        }
    },
    //隐藏头信息
    hideHeader: function(){
        if (browser.versions.android) {
            Android.hidehomeheader();
        } else if (browser&&(browser.versions.iPhone || browser.versions.iPad || browser.versions.iPod)){
            window.location.href="jsback:hidehomeheader"
        }else{
            console.log('不支持的平台');
        }
    },
    init: function(){
        var params = getParams();
        if(params['token']){
            App.data['token'] = params['token'];
        }
        if(params['trade_status']){
            App.data['trade_status'] = params['trade_status'];
        }
        if(params['category_id']){
            App.data['category_id'] = params['category_id'];
        }
        if(params['student_id']){
            App.data['student_id'] = params['student_id'];
        }
    }
};
App.init();