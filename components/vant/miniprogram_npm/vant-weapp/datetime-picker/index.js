var _slicedToArray = function(e, t) {
    if (Array.isArray(e)) return e;
    if (Symbol.iterator in Object(e)) return function(e, t) {
        var n = [], r = !0, a = !1, u = void 0;
        try {
            for (var i, o = e[Symbol.iterator](); !(r = (i = o.next()).done) && (n.push(i.value), 
            !t || n.length !== t); r = !0) ;
        } catch (e) {
            a = !0, u = e;
        } finally {
            try {
                !r && o.return && o.return();
            } finally {
                if (a) throw u;
            }
        }
        return n;
    }(e, t);
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
}, _component = require("../common/component"), _utils = require("../common/utils"), _shared = require("../picker/shared");

function _defineProperty(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e;
}

var currentYear = new Date().getFullYear();

function isValidDate(e) {
    return (0, _utils.isDef)(e) && !isNaN(new Date(e).getTime());
}

function range(e, t, n) {
    return Math.min(Math.max(e, t), n);
}

function padZero(e) {
    return ("00" + e).slice(-2);
}

function times(e, t) {
    for (var n = -1, r = Array(e < 0 ? 0 : e); ++n < e; ) r[n] = t(n);
    return r;
}

function getTrueValue(e) {
    if (e) {
        for (;isNaN(parseInt(e, 10)); ) e = e.slice(1);
        return parseInt(e, 10);
    }
}

function getMonthEndDay(e, t) {
    return 32 - new Date(e, t - 1, 32).getDate();
}

var defaultFormatter = function(e, t) {
    return t;
};

(0, _component.VantComponent)({
    classes: [ "active-class", "toolbar-class", "column-class" ],
    props: Object.assign({}, _shared.pickerProps, {
        formatter: {
            type: Function,
            value: defaultFormatter
        },
        value: null,
        type: {
            type: String,
            value: "datetime"
        },
        showToolbar: {
            type: Boolean,
            value: !0
        },
        minDate: {
            type: Number,
            value: new Date(currentYear - 10, 0, 1).getTime()
        },
        maxDate: {
            type: Number,
            value: new Date(currentYear + 10, 11, 31).getTime()
        },
        minHour: {
            type: Number,
            value: 0
        },
        maxHour: {
            type: Number,
            value: 23
        },
        minMinute: {
            type: Number,
            value: 0
        },
        maxMinute: {
            type: Number,
            value: 59
        }
    }),
    data: {
        innerValue: Date.now(),
        columns: []
    },
    watch: {
        value: function(e) {
            var t = this, n = this.data;
            (e = this.correctValue(e)) === n.innerValue || this.updateColumnValue(e).then(function() {
                t.$emit("input", e);
            });
        },
        type: "updateColumns",
        minHour: "updateColumns",
        maxHour: "updateColumns",
        minMinute: "updateColumns",
        maxMinute: "updateColumns"
    },
    methods: {
        getPicker: function() {
            if (null == this.picker) {
                var r = this.picker = this.selectComponent(".van-datetime-picker"), a = r.setColumnValues;
                r.setColumnValues = function() {
                    for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                    return a.apply(r, [].concat(t, [ !1 ]));
                };
            }
            return this.picker;
        },
        updateColumns: function() {
            var e = this.data.formatter, a = void 0 === e ? defaultFormatter : e, t = this.getRanges().map(function(e, t) {
                var n = e.type, r = e.range;
                return {
                    values: times(r[1] - r[0] + 1, function(e) {
                        var t = r[0] + e;
                        return t = "year" === n ? "" + t : padZero(t), a(n, t);
                    })
                };
            });
            return this.set({
                columns: t
            });
        },
        getRanges: function() {
            var e = this.data;
            if ("time" === e.type) return [ {
                type: "hour",
                range: [ e.minHour, e.maxHour ]
            }, {
                type: "minute",
                range: [ e.minMinute, e.maxMinute ]
            } ];
            var t = this.getBoundary("max", e.innerValue), n = t.maxYear, r = t.maxDate, a = t.maxMonth, u = t.maxHour, i = t.maxMinute, o = this.getBoundary("min", e.innerValue), m = o.minYear, l = o.minDate, s = [ {
                type: "year",
                range: [ m, n ]
            }, {
                type: "month",
                range: [ o.minMonth, a ]
            }, {
                type: "day",
                range: [ l, r ]
            }, {
                type: "hour",
                range: [ o.minHour, u ]
            }, {
                type: "minute",
                range: [ o.minMinute, i ]
            } ];
            return "date" === e.type && s.splice(3, 2), "year-month" === e.type && s.splice(2, 3), 
            s;
        },
        correctValue: function(e) {
            var t = this.data, n = "time" !== t.type;
            if (n && !isValidDate(e)) e = t.minDate; else if (!n && !e) {
                e = padZero(t.minHour) + ":00";
            }
            if (!n) {
                var r = e.split(":"), a = _slicedToArray(r, 2), u = a[0], i = a[1];
                return (u = padZero(range(u, t.minHour, t.maxHour))) + ":" + (i = padZero(range(i, t.minMinute, t.maxMinute)));
            }
            return e = Math.max(e, t.minDate), e = Math.min(e, t.maxDate);
        },
        getBoundary: function(e, t) {
            var n, r = new Date(t), a = new Date(this.data[e + "Date"]), u = a.getFullYear(), i = 1, o = 1, m = 0, l = 0;
            return "max" === e && (i = 12, o = getMonthEndDay(r.getFullYear(), r.getMonth() + 1), 
            m = 23, l = 59), r.getFullYear() === u && (i = a.getMonth() + 1, r.getMonth() + 1 === i && (o = a.getDate(), 
            r.getDate() === o && (m = a.getHours(), r.getHours() === m && (l = a.getMinutes())))), 
            _defineProperty(n = {}, e + "Year", u), _defineProperty(n, e + "Month", i), _defineProperty(n, e + "Date", o), 
            _defineProperty(n, e + "Hour", m), _defineProperty(n, e + "Minute", l), n;
        },
        onCancel: function() {
            this.$emit("cancel");
        },
        onConfirm: function() {
            this.$emit("confirm", this.data.innerValue);
        },
        onChange: function() {
            var e = this, t = this.data, n = void 0, r = this.getPicker();
            if ("time" === t.type) {
                var a = r.getIndexes();
                n = a[0] + t.minHour + ":" + (a[1] + t.minMinute);
            } else {
                var u = r.getValues(), i = getTrueValue(u[0]), o = getTrueValue(u[1]), m = getMonthEndDay(i, o), l = getTrueValue(u[2]);
                "year-month" === t.type && (l = 1), l = m < l ? m : l;
                var s = 0, c = 0;
                "datetime" === t.type && (s = getTrueValue(u[3]), c = getTrueValue(u[4])), n = new Date(i, o - 1, l, s, c);
            }
            n = this.correctValue(n), this.updateColumnValue(n).then(function() {
                e.$emit("input", n), e.$emit("change", r);
            });
        },
        updateColumnValue: function(e) {
            var t = this, n = [], r = this.data, a = r.type, u = r.formatter, i = void 0 === u ? defaultFormatter : u, o = this.getPicker();
            if ("time" === a) {
                var m = e.split(":");
                n = [ i("hour", m[0]), i("minute", m[1]) ];
            } else {
                var l = new Date(e);
                n = [ i("year", "" + l.getFullYear()), i("month", padZero(l.getMonth() + 1)) ], 
                "date" === a && n.push(i("day", padZero(l.getDate()))), "datetime" === a && n.push(i("day", padZero(l.getDate())), i("hour", padZero(l.getHours())), i("minute", padZero(l.getMinutes())));
            }
            return this.set({
                innerValue: e
            }).then(function() {
                return t.updateColumns();
            }).then(function() {
                return o.setValues(n);
            });
        }
    },
    created: function() {
        var e = this, t = this.correctValue(this.data.value);
        this.updateColumnValue(t).then(function() {
            e.$emit("input", t);
        });
    }
});