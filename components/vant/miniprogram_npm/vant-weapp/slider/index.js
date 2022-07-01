var _component = require("../common/component"), _touch = require("../mixins/touch");

(0, _component.VantComponent)({
    mixins: [ _touch.touch ],
    props: {
        disabled: Boolean,
        useButtonSlot: Boolean,
        activeColor: String,
        inactiveColor: String,
        max: {
            type: Number,
            value: 100
        },
        min: {
            type: Number,
            value: 0
        },
        step: {
            type: Number,
            value: 1
        },
        value: {
            type: Number,
            value: 0
        },
        barHeight: {
            type: String,
            value: "2px"
        }
    },
    watch: {
        value: function(t) {
            this.updateValue(t, !1);
        }
    },
    created: function() {
        this.updateValue(this.data.value);
    },
    methods: {
        onTouchStart: function(t) {
            this.data.disabled || (this.touchStart(t), this.startValue = this.format(this.data.value));
        },
        onTouchMove: function(t) {
            var a = this;
            this.data.disabled || (this.touchMove(t), this.getRect(".van-slider").then(function(t) {
                var e = a.deltaX / t.width * 100;
                a.newValue = a.startValue + e, a.updateValue(a.newValue, !1, !0);
            }));
        },
        onTouchEnd: function() {
            this.data.disabled || this.updateValue(this.newValue, !0);
        },
        onClick: function(a) {
            var i = this;
            this.data.disabled || this.getRect(".van-slider").then(function(t) {
                var e = (a.detail.x - t.left) / t.width * 100;
                i.updateValue(e, !0);
            });
        },
        updateValue: function(t, e, a) {
            t = this.format(t), this.set({
                value: t,
                barStyle: "width: " + t + "%; height: " + this.data.barHeight + ";"
            }), a && this.$emit("drag", {
                value: t
            }), e && this.$emit("change", t);
        },
        format: function(t) {
            var e = this.data, a = e.max, i = e.min, u = e.step;
            return Math.round(Math.max(i, Math.min(t, a)) / u) * u;
        }
    }
});