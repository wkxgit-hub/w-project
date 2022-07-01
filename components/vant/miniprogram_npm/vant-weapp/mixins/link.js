Object.defineProperty(exports, "__esModule", {
    value: !0
});

var link = exports.link = Behavior({
    properties: {
        url: String,
        linkType: {
            type: String,
            value: "navigateTo"
        }
    },
    methods: {
        jumpLink: function() {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "url", t = this.data[e];
            t && wx[this.data.linkType]({
                url: t
            });
        }
    }
});