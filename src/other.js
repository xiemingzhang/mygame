var Hand = cc.Sprite.extend({

    onEnter: function () {
        this._super();
        this.handClick();

    },

    onExit: function () {
        this._super();
    },

    handClick:function () {

        var fadeIn = cc.fadeIn(0.8);

        this.runAction(fadeIn);

        var cb1 = cc.callFunc(function(){
            this.initWithFile(res.handClick);
        }.bind(this));

        var cb2 = cc.callFunc(function(){
            this.initWithFile(res.hand);
        }.bind(this));

        var action = cc.sequence(cc.delayTime(0.5),cb1,cc.delayTime(0.5),cb2);
        action.repeatForever();

        this.runAction(action);

        var action1 = cc.fadeOut(0.5);
        var action2 = cc.fadeIn(0.5);
        var a = cc.sequence(action1,action2);
        this.runAction(a.repeatForever());
    }
});

var Sound = cc.Sprite.extend({
    clicked:true,
    onEnter: function () {
        this._super();
        this.addTouchEventListenser();
        this.scheduleOnce(function () {
            this.clicked = false;
        }.bind(this),10);
    },

    onExit: function () {
        this._super();
    },

    addTouchEventListenser:function(){
        //touch event
        this.touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var pos = touch.getLocation();
                var target = event.getCurrentTarget();
                var parent = target.getParent();

                if ( cc.rectContainsPoint(target.getBoundingBox(),pos)) {

                    //响应精灵点中
                    //cc.log(target.clicked);
                    if(!target.clicked){
                        target.clicked = true;
                        parent.startTipVoice();
                        parent.scheduleOnce(function () {
                            target.clicked = false;
                        }.bind(target),10)
                    }
                    // cc.log("sound");
                    return true;
                }

            }
        });

        cc.eventManager.addListener(this.touchListener,this);
    }
});