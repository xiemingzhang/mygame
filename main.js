var fix =1;

cc.game.onStart = function(){
    cc.director.setDisplayStats(false);
    //cc.view.adjustViewPort(true);
    //cc.view.setDesignResolutionSize(320, 480, cc.ResolutionPolicy.SHOW_ALL);
    if(!cc.sys.isNative && document.getElementById("cocosLoading")) //If referenced loading.js, please remove it
        document.body.removeChild(document.getElementById("cocosLoading"));

    cc.view.resizeWithBrowserSize(true);
    var designSize = cc.size(736, 414);
    var screenSize = cc.view.getFrameSize();

    /*手机端*/
    if(!cc.sys.isNative && screenSize.height < 500){
        designSize = cc.size(736, 414);
        cc.loader.resPath = "res/Normal";
        fix = 1;
        /*平板*/
    }else{
        cc.loader.resPath = "res/Normal";
        fix = (designSize.height / screenSize.height) * (screenSize.width / designSize.width);
    }


    /*安卓下高清显示*/
    cc.view.enableRetina(true);

    //load resources
    cc.view.setDesignResolutionSize(designSize.width, designSize.height, cc.ResolutionPolicy.FIXED_HEIGHT);
    //去掉左下角
    cc.director.setDisplayStats(false);
    cc.LoaderScene.preload(g_resources, function () {
        cc.director.runScene(new StartScene());
    }, this);
};
cc.game.run();