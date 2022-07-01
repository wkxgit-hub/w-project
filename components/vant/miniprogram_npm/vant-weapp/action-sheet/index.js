var _component = require("../common/component"), _safeArea = require("../mixins/safe-area");

(0, _component.VantComponent)({
    mixins: [ (0, _safeArea.safeArea)() ],
    props: {
        show: Boolean,
        title: String,
        cancelText: String,
        zIndex: {
            type: Number,
            value: 100
        },
        actions: {
            type: Array,
            value: []
        },
        overlay: {
            type: Boolean,
            value: !0
        },
        closeOnClickOverlay: {
            type: Boolean,
            value: !0
        }
    },
    methods: {
        onSelect: function(e) {
            var n = e.currentTarget.dataset.index, t = this.data.actions[n];
            !t || t.disabled || t.loading || this.$emit("select", t);
        },
        onCancel: function() {
            this.$emit("cancel");
        },
        onClose: function() {
            this.$emit("close");
        }
    }
});