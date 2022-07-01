var _component = require("../common/component");

(0, _component.VantComponent)({
    relation: {
        name: "collapse-item",
        type: "descendant",
        linked: function(e) {
            this.children.push(e);
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
            observer: "updateExpanded"
        },
        accordion: {
            type: Boolean,
            observer: "updateExpanded"
        },
        border: {
            type: Boolean,
            value: !0
        }
    },
    beforeCreate: function() {
        this.children = [];
    },
    methods: {
        updateExpanded: function() {
            this.children.forEach(function(e) {
                e.updateExpanded();
            });
        },
        switch: function(n, e) {
            var t = this.data, o = t.accordion, i = t.value;
            n = o ? e ? n : "" : e ? (i || []).concat(n) : (i || []).filter(function(e) {
                return e !== n;
            }), this.$emit("change", n), this.$emit("input", n);
        }
    }
});