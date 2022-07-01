var _component = require("../common/component"), _link = require("../mixins/link"), _button = require("../mixins/button"), _openType = require("../mixins/open-type");

(0, _component.VantComponent)({
    mixins: [ _link.link, _button.button, _openType.openType ],
    props: {
        text: String,
        loading: Boolean,
        disabled: Boolean,
        type: {
            type: String,
            value: "danger"
        }
    },
    methods: {
        onClick: function(n) {
            this.$emit("click", n.detail), this.jumpLink();
        }
    }
});