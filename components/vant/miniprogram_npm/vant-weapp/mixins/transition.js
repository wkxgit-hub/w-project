Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.transition = void 0;

var _utils = require("../common/utils"), getClassNames = function(e) {
    return {
        enter: "van-" + e + "-enter van-" + e + "-enter-active enter-class enter-active-class",
        "enter-to": "van-" + e + "-enter-to van-" + e + "-enter-active enter-to-class enter-active-class",
        leave: "van-" + e + "-leave van-" + e + "-leave-active leave-class leave-active-class",
        "leave-to": "van-" + e + "-leave-to van-" + e + "-leave-active leave-to-class leave-active-class"
    };
}, nextTick = function() {
    return new Promise(function(e) {
        return setTimeout(e, 50);
    });
}, transition = exports.transition = function(e) {
    return Behavior({
        properties: {
            customStyle: String,
            show: {
                type: Boolean,
                value: e,
                observer: "observeShow"
            },
            duration: {
                type: [ Number, Object ],
                value: 300,
                observer: "observeDuration"
            },
            name: {
                type: String,
                value: "fade",
                observer: "updateClasses"
            }
        },
        data: {
            type: "",
            inited: !1,
            display: !1,
            classNames: getClassNames("fade")
        },
        attached: function() {
            this.data.show && this.show();
        },
        methods: {
            observeShow: function(e) {
                e ? this.show() : this.leave();
            },
            updateClasses: function(e) {
                this.set({
                    classNames: getClassNames(e)
                });
            },
            show: function() {
                var e = this, t = this.data, s = t.classNames, n = t.duration, a = (0, _utils.isObj)(n) ? n.leave : n;
                Promise.resolve().then(nextTick).then(function() {
                    return e.set({
                        inited: !0,
                        display: !0,
                        classes: s.enter,
                        currentDuration: a
                    });
                }).then(nextTick).then(function() {
                    return e.set({
                        classes: s["enter-to"]
                    });
                });
            },
            leave: function() {
                var e = this, t = this.data, s = t.classNames, n = t.duration, a = (0, _utils.isObj)(n) ? n.leave : n;
                Promise.resolve().then(nextTick).then(function() {
                    return e.set({
                        classes: s.leave,
                        currentDuration: a
                    });
                }).then(function() {
                    return setTimeout(function() {
                        return e.onTransitionEnd();
                    }, a);
                }).then(nextTick).then(function() {
                    return e.set({
                        classes: s["leave-to"]
                    });
                });
            },
            onTransitionEnd: function() {
                this.data.show || (this.set({
                    display: !1
                }), this.$emit("transitionEnd"));
            }
        }
    });
};