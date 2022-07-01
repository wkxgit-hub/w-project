var _component = require("../common/component");

(0, _component.VantComponent)({
    props: {
        info: null,
        icon: String,
        dot: Boolean
    },
    relation: {
        name: "tabbar",
        type: "ancestor",
        linked: function(t) {
            this.parent = t;
        }
    },
    data: {
        active: !1
    },
    methods: {
        onClick: function() {
            this.parent && this.parent.onChange(this), this.$emit("click");
        },
        setActive: function(t) {
            var n = t.active, e = t.color;
            return this.data.active !== n ? this.set({
                active: n,
                color: e
            }) : Promise.resolve();
        }
    }
});