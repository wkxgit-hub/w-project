var _component = require("../common/component");

function emit(e, t) {
    e.$emit("input", t), e.$emit("change", t);
}

(0, _component.VantComponent)({
    field: !0,
    relation: {
        name: "checkbox-group",
        type: "ancestor",
        linked: function(e) {
            this.parent = e;
        },
        unlinked: function() {
            this.parent = null;
        }
    },
    classes: [ "icon-class", "label-class" ],
    props: {
        value: Boolean,
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
        emitChange: function(e) {
            this.parent ? this.setParentValue(this.parent, e) : emit(this, e);
        },
        toggle: function() {
            var e = this.data, t = e.disabled, n = e.value;
            t || this.emitChange(!n);
        },
        onClickLabel: function() {
            var e = this.data, t = e.labelDisabled, n = e.disabled, a = e.value;
            n || t || this.emitChange(!a);
        },
        setParentValue: function(e, t) {
            var n = e.data.value.slice(), a = this.data.name, i = e.data.max;
            if (t) {
                if (i && n.length >= i) return;
                -1 === n.indexOf(a) && (n.push(a), emit(e, n));
            } else {
                var l = n.indexOf(a);
                -1 !== l && (n.splice(l, 1), emit(e, n));
            }
        }
    }
});