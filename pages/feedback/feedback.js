var app = getApp(), dataApi = require("../../provider/dataApi.js"), pipe = require("../../provider/pipe.js");

Page({
    data: {
        statusBarHeight: "",
        titleBarHeight: "",
        phone: "",
        contentVal: ""
    },
    onLoad: function(t) {
        var a = app.globalData.id;
        this.setData({
            statusBarHeight: getApp().globalData.statusBarHeight,
            titleBarHeight: getApp().globalData.titleBarHeight,
            id: a
        });
    },
    goBack: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    getPhone: function(t) {
        this.setData({
            phone: t.detail.value
        });
    },
    getCon: function(t) {
        this.setData({
            contentVal: t.detail.value
        });
    },
    goSubmit: function() {
        var t = this.data.contentVal.trim();
        /^[1][3,4,5,7,8][0-9]{9}$/.test(this.data.phone) ? t ? dataApi.feedback({
            tid: this.data.id,
            uid: wx.getStorageSync("uid"),
            relation: this.data.phone,
            content: this.data.contentVal
        }).then(function(t) {
            wx.showModal({
                title: "提示",
                content: "反馈已提交~",
                showCancel: !1,
                success: function(t) {
                    t.confirm || t.cancel;
                }
            }), wx.navigateBack({
                delta: 1
            });
        }).catch(function(t) {
            console.log(t);
        }) : wx.showToast({
            icon: "none",
            title: "请输入内容~"
        }) : wx.showToast({
            icon: "none",
            title: "请输入正确的手机号~"
        });
    },
    onShareAppMessage: function() {}
});