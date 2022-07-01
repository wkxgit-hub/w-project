var WxParse = require("../../wxParse/wxParse.js"), app = getApp(), dataApi = require("../../provider/dataApi.js"), pipe = require("../../provider/pipe.js");

Page({
    data: {
        statusBarHeight: "",
        titleBarHeight: "",
        oItem: {}
    },
    onLoad: function(t) {
        var a = app.globalData.oItem;
        this.setData({
            statusBarHeight: getApp().globalData.statusBarHeight,
            titleBarHeight: getApp().globalData.titleBarHeight,
            oItem: a
        }), WxParse.wxParse("article", "html", a.content, this, 15);
    },
    goBack: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});