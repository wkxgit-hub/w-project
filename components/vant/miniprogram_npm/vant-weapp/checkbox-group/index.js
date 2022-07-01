var _component = require("../common/component");

(0, _component.VantComponent)({
    field: !0,
    relation: {
        name: "checkbox",
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
        max: Number,
        value: {
            type: Array,
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
                value: -1 !== t.indexOf(e.data.name),
                disabled: i || e.data.disabled
            });
        }
    }
});