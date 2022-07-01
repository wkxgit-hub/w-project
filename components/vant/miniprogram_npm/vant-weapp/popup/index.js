var _component = require("../common/component"), _transition = require("../mixins/transition"), _safeArea = require("../mixins/safe-area");

(0, _component.VantComponent)({
    classes: [ "enter-class", "enter-active-class", "enter-to-class", "leave-class", "leave-active-class", "leave-to-class" ],
    mixins: [ (0, _transition.transition)(!1), (0, _safeArea.safeArea)() ],
    props: {
        transition: {
            type: String,
            observer: "observeClass"
        },
        customStyle: String,
        overlayStyle: String,
        zIndex: {
            type: Number,
            value: 100
        },
        overlay: {
            type: Boolean,
            value: !0
        },
        closeOnClickOverlay: {
            type: Boolean,
            value: !0
        },
        position: {
            type: String,
            value: "center",
            observer: "observeClass"
        }
    },
    created: function() {
        this.observeClass();
    },
    methods: {
        onClickOverlay: function() {
            this.$emit("click-overlay"), this.data.closeOnClickOverlay && this.$emit("close");
        },
        observeClass: function() {
            var e = this.data, s = e.transition, t = e.position;
            this.updateClasses(s || t), "none" === s && this.set({
                duration: 0
            });
        }
    }
});