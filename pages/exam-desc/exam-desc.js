var app = getApp(), dataApi = require("../../provider/dataApi.js"), pipe = require("../../provider/pipe.js");

Page({
    data: {
        statusBarHeight: "",
        titleBarHeight: "",
        userinfo: "",
        info: {
            total_score: 100,
            pass_score: 60,
            paper_time: 90,
            highest: 0
        }
    },
    onLoad: function(t) {
        var a = wx.getStorageSync("userinfo");
        this.setData({
            statusBarHeight: getApp().globalData.statusBarHeight,
            titleBarHeight: getApp().globalData.titleBarHeight,
            userinfo: a
        }), this.preExamInfo();
    },
    goBack: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    goExam: function(t) {
        console.log(t), app.globalData.item = t.currentTarget.dataset.item, wx.navigateTo({
            url: "../exam/exam?exam_type=" + t.currentTarget.id
        });
    },
    goSimulate: function(t) {
        app.globalData.item = t.currentTarget.dataset.item, wx.navigateTo({
            url: "/pages/type-lx/type-lx?type=" + t.currentTarget.id
        });
    },
    onShow: function() {
        this.preExamInfo();
    },
    preExamInfo: function() {
        var a = this;
        dataApi.preExamInfo({
            uid: wx.getStorageSync("uid")
        }).then(function(t) {
            t.data.highest || (t.data.highest = 0), a.setData({
                info: t.data
            });
        }).catch(function(t) {
            console.log(t);
        });
    },
    onShareAppMessage: function() {}
});