var app = getApp(), dataApi = require("../../provider/dataApi.js"), pipe = require("../../provider/pipe.js");

Page({
    data: {
        statusBarHeight: "",
        titleBarHeight: "",
        typelist: [],
        total: 0,
        day_have_err: 2,
        all_have_err: 2
    },
    onLoad: function(t) {
        this.setData({
            statusBarHeight: getApp().globalData.statusBarHeight,
            titleBarHeight: getApp().globalData.titleBarHeight
        });
    },
    goToday: function() {
        app.globalData.op = "todayerr_question", wx.getStorageSync("uid") ? 2 == this.data.day_have_err ? wx.showToast({
            icon: "none",
            title: "今日无错题~"
        }) : wx.navigateTo({
            url: "../practice/practice"
        }) : wx.navigateTo({
            url: "../login/login"
        });
    },
    goAll: function() {
        app.globalData.op = "allerr_question", wx.getStorageSync("uid") ? 2 == this.data.all_have_err ? wx.showToast({
            icon: "none",
            title: "暂无错题~"
        }) : wx.navigateTo({
            url: "../practice/practice"
        }) : wx.navigateTo({
            url: "../login/login"
        });
    },
    goType: function(t) {
        t.currentTarget.dataset.id, wx.getStorageSync("uid") ? (app.globalData.op = "geterr_bytype", 
        app.globalData.id = t.currentTarget.id, wx.navigateTo({
            url: "../practice/practice"
        })) : wx.navigateTo({
            url: "../login/login"
        });
    },
    onShow: function() {
        this.getuserinfo(), this.myerrList();
    },
    getuserinfo: function() {
        dataApi.userinfo({
            uid: wx.getStorageSync("uid"),
            op: "getinfo"
        }).then(function(t) {
            console.log(t), wx.setStorageSync("userinfo", t.data.info);
        }).catch(function(t) {
            console.log(t);
        });
    },
    myerrList: function() {
        var e = this;
        dataApi.myerrList({
            uid: wx.getStorageSync("uid")
        }).then(function(t) {
            console.log(t);
            var a = t.data.typelist;
            e.setData({
                total: t.data.total,
                typelist: a,
                day_have_err: t.data.day_have_err,
                all_have_err: t.data.all_have_err
            });
        }).catch(function(t) {
            console.log(t);
        });
    },
    onShareAppMessage: function() {}
});