var _component = require("../common/component"), _touch = require("../mixins/touch"), THRESHOLD = .3;

(0, _component.VantComponent)({
    props: {
        disabled: Boolean,
        leftWidth: {
            type: Number,
            value: 0
        },
        rightWidth: {
            type: Number,
            value: 0
        },
        asyncClose: Boolean
    },
    mixins: [ _touch.touch ],
    data: {
        catchMove: !0
    },
    created: function() {
        this.offset = 0;
    },
    methods: {
        open: function(t) {
            var i = this.data, e = i.leftWidth, s = i.rightWidth, o = "left" === t ? e : -s;
            this.swipeMove(o);
        },
        close: function() {
            this.swipeMove(0);
        },
        swipeMove: function() {
            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0, i = "translate3d(" + (this.offset = t) + "px, 0, 0)", e = this.draging ? "none" : ".6s cubic-bezier(0.18, 0.89, 0.32, 1)";
            this.set({
                wrapperStyle: "\n        -webkit-transform: " + i + ";\n        -webkit-transition: " + e + ";\n        transform: " + i + ";\n        transition: " + e + ";\n      "
            });
        },
        swipeLeaveTransition: function() {
            var t = this.data, i = t.leftWidth, e = t.rightWidth, s = this.offset;
            0 < e && e * THRESHOLD < -s ? this.open("right") : 0 < i && i * THRESHOLD < s ? this.open("left") : this.swipeMove(0);
        },
        startDrag: function(t) {
            this.data.disabled || (this.draging = !0, this.startOffset = this.offset, this.firstDirection = "", 
            this.touchStart(t));
        },
        noop: function() {},
        onDrag: function(t) {
            if (!this.data.disabled && (this.touchMove(t), this.firstDirection || (this.firstDirection = this.direction, 
            this.set({
                catchMove: "horizontal" === this.firstDirection
            })), "vertical" !== this.firstDirection)) {
                var i = this.data, e = i.leftWidth, s = i.rightWidth, o = this.startOffset + this.deltaX;
                0 < s && s < -o || 0 < e && e < o || this.swipeMove(o);
            }
        },
        endDrag: function() {
            this.data.disabled || (this.draging = !1, this.swipeLeaveTransition());
        },
        onClick: function(t) {
            var i = t.currentTarget.dataset.key, e = void 0 === i ? "outside" : i;
            this.$emit("click", e), this.offset && (this.data.asyncClose ? this.$emit("close", {
                position: e,
                instance: this
            }) : this.swipeMove(0));
        }
    }
});