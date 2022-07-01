var _component = require("../common/component"), ITEM_HEIGHT = 44;

(0, _component.VantComponent)({
    classes: [ "main-item-class", "content-item-class", "main-active-class", "content-active-class", "main-disabled-class", "content-disabled-class" ],
    props: {
        items: Array,
        mainActiveIndex: {
            type: Number,
            value: 0
        },
        activeId: {
            type: [ Number, String ]
        },
        maxHeight: {
            type: Number,
            value: 300
        }
    },
    data: {
        subItems: [],
        mainHeight: 0,
        itemHeight: 0
    },
    watch: {
        items: function() {
            var t = this;
            this.updateSubItems().then(function() {
                t.updateMainHeight();
            });
        },
        maxHeight: function() {
            this.updateItemHeight(this.data.subItems), this.updateMainHeight();
        },
        mainActiveIndex: "updateSubItems"
    },
    methods: {
        onSelectItem: function(t) {
            var e = t.currentTarget.dataset.item;
            e.disabled || this.$emit("click-item", e);
        },
        onClickNav: function(t) {
            var e = t.currentTarget.dataset.index;
            this.data.items[e].disabled || this.$emit("click-nav", {
                index: e
            });
        },
        updateSubItems: function() {
            var t = this.data, e = (t.items[t.mainActiveIndex] || {}).children, i = void 0 === e ? [] : e;
            return this.updateItemHeight(i), this.set({
                subItems: i
            });
        },
        updateMainHeight: function() {
            var t = this.data, e = t.items, i = void 0 === e ? [] : e, a = t.subItems, n = void 0 === a ? [] : a, s = Math.max(i.length * ITEM_HEIGHT, n.length * ITEM_HEIGHT);
            this.set({
                mainHeight: Math.min(s, this.data.maxHeight)
            });
        },
        updateItemHeight: function(t) {
            var e = Math.min(t.length * ITEM_HEIGHT, this.data.maxHeight);
            return this.set({
                itemHeight: e
            });
        }
    }
});