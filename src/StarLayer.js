
/*飞星层*/
var StarLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        var size = cc.director.getWinSize();

        this.comCon();
        this.onTouchBegan();
        //this.gameEnd(5);
    },
    gameEnd:function(num){
        var size = cc.director.getWinSize();
        cc.log(size);
        var MsgBoxLayer = cc.LayerColor.extend({
            sprite:null,
            ctor : function(color, width, height){
                this._super(color, width, height);
                this._touchListener = cc.EventListener.create({
                    event: cc.EventListener.TOUCH_ONE_BY_ONE,
                    swallowTouches: true,
                    onTouchBegan:function () {
                        return true;
                    }
                });
                cc.eventManager.addListener(this._touchListener, this);
                return true;
            },
            onExit : function(){
                if(this._touchListener) {
                    cc.eventManager.removeListener(this._touchListener, 1);
                    this._touchListener = null;
                }
            }
        });
        this.shade = new MsgBoxLayer(cc.color(0, 0 ,0), size.width, size.height);
        this.shade.setPosition(cc.p(0,0));
        this.shade.setLocalZOrder(30);
        this.shade.setOpacity(160);
        this.addChild(this.shade,100);

        this.msgBg = new cc.Sprite(res.msgBg);
        this.msgBg.setAnchorPoint(0.5,0.5);
        this.msgBg.setScale(0.333);
        this.msgBg.setPosition(size.width/2,size.height/2);
        this.addChild(this.msgBg,101);

        this.msg = new cc.LabelTTF("太棒了!","",24);
        this.msg.setColor(cc.color(183, 124, 0, 255));
        this.msg.setAnchorPoint(0.5,0);
        this.msg.setPosition(size.width/2,size.height/414*267);
        this.addChild(this.msg,101);

        if(num%2){//不是2的整数倍
            var index = 0.5;//锚点设置在width中间
            this.scoreStar = new cc.Sprite(res.LightStar);
            this.scoreStar.setAnchorPoint(0.5,0);
            this.scoreStar.setScale(0.333);
            this.scoreStar.setOpacity(0);
            this.scoreStar.setPosition(size.width/2,size.height/414*216);
            this.addChild(this.scoreStar,101);
            var score = this.scoreStar.getBoundingBox();

        }else{//是2的整数倍
            var index = 1;//锚点设置在width最右
            this.scoreStar = new cc.Sprite(res.LightStar);
            this.scoreStar.setAnchorPoint(1,0);
            this.scoreStar.setScale(0.333);
            this.scoreStar.setOpacity(0);
            this.scoreStar.setPosition(size.width/2,size.height/414*216);
            this.addChild(this.scoreStar,101);
            var score = this.scoreStar.getBoundingBox();
        }
        if(num==1){
            var pos = [{
                x:size.width/2,
                y:size.height/414*216
            }]
        }else if(num==2){
            var pos =[{
                x:size.width/2,
                y:size.height/414*216
            },{
                x:size.width/2 +score.width+8,
                y:size.height/414*216
            }]
        }else if(num==3){
            var pos =[
                {
                    x:size.width/2 -score.width-8,
                    y:size.height/414*216
                },{
                    x:size.width/2,
                    y:size.height/414*216
                },{
                    x:size.width/2 +score.width+8,
                    y:size.height/414*216
                }]
        }else if(num==4){
            var pos=[
                {
                    x:size.width/2 -score.width-8,
                    y:size.height/414*216
                },{
                    x:size.width/2,
                    y:size.height/414*216
                },{
                    x:size.width/2 +score.width+8,
                    y:size.height/414*216
                },{
                    x:size.width/2 +score.width*2+8*2,
                    y:size.height/414*216
                }]
        }else if(num==5){
            var pos=[
                {
                    x:size.width/2 -score.width*2-8*2,
                    y:size.height/414*216
                },{
                    x:size.width/2 -score.width-8,
                    y:size.height/414*216
                },{
                    x:size.width/2,
                    y:size.height/414*216
                },{
                    x:size.width/2 +score.width+8,
                    y:size.height/414*216
                },{
                    x:size.width/2 +score.width*2+8*2,
                    y:size.height/414*216
                }]
        }else if(num == 6){
            var pos=[
                {
                    x:size.width/2 -score.width*2-4*2,
                    y:size.height/414*216
                },{
                    x:size.width/2 -score.width-4,
                    y:size.height/414*216
                },{
                    x:size.width/2,
                    y:size.height/414*216
                },{
                    x:size.width/2 +score.width+4,
                    y:size.height/414*216
                },{
                    x:size.width/2 +score.width*2+4*2,
                    y:size.height/414*216
                },{
                    x:size.width/2 +score.width*3+4*3,
                    y:size.height/414*216
                }]
        }else if(num == 7){
            var pos=[
                {
                    x:size.width/2 -score.width*3-4*3,
                    y:size.height/414*216
                },
                {
                    x:size.width/2 -score.width*2-4*2,
                    y:size.height/414*216
                },{
                    x:size.width/2 -score.width-4,
                    y:size.height/414*216
                },{
                    x:size.width/2,
                    y:size.height/414*216
                },{
                    x:size.width/2 +score.width+4,
                    y:size.height/414*216
                },{
                    x:size.width/2 +score.width*2+4*2,
                    y:size.height/414*216
                },{
                    x:size.width/2 +score.width*3+4*3,
                    y:size.height/414*216
                }]
        }else if(num == 8){
            var pos=[
                {
                    x:size.width/2 -score.width*3-4*3,
                    y:size.height/414*216
                },
                {
                    x:size.width/2 -score.width*2-4*2,
                    y:size.height/414*216
                },{
                    x:size.width/2 -score.width-4,
                    y:size.height/414*216
                },{
                    x:size.width/2,
                    y:size.height/414*216
                },{
                    x:size.width/2 +score.width+4,
                    y:size.height/414*216
                },{
                    x:size.width/2 +score.width*2+4*2,
                    y:size.height/414*216
                },{
                    x:size.width/2 +score.width*3+4*3,
                    y:size.height/414*216
                },{
                    x:size.width/2 +score.width*4+4*4,
                    y:size.height/414*216
                }]
        }else if(num == 9){
            var pos=[
                {
                    x:size.width/2 -score.width*4-4*4,
                    y:size.height/414*216
                },
                {
                    x:size.width/2 -score.width*3-4*3,
                    y:size.height/414*216
                },
                {
                    x:size.width/2 -score.width*2-4*2,
                    y:size.height/414*216
                },{
                    x:size.width/2 -score.width-4,
                    y:size.height/414*216
                },{
                    x:size.width/2,
                    y:size.height/414*216
                },{
                    x:size.width/2 +score.width+4,
                    y:size.height/414*216
                },{
                    x:size.width/2 +score.width*2+4*2,
                    y:size.height/414*216
                },{
                    x:size.width/2 +score.width*3+4*3,
                    y:size.height/414*216
                },{
                    x:size.width/2 +score.width*4+4*4,
                    y:size.height/414*216
                }]
        }else if(num == 10){
            var pos=[
                {
                    x:size.width/2 -score.width*4-4*4,
                    y:size.height/414*216
                },
                {
                    x:size.width/2 -score.width*3-4*3,
                    y:size.height/414*216
                },
                {
                    x:size.width/2 -score.width*2-4*2,
                    y:size.height/414*216
                },{
                    x:size.width/2 -score.width-4,
                    y:size.height/414*216
                },{
                    x:size.width/2,
                    y:size.height/414*216
                },{
                    x:size.width/2 +score.width+4,
                    y:size.height/414*216
                },{
                    x:size.width/2 +score.width*2+4*2,
                    y:size.height/414*216
                },{
                    x:size.width/2 +score.width*3+4*3,
                    y:size.height/414*216
                },{
                    x:size.width/2 +score.width*4+4*4,
                    y:size.height/414*216
                },{
                    x:size.width/2 +score.width*5+4*5,
                    y:size.height/414*216
                }]
        }


        this.starArr=[];

        for(var i =0;i<num;i++){
            var x = new cc.Sprite(res.LightStar);
            x.setAnchorPoint(index,0);
            x.setScale(0.01);
            //x.setPosition(pos[i].x,pos[i].y);
            x.setPosition(size.width*2,pos[i].y);
            this.addChild(x,101);
            this.starArr.push(x);
        }

        for(var n=0;n<this.starArr.length;n++){
            var action1 = cc.moveTo(0.1,cc.p(pos[n].x,pos[n].y));
            var action2 = cc.callFunc(function(){this.clickVoice()}.bind(this));
            var action3_1 = cc.fadeIn(0.2);
            var action3_2 = cc.scaleTo(0.2,0.444);
            var action3 = cc.spawn(action3_1,action3_2);
            var action4 = cc.scaleTo(0.1,0.333);

            this.starArr[n].runAction(cc.sequence(cc.delayTime(0.2*n),action1,action2,action3,action4))
        };

        this.clickVoice=function(){
            cc.audioEngine.playEffect(res.clickVoice);
        };


        this.re = new cc.Sprite(res.Repeat);
        this.re.id = "re";
        this.re.setAnchorPoint(1,0);
        this.re.setScale(0.25);
        this.re.setPosition(size.width/2 -12,size.height/414*114);
        this.addChild(this.re,101);

        this.ok = new cc.Sprite(res.OK);
        this.ok.id = "ok";
        this.ok.setAnchorPoint(0,0);
        this.ok.setScale(0.25);
        this.ok.setPosition(size.width/2 +12,size.height/414*114);
        this.addChild(this.ok,101);

        this.listener1 = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,      // 设置是否吞没事件，在 onTouchBegan 方法返回 true 时吞掉事件，不再向下传递。
            onTouchBegan: function (touch, event) {       //实现 onTouchBegan 事件处理回调函数
                var target = event.getCurrentTarget();    // 获取事件所绑定的 target, 通常是cc.Node及其子类
                // 获取当前触摸点相对于按钮所在的坐标
                var locationInNode = target.convertToNodeSpace(touch.getLocation());  //转换为本地坐标系的坐标
                var s = target.getContentSize();   //获取 touch 元素的数据(宽高)
                var rect = cc.rect(0, 0, s.width, s.height); //元素范围
                if(cc.rectContainsPoint(rect, locationInNode)) {     // 判断触摸点是否在按钮范围内
                    /*正确*/
                    //console.log(target.id);
                    if(target.id=="ok"){
                        var action1 = cc.callFunc(function(){
                            target.initWithFile(res.OK_pressed);
                        });
                        var action2 = cc.callFunc(function(){
                            App.jsBack("close");
                            cc.director.end();
                        });
                        target.runAction(cc.sequence(action1,cc.delayTime(0.5),action2))
                    }else if(target.id=="re"){
                        var action1 = cc.callFunc(function(){
                            target.initWithFile(res.Re_pressed);
                        });
                        var action2 = cc.callFunc(function(){
                            cc.director.runScene( new PlayScene());
                        });
                        target.runAction(cc.sequence(action1,cc.delayTime(0.5),action2))
                    }
                    return true;
                }
                return false;
            }.bind(this)
        });
        cc.eventManager.addListener(this.listener1.clone(), this.ok);
        cc.eventManager.addListener(this.listener1.clone(), this.re);

    },
    comCon : function(){
        var size = cc.director.getWinSize();
        var h1 = (size.height - 52*fix);
        var h2 = (size.height - 47*fix);

        this.backSprite = cc.Sprite.create(res.back);
        this.backSprite.id="back";
        this.backSprite.setAnchorPoint(0, 0);
        this.backSprite.setPosition(16,h1);
        this.backSprite.setScale(0.25*fix);
        this.addChild(this.backSprite, 5);

        //创建一个事件监听器 OneByOne 为单点触摸
        this.listener1 = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,      // 设置是否吞没事件，在 onTouchBegan 方法返回 true 时吞掉事件，不再向下传递。
            onTouchBegan: function (touch, event) {       //实现 onTouchBegan 事件处理回调函数
                var target = event.getCurrentTarget();  // 获取事件所绑定的 target, 通常是cc.Node及其子类

                // 获取当前触摸点相对于按钮所在的坐标
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);

                if (cc.rectContainsPoint(rect, locationInNode))     // 判断触摸点是否在按钮范围内
                {
                    if(target.id=="back"){

                        App.jsBack("close");
                        cc.director.end();
                        return false;
                    }
                    return true;
                }
            }.bind(this),
        });
        // 添加监听器到管理器
        cc.eventManager.addListener(this.listener1.clone(), this.backSprite);
        //
        // this.shapeOne = cc.Sprite.create(res.shape);
        // this.shapeOne.setAnchorPoint(0, 0);
        // this.shapeOne.setPosition(548*fix,h2);
        // this.shapeOne.setScale(0.333*fix);
        // this.addChild(this.shapeOne, 5);
        //
        // this.shapeTwo = cc.Sprite.create(res.shape);
        // this.shapeTwo.setAnchorPoint(0, 0);
        // this.shapeTwo.setPosition(584*fix,h2);
        // this.shapeTwo.setScale(0.333*fix);
        // this.addChild(this.shapeTwo, 5);


        this.shapeThree = cc.Sprite.create(res.shape);
        this.shapeThree.setAnchorPoint(0, 0);
        this.shapeThree.setPosition(620*fix,h2);
        this.shapeThree.setScale(0.333*fix);
        this.addChild(this.shapeThree, 5);

        this.shapeFour = cc.Sprite.create(res.shape);
        this.shapeFour.setAnchorPoint(0, 0);
        this.shapeFour.setPosition(656*fix,h2);
        this.shapeFour.setScale(0.333*fix);
        this.addChild(this.shapeFour, 5);

        this.shapeFive = cc.Sprite.create(res.shape);
        this.shapeFive.setAnchorPoint(0, 0);
        this.shapeFive.setPosition(692*fix,h2);
        this.shapeFive.setScale(0.333*fix);
        this.addChild(this.shapeFive, 5);

        this.starArr = [this.shapeThree,this.shapeFour,this.shapeFive]
    },
    rightStar : function(count){
        var size = cc.director.getWinSize();

        var randX = this.random(100*fix,400*fix);
        /*出现飞星*/
        this.star = cc.Sprite.create(res.flyStar);
        this.star.setAnchorPoint(0, 0);
        this.star.setPosition(randX,-150);
        this.star.setScale(0.2);
        this.addChild(this.star,10);

        /*动画 贝塞尔*/
        var array = [
            cc.p(randX, 0),
            //cc.p(randX+30*fix, 45),
            cc.p(randX+80*fix, 110),
            //cc.p(randX+90*fix, 135),
            //cc.p(randX+120*fix, 180),
            cc.p(randX+160*fix, 220),
            //cc.p(randX+180*fix, 270),
            cc.p(this.starArr[count].x, this.starArr[count].y)
        ];
        /*星星曲线*/
        var action1 = cc.cardinalSplineTo(0.8,array,0);
        var move_ease = action1.easing(cc.easeInOut(3));
        /*星星缩放*/
        var scale1 = cc.scaleTo(0.4,0.25)
        var scale2 = cc.scaleTo(0.4,0.04);
        /*依次执行*/
        var action2 = cc.sequence(scale1,scale2);
        /*同时执行*/
        var action3 = cc.spawn(move_ease,action2);
        /*回调函数*/
        var cb = cc.callFunc(function(){
            this.star.removeFromParent();

            this.starArr[count].setTexture(res.LightStar);
        }.bind(this));

        var action = cc.sequence(action3, cb);
        this.star.runAction(action);
    },
    wrongStar : function(){
        var size = cc.director.getWinSize();

        var randX = this.random(100*fix,400*fix);
        /*出现飞星*/
        this.wStar = cc.Sprite.create(res.flyStar);
        this.wStar.setAnchorPoint(0, 0);
        this.wStar.setPosition(randX,-150);
        this.wStar.setScale(0.2);
        this.addChild(this.wStar,10);

        var action1 = cc.moveBy(0.8,0,250);
        var action2 = action1.reverse();
        var action = cc.sequence(action1,action2);
        this.wStar.runAction(action)
    },
    random : function(max,min){
        return Math.floor(Math.random()*(max-min+1)+min);
    },
    onTouchBegan:function(touch, event){
        var listener1 = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,                       // 设置是否吞没事件，在 onTouchBegan 方法返回 true 时吞掉事件，不再向下传递。
            onTouchBegan: function (touch, event){
                var target = event.getCurrentTarget();  // 获取事件所绑定的 target, 通常是cc.Node及其子类

                // 获取当前触摸点相对于按钮所在的坐标
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);

                if (cc.rectContainsPoint(rect, locationInNode))     // 判断触摸点是否在按钮范围内
                {
                    if(target.id=="back"){

                        App.jsBack("close");
                        cc.director.end();
                        return false;
                    }
                    return true;
                }
                return false
            }
        })
        cc.eventManager.addListener(listener1.clone(),this.backSprite);
    }
});

