var app = getApp(), dataApi = require("../../provider/dataApi.js"), pipe = require("../../provider/pipe.js");

Page({
    data: {
        title: "题型练习",
        statusBarHeight: "",
        titleBarHeight: "",
        list: [],
        isloading: !0,
        params: "",
        isShowTest: !1
    },
    onLoad: function(t) {
        this.setData({
            statusBarHeight: getApp().globalData.statusBarHeight,
            titleBarHeight: getApp().globalData.titleBarHeight,
            title: app.globalData.title
        }), "{}" !== JSON.stringify(t) ? (this.setData({
            params: t,
            title: "全真模拟试卷列表",
            isShowTest: !0
        }), console.log(t), this.getExamList()) : this.getSequence();
    },
    getSequence: function() {
        var a = this;
        dataApi.sequence({
            uid: wx.getStorageSync("uid"),
            op: "getalltypes"
        }).then(function(t) {
            console.log(t), t.data.type_list && a.setData({
                list: t.data.type_list,
                isloading: !1
            });
        }).catch(function(t) {
            console.log(t);
        });
    },
    getExamList: function() {
        var a = this;
        dataApi.getExamList({}).then(function(t) {
            console.log(t), t.data.list && a.setData({
                list: t.data.list,
                isloading: !1
            });
        }).catch(function(t) {
            console.log(t);
        });
    },
    goBack: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    goLx: function(t) {
        if (this.data.params) {
            var a = t.currentTarget.id;
			console.log(t), wx.navigateTo({
                url: "../exam/exam?exam_type=1&paperid=" + a
            });
        } else app.globalData.op = "qtype", app.globalData.id = t.currentTarget.id, wx.navigateTo({
            url: "../practice/practice"
        });
    },
    onShareAppMessage: function() {}
});