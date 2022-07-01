function _defineProperty(t, e, o) {
    return e in t ? Object.defineProperty(t, e, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = o, t;
}

var app = getApp(), dataApi = require("../../provider/dataApi.js"), pipe = require("../../provider/pipe.js"), WxParse = require("../../wxParse/wxParse.js");

Page(_defineProperty({
    data: {
        statusBarHeight: "",
        titleBarHeight: "",
        wxshow: !1,
        userinfo: {},
        shareBtn: "",
        isshare: ""
    },
    onLoad: function(t) {
        this.setData({
            statusBarHeight: getApp().globalData.statusBarHeight,
            titleBarHeight: getApp().globalData.titleBarHeight
        });
    },
    goLogin: function() {
        wx.navigateTo({
            url: "../login/login"
        });
    },
    goMedal: function() {
        wx.getStorageSync("uid") ? wx.navigateTo({
            url: "../my-medal/my-medal"
        }) : wx.navigateTo({
            url: "../login/login"
        });
    },
    goInfo: function() {
        wx.getStorageSync("uid") ? wx.navigateTo({
            url: "../my-info/my-info"
        }) : wx.navigateTo({
            url: "../login/login"
        });
    },
    goIntegralmall: function() {
        wx.getStorageSync("uid") ? wx.navigateTo({
            url: "../integral-mall/integral-mall"
        }) : wx.navigateTo({
            url: "../login/login"
        });
    },
    goFeedback: function() {
        wx.getStorageSync("uid") ? wx.navigateTo({
            url: "../feedback/feedback"
        }) : wx.navigateTo({
            url: "../login/login"
        });
    },
    goAbout: function() {
        this.setData({
            wxshow: !0
        });
    },
    confirmwx: function(t) {
        console.log(t.detail);
    },
    onClosewx: function() {
        this.setData({
            close: !1
        });
    },
    onShow: function() {
        this.getuserinfo(), this.aboutus();
    },
    btnShare: function() {
        var e = this;
        console.log(1), dataApi.share({
            uid: wx.getStorageSync("uid")
        }).then(function(t) {
            console.log(t), 1 == t.data.code && (e.getuserinfo(), wx.showModal({
                title: "提示",
                content: "恭喜你获得" + t.data.num + "积分",
                showCancel: !1,
                success: function(t) {
                    t.confirm || t.cancel;
                }
            }));
        }).catch(function(t) {
            console.log(t);
        });
    },
    onShareAppMessage: function(t) {
        console.log(t), "button" == t.from && this.btnShare();
    },
    getuserinfo: function() {
        var e = this;
        dataApi.userinfo({
            uid: wx.getStorageSync("uid"),
            op: "getinfo"
        }).then(function(t) {
            console.log(t), wx.setStorageSync("userinfo", t.data.info), e.setData({
                userinfo: t.data.info
            });
        }).catch(function(t) {
            console.log(t);
        });
    },
    aboutus: function() {
        var e = this;
        dataApi.aboutus({}).then(function(t) {
            console.log(t), t.data.about = pipe.strcharacterDiscode(t.data.about).replace(/\<img/gi, '<img style="max-width:100px!important;height:auto"'), 
            WxParse.wxParse("article", "html", t.data.about, e, 5);
        }).catch(function(t) {
            console.log(t);
        });
    }
}, "onShareAppMessage", function() {}));