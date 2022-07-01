function setAsync(e, s) {
    return new Promise(function(t) {
        e.setData(s, t);
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var behavior = exports.behavior = Behavior({
    created: function() {
        var n = this;
        if (this.$options) {
            var i = {}, o = this.$options().computed, t = Object.keys(o);
            this.calcComputed = function() {
                var s = {};
                return t.forEach(function(t) {
                    var e = o[t].call(n);
                    i[t] !== e && (i[t] = s[t] = e);
                }), s;
            };
        }
    },
    attached: function() {
        this.set();
    },
    methods: {
        set: function(t, e) {
            var s = this, n = [];
            return t && n.push(setAsync(this, t)), this.calcComputed && n.push(setAsync(this, this.calcComputed())), 
            Promise.all(n).then(function(t) {
                return e && "function" == typeof e && e.call(s), t;
            });
        }
    }
});