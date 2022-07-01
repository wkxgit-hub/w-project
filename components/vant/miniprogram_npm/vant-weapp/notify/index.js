var _component = require("../common/component"), _color = require("../common/color"), _safeArea = require("../mixins/safe-area");

(0, _component.VantComponent)({
    mixins: [ (0, _safeArea.safeArea)() ],
    props: {
        text: String,
        color: {
            type: String,
            value: "#fff"
        },
        backgroundColor: {
            type: String,
            value: _color.RED
        },
        duration: {
            type: Number,
            value: 3e3
        },
        zIndex: {
            type: Number,
            value: 110
        }
    },
    methods: {
        show: function() {
            var e = this, t = this.data.duration;
            clearTimeout(this.timer), this.set({
                show: !0
            }), 0 < t && t !== 1 / 0 && (this.timer = setTimeout(function() {
                e.hide();
            }, t));
        },
        hide: function() {
            clearTimeout(this.timer), this.set({
                show: !1
            });
        }
    }
});