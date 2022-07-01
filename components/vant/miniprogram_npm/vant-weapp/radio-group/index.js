var _component = require("../common/component");

(0, _component.VantComponent)({
    field: !0,
    relation: {
        name: "radio",
        type: "descendant",
        linked: function(e) {
            this.children = this.children || [], this.children.push(e), this.updateChild(e);
        },
        unlinked: function(n) {
            this.children = this.children.filter(function(e) {
                return e !== n;
            });
        }
    },
    props: {
        value: {
            type: null,
            observer: "updateChildren"
        },
        disabled: {
            type: Boolean,
            observer: "updateChildren"
        }
    },
    methods: {
        updateChildren: function() {
            var n = this;
            (this.children || []).forEach(function(e) {
                return n.updateChild(e);
            });
        },
        updateChild: function(e) {
            var n = this.data, t = n.value, i = n.disabled;
            e.set({
                value: t,
                disabled: i || e.data.disabled
            });
        }
    }
});