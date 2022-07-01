var app = getApp();

Page({
    data: {
        item: {
            link: "",
            title: ""
        },
        statusBarHeight: "",
        titleBarHeight: ""
    },
    onLoad: function(t) {
        this.setData({
            statusBarHeight: getApp().globalData.statusBarHeight,
            titleBarHeight: getApp().globalData.titleBarHeight
        }), wx.setNavigationBarTitle({
            title: app.globalData.item.title,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        }), this.setData({
            item: app.globalData.item
        }), console.log(app.globalData.item);
    },
    goBack: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    onShareAppMessage: function() {}
});