var _userinfo;

function _defineProperty(e, t, o) {
    return t in e ? Object.defineProperty(e, t, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = o, e;
}

var app = getApp(), dataApi = require("../../provider/dataApi.js"), pipe = require("../../provider/pipe.js"), appimg = require("../../we7/resource/js/util.js");

Page({
    data: {
        statusBarHeight: "",
        titleBarHeight: "",
        isSetShow: !1,
        show: !1,
        userinfo: (_userinfo = {
            name: "",
            id_card: "",
            student_name: ""
        }, _defineProperty(_userinfo, "id_card", ""), _defineProperty(_userinfo, "school", ""), 
        _defineProperty(_userinfo, "phone", ""), _defineProperty(_userinfo, "grade", ""), 
        _defineProperty(_userinfo, "sex", ""), _userinfo),
        studentInfo: "",
        code: "",
        iscode: !1,
        codetxt: "获取验证码"
    },
    onLoad: function(e) {
        this.setData({
            statusBarHeight: getApp().globalData.statusBarHeight,
            titleBarHeight: getApp().globalData.titleBarHeight
        });
    },
    editHeadimgBtn: function() {
        var o = this, a = appimg.url("entry/wxapp/uploadImage", {
            m: "goouc_fullexam"
        });
        wx.showActionSheet({
            itemList: [ "拍照", "从手机相册选择" ],
            success: function(e) {
                "0" == e.tapIndex ? wx.chooseImage({
                    count: 1,
                    sizeType: [ "original", "compressed" ],
                    sourceType: [ "camera" ],
                    success: function(e) {
                        wx.showToast({
                            title: "正在上传...",
                            icon: "loading",
                            mask: !0,
                            duration: 1e4
                        });
                        var t = e.tempFilePaths[0];
                        wx.uploadFile({
                            url: a,
                            filePath: t,
                            name: "upfile",
                            formData: {},
                            success: function(e) {
                                console.log(e), e.data, o.setData({
                                    "userinfo.headimg": e.data
                                }), wx.hideToast();
                            },
                            fail: function(e) {
                                wx.hideToast(), console.log(e);
                            }
                        });
                    }
                }) : wx.chooseImage({
                    count: 1,
                    sizeType: [ "original", "compressed" ],
                    sourceType: [ "album" ],
                    success: function(e) {
                        wx.showToast({
                            title: "正在上传...",
                            icon: "loading",
                            mask: !0,
                            duration: 1e4
                        });
                        var t = e.tempFilePaths[0];
                        wx.uploadFile({
                            url: a,
                            filePath: t,
                            name: "upfile",
                            formData: {},
                            success: function(e) {
                                console.log(e);
                                var t = e.data;
                                dataApi.updateHeadimg({
                                    uid: wx.getStorageSync("uid"),
                                    headimg: t
                                }).then(function(e) {
                                    o.setData({
                                        "userinfo.headimg": t
                                    }), wx.hideToast();
                                }).catch(function(e) {
                                    console.lgo(e);
                                });
                            },
                            fail: function(e) {
                                wx.hideToast(), console.log(e);
                            }
                        });
                    },
                    fail: function(e) {
                        console.log(e);
                    }
                });
            }
        });
    },
    inputblur: function() {
        var e = this.data.userinfo.name, t = this.data.userinfo.phone;
        this.getUserInfo(e, t);
    },
    getUserInfo: function(e, t) {
        var o = this;
        "" != e && null != e && "" != t && null != t && null != t && dataApi.userinfo({
            phone: t,
            name: e,
            op: "checkStudent"
        }).then(function(e) {
            console.log(e);
            var t;
            t = e.data.list, console.log(t), "" !== t.length && o.setData({
                isSetShow: !0,
                studentInfo: t,
                "userinfo.student_name": t.student_name,
                "userinfo.school": t.school_name,
                "userinfo.grade": t.banji_name,
                "userinfo.sex": t.sex
            });
        }).catch(function(e) {
            console.log(e);
        });
    },
    goBack: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    goBind: function() {
        this.setData({
            show: !0
        });
    },
    confirm: function(e) {
        var a = this, n = this;
        console.log(e.detail), dataApi.userinfo({
            phone: this.data.userinfo.phone,
            code: this.data.code,
            uid: wx.getStorageSync("uid"),
            op: "checkcode"
        }).then(function(e) {
            a.goSave(!1);
            var t = n.data.userinfo.name, o = n.data.userinfo.phone;
            a.getUserInfo(t, o), a.setData({
                iscode: !0
            });
        }).catch(function(e) {
            console.log(e), a.setData({
                iscode: !0
            }), wx.showToast({
                icon: "none",
                title: "完成"
            });
        });
    },
    onClose: function() {
        this.setData({
            close: !1
        });
    },
    onShow: function() {
        var e = wx.getStorageSync("userinfo");
        e && this.setData({
            userinfo: e
        }), 1 == e.stu_have && this.setData({
            isSetShow: !0
        }), this.getUserInfo(this.data.userinfo.name, this.data.userinfo.phone);
    },
    getName: function(e) {
        this.setData({
            "userinfo.name": e.detail.value
        });
    },
    getXh: function(e) {
        this.setData({
            "userinfo.student_name": e.detail.value
        });
    },
    getIdcard: function(e) {
        this.setData({
            "userinfo.id_card": e.detail.value
        });
    },
    getSchool: function(e) {
        this.setData({
            "userinfo.school": e.detail.value
        });
    },
    getClass: function(e) {
        this.setData({
            "userinfo.grade": e.detail.value
        });
    },
    getPhone: function(e) {
        this.setData({
            "userinfo.phone": e.detail.value
        });
    },
    getCode: function(e) {
        this.setData({
            code: e.detail.value
        });
    },
    sendCode: function() {
        var n = this;
        /^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(this.data.userinfo.phone) ? "获取验证码" == this.data.codetxt || "重新发送" == this.data.codetxt ? dataApi.userinfo({
            phone: this.data.userinfo.phone,
            uid: wx.getStorageSync("uid"),
            op: "getcode"
        }).then(function(e) {
            n.setData({
                codetxt: "60秒"
            });
            var t = 60, o = n, a = setInterval(function() {
                t--, o.setData({
                    codetxt: t + "秒"
                }), t <= 0 && (o.setData({
                    codetxt: "重新发送"
                }), clearInterval(a));
            }, 1e3);
        }).catch(function(e) {
            console.log(e);
        }) : wx.showToast({
            icon: "none",
            title: "请不要重复发送~"
        }) : wx.showToast({
            icon: "none",
            title: "请输入正确的手机号~"
        });
    },
    goToSave: function() {
        this.goSave(!0);
    },
    goSave: function(t) {
        var o = this, e = this.data.userinfo;
        "null" == e.phone && (e.phone = ""), dataApi.userinfo({
            uid: wx.getStorageSync("uid"),
            name: e.name,
            phone: e.phone
        }).then(function(e) {
            console.log(e), 1 == e.data && (wx.showToast({
                icon: "none",
                title: "保存成功"
            }), o.updateUserInfo(), t ? (wx.showToast({
                icon: "none",
                title: "保存成功"
            }), setTimeout(function() {
                wx.navigateBack({
                    delta: -1
                });
            }, 1e3)) : wx.showToast({
                icon: "none",
                title: "绑定成功"
            }), console.log(app.globalData.userinfo));
        }).catch(function(e) {
            o.updateUserInfo(), t && (wx.showToast({
                icon: "none",
                title: "保存成功"
            }), setTimeout(function() {
                wx.navigateBack({
                    delta: -1
                });
            }, 1e3));
        });
    },
    updateUserInfo: function() {
        dataApi.userinfo({
            uid: wx.getStorageSync("uid"),
            op: "getinfo"
        }).then(function(e) {
            console.log(e), app.globalData.userinfo = e.data.info;
        }).catch(function(e) {});
    },
    onShareAppMessage: function() {}
});