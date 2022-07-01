var app = getApp(), dataApi = require("../../provider/dataApi.js"), pipe = require("../../provider/pipe.js");

Page({
    data: {
        statusBarHeight: "",
        titleBarHeight: "",
        userinfo: "",
        info: {},
        num: 0,
        isloading: !0
    },
    onLoad: function(a) {
        this.setData({
            statusBarHeight: getApp().globalData.statusBarHeight,
            titleBarHeight: getApp().globalData.titleBarHeight,
        });
        var t = wx.getStorageSync("userinfo");
        this.setData({
            userinfo: t
        }), this.medal();
    },
    goBack: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    medal: function() {
        var i = this;
        dataApi.medal({
            uid: wx.getStorageSync("uid")
        }).then(function(a) {
            if (console.log(a), a.data) {
                var t = 0;
                for (var e in a.data) 1 == a.data[e].have && t++;
                i.setData({
                    info: a.data,
                    num: t,
                    isloading: !1
                });
            }
        }).catch(function(a) {
            console.log(a);
        });
    },
    onShareAppMessage: function() {}
});