var _component = require("../common/component");

(0, _component.VantComponent)({
    field: !0,
    relation: {
        name: "radio-group",
        type: "ancestor",
        linked: function(n) {
            this.parent = n;
        },
        unlinked: function() {
            this.parent = null;
        }
    },
    classes: [ "icon-class", "label-class" ],
    props: {
        value: null,
        disabled: Boolean,
        useIconSlot: Boolean,
        checkedColor: String,
        labelPosition: String,
        labelDisabled: Boolean,
        shape: {
            type: String,
            value: "round"
        }
    },
    methods: {
        emitChange: function(n) {
            var e = this.parent || this;
            e.$emit("input", n), e.$emit("change", n);
        },
        onChange: function(n) {
            console.log(n), this.emitChange(this.data.name);
        },
        onClickLabel: function() {
            var n = this.data, e = n.disabled, t = n.labelDisabled, a = n.name;
            e || t || this.emitChange(a);
        }
    }
});