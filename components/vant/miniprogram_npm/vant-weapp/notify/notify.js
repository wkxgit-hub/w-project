Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = Notify;

var _utils = require("../common/utils"), defaultOptions = {
    selector: "#van-notify",
    duration: 3e3
};

function parseOptions(t) {
    return (0, _utils.isObj)(t) ? t : {
        text: t
    };
}

function getContext() {
    var t = getCurrentPages();
    return t[t.length - 1];
}

function Notify(t) {
    var e = ((t = Object.assign({}, defaultOptions, parseOptions(t))).context || getContext()).selectComponent(t.selector);
    delete t.selector, e ? (e.set(t), e.show()) : console.warn("未找到 van-notify 节点，请确认 selector 及 context 是否正确");
}