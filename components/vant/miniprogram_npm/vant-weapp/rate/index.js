var _component = require("../common/component");

(0, _component.VantComponent)({
    field: !0,
    classes: [ "icon-class" ],
    props: {
        value: Number,
        readonly: Boolean,
        disabled: Boolean,
        allowHalf: Boolean,
        size: {
            type: Number,
            value: 20
        },
        icon: {
            type: String,
            value: "star"
        },
        voidIcon: {
            type: String,
            value: "star-o"
        },
        color: {
            type: String,
            value: "#ffd21e"
        },
        voidColor: {
            type: String,
            value: "#c7c7c7"
        },
        disabledColor: {
            type: String,
            value: "#bdbdbd"
        },
        count: {
            type: Number,
            value: 5
        }
    },
    data: {
        innerValue: 0
    },
    watch: {
        value: function(e) {
            e !== this.data.innerValue && this.set({
                innerValue: e
            });
        }
    },
    methods: {
        onSelect: function(e) {
            var t = this.data, n = e.currentTarget.dataset.score;
            t.disabled || t.readonly || (this.set({
                innerValue: n + 1
            }), this.$emit("input", n + 1), this.$emit("change", n + 1));
        },
        onTouchMove: function(n) {
            var o = this, e = n.touches[0], a = e.clientX, i = e.clientY;
            this.getRect(".van-rate__icon", !0).then(function(e) {
                var t = e.sort(function(e) {
                    return e.right - e.left;
                }).find(function(e) {
                    return a >= e.left && a <= e.right && i >= e.top && i <= e.bottom;
                });
                null != t && o.onSelect(Object.assign({}, n, {
                    currentTarget: t
                }));
            });
        }
    }
});