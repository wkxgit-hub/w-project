var dataApi = require("../../provider/dataApi.js"), pipe = require("../../provider/pipe.js"), app = getApp();

Page({
    data: {
        title: "",
        statusBarHeight: "",
        titleBarHeight: "",
        specialList: [],
        specialIndex: 0,
        parmas: {},
        isloading: !0,
        pay_open: "",
        freenum: "",
        show: !1,
        item: {},
        total_num: 0,
        student_id: 0,
    },
    onLoad: function(t) {
        var a = wx.getSystemInfoSync().windowHeight;
        var t = wx.getStorageSync("userinfo");
        this.student_id = t.student_id
        this.setData({
            statusBarHeight: getApp().globalData.statusBarHeight,
            titleBarHeight: getApp().globalData.titleBarHeight,
            windowHeight: a,
            title: app.globalData.title
        }), console.log(a),this.special();
    },
    goBack: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    onReady: function() {},
    // onShow:function(){
        // this.special();
    // },
    special: function(){
        var a = this;
		app.globalData.op = "special",
        dataApi.special({
            op: "cate",
            type: app.globalData.type,
            uid: wx.getStorageSync("uid"),
            is_student: this.student_id != 0 ? true : false 
        }).then(function(t) {
            console.log(t), a.setData({
                specialList: t.data.list,
				isloading: !1,
            });
        }).catch(function(t) {
            console.log(t);
        });
    },
    ltChoose: function(t) {
        var a = t.currentTarget.dataset.i;
        this.setData({
            specialIndex: a
        });
    },
    rtChoose: function(t) {
        var a = t.currentTarget.dataset.item;
		console.error(a.is_can);
		this.setData({
            item: a.son.list,
            total_num: a.son.total_qnum
        }),app.globalData.id = t.currentTarget.id, 1 != a.is_can ? this.setData({
			show: !0
		}): wx.navigateTo({
			url: "../practice/practice"
		});
    },
    // goLx: function(t) {
    //     var a = t.currentTarget.dataset.item;
    //     this.setData({
    //         item: a,
    //         total_num: a.total_num
    //     }), app.globalData.id = t.currentTarget.id, 1 == this.data.pay_open && 1 != a.is_can || 1 != this.data.pay_open && 1 != a.is_can ? this.setData({
    //         show: !0
    //     }) : wx.navigateTo({
    //         url: "../practice/practice"
    //     });
    // },
    tryAnswer: function() {
        wx.navigateTo({
            url: "../practice/practice"
        });
    },
    cancel: function() {
        this.setData({
            show: !1
        });
    },



    getCode: function() {
        this.setData({
            activationShow: !0
        });
    },
    onClose: function() {
        this.setData({
            activationShow: !1
        });
    },
    onChange: function(a) {
        this.setData({
            setCDKey: a.detail
        });
    },
    onConfirm: function() {
        this.data.setCDKey ? dataApi.setCDKey({
            uid: wx.getStorageSync("uid"),
            code: this.data.setCDKey
        }).then(function(a) {
            console.log(a), wx.showToast({
                icon: "none",
                title: a.data.message
            });
        }).catch(function(a) {
            console.log(a), wx.showToast({
                icon: "none",
                title: "该激活码不可用"
            });
        }) : wx.showToast({
            icon: "none",
            title: "请输入激活码"
        });
    },
    queryAd: function() {
        var t = this;
        dataApi.advert({
            op: "home"
        }).then(function(a) {
            console.log(a), t.setData({
                adInfo: a.data.info,
                ad_have: a.data.ad_have
            });
        }).catch(function(a) {
            console.log(a);
        });
    },


    goPay: function() {
        var e = this;
        dataApi.wxPay({
            uid: wx.getStorageSync("uid"),
            id: this.data.item.id,
            type: "1"
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
                    }), a.setData({
                        show: !1
                    }), a.getSequence();
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
        });
    },
    getSequence: function() {
        var a = this;
        app.globalData.op = "special", dataApi.sequence({
            uid: wx.getStorageSync("uid"),
            op: "getallspecial"
        }).then(function(t) {
            console.log(t), t.data.list && a.setData({
                list: t.data.list,
                pay_open: t.data.pay_open,
                freenum: t.data.freenum
            });
        }).catch(function(t) {
            console.log(t);
        });
    },
    getErr: function() {
        var a = this, i = this.data.parmas.id;
        dataApi.myerrList({
            uid: wx.getStorageSync("uid")
        }).then(function(t) {
            var e = [];
            t.data.knowledge_list.map(function(t, a) {
                t.pid == i && e.push(t);
            }), console.log(e), a.setData({
                list: e,
                // isloading: !1
            });
        }).catch(function(t) {
            console.log(t);
        });
    },
    onShareAppMessage: function() {}
});



