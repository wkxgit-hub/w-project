var app = getApp(), dataApi = require("../../provider/dataApi.js"), pipe = require("../../provider/pipe.js");

Page({
    data: {
        statusBarHeight: "",
        titleBarHeight: "",
        list: []
    },
    onLoad: function(t) {
        this.setData({
            statusBarHeight: getApp().globalData.statusBarHeight,
            titleBarHeight: getApp().globalData.titleBarHeight
        }), this.exchangeGiftList();
    },
    goBack: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    exchangeGiftList: function() {
        var a = this;
        dataApi.exchangeGiftList({
            uid: wx.getStorageSync("uid")
        }).then(function(t) {
            console.log(t), t.data && (t.data.forEach(function(t) {
                t.createtime = pipe.formatDateTimehour(t.createtime);
            }), a.setData({
                list: t.data
            }));
        }).catch(function(t) {
            console.log(t);
        });
    },
    onShareAppMessage: function() {}
});