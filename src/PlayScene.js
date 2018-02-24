
var PlayLayer = cc.Layer.extend({
    ctor:function () {
        this._super();

        this.size = cc.winSize;

        this.otherLayer();
        //第几关
        this.index = 0;

        //add bg
        this.bgSprite = new cc.Sprite(res.bg);
        this.bgSprite.attr({
            x: this.size.width / 2,
            y: this.size.height / 2
        });
        this.bgSprite.setScale(0.35*fix,0.333);
        this.addChild(this.bgSprite, 0);

    //      var loadCb = function(err, img){  
    //    if(err) return;  
    //     var texture2d = new cc.Texture2D();  
    //     texture2d.initWithElement(img);  
    //     texture2d.handleLoadedTexture(); 

    //    this.bgSprite = new cc.Sprite(texture2d);
    //     this.bgSprite.attr({
    //         x: this.size.width / 2,
    //         y: this.size.height / 2
    //     });
    //     this.bgSprite.setScale(0.35*fix,0.333);
    //     this.addChild(this.bgSprite, 0);
    // }.bind(this);  
    // cc.loader.loadImg("http://47.94.156.118/bg.jpg", {isCrossOrigin:false }, loadCb); 

                    
        //声音按钮
        this.sound = new Sound(res.soundButton);
        this.sound.setAnchorPoint(0,0);
        this.sound.setPosition(31,11);
        this.sound.setScale(0.333);
        this.addChild(this.sound,0);

        //背景音乐
        this.audioPlay();

        this.startTipVoice();
        //游戏
        var _arr = this.shuffle([{
                path:res.bear,
                shadowPath:res.bearShadow,
                flag:"bear"
            },{
                path:res.girl,
                shadowPath:res.girlShadow,
                flag:"girl"
            },{
                path:res.lion,
                shadowPath:res.lionShadow,
                flag:"lion"
            },{
                path:res.mouse,
                shadowPath:res.mouseShadow,
                flag:"mouse"
            },{
                path:res.rabbit,
                shadowPath:res.rabbitShadow,
                flag:"rabbit"
            },{
                path:res.fox,
                shadowPath:res.foxShadow,
                flag:"fox"
            }]).slice(0,5)
        this.animalDataArr = [this.deepCopy(_arr),this.deepCopy(_arr),this.deepCopy(_arr)];

        this.numberDataArr = [
            this.shuffle2([{
                path:res.one,
                flag:0
            },{
                path:res.two,
                flag:1
            },{
                path:res.three,
                flag:2
            },{
                path:res.four,
                flag:3
            },{
                path:res.five,
                flag:4
            }]),
            this.shuffle2([{
                path:res.two,
                flag:0
            },{
                path:res.three,
                flag:1
            },{
                path:res.four,
                flag:2
            },{
                path:res.five,
                flag:3
            },{
                path:res.six,
                flag:4
            }]),
            this.shuffle2([{
                path:res.three,
                flag:0
            },{
                path:res.four,
                flag:1
            },{
                path:res.five,
                flag:2
            },{
                path:res.six,
                flag:3
            },{
                path:res.seven,
                flag:4
            }])
        ];

        this.topPos = [
            {
                x:this.size.width/736*124,
                y:this.size.height/414*140
            },{
                x:this.size.width/736*246,
                y:this.size.height/414*140
            },{
                x:this.size.width/2,
                y:this.size.height/414*140
            },{
                x:this.size.width/736*490,
                y:this.size.height/414*140
            },{
                x:this.size.width/736*612,
                y:this.size.height/414*140
            }
        ];

        this.downPos = [
            {
                x:this.size.width/736*124,
                y:this.size.height/414*77
            },{
                x:this.size.width/736*246,
                y:this.size.height/414*77
            },{
                x:this.size.width/2,
                y:this.size.height/414*77
            },{
                x:this.size.width/736*490,
                y:this.size.height/414*77
            },{
                x:this.size.width/736*612,
                y:this.size.height/414*77
            }
        ];

        var self = this;
        this.t = setInterval(self.startGame.bind(self),0);

        return true;
    },
    startGame:function () {
        if(this.numberDataArr[0] && this.numberDataArr[0].length>0 && this.numberDataArr[1] && this.numberDataArr[1].length>0  && this.numberDataArr[2] && this.numberDataArr[2].length>0 ){
            clearInterval(this.t);
            var self = this;
            this.tt = setTimeout(self.ok.bind(self),0);
        }
    },
    ok:function () {
        clearTimeout(this.tt);
        // for(let j = 0;j<this.animalDataArr.length;j++){
        //     for(let i = 0;i<this.animalDataArr[j].length;i++){
        //         this.animalDataArr[j][i].sortNum = this.numberDataArr[j][i].flag;
        //     }
        // }
        for(var i = 0;i<this.animalDataArr[0].length;i++){
            this.animalDataArr[0][i].sortNum = this.numberDataArr[0][i].flag;
        }

        var _a = this.deepCopy(this.animalDataArr[0]).sort(function (a,b) {return a.sortNum - b.sortNum });

        this.animalDataArr[1] = this.shuffle3(_a);
        var _arr = [];
        for(var i = 0; i< this.animalDataArr[1].length; i++){
            for(var j = 0;j<this.numberDataArr[1].length;j++){
                if(this.animalDataArr[1][i].sortNum == this.numberDataArr[1][j].flag){
                    _arr.push(this.numberDataArr[1][j])
                }
            }
        }
        this.numberDataArr[1] = _arr;

        this.animalDataArr[2] = this.shuffle3(_a);
        var _arr1 = [];
        for(var i = 0; i< this.animalDataArr[2].length; i++){
            for(var j = 0;j<this.numberDataArr[2].length;j++){
                if(this.animalDataArr[2][i].sortNum == this.numberDataArr[2][j].flag){
                    _arr1.push(this.numberDataArr[2][j])
                }
            }
        }
        this.numberDataArr[2] = _arr1;

        this.init();
    },
    //初始化
    init:function(){
        this.move = true;
            if(this.index > 2){
                return
            }else{

                if(this.animalSpritArr && this.animalSpritArr.length>0){
                    for(var i = 0;i<this.animalSpritArr.length;i++){
                        this.animalSpritArr[i].removeFromParent();
                    }
                    for(var i = 0;i<this.numberSpritArr.length;i++){
                        this.numberSpritArr[i].removeFromParent();
                    }
                    for(var i = 0;i<this.shadowSpritArr.length;i++){
                        this.shadowSpritArr[i].removeFromParent();
                    }
                }

                this.animalSpritArr = [];
                this.numberSpritArr = [];
                this.shadowSpritArr = [];

                for(var i = 0; i<5; i++){
                    var animal = new Animal(this.animalDataArr[this.index][i].path);
                    animal.setScale(0.333*fix);
                    animal.setAnchorPoint(0.5,0);
                    animal.setPosition(this.topPos[i]);
                    animal.id = i;
                    animal.flag = this.animalDataArr[this.index][i].flag;
                    animal.sortNum = this.animalDataArr[this.index][i].sortNum;
                    animal.setOpacity(0);
                    this.addChild(animal,1);
                    this.animalSpritArr.push(animal);
                }

                for(var i = 0; i<5; i++){
                    var shadow = new cc.Sprite(this.animalDataArr[this.index][i].shadowPath);
                    shadow.setScale(0.333*fix);
                    shadow.setAnchorPoint(0.5,0);
                    shadow.setPosition(this.topPos[i]);
                    shadow.id = i;
                    shadow.flag = this.animalDataArr[this.index][i].flag;
                    shadow.setOpacity(0);
                    this.addChild(shadow,0);
                    this.shadowSpritArr.push(shadow);
                }

                for(var i = 0; i<5; i++){
                    var number = new Number(this.numberDataArr[this.index][i].path);
                    number.setScale(0.333*fix);
                    number.setAnchorPoint(0.5,0);
                    number.setPosition(this.downPos[i]);
                    number.id = i;
                    number.flag = this.numberDataArr[this.index][i].flag;
                    number.setOpacity(0);
                    this.addChild(number,0);
                    this.numberSpritArr.push(number);
                }

                var fadeInaction = cc.fadeIn(0.8);

                for(var i = 0; i<5; i++){
                    this.animalSpritArr[i].runAction(fadeInaction.clone());
                    this.shadowSpritArr[i].runAction(fadeInaction.clone());
                    this.numberSpritArr[i].runAction(fadeInaction.clone());
                }

                this.scheduleOnce(this.becomeFalse,1);
                // this.index++;
            }
    },
    //刷新
    refresh:function(){
        this.move = true;

            if(this.animalSpritArr && this.animalSpritArr.length>0){
                for(var i = 0;i<this.animalSpritArr.length;i++){
                    this.animalSpritArr[i].removeFromParent();
                }
                for(var i = 0;i<this.numberSpritArr.length;i++){
                    this.numberSpritArr[i].removeFromParent();
                }
                for(var i = 0;i<this.shadowSpritArr.length;i++){
                    this.shadowSpritArr[i].removeFromParent();
                }
            }

            this.animalSpritArr = [];
            this.numberSpritArr = [];
            this.shadowSpritArr = [];

            for(var i = 0; i<5; i++){
                var animal = new Animal(this.animalDataArr[this.index][i].path);
                animal.setScale(0.333*fix);
                animal.setAnchorPoint(0.5,0);
                animal.setPosition(this.topPos[i]);
                animal.id = i;
                animal.flag = this.animalDataArr[this.index][i].flag;
                animal.sortNum = this.animalDataArr[this.index][i].sortNum;
                this.addChild(animal,1);
                this.animalSpritArr.push(animal);
            }

            for(var i = 0; i<5; i++){
                var shadow = new cc.Sprite(this.animalDataArr[this.index][i].shadowPath);
                shadow.setScale(0.333*fix);
                shadow.setAnchorPoint(0.5,0);
                shadow.setPosition(this.topPos[i]);
                shadow.id = i;
                shadow.flag = this.animalDataArr[this.index][i].flag;
                this.addChild(shadow,0);
                this.shadowSpritArr.push(shadow);
            }

            for(var i = 0; i<5; i++){
                var number = new Number(this.numberDataArr[this.index][i].path);
                number.setScale(0.333*fix);
                number.setAnchorPoint(0.5,0);
                number.setPosition(this.downPos[i]);
                number.id = i;
                number.flag = this.numberDataArr[this.index][i].flag;
                this.addChild(number,0);
                this.numberSpritArr.push(number);
            }

            this.scheduleOnce(this.becomeFalse,0.2);
            // this.index++;
    },
    next:function () {
        this.index++;
        this.init()
    },
    becomeFalse:function() {
      this.move = false;
    },
    //检测点击是否在精灵指定区域
    clicked:function (target,pos) {
         //被点击的精灵
        var targetObj = target.getBoundingBox();
         //被点击的精灵分类
        switch (target.flag){
            case "bear":if(cc.rectContainsPoint(cc.rect(targetObj.x+12*fix,targetObj.y+15*fix,targetObj.width-22*fix,targetObj.height-35*fix),pos)){
                return true;
            }
                break;
            case "girl":if(cc.rectContainsPoint(cc.rect(targetObj.x+20*fix,targetObj.y+15*fix,targetObj.width-40*fix,targetObj.height-35*fix),pos)){
                return true;
            }
                break;
            case "lion":if(cc.rectContainsPoint(cc.rect(targetObj.x+15*fix,targetObj.y+15*fix,targetObj.width-30*fix,targetObj.height-55*fix),pos)){
                return true;
            }
                break;
            case "mouse":if(cc.rectContainsPoint(cc.rect(targetObj.x+30*fix,targetObj.y+10*fix,targetObj.width-60*fix,targetObj.height-130*fix),pos)){
                return true;
            }
                break;
            case "rabbit":if(cc.rectContainsPoint(cc.rect(targetObj.x+35*fix,targetObj.y+12*fix,targetObj.width-65*fix,targetObj.height-67*fix),pos)){
                return true;
            }
                break;
            case "fox":if(cc.rectContainsPoint(cc.rect(targetObj.x+18*fix,targetObj.y+12*fix,targetObj.width-33*fix,targetObj.height-92*fix),pos)){
                return true;
            }
                break;
            default:
                break;
        }

        return false;
    },
    //数字的碰撞检测
    intersectNumber:function (target) {
        //点击的精灵
        var targetObj = target.getBoundingBox();

        var rectB = cc.rect(targetObj.x,targetObj.y,targetObj.width,targetObj.height);

        var crashedSpritData = [];

        for(var i = 0; i < this.numberSpritArr.length; i++){
            if(target.id != i){
                crashedSpritData.push({
                    sprit:this.numberSpritArr[i],
                    indeK:i
                })
            }
        }

        var returnObj = {
            isCrashedOk:-1,
            crashedId:-1
        };

        for(var i = 0; i< crashedSpritData.length; i++){
            if(this.crashedNumber(crashedSpritData[i].sprit,rectB)) {
                if(crashedSpritData[i].sprit.id == target.flag || crashedSpritData[i].sprit.flag == target.id){
                    returnObj.isCrashedOk = 2;
                    returnObj.crashedId = crashedSpritData[i].indeK;
                }else{
                    returnObj.isCrashedOk = 3;
                }
            }
        }
        return returnObj;
    },
    crashedNumber:function (sprit,rectB) {
        var spritObj = sprit.getBoundingBox();
        var rectA = cc.rect(spritObj.x,spritObj.y,spritObj.width,spritObj.height);
        return cc.rectIntersectsRect(rectA, rectB);

    },
    //检测拖拽精灵指定部分与指定精灵指定部分是否碰撞,动物的碰撞检测
    intersect:function (target) {

        //点击的精灵
        var targetObj = target.getBoundingBox();

        switch (target.flag){
            case "bear":var rectB = cc.rect(targetObj.x+12*fix,targetObj.y+15*fix,targetObj.width-22*fix,targetObj.height-35*fix);
                break;
            case "girl":var rectB = cc.rect(targetObj.x+20*fix,targetObj.y+15*fix,targetObj.width-40*fix,targetObj.height-35*fix);
                break;
            case "lion":var rectB = cc.rect(targetObj.x+15*fix,targetObj.y+15*fix,targetObj.width-30*fix,targetObj.height-55*fix);
                break;
            case "mouse":var rectB = cc.rect(targetObj.x+30*fix,targetObj.y+10*fix,targetObj.width-60*fix,targetObj.height-130*fix);
                break;
            case "rabbit":var rectB = cc.rect(targetObj.x+35*fix,targetObj.y+12*fix,targetObj.width-65*fix,targetObj.height-67*fix);
                break;
            case "fox":var rectB = cc.rect(targetObj.x+18*fix,targetObj.y+12*fix,targetObj.width-33*fix,targetObj.height-92*fix);
                break;
            default:
                break;
        }

        var crashedSpritData = [];

        for(var i = 0; i < this.animalSpritArr.length; i++){
            if(target.id != i){
                crashedSpritData.push({
                    sprit:this.animalSpritArr[i],
                    indeK:i
                })
            }
        }

        var returnObj = {
            isCrashedOk:-1,
            crashedId:-1
        };

        for(var i = 0; i< crashedSpritData.length; i++){

            //cc.log(crashedSpritData[i])
            if(this.crashed(crashedSpritData[i].sprit,rectB)) {
                if(crashedSpritData[i].sprit.id == target.sortNum || crashedSpritData[i].sprit.sortNum == target.id){
                    returnObj.isCrashedOk = 2;
                    returnObj.crashedId = crashedSpritData[i].indeK;
                }else{
                    returnObj.isCrashedOk = 3;
                }
            }
        }

        return returnObj;
    },
    crashed:function (sprit,rectB) {
        var spritObj = sprit.getBoundingBox();

        switch (sprit.flag){
            case "bear":var rectA = cc.rect(spritObj.x+12*fix,spritObj.y+15*fix,spritObj.width-22*fix,spritObj.height-35*fix);
                break;
            case "girl":var rectA = cc.rect(spritObj.x+20*fix,spritObj.y+15*fix,spritObj.width-40*fix,spritObj.height-35*fix);
                break;
            case "lion":var rectA = cc.rect(spritObj.x+15*fix,spritObj.y+15*fix,spritObj.width-30*fix,spritObj.height-55*fix);
                break;
            case "mouse":var rectA = cc.rect(spritObj.x+30*fix,spritObj.y+10*fix,spritObj.width-60*fix,spritObj.height-130*fix);
                break;
            case "rabbit":var rectA = cc.rect(spritObj.x+35*fix,spritObj.y+12*fix,spritObj.width-65*fix,spritObj.height-67*fix);
                break;
            case "fox":var rectA = cc.rect(spritObj.x+18*fix,spritObj.y+12*fix,spritObj.width-33*fix,spritObj.height-92*fix);
                break;
            default:
                break;
        }

        return cc.rectIntersectsRect(rectA, rectB);
    },
    test:function(){
        //bear
        // var leafObj = this.animalSpritArr[0].getBoundingBox();
        // cc.log(leafObj)
        // var drawNode = new cc.DrawNode();
        //
        // drawNode.clear();                     //清除节点缓存
        //
        // drawNode.ctor();                       //构造函数
        //
        // drawNode.drawRect(cc.p(leafObj.x+12,leafObj.y+15), cc.p(leafObj.x+leafObj.width-10,leafObj.y+leafObj.height-20), cc.color(180,180,180));
        // drawNode.setZOrder(100);
        //
        //this.addChild(drawNode);              //加入Layer层
        //girl
        // var leafObj = this.animalSpritArr[1].getBoundingBox();
        // cc.log(leafObj)
        // var drawNode = new cc.DrawNode();
        //
        // drawNode.clear();                     //清除节点缓存
        //
        // drawNode.ctor();                       //构造函数
        //
        // drawNode.drawRect(cc.p(leafObj.x+20,leafObj.y+15), cc.p(leafObj.x+leafObj.width-20,leafObj.y+leafObj.height-10), cc.color(180,180,180));
        // drawNode.setZOrder(100);
        //
        // this.addChild(drawNode);              //加入Layer层
        //lion
        // var leafObj = this.animalSpritArr[2].getBoundingBox();
        // cc.log(leafObj)
        // var drawNode = new cc.DrawNode();
        //
        // drawNode.clear();                     //清除节点缓存
        //
        // drawNode.ctor();                       //构造函数
        //
        // drawNode.drawRect(cc.p(leafObj.x+15,leafObj.y+15), cc.p(leafObj.x+leafObj.width-15,leafObj.y+leafObj.height-40), cc.color(180,180,180));
        // drawNode.setZOrder(100);
        //
        // this.addChild(drawNode);              //加入Layer层
        //mouse
        // var leafObj = this.animalSpritArr[3].getBoundingBox();
        // cc.log(leafObj)
        // var drawNode = new cc.DrawNode();
        //
        // drawNode.clear();                     //清除节点缓存
        //
        // drawNode.ctor();                       //构造函数
        //
        // drawNode.drawRect(cc.p(leafObj.x+30,leafObj.y+10), cc.p(leafObj.x+leafObj.width-30,leafObj.y+leafObj.height-120), cc.color(180,180,180));
        // drawNode.setZOrder(100);
        //
        // this.addChild(drawNode);              //加入Layer层
        //rabbit
        // var leafObj = this.animalSpritArr[4].getBoundingBox();
        // cc.log(leafObj)
        // var drawNode = new cc.DrawNode();
        //
        // drawNode.clear();                     //清除节点缓存
        //
        // drawNode.ctor();                       //构造函数
        //
        // drawNode.drawRect(cc.p(leafObj.x+35,leafObj.y+12), cc.p(leafObj.x+leafObj.width-30,leafObj.y+leafObj.height-55), cc.color(180,180,180));
        // drawNode.setZOrder(100);
        //
        // this.addChild(drawNode);              //加入Layer层
        //fox
        // var leafObj = this.animalSpritArr[4].getBoundingBox();
        // cc.log(leafObj)
        // var drawNode = new cc.DrawNode();
        //
        // drawNode.clear();                     //清除节点缓存
        //
        // drawNode.ctor();                       //构造函数
        //
        // drawNode.drawRect(cc.p(leafObj.x+18,leafObj.y+12), cc.p(leafObj.x+leafObj.width-15,leafObj.y+leafObj.height-80), cc.color(180,180,180));
        // drawNode.setZOrder(100);
        //
        // this.addChild(drawNode);              //加入Layer层
    },
     //deep拷贝
    deepCopy:function(o) {
        if (o instanceof Array) {
            var n = [];
            for (var i = 0; i < o.length; ++i) {
                n[i] = this.deepCopy(o[i]);
            }
            return n;

        } else if (o instanceof Object) {
            var n = {}
            for (var i in o) {
                n[i] = this.deepCopy(o[i]);
            }
            return n;
        } else {
            return o;
        }
    },
    //随机排序
    shuffle:function (arr){
        var arr1 = this.deepCopy(arr);
        var len = arr1.length;
        for(var i = 0; i < len - 1; i++){
            var idx = Math.floor(Math.random() * (len - i));
            var temp = arr1[idx];
            arr1[idx] = arr1[len - i - 1];
            arr1[len - i -1] = temp;
        }
        return arr1;
    },
    //保证下面的数字不是每个一开始就是对的，并且也不是倒序
    shuffle2:function (arr) {
        var arr1 = this.deepCopy(arr);
        var len = arr1.length;
        for(var i = 0; i < len - 1; i++){
            var idx = Math.floor(Math.random() * (len - i));
            var temp = arr1[idx];
            arr1[idx] = arr1[len - i - 1];
            arr1[len - i -1] = temp;
        }
        var _num = 0;
        var a1 = [];
        var a2 = [];
        for(let i = 0; i < len; i++){
            a1.push(arr[i].flag)
            a2.push(arr1[i].flag)
            if(arr1[i].flag == arr[i].flag){
                _num = 1
            }
        }
        if(_num != 0 || JSON.stringify(a1) == JSON.stringify(a2.reverse())){//后边判断如果倒序排列会造成误解，所以重新排列
            return this.shuffle2(arr);
        }else{
            return arr1;
        }
    },
    //保证上面面的动物不是每个一开始就是对的，并且也不是倒序
    shuffle3:function (arr) {
        var arr1 = this.deepCopy(arr);
        var len = arr1.length;
        for(var i = 0; i < len - 1; i++){
            var idx = Math.floor(Math.random() * (len - i));
            var temp = arr1[idx];
            arr1[idx] = arr1[len - i - 1];
            arr1[len - i -1] = temp;
        }
        var _num = 0;
        var a1 = [];
        var a2 = [];
        for(let i = 0; i < len; i++){
            a1.push(arr[i].sortNum);
            a2.push(arr1[i].sortNum);
            if(arr1[i].sortNum == arr[i].sortNum){
                _num = 1
            }
        }
        if(_num != 0 || JSON.stringify(a1) == JSON.stringify(a2.reverse())){//后边判断如果倒序排列会造成误解，所以重新排列
            return this.shuffle3(arr);
        }else{
            return arr1;
        }
    },
    //数组交换元素
    alterItem: function(arr, index1, index2) {
        arr[index1] = arr.splice(index2, 1, arr[index1])[0];
        return arr;
    },
    otherLayer:function () {
        this.starLayer = cc.director.getRunningScene().getChildByTag(2);
    },
    audioPlay:function(){
        cc.audioEngine.playMusic(res.bgMusic,true);
    },
    startTipVoice:function () {
        cc.audioEngine.playEffect(res.startTip);
    },
    lionYellVoice:function () {
        cc.audioEngine.playEffect(res.lionYell);
    },
    bearYellVoice:function () {
        cc.audioEngine.playEffect(res.bearYell);
    },
    mouseYellVoice:function () {
        cc.audioEngine.playEffect(res.mouseYell);
    },
    rabbitLoughVoice:function () {
        cc.audioEngine.playEffect(res.rabbitLaugh);
    },
    foxLaughVoice:function () {
        cc.audioEngine.playEffect(res.foxLaugh);
    },
    girlSurprisedVoice:function () {
        cc.audioEngine.playEffect(res.girlSurprised);
    },
    //公共的音乐
    celebratVoice:function(){
        cc.audioEngine.playEffect(res.celebratVoice);
    },
    clickVoice:function(){
        cc.audioEngine.playEffect(res.clickVoice);
    },
    rightVoice:function(){
        cc.audioEngine.playEffect(res.rightVoice);
    },
    wrongVoice:function(){
        cc.audioEngine.playEffect(res.wrongVoice);
    },
    starVoice:function(){
        cc.audioEngine.playEffect(res.starVoice);
    }

});

var PlayScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

        /*飞星层*/
        var starLayer = new StarLayer();
        this.addChild(starLayer,2,2);

        var layer = new PlayLayer();
        this.addChild(layer);
    }
});