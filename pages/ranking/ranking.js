var app = getApp(), dataApi = require("../../provider/dataApi.js"), pipe = require("../../provider/pipe.js");

Page({
    data: {
        type: 1,
        scroll_height: "",
        statusBarHeight: "",
        titleBarHeight: "",
        rankingArr: [],
        rankingArrindex: 0,
        tongji_chart: [],
        myexam_info: {},
        info: {},
        list: [],
        userinfo: ""
    },
    goSwitch: function(t) {
        var a = t.currentTarget.dataset.type;
        this.setData({
            type: a
        });
    },
    chakan: function() {
        var t = "每天做题达到" + this.data.info.dabiao_num + "道视为达标";
        wx.showModal({
            title: "提示",
            content: t,
            showCancel: !1,
            success: function(t) {
                t.confirm || t.cancel;
            }
        });
    },
    onLoad: function(t) {
        this.setData({
            statusBarHeight: getApp().globalData.statusBarHeight,
            titleBarHeight: getApp().globalData.titleBarHeight
        });
        var a = wx.getSystemInfoSync().windowHeight, n = wx.getSystemInfoSync().windowWidth;
        this.setData({
            scroll_height: 750 * a / n - 144
        });
    },
    bindPickerChange: function(t) {
        var a = parseInt(t.detail.value) + 1;
        this.setData({
            rankingArrindex: t.detail.value
        }), this.ranking(a);
    },
    onShow: function() {
        this.getAchievement(), this.getuserinfo(), this.ranking(this.data.rankingArrindex + 1);
    },
    getuserinfo: function() {
        var i = this;
        dataApi.userinfo({
            uid: wx.getStorageSync("uid"),
            op: "getinfo"
        }).then(function(t) {
            var a = t.data.info;
            wx.setStorageSync("userinfo", a);
            var n;
            n = 1 == a.stu_have ? [ "全国排行", "校内排行", "班内排行" ] : [ "全国排行" ], i.setData({
                userinfo: a,
                rankingArr: n
            });
        }).catch(function(t) {
            console.log(t);
        });
    },
    getAchievement: function() {
        var n = this;
        dataApi.getAchievement({
            uid: wx.getStorageSync("uid"),
            op: "myexam_info"
        }).then(function(t) {
            console.log(t);
            var a = {};
            a.calculate = t.data.calculate, a.doexam_num = t.data.doexam_num, a.dotest_num = t.data.dotest_num, 
            a.myscore = t.data.myscore, a.not_donum = t.data.not_donum, a.pass_num = t.data.pass_num, 
            a.right_lv = t.data.right_lv, n.setData({
                tongji_chart: t.data.tongji_chart,
                myexam_info: a,
                info: t.data.info
            });
        }).catch(function(t) {
            console.log(t);
        });
    },
    ranking: function(t) {
        var a = this, n = this.data.userinfo;
        dataApi.getAchievement({
            uid: wx.getStorageSync("uid"),
            school_id: n.school_id,
            banji_id: n.banji_id,
            op: "ranking",
            rankType: t
        }).then(function(t) {
            console.log(t), a.setData({
                list: t.data.list
            });
        }).catch(function(t) {
            console.log(t);
        });
    },
    onShareAppMessage: function() {}
});