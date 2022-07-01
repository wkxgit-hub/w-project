var app = getApp(), dataApi = require("../../provider/dataApi.js"), pipe = require("../../provider/pipe.js");

Page({
    data: {
        statusBarHeight: "",
        titleBarHeight: "",
        oItem: {}
    },
    onLoad: function(t) {
        var a = this, e = app.globalData.oItem;
        this.setData({
            statusBarHeight: getApp().globalData.statusBarHeight,
            titleBarHeight: getApp().globalData.titleBarHeight,
            oItem: e
        }), dataApi.knowledge({
            op: "knowledgelist",
            uid: wx.getStorageSync("uid"),
            cate: e.id
        }).then(function(t) {
            console.log(t), a.setData({
                list: t.data.list,
                pay_open: t.data.pay_open
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
    goLook: function(t) {
        var a = t.currentTarget.dataset.item;
        console.log(t), 1 == this.data.pay_open || 1 == a.is_can ? 1 != this.data.pay_open || 1 == a.is_can ? (app.globalData.oItem = a, 
        wx.navigateTo({
            url: "../knowledgePoints-list-detail/knowledgePoints-list-detail"
        })) : wx.showToast({
            icon: "none",
            title: "需要支付"
        }) : wx.showToast({
            icon: "none",
            title: "请用激活码激活后查看"
        });
    },
    onShareAppMessage: function() {}
});