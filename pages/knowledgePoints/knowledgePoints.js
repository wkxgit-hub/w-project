var dataApi = require("../../provider/dataApi.js"), pipe = require("../../provider/pipe.js"), app = getApp();

Page({
    data: {
        statusBarHeight: "",
        titleBarHeight: "",
        windowHeight: 0,
        knowledgeList: [],
        knowledgeIndex: 0,
        pay_open: "",
        title: ""
    },
    onLoad: function(t) {
        var a = wx.getSystemInfoSync().windowHeight;
        this.setData({
            statusBarHeight: getApp().globalData.statusBarHeight,
            titleBarHeight: getApp().globalData.titleBarHeight,
            windowHeight: a,
            title: app.globalData.title
        }), console.log(a);
    },
    goBack: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    onReady: function() {},
    onShow: function() {
        this.knowledge();
    },
    knowledge: function() {
        var a = this;
        dataApi.knowledge({    
            op: "cate",
            type: app.globalData.type,
            uid: wx.getStorageSync("uid")
        }).then(function(t) {
            console.log(t), a.setData({
                knowledgeList: t.data.list
            });
        }).catch(function(t) {
            console.log(t);
        });
    },
    ltChoose: function(t) {
        var a = t.currentTarget.dataset.i;
        this.setData({
            knowledgeIndex: a
        });
    },
    rtChoose: function(t) {
        console.error(t);
        var e = this, a = t.currentTarget.dataset.chapterid;
        console.log(t);
        var n = t.currentTarget.dataset.oitem;
        n.chapterId = a, 1 == this.data.pay_open || 1 == n.is_can ? 1 != this.data.pay_open || 1 == n.is_can ? (app.globalData.oItem = n, 
        wx.navigateTo({
            url: "../knowledgePoints-list/knowledgePoints-list"
        })) : dataApi.wxPay({
            uid: wx.getStorageSync("uid"),
            id: a,
            type: "2"
        }).then(function(t) {
            console.log(t);
            var a = e;
            wx.requestPayment({
                timeStamp: String(t.data.timeStamp),
                nonceStr: t.data.nonceStr,
                package: t.data.package,
                signType: t.data.signType,
                paySign: t.data.paySign,
                success: function(t) {
                    wx.showToast({
                        icon: "success",
                        title: "支付成功"
                    }), a.knowledge();
                },
                fail: function(t) {
                    wx.showToast({
                        icon: "none",
                        title: "支付失败,请重试~"
                    });
                }
            });
        }).catch(function(t) {
            console.log(t);
        }) : wx.showToast({
            icon: "none",
            title: "请用激活码激活后查看"
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});