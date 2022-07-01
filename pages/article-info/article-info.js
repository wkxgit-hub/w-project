var app = getApp(), dataApi = require("../../provider/dataApi.js"), pipe = require("../../provider/pipe.js"), WxParse = require("../../wxParse/wxParse.js");

Page({
    data: {
        statusBarHeight: "",
        titleBarHeight: "",
        isloading: !1,
        videoInfo: {},
        isShowVideo: !1,
        title: "文章",
        articleInfo: {}
    },
    onLoad: function(t) {
        var a = this;
        console.log(t), "notice" == t.type && this.setData({
            title: "通知"
        }), "article" == t.type && this.setData({
            title: "文章"
        }), this.setData({
            statusBarHeight: getApp().globalData.statusBarHeight,
            titleBarHeight: getApp().globalData.titleBarHeight,
            isloading: !0
        }), dataApi.readNotice({
            uid: wx.getStorageSync("uid"),
            nid: app.globalData.id
        }).then(function(t) {
            console.log(t), t.data.info.content = pipe.strcharacterDiscode(t.data.info.content).replace(/\<img/gi, '<img style="max-width:100px!important;height:auto"'), 
            WxParse.wxParse("article", "html", t.data.info.content, a, 15), void 0 !== t.data.info.video && a.setData({
                videoInfo: t.data.info.video,
                isShowVideo: !0
            }), a.setData({
                articleInfo: t.data.info,
                isloading: !1
            });
        }).catch(function(t) {
            a.setData({
                isloading: !1
            }), console.log(t);
        });
    },
    goBack: function() {
        wx.navigateBack({
            delta: -1
        });
    },
    onShareAppMessage: function() {}
});