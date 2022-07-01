var app = getApp(), dataApi = require("../../provider/dataApi.js"), pipe = require("../../provider/pipe.js");

Page({
    data: {
        statusBarHeight: "",
        titleBarHeight: "",
        show: !1,
        wxshow: !1,
        list: [],
        userCoins: 0,
        wechat_number: "",
        id: "",
        coins: "",
        consignee_name: "",
        consignee_phone: "",
        consignee_address: ""
    },
    onLoad: function(t) {
        this.setData({
            statusBarHeight: getApp().globalData.statusBarHeight,
            titleBarHeight: getApp().globalData.titleBarHeight
        }), this.giftList();
    },
    goBack: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    goRecord: function() {
        wx.navigateTo({
            url: "../exchage-record/exchage-record"
        });
    },
    goExchage: function(t) {
        Number(t.currentTarget.dataset.coins) > Number(this.data.userCoins) ? wx.showToast({
            icon: "none",
            title: "你的积分不足"
        }) : this.setData({
            show: !0,
            id: t.currentTarget.id,
            coins: t.currentTarget.dataset.coins
        });
    },
    getName: function(t) {
        console.log(t), this.setData({
            consignee_name: t.detail.value
        });
    },
    getPhone: function(t) {
        this.setData({
            consignee_phone: t.detail.value
        });
    },
    getAddress: function(t) {
        this.setData({
            consignee_address: t.detail.value
        });
    },
    confirm: function(t) {
        var e = this;
        this.data.consignee_name.trim() ? /^[1][3,4,5,7,8][0-9]{9}$/.test(this.data.consignee_phone.trim()) ? this.data.consignee_address.trim() ? dataApi.exchangeGift({
            uid: wx.getStorageSync("uid"),
            gid: this.data.id,
            consignee_name: this.data.consignee_name,
            consignee_phone: this.data.consignee_phone,
            consignee_address: this.data.consignee_address
        }).then(function(t) {
            console.log(t), wx.showToast({
                icon: "success",
                title: "兑换成功"
            }), e.setData({
                wxshow: !0
            }), e.giftList();
        }).catch(function(t) {
            console.log(t);
        }) : wx.showToast({
            icon: "none",
            title: "请输入地址"
        }) : wx.showToast({
            icon: "none",
            title: "请输入正确的手机号码"
        }) : wx.showToast({
            icon: "none",
            title: "请输入姓名"
        });
    },
    onClose: function() {
        this.setData({
            close: !1
        });
    },
    confirmwx: function(t) {
        console.log(t.detail), wx.setClipboardData({
            data: this.data.wechat_number,
            success: function(t) {
                console.log(t), wx.showToast({
                    title: "复制成功"
                });
            }
        });
    },
    onClosewx: function() {
        this.setData({
            close: !1
        });
    },
    giftList: function() {
        var e = this;
        dataApi.giftList({
            uid: wx.getStorageSync("uid")
        }).then(function(t) {
            console.log(t), e.setData({
                list: t.data.list,
                userCoins: t.data.userCoins,
                wechat_number: t.data.wechat_number
            });
        }).catch(function(t) {
            console.log(t);
        });
    },
    onShareAppMessage: function() {}
});