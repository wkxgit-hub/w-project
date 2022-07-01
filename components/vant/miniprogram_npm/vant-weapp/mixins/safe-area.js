Object.defineProperty(exports, "__esModule", {
    value: !0
});

var cache = null;

function getSafeArea() {
    return new Promise(function(r, e) {
        null != cache ? r(cache) : wx.getSystemInfo({
            success: function(e) {
                var t = e.model, a = e.screenHeight, s = e.statusBarHeight, n = /iphone x/i.test(t), o = /iPhone11/i.test(t) && 812 === a;
                r(cache = {
                    isIPhoneX: n || o,
                    statusBarHeight: s
                });
            },
            fail: e
        });
    });
}

var safeArea = exports.safeArea = function() {
    var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, t = e.safeAreaInsetBottom, a = void 0 === t || t, s = e.safeAreaInsetTop;
    return Behavior({
        properties: {
            safeAreaInsetTop: {
                type: Boolean,
                value: void 0 !== s && s
            },
            safeAreaInsetBottom: {
                type: Boolean,
                value: a
            }
        },
        created: function() {
            var s = this;
            getSafeArea().then(function(e) {
                var t = e.isIPhoneX, a = e.statusBarHeight;
                s.set({
                    isIPhoneX: t,
                    statusBarHeight: a
                });
            });
        }
    });
};