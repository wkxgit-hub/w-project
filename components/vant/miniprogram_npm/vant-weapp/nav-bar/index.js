var _component = require("../common/component"), _safeArea = require("../mixins/safe-area");

(0, _component.VantComponent)({
    mixins: [ (0, _safeArea.safeArea)({
        safeAreaInsetTop: !0
    }) ],
    classes: [ "title-class" ],
    props: {
        title: String,
        fixed: Boolean,
        leftText: String,
        rightText: String,
        leftArrow: Boolean,
        border: {
            type: Boolean,
            value: !0
        },
        zIndex: {
            type: Number,
            value: 120
        }
    },
    methods: {
        onClickLeft: function() {
            this.$emit("click-left");
        },
        onClickRight: function() {
            this.$emit("click-right");
        }
    }
});