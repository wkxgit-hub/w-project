var app = getApp(), dataApi = require("../../provider/dataApi.js"), pipe = require("../../provider/pipe.js");

Page({
    data: {
        statusBarHeight: "",
        titleBarHeight: "",
        list: [],
        page: 1,
        pages: "",
        isInit: !1,
        playIndex: "",
        isdone: !1,
        isloading: !1,
        lt_list: [],
        lt_index: 0,
        rt_list: [],
        rt_index: 0,
        total: 0,
        psize: 0
    },
    ltbindPickerChange: function(a) {
        var i = this;
        this.setData({
            lt_index: a.detail.value,
            page: 1
        });
        var e = this;
        this.data.lt_list.forEach(function(t) {
            t.id == i.data.lt_list[a.detail.value].id && e.setData({
                rt_list: i.data.lt_list[a.detail.value].son,
                rt_index: 0
            });
        }), this.article(this.data.lt_list[a.detail.value].id, this.data.rt_list[this.data.rt_index].id, !1);
    },
    rtbindPickerChange: function(t) {
        this.setData({
            rt_index: t.detail.value,
            page: 1
        }), this.article(this.data.lt_list[this.data.lt_index].id, this.data.rt_list[t.detail.value].id, !1);
    },
    onLoad: function(t) {
        this.setData({
            statusBarHeight: getApp().globalData.statusBarHeight,
            titleBarHeight: getApp().globalData.titleBarHeight
        }), this.atype();
    },
    onShow: function() {
        this.getuserinfo();
    },
    goArticle: function(t) {
        if (wx.getStorageSync("uid")) {
            app.globalData.id = t.currentTarget.dataset.id;
            var a = t.currentTarget.dataset.title;
            wx.navigateTo({
                url: "../article-info/article-info?type=article&title=" + a
            });
        } else wx.navigateTo({
            url: "../login/login"
        });
    },
    getuserinfo: function() {
        dataApi.userinfo({
            uid: wx.getStorageSync("uid"),
            op: "getinfo"
        }).then(function(t) {
            console.log(t), wx.setStorageSync("userinfo", t.data.info);
        }).catch(function(t) {
            console.log(t);
        });
    },
    bindplay: function(t) {
        console.log(t);
        var a = t.currentTarget.id;
        if (this.data.playIndex) {
            var i = wx.createVideoContext([ "index", this.data.playIndex ].join(""));
            i.seek(0), i.pause(), this.setData({
                playIndex: a
            });
        } else this.setData({
            playIndex: a
        });
        wx.createVideoContext([ "index", this.data.playIndex ].join("")).play(), this.readVideo(a);
    },
    onHide: function() {
        console.log("隐藏"), wx.createVideoContext([ "index", this.data.playIndex ].join("")).pause();
    },
    onUnload: function() {
        console.log("卸载"), wx.createVideoContext([ "index", this.data.playIndex ].join("")).pause();
    },
    onPullDownRefresh: function() {
        var a = this;
        this.setData({
            page: 1
        }), dataApi.article({
            page: this.data.page,
            pcate: this.data.lt_list[this.data.lt_index].id,
            ccate: this.data.rt_list[this.data.rt_index].id
        }).then(function(t) {
            console.log(t), t.data.list && t.data.list.forEach(function(t) {
                t.time = pipe.formatDateTimehour(t.createtime), t.readnum = pipe.readingvolume(t.readnum);
            }), a.setData({
                list: t.data.list
            }), wx.stopPullDownRefresh();
        }).catch(function(t) {
            wx.stopPullDownRefresh(), console.log(t);
        });
    },
    onReachBottom: function() {
        var i = this, t = Math.ceil(this.data.total / this.data.psize);
        this.data.page <= t && this.setData({
            page: this.data.page + 1,
            isInit: !0
        }), dataApi.article({
            page: this.data.page,
            pcate: this.data.lt_list[this.data.lt_index].id,
            ccate: this.data.rt_list[this.data.rt_index].id
        }).then(function(t) {
            if (console.log(t), t.data.list) {
                t.data.list.forEach(function(t) {
                    t.time = pipe.formatDateTimehour(t.createtime), t.readnum = pipe.readingvolume(t.readnum);
                });
                var a = i.data.list;
                a = a.concat(t.data.list), i.setData({
                    list: a,
                    total: t.data.total,
                    psize: t.data.psize
                });
            }
            i.setData({
                isInit: !1
            }), wx.stopPullDownRefresh();
        }).catch(function(t) {
            i.setData({
                isInit: !1
            }), wx.stopPullDownRefresh(), console.log(t);
        });
    },
    article: function(t, a, i) {
        var e = this;
        i && this.setData({
            isloading: !0
        }), dataApi.article({
            page: 1,
            pcate: t,
            ccate: a
        }).then(function(t) {
            console.log(t), t.data.list && t.data.list.forEach(function(t) {
                t.time = pipe.formatDateTimehour(t.createtime), t.readnum = pipe.readingvolume(t.readnum);
            }), e.setData({
                list: t.data.list,
                pages: Math.ceil(t.data.total / t.data.psize),
                isloading: !1,
                total: t.data.total,
                psize: t.data.psize
            }), t.data.list.length <= 0 || !t.data ? e.setData({
                isdone: !0,
                isloading: !1
            }) : e.setData({
                isdone: !1,
                isloading: !1
            });
        }).catch(function(t) {
            e.setData({
                isloading: !1
            }), console.log(t);
        });
    },
    readVideo: function(t) {
        dataApi.readVideo({
            uid: wx.getStorageSync("uid"),
            id: t
        }).then(function(t) {}).catch(function(t) {
            console.log(t);
        });
    },
    atype: function() {
        var a = this;
        dataApi.atype({}).then(function(t) {
            console.log(t), a.setData({
                lt_list: t.data.list,
                rt_list: t.data.list[0].son
            }), a.article(t.data.list[0].id, t.data.list[0].son[0].id, !0);
        }).catch(function(t) {
            console.log(t);
        });
    },
    onShareAppMessage: function() {}
});