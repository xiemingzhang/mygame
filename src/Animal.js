var Animal = cc.Sprite.extend({

    onEnter:function () {
        this._super();
        this.addTouchEventListenser();
    },

    onExit:function () {
        this._super();
    },

    addTouchEventListenser:function(){
        //touch event
        this.touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            // When "swallow touches" is true, then returning 'true' from the onTouchBegan method will "swallow" the touch event, preventing other listeners from using it.
            //onTouchBegan event callback function
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var pos = touch.getLocation();
                var target = event.getCurrentTarget();
                var parent = target.getParent();

                var targetObj = target.getBoundingBox();
                this.x = targetObj.x + targetObj.width/2;
                this.y = targetObj.y;

                if ( parent.clicked(target,pos)) {
                    //响应精灵点中
                    cc.log("pos.x="+pos.x+",pos.y="+pos.y);

                    target.setZOrder(10);
                    //点击声音
                    switch(target.flag){
                        case "lion":
                            parent.lionYellVoice();
                            break;
                        case "bear":
                            parent.bearYellVoice();
                            break;
                        case "mouse":
                            parent.mouseYellVoice();
                            break;
                        case "rabbit":
                            parent.rabbitLoughVoice();
                            break;
                        case "fox":
                            break;
                        case "girl":
                            break;
                        default:
                            break;
                    }

                    for(var i = 0; i < parent.animalSpritArr.length; i++){
                        if(parent.animalSpritArr[i].sortNum == parent.animalSpritArr[i].id){
                            parent.animalSpritArr[i].clicked = true;
                        }
                    }
                    if(target.clicked){
                        return false
                    }
                    // if(this.clicked){
                    //     return false;
                    // }
                    if(parent.move){
                        return false;
                    }
                    return true;
                }

            },
            onTouchMoved: function (touch, event) {
                var target = event.getCurrentTarget();
                var delta = touch.getDelta();              //获取事件数据: delta
                var parent = target.getParent();

                target.x += delta.x;
                target.y += delta.y;

                parent.shadowSpritArr[target.id].setOpacity(0);

                var _shadowObj = parent.shadowSpritArr[target.id].getBoundingBox();
                var _numberObj = parent.numberSpritArr[target.id].getBoundingBox();

                parent.shadowSpritArr[target.id].setPosition(_shadowObj.x+_shadowObj.width/2 + delta.x,_shadowObj.y + delta.y);
                parent.numberSpritArr[target.id].setPosition(_numberObj.x+_numberObj.width/2 + delta.x,_numberObj.y + delta.y);

            },
            onTouchEnded: function (touch, event) {

                var target = event.getCurrentTarget();
                var parent = target.getParent();

                var _obj = parent.intersect(target);

                 // cc.log(_obj);
                 // cc.log(target.id);

                if(_obj.isCrashedOk == 2){//碰撞正确
                    parent.move = true;
                    //正确声音
                    parent.rightVoice();

                    var scaleByAction = cc.scaleBy(0.3,1.1);
                    var targetAction2_1 = cc.sequence(scaleByAction,scaleByAction.reverse());
                    var targetAction2_2 = cc.moveTo(0.6,parent.topPos[_obj.crashedId].x,parent.topPos[_obj.crashedId].y);
                    var targetAction2 = cc.spawn(targetAction2_1,targetAction2_2);
                    var targetAction3 = cc.callFunc(function () {
                        parent.shadowSpritArr[target.id].setPosition(parent.topPos[_obj.crashedId].x,parent.topPos[_obj.crashedId].y);
                        parent.shadowSpritArr[target.id].setOpacity(255);
                    });
                    target.runAction(cc.sequence(targetAction2,targetAction3));

                    var scaleByAction = cc.scaleBy(0.3,1.1);
                    var numberAction2_1 = cc.sequence(scaleByAction,scaleByAction.reverse());
                    var numberAction2_2 = cc.moveTo(0.6,parent.downPos[_obj.crashedId].x,parent.downPos[_obj.crashedId].y);
                    var numberAction2 = cc.spawn(numberAction2_1,numberAction2_2);
                    parent.numberSpritArr[target.id].runAction(numberAction2);


                    var crashedSpritAction1 = cc.callFunc(function () {
                        parent.shadowSpritArr[_obj.crashedId].setOpacity(0);
                        // parent.numberSpritArr[_obj.crashedId].setOpacity(0)
                    });
                    // var scaleByAction = cc.scaleBy(0.3,1.1);
                    // var crashedSpritAction2_1 = cc.sequence(scaleByAction,scaleByAction.reverse());
                    var crashedSpritAction2_2 = cc.moveTo(0.6,parent.topPos[target.id].x,parent.topPos[target.id].y);
                    var crashedSpritAction2 = cc.spawn(crashedSpritAction2_2);
                    var crashedSpritAction3 = cc.callFunc(function () {
                        parent.shadowSpritArr[_obj.crashedId].setPosition(parent.topPos[target.id].x,parent.topPos[target.id].y);
                        parent.shadowSpritArr[_obj.crashedId].setOpacity(255);
                        // parent.numberSpritArr[_obj.crashedId].setOpacity(0)
                    });
                    parent.animalSpritArr[_obj.crashedId].runAction(cc.sequence(crashedSpritAction1,crashedSpritAction2,crashedSpritAction3));

                    // var scaleByAction = cc.scaleBy(0.3,1.1);
                    // var crashedNumberAction2_1 = cc.sequence(scaleByAction,scaleByAction.reverse());
                    var crashedNumberAction2_2 = cc.moveTo(0.6,parent.downPos[target.id].x,parent.downPos[target.id].y);
                    var crashedNumberAction2 = cc.spawn(crashedNumberAction2_2);
                    parent.numberSpritArr[_obj.crashedId].runAction(cc.sequence(crashedNumberAction2));

                    parent.animalDataArr[parent.index] = parent.alterItem(parent.animalDataArr[parent.index],target.id,_obj.crashedId);
                    parent.numberDataArr[parent.index] = parent.alterItem(parent.numberDataArr[parent.index],target.id,_obj.crashedId);

                    parent.scheduleOnce(parent.refresh,1);
                }else if(_obj.isCrashedOk == 3){//碰撞错误
                    parent.move = true;
                    //错误声音
                    parent.wrongVoice();
                    target.runAction(cc.sequence(cc.moveTo(0.5,this.x,this.y),cc.callFunc(function () {
                        parent.shadowSpritArr[target.id].setPosition(parent.topPos[target.id].x,parent.topPos[target.id].y);
                        parent.shadowSpritArr[target.id].setOpacity(255);
                    })));
                    parent.numberSpritArr[target.id].runAction(cc.sequence(cc.moveTo(0.5,parent.downPos[target.id].x,parent.downPos[target.id].y)));
                    parent.scheduleOnce(parent.becomeFalse,0.5);
                    //cc.log("wrong")
                }else if(_obj.isCrashedOk == -1){//没有碰撞
                    parent.move = true;
                    target.runAction(cc.sequence(cc.moveTo(0.5,this.x,this.y),cc.callFunc(function () {
                        parent.shadowSpritArr[target.id].setPosition(parent.topPos[target.id].x,parent.topPos[target.id].y);
                        parent.shadowSpritArr[target.id].setOpacity(255);
                    })));
                    parent.numberSpritArr[target.id].runAction(cc.sequence(cc.moveTo(0.5,parent.downPos[target.id].x,parent.downPos[target.id].y)));
                    parent.scheduleOnce(parent.becomeFalse,0.5);
                }

                var finesedNum = 0;

                for(var i = 0; i < parent.animalDataArr[parent.index].length; i++){
                    if(parent.animalDataArr[parent.index][i].sortNum  == i){
                        finesedNum ++;
                    }
                }
                if(finesedNum == parent.animalDataArr[parent.index].length){
                    //飞星声音
                    parent.starVoice()
                    //获得飞星
                    parent.starLayer.rightStar(parent.index);

                    if(parent.index > 1){
                        //结束声音
                        parent.celebratVoice();
                         //结束
                        parent.scheduleOnce(parent.starLayer.gameEnd.bind(parent,3),1.5);
                    }else{
                        //下一关
                        parent.scheduleOnce(parent.next,1.5);
                    }
                }
            }

        });
        cc.eventManager.addListener(this.touchListener,this);
    }
});