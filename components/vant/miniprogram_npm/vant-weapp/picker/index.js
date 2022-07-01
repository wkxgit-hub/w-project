var _component = require("../common/component"), _shared = require("./shared");

(0, _component.VantComponent)({
    classes: [ "active-class", "toolbar-class", "column-class" ],
    props: Object.assign({}, _shared.pickerProps, {
        valueKey: {
            type: String,
            value: "text"
        },
        defaultIndex: {
            type: Number,
            value: 0
        },
        columns: {
            type: Array,
            value: [],
            observer: function() {
                var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : [];
                this.simple = e.length && !e[0].values, this.children = this.selectAllComponents(".van-picker__column"), 
                Array.isArray(this.children) && this.children.length && this.setColumns().catch(function() {});
            }
        }
    }),
    beforeCreate: function() {
        this.children = [];
    },
    methods: {
        noop: function() {},
        setColumns: function() {
            var n = this, e = this.data, t = (this.simple ? [ {
                values: e.columns
            } ] : e.columns).map(function(e, t) {
                return n.setColumnValues(t, e.values);
            });
            return Promise.all(t);
        },
        emit: function(e) {
            var t = e.currentTarget.dataset.type;
            this.simple ? this.$emit(t, {
                value: this.getColumnValue(0),
                index: this.getColumnIndex(0)
            }) : this.$emit(t, {
                value: this.getValues(),
                index: this.getIndexes()
            });
        },
        onChange: function(e) {
            this.simple ? this.$emit("change", {
                picker: this,
                value: this.getColumnValue(0),
                index: this.getColumnIndex(0)
            }) : this.$emit("change", {
                picker: this,
                value: this.getValues(),
                index: e.currentTarget.dataset.index
            });
        },
        getColumn: function(e) {
            return this.children[e];
        },
        getColumnValue: function(e) {
            var t = this.getColumn(e);
            return t && t.getValue();
        },
        setColumnValue: function(e, t) {
            var n = this.getColumn(e);
            return null == n ? Promise.reject("setColumnValue: 对应列不存在") : n.setValue(t);
        },
        getColumnIndex: function(e) {
            return (this.getColumn(e) || {}).data.currentIndex;
        },
        setColumnIndex: function(e, t) {
            var n = this.getColumn(e);
            return null == n ? Promise.reject("setColumnIndex: 对应列不存在") : n.setIndex(t);
        },
        getColumnValues: function(e) {
            return (this.children[e] || {}).data.options;
        },
        setColumnValues: function(e, t) {
            var n = !(2 < arguments.length && void 0 !== arguments[2]) || arguments[2], s = this.children[e];
            return null == s ? Promise.reject("setColumnValues: 对应列不存在") : JSON.stringify(s.data.options) === JSON.stringify(t) ? Promise.resolve() : s.set({
                options: t
            }).then(function() {
                n && s.setIndex(0);
            });
        },
        getValues: function() {
            return this.children.map(function(e) {
                return e.getValue();
            });
        },
        setValues: function(e) {
            var n = this, t = e.map(function(e, t) {
                return n.setColumnValue(t, e);
            });
            return Promise.all(t);
        },
        getIndexes: function() {
            return this.children.map(function(e) {
                return e.data.currentIndex;
            });
        },
        setIndexes: function(e) {
            var n = this, t = e.map(function(e, t) {
                return n.setColumnIndex(t, e);
            });
            return Promise.all(t);
        }
    }
});