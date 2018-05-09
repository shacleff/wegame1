// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html







var NetMananger = require("NetManager")
var Msg = require("Msg")
var MsgManager = require("MsgManager")
var GameDataManager = require("GameDataManager")
var Tool = require("Tool")

var ResData = require("ResData")

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {},

    LoginSucc:function(){
        console.log("LoginSucc")
        cc.director.loadScene("Hall", null);
    },
    LoginFail:function(){
        console.log("LoginFail")

        this.node.getChildByName("loginword").getComponent(cc.Label).string = "登录失败"
        this.node.getChildByName("reLogin").active = true
    },

    onDestroy(){
        console.log("login destory")
        MsgManager.getInstance().RemoveListener("WS_Close")
        Tool.destroyLoginBtn()
    },

    loginGameClick(event, customEventData){
        console.log("lookGameClick")
        
        // this.node.getChildByName("loginword").getComponent(cc.Label).string = "登录中..."
        // NetMananger.getInstance().Login(this.LoginSucc.bind(this),this.LoginFail.bind(this))
        // this.node.getChildByName("reLogin").active = false
        NetMananger.getInstance().Login("","",this.LoginSucc.bind(this),this.LoginFail.bind(this))
    },

    wxlogin(name,avatar){
        this.node.getChildByName("loginword").getComponent(cc.Label).string = "登录中..."
        NetMananger.getInstance().Login(name,avatar,this.LoginSucc.bind(this),this.LoginFail.bind(this))
    },



    start () {

        
        MsgManager.getInstance().AddListener("WS_Close",this.LoginFail.bind(this))

        if (cc.sys.platform === cc.sys.WECHAT_GAME){
            Tool.createLoginBtn(this.wxlogin.bind(this))
            this.node.getChildByName("reLogin").active = false

        }else{
            NetMananger.getInstance().Login("name111","avatar222",this.LoginSucc.bind(this),this.LoginFail.bind(this))
        }

        // this.node.getChildByName("loginword").getComponent(cc.Label).string = "登录中..."
        // NetMananger.getInstance().Login(this.LoginSucc.bind(this),this.LoginFail.bind(this))
        // this.node.getChildByName("reLogin").active = false

    },


    // update (dt) {},
});
