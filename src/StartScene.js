
var StartLayer = cc.Layer.extend({
	bgSprite:null,
	ctor:function () {
		//////////////////////////////
		// 1. super init first
		this._super();

		var size = cc.winSize;

		cc.director.runScene( new PlayScene() );


		return true;
	}
});

var StartScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new StartLayer();
		this.addChild(layer);
	}
});