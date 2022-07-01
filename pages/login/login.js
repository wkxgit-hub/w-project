var dataApi = require("../../provider/dataApi.js"), app = getApp();

Page({
    data: {
        statusBarHeight: "",
        titleBarHeight: "",
        canIUse: wx.canIUse("button.open-type.getUserInfo")
    },
    onLoad: function(t) {
        this.setData({
            statusBarHeight: getApp().globalData.statusBarHeight,
            titleBarHeight: getApp().globalData.titleBarHeight
        });
    },
    goBack: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    getUserInfo: function(t) {
        var a = this;
        console.log(a);
        (wx.showLoading({
            title: "加载中..."
        }),
        wx.getUserProfile({
            desc:"获取用户信息",
            success:function(tcodek){
                console.log(tcodek);
                wx.login({
                    success: function(t) {
                        var e = t.code;
                        wx.getSetting({
                            success: function(t) {
                                t.authSetting["scope.userInfo"] && 
                                
                                tcodek.userInfo, dataApi.login({
                                    code: e,
                                    encryptedData: tcodek.encryptedData,
                                    iv: tcodek.iv
                                }).then(function(t) {
                                    wx.setStorageSync("uid", t.data.uid), dataApi.userinfo({
                                        uid: t.data.uid,
                                        op: "getinfo"
                                    }).then(function(t) {
                                        console.log(t), wx.setStorageSync("userinfo", t.data.info), console.log(t.data.info.phone), 
                                        wx.reLaunch({
                                            url: "../home/home"
                                        });
                                    }).catch(function(t) {
                                        console.log(t);
                                    }), wx.hideLoading();
                                }).catch(function(t) {
                                    wx.hideLoading(), console.log(t), 1 == t.errno && wx.showToast({
                                        icon: "none",
                                        title: t.message
                                    });
                                }), a.userInfoReadyCallback && a.userInfoReadyCallback(t);
                            }
                        });
                    }
                })
            }
        }))
        
   
      
    },
    onShareAppMessage: function() {}
});