var _component = require("../common/component"), _button = require("../mixins/button"), _openType = require("../mixins/open-type");

(0, _component.VantComponent)({
    mixins: [ _button.button, _openType.openType ],
    classes: [ "hover-class", "loading-class" ],
    props: {
        plain: Boolean,
        block: Boolean,
        round: Boolean,
        square: Boolean,
        loading: Boolean,
        hairline: Boolean,
        disabled: Boolean,
        loadingText: String,
        type: {
            type: String,
            value: "default"
        },
        size: {
            type: String,
            value: "normal"
        },
        loadingSize: {
            type: String,
            value: "20px"
        }
    },
    methods: {
        onClick: function() {
            this.data.disabled || this.data.loading || this.$emit("click");
        }
    }
});