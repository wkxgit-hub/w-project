var _component = require("../common/component");

(0, _component.VantComponent)({
    relation: {
        type: "ancestor",
        name: "badge-group",
        linked: function(t) {
            this.parent = t;
        }
    },
    props: {
        info: null,
        title: String
    },
    methods: {
        onClick: function() {
            var t = this, n = this.parent;
            if (n) {
                var e = n.badges.indexOf(this);
                n.setActive(e).then(function() {
                    t.$emit("click", e), n.$emit("change", e);
                });
            }
        },
        setActive: function(t) {
            return this.set({
                active: t
            });
        }
    }
});