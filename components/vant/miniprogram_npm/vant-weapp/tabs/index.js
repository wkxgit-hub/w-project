var _slicedToArray = function(t, e) {
    if (Array.isArray(t)) return t;
    if (Symbol.iterator in Object(t)) return function(t, e) {
        var i = [], n = !0, a = !1, s = void 0;
        try {
            for (var o, r = t[Symbol.iterator](); !(n = (o = r.next()).done) && (i.push(o.value), 
            !e || i.length !== e); n = !0) ;
        } catch (t) {
            a = !0, s = t;
        } finally {
            try {
                !n && r.return && r.return();
            } finally {
                if (a) throw s;
            }
        }
        return i;
    }(t, e);
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
}, _component = require("../common/component"), _touch = require("../mixins/touch");

(0, _component.VantComponent)({
    mixins: [ _touch.touch ],
    classes: [ "nav-class", "tab-class", "tab-active-class", "line-class" ],
    relation: {
        name: "tab",
        type: "descendant",
        linked: function(t) {
            this.child.push(t), this.updateTabs(this.data.tabs.concat(t.data));
        },
        unlinked: function(t) {
            var e = this.child.indexOf(t), i = this.data.tabs;
            i.splice(e, 1), this.child.splice(e, 1), this.updateTabs(i);
        }
    },
    props: {
        color: String,
        sticky: Boolean,
        animated: Boolean,
        swipeable: Boolean,
        lineWidth: {
            type: Number,
            value: -1
        },
        lineHeight: {
            type: Number,
            value: -1
        },
        active: {
            type: Number,
            value: 0
        },
        type: {
            type: String,
            value: "line"
        },
        border: {
            type: Boolean,
            value: !0
        },
        duration: {
            type: Number,
            value: .3
        },
        zIndex: {
            type: Number,
            value: 1
        },
        swipeThreshold: {
            type: Number,
            value: 4
        },
        offsetTop: {
            type: Number,
            value: 0
        }
    },
    data: {
        tabs: [],
        lineStyle: "",
        scrollLeft: 0,
        scrollable: !1,
        trackStyle: "",
        wrapStyle: "",
        position: ""
    },
    watch: {
        swipeThreshold: function() {
            this.set({
                scrollable: this.child.length > this.data.swipeThreshold
            });
        },
        color: "setLine",
        lineWidth: "setLine",
        lineHeight: "setLine",
        active: "setActiveTab",
        animated: "setTrack",
        offsetTop: "setWrapStyle"
    },
    beforeCreate: function() {
        this.child = [];
    },
    mounted: function() {
        var e = this;
        this.setLine(!0), this.setTrack(), this.scrollIntoView(), this.getRect(".van-tabs__wrap").then(function(t) {
            e.navHeight = t.height, e.observerContentScroll();
        });
    },
    destroyed: function() {
        this.createIntersectionObserver().disconnect();
    },
    methods: {
        updateTabs: function(t) {
            t = t || this.data.tabs, this.set({
                tabs: t,
                scrollable: t.length > this.data.swipeThreshold
            }), this.setActiveTab();
        },
        trigger: function(t, e) {
            this.$emit(t, {
                index: e,
                title: this.data.tabs[e].title
            });
        },
        onTap: function(t) {
            var e = t.currentTarget.dataset.index;
            this.data.tabs[e].disabled ? this.trigger("disabled", e) : (this.trigger("click", e), 
            this.setActive(e));
        },
        setActive: function(t) {
            t !== this.data.active && (this.trigger("change", t), this.set({
                active: t
            }), this.setActiveTab());
        },
        setLine: function(o) {
            var r = this;
            if ("line" === this.data.type) {
                var t = this.data, c = t.color, h = t.active, l = t.duration, d = t.lineWidth, u = t.lineHeight;
                this.getRect(".van-tab", !0).then(function(t) {
                    var e = t[h], i = -1 !== d ? d : e.width / 2, n = -1 !== u ? "height: " + u + "px;" : "", a = t.slice(0, h).reduce(function(t, e) {
                        return t + e.width;
                    }, 0);
                    a += (e.width - i) / 2;
                    var s = o ? "" : "transition-duration: " + l + "s; -webkit-transition-duration: " + l + "s;";
                    r.set({
                        lineStyle: "\n            " + n + "\n            width: " + i + "px;\n            background-color: " + c + ";\n            -webkit-transform: translateX(" + a + "px);\n            transform: translateX(" + a + "px);\n            " + s + "\n          "
                    });
                });
            }
        },
        setTrack: function() {
            var n = this, t = this.data, a = t.animated, s = t.active, o = t.duration;
            if (!a) return "";
            this.getRect(".van-tabs__content").then(function(t) {
                var e = t.width;
                n.set({
                    trackStyle: "\n            width: " + e * n.child.length + "px;\n            left: " + -1 * s * e + "px;\n            transition: left " + o + "s;\n            display: -webkit-box;\n            display: flex;\n          "
                });
                var i = {
                    width: e,
                    animated: a
                };
                n.child.forEach(function(t) {
                    t.set(i);
                });
            });
        },
        setActiveTab: function() {
            var n = this;
            this.child.forEach(function(t, e) {
                var i = {
                    active: e === n.data.active
                };
                i.active && (i.inited = !0), i.active !== t.data.active && t.set(i);
            }), this.set({}, function() {
                n.setLine(), n.setTrack(), n.scrollIntoView();
            });
        },
        scrollIntoView: function() {
            var o = this, t = this.data, r = t.active;
            t.scrollable && Promise.all([ this.getRect(".van-tab", !0), this.getRect(".van-tabs__nav") ]).then(function(t) {
                var e = _slicedToArray(t, 2), i = e[0], n = e[1], a = i[r], s = i.slice(0, r).reduce(function(t, e) {
                    return t + e.width;
                }, 0);
                o.set({
                    scrollLeft: s - (n.width - a.width) / 2
                });
            });
        },
        onTouchStart: function(t) {
            this.data.swipeable && this.touchStart(t);
        },
        onTouchMove: function(t) {
            this.data.swipeable && this.touchMove(t);
        },
        onTouchEnd: function() {
            if (this.data.swipeable) {
                var t = this.data, e = t.active, i = t.tabs, n = this.direction, a = this.deltaX, s = this.offsetX;
                "horizontal" === n && 50 <= s && (0 < a && 0 !== e ? this.setActive(e - 1) : a < 0 && e !== i.length - 1 && this.setActive(e + 1));
            }
        },
        setWrapStyle: function() {
            var t = this.data, e = t.offsetTop, i = void 0;
            switch (t.position) {
              case "top":
                i = "\n            top: " + e + "px;\n            position: fixed;\n          ";
                break;

              case "bottom":
                i = "\n            top: auto;\n            bottom: 0;\n          ";
                break;

              default:
                i = "";
            }
            i !== this.data.wrapStyle && this.set({
                wrapStyle: i
            });
        },
        observerContentScroll: function() {
            var a = this;
            if (this.data.sticky) {
                var s = this.data.offsetTop, t = wx.getSystemInfoSync().windowHeight;
                this.createIntersectionObserver().disconnect(), this.createIntersectionObserver().relativeToViewport({
                    top: -(this.navHeight + s)
                }).observe(".van-tabs", function(t) {
                    var e = t.boundingClientRect.top;
                    if (!(s < e)) {
                        var i = 0 < t.intersectionRatio ? "top" : "bottom";
                        a.$emit("scroll", {
                            scrollTop: e + s,
                            isFixed: "top" === i
                        }), a.setPosition(i);
                    }
                }), this.createIntersectionObserver().relativeToViewport({
                    bottom: -(t - 1 - s)
                }).observe(".van-tabs", function(t) {
                    var e = t.boundingClientRect, i = e.top;
                    if (!(e.bottom < a.navHeight)) {
                        var n = 0 < t.intersectionRatio ? "top" : "";
                        a.$emit("scroll", {
                            scrollTop: i + s,
                            isFixed: "top" === n
                        }), a.setPosition(n);
                    }
                });
            }
        },
        setPosition: function(t) {
            var e = this;
            t !== this.data.position && this.set({
                position: t
            }).then(function() {
                e.setWrapStyle();
            });
        }
    }
});