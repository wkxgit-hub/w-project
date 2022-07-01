var _component = require("../common/component");

(0, _component.VantComponent)({
    relation: {
        name: "badge",
        type: "descendant",
        linked: function(e) {
            this.badges.push(e), this.setActive(this.data.active);
        },
        unlinked: function(t) {
            this.badges = this.badges.filter(function(e) {
                return e !== t;
            }), this.setActive(this.data.active);
        }
    },
    props: {
        active: {
            type: Number,
            value: 0,
            observer: "setActive"
        }
    },
    beforeCreate: function() {
        this.badges = [], this.currentActive = -1;
    },
    methods: {
        setActive: function(e) {
            var t = this.badges, i = this.currentActive;
            if (!t.length) return Promise.resolve();
            var s = [];
            return i !== (this.currentActive = e) && t[i] && s.push(t[i].setActive(!1)), t[e] && s.push(t[e].setActive(!0)), 
            Promise.all(s);
        }
    }
});