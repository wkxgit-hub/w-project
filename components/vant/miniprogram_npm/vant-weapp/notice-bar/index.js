var _slicedToArray = function(t, e) {
    if (Array.isArray(t)) return t;
    if (Symbol.iterator in Object(t)) return function(t, e) {
        var i = [], n = !0, r = !1, a = void 0;
        try {
            for (var o, l = t[Symbol.iterator](); !(n = (o = l.next()).done) && (i.push(o.value), 
            !e || i.length !== e); n = !0) ;
        } catch (t) {
            r = !0, a = t;
        } finally {
            try {
                !n && l.return && l.return();
            } finally {
                if (r) throw a;
            }
        }
        return i;
    }(t, e);
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
}, _component = require("../common/component"), FONT_COLOR = "#ed6a0c", BG_COLOR = "#fffbe8";

(0, _component.VantComponent)({
    props: {
        text: {
            type: String,
            value: ""
        },
        mode: {
            type: String,
            value: ""
        },
        url: {
            type: String,
            value: ""
        },
        openType: {
            type: String,
            value: "navigate"
        },
        delay: {
            type: Number,
            value: 1
        },
        speed: {
            type: Number,
            value: 50
        },
        scrollable: {
            type: Boolean,
            value: !0
        },
        leftIcon: {
            type: String,
            value: ""
        },
        color: {
            type: String,
            value: FONT_COLOR
        },
        backgroundColor: {
            type: String,
            value: BG_COLOR
        },
        wrapable: Boolean
    },
    data: {
        show: !0
    },
    watch: {
        text: function() {
            this.set({}, this.init);
        }
    },
    created: function() {
        this.resetAnimation = wx.createAnimation({
            duration: 0,
            timingFunction: "linear"
        });
    },
    destroyed: function() {
        this.timer && clearTimeout(this.timer);
    },
    methods: {
        init: function() {
            var c = this;
            Promise.all([ this.getRect(".van-notice-bar__content"), this.getRect(".van-notice-bar__wrap") ]).then(function(t) {
                var e = _slicedToArray(t, 2), i = e[0], n = e[1];
                if (null != i && null != n && i.width && n.width) {
                    var r = c.data, a = r.speed, o = r.scrollable, l = r.delay;
                    if (o && n.width < i.width) {
                        var s = i.width / a * 1e3;
                        c.wrapWidth = n.width, c.contentWidth = i.width, c.duration = s, c.animation = wx.createAnimation({
                            duration: s,
                            timingFunction: "linear",
                            delay: l
                        }), c.scroll();
                    }
                }
            });
        },
        scroll: function() {
            var t = this;
            this.timer && clearTimeout(this.timer), this.timer = null, this.set({
                animationData: this.resetAnimation.translateX(this.wrapWidth).step().export()
            }), setTimeout(function() {
                t.set({
                    animationData: t.animation.translateX(-t.contentWidth).step().export()
                });
            }, 20), this.timer = setTimeout(function() {
                t.scroll();
            }, this.duration);
        },
        onClickIcon: function() {
            this.timer && clearTimeout(this.timer), this.timer = null, this.set({
                show: !1
            });
        },
        onClick: function(t) {
            this.$emit("click", t);
        }
    }
});