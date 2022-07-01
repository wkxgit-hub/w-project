Object.defineProperty(exports, "__esModule", {
    value: !0
});

var basic = exports.basic = Behavior({
    methods: {
        $emit: function() {
            this.triggerEvent.apply(this, arguments);
        },
        getRect: function(e, r) {
            var i = this;
            return new Promise(function(t) {
                wx.createSelectorQuery().in(i)[r ? "selectAll" : "select"](e).boundingClientRect(function(e) {
                    r && Array.isArray(e) && e.length && t(e), !r && e && t(e);
                }).exec();
            });
        }
    }
});