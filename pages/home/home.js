var app = getApp(), dataApi = require("../../provider/dataApi.js"), pipe = require("../../provider/pipe.js");

Page({
    data: {
        statusBarHeight: "",
        titleBarHeight: "",
        banner: [],
        notice: [],
        last_id: 0,
        total: 0,
        banner_height: "",
        is_can: "",
        adInfo: {},
        ad_have: 2,
        icons: {},
        countdown: {},
        count_day: {},
        rate: {},
        activationShow: !1,
        setCDKey: ""
    },
    registerFormSubmit: function(a) {
        wx.getStorageSync("uid") && dataApi.getFormid({
            uid: wx.getStorageSync("uid"),
            formid: a.detail.formId
        }).then(function(a) {}).catch(function(a) {});
    },
    onLoad: function(a) {
        this.setData({
            statusBarHeight: getApp().globalData.statusBarHeight,
            titleBarHeight: getApp().globalData.titleBarHeight
        }), this.queryAd();
    },
    goBanner: function(a) {
        app.globalData.item = a.currentTarget.dataset.item;
        var t = a.currentTarget.dataset.item;
        if ("1" == t.type) {
            var e = t.link;
            "1" == e && wx.navigateTo({
                url: "/pages/my-medal/my-medal"
            }), "2" == e && wx.switchTab({
                url: "/pages/error/error"
            }), "3" == e && wx.switchTab({
                url: "/pages/ranking/ranking"
            }), "4" == e && wx.switchTab({
                url: "/pages/mine/mine"
            }), "5" == e && wx.navigateTo({
                url: "/pages/exam-desc/exam-desc"
            }), "6" == e && wx.navigateTo({
                url: "/pages/integral-mall/integral-mall"
            });
        } else if ("2" == t.type) wx.navigateTo({
            url: "../webView/webView"
        }); else if ("3" == t.type) {
            var o = t.link;
            app.globalData.id = o, wx.navigateTo({
                url: "/pages/article-info/article-info?type=article"
            });
        }
    },
    goSpecial: function() {
        wx.getStorageSync("uid") ? wx.navigateTo({
            url: "../special-lx/special-lx"
        }) : wx.navigateTo({
            url: "../login/login"
        });
    },
    goType: function() {
        wx.getStorageSync("uid") ? wx.navigateTo({
            url: "../type-lx/type-lx"
        }) : wx.navigateTo({
            url: "../login/login"
        });
    },
    goLx: function() {
        app.globalData.op = "sequence", wx.getStorageSync("uid") ? wx.navigateTo({
            url: "../practice/practice"
        }) : wx.navigateTo({
            url: "../login/login"
        });
    },
    goRandom: function() {
        app.globalData.op = "randoms", wx.getStorageSync("uid") ? wx.navigateTo({
            url: "../practice/practice"
        }) : wx.navigateTo({
            url: "../login/login"
        });
    },
    goIntensive: function() {
        app.globalData.op = "intensive", wx.getStorageSync("uid") ? wx.navigateTo({
            url: "../practice/practice"
        }) : wx.navigateTo({
            url: "../login/login"
        });
    },
    goNodone: function() {
        app.globalData.op = "notdone", wx.getStorageSync("uid") ? wx.navigateTo({
            url: "../practice/practice"
        }) : wx.navigateTo({
            url: "../login/login"
        });
    },
    goFrequency: function() {
        app.globalData.op = "qhigh", wx.getStorageSync("uid") ? 1 == this.data.is_can ? wx.navigateTo({
            url: "../practice/practice"
        }) : wx.showToast({
            icon: "none",
            title: "你的积分不足~"
        }) : wx.navigateTo({
            url: "../login/login"
        });
    },
    goHot: function() {
        app.globalData.op = "qhot", wx.getStorageSync("uid") ? wx.navigateTo({
            url: "../practice/practice"
        }) : wx.navigateTo({
            url: "../login/login"
        });
    },
    goDifficult: function() {
        app.globalData.op = "difficult", wx.getStorageSync("uid") ? wx.navigateTo({
            url: "../practice/practice"
        }) : wx.navigateTo({
            url: "../login/login"
        });
    },
    goExam: function() {
        wx.getStorageSync("uid") ? wx.navigateTo({
            url: "../exam-desc/exam-desc"
        }) : wx.navigateTo({
            url: "../login/login"
        });
    },
    golianX: function(a) {
        var t = Number(a.currentTarget.dataset.type), e = a.currentTarget.dataset.title;
        if (wx.getStorageSync("uid")) switch (app.globalData.title = e, t) {
          case 1:
            wx.navigateTo({
                url: "../special-lx/special-lx"
            });
            break;

          case 2:
            wx.navigateTo({
                url: "../type-lx/type-lx"
            });
            break;

          case 3:
            app.globalData.op = "randoms", wx.navigateTo({
                url: "../practice/practice"
            });
            break;

          case 4:
            app.globalData.op = "collection_question", wx.navigateTo({
                url: "../practice/practice"
            });
            break;

          case 5:
            wx.switchTab({
                url: "../error/error"
            });
            break;

          case 6:
            app.globalData.op = "notdone", wx.navigateTo({
                url: "../practice/practice"
            });
            break;

          case 7:
            app.globalData.type = 1, wx.navigateTo({
                url: "../knowledgePoints/knowledgePoints"
            });
            break;

          case 8:
            app.globalData.type = 2, wx.navigateTo({
                url: "../knowledgePoints/knowledgePoints"
            });
        } else wx.navigateTo({
            url: "../login/login"
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
    onShow: function() {
        this.getuserinfo(), this.totalqNum(), this.indexData();
    },
    goNotice: function(a) {
        app.globalData.id = a.currentTarget.dataset.id, wx.navigateTo({
            url: "../article-info/article-info?type=notice"
        });
    },
    indexData: function() {
        var t = this, a = 0;
        wx.getStorageSync("uid") && (a = wx.getStorageSync("uid")), dataApi.indexData({
            uid: a
        }).then(function(a) {
            console.log(a), t.setData({
                banner: a.data.banner,
                notice: a.data.notice,
                banner_height: a.data.banner_height,
                share_title: a.data.share_title,
                icons: a.data.icons,
                countdown: a.data.countdown,
                count_day: a.data.count_day,
                rate: a.data.rate
            }), t.djsFun(a.data.countdown.countdowntime);
        }).catch(function(a) {
            console.log(a);
        });
    },
    djsFun: function(e) {
        var o = this;
        this.timer = setInterval(function() {
            var a = new Date().getTime(), t = 0;
            0 < 1e3 * e - a ? t = pipe.formatDateDayTimehour(1e3 * e - a) : clearInterval(this.timer), 
            o.setData({
                "countdown.countdowntime": t
            });
        }, 1e3);
    },
    totalqNum: function() {
        var t = this;
        dataApi.totalqNum({
            uid: wx.getStorageSync("uid")
        }).then(function(a) {
            console.log(a), t.setData({
                last_id: Number(a.data.last_id),
                total: a.data.total,
                is_can: a.data.is_can
            });
        }).catch(function(a) {
            console.log(a);
        });
    },
    getuserinfo: function() {
        dataApi.userinfo({
            uid: wx.getStorageSync("uid"),
            op: "getinfo"
        }).then(function(a) {
            console.log(a), wx.setStorageSync("userinfo", a.data.info);
        }).catch(function(a) {
            console.log(a);
        });
    },
    onShareAppMessage: function() {}
});