App({
    onLaunch: function() {
        var e = this, s = this;
        wx.getSystemInfo({
            success: function(t) {
                console.log(t);
                var e;
                e = -1 !== t.model.indexOf("iPhone") ? 44 : 48, s.globalData.statusBarHeight = t.statusBarHeight, 
                s.globalData.titleBarHeight = e;
            },
            failure: function() {
                s.globalData.statusBarHeight = 0, s.globalData.titleBarHeight = 0;
            }
        });
        var t = wx.getStorageSync("logs") || [];
        t.unshift(Date.now()), wx.setStorageSync("logs", t), wx.login({
            success: function(t) {}
        }), wx.getSetting({
            success: function(t) {
                t.authSetting["scope.userInfo"] && wx.getUserInfo({
                    success: function(t) {
                        e.globalData.userInfo = t.userInfo, e.userInfoReadyCallback && e.userInfoReadyCallback(t);
                    }
                });
            }
        });
    },
    globalData: {
        userInfo: null
    },
    util: require("we7/resource/js/util.js"),
    siteInfo: require("siteinfo.js")
});