var app = getApp();

Page({
    data: {
        statusBarHeight: "",
        titleBarHeight: "",
        handpapershow: !1,
        resuser: {},
        userinfo: {},
        paperId: ""
    },
    onLoad: function(a) {
        var t = app.globalData.resuser, e = wx.getStorageSync("userinfo");
        this.setData({
            statusBarHeight: getApp().globalData.statusBarHeight,
            titleBarHeight: getApp().globalData.titleBarHeight,
            resuser: t,
            userinfo: e
        }), t.medal && this.setData({
            handpapershow: !0
        }), "" != a.paperId && this.setData({
            paperId: a.paperId
        });
    },
    goBack: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    goSeeError: function() {
        app.globalData.op = "seeErr", app.globalData.paperId = this.data.paperId, wx.navigateTo({
            url: "../practice/practice"
        });
    },
    goHandpaper: function() {
        this.setData({
            handpapershow: !1
        });
    },
    honClose: function() {
        this.setData({
            handpapershow: !1
        });
    },
    onShareAppMessage: function() {}
});