var _component = require("../common/component"), _color = require("../common/color");

function _defineProperty(o, r, e) {
    return r in o ? Object.defineProperty(o, r, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : o[r] = e, o;
}

var DEFAULT_COLOR = "#999", COLOR_MAP = {
    danger: _color.RED,
    primary: _color.BLUE,
    success: _color.GREEN
};

(0, _component.VantComponent)({
    props: {
        size: String,
        type: String,
        mark: Boolean,
        color: String,
        plain: Boolean,
        round: Boolean,
        textColor: String
    },
    computed: {
        style: function() {
            var o = this.data.color || COLOR_MAP[this.data.type] || DEFAULT_COLOR, r = _defineProperty({}, this.data.plain ? "color" : "background-color", o);
            return this.data.textColor && (r.color = this.data.textColor), Object.keys(r).map(function(o) {
                return o + ": " + r[o];
            }).join(";");
        }
    }
});