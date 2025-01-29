var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { ref } from 'vue';
import DemoComponent from '@/components/demoComponent.vue';
import useCommonStore from '@/stores/common';
// store
var startLoading = useCommonStore().startLoading;
var count = ref(10);
var inputValue = ref('');
var name = ref('');
var increase = function () {
    console.log('Increase!');
    return count.value++;
};
var decrease = function () {
    console.log('Decrease!');
    return count.value--;
};
var enterName = function ($event) {
    name.value = $event.target.value;
};
var resetName = function () {
    name.value = '';
};
var focusElement = function ($event) {
    var parentNode = $event.target
        .parentNode;
    if (parentNode instanceof HTMLLabelElement) {
        parentNode.classList.add('focused');
    }
};
var blurElement = function ($event) {
    var parentNode = $event.target
        .parentNode;
    if (parentNode instanceof HTMLLabelElement) {
        parentNode.classList.remove('focused');
    }
};
var clickEmit = ref('');
var handleClick = function (data) {
    clickEmit.value = data;
};
; /* PartiallyEnd: #3632/scriptSetup.vue */
function __VLS_template() {
    var __VLS_ctx = {};
    var __VLS_components;
    var __VLS_directives;
    // CSS variable injection 
    // CSS variable injection end 
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: ("demo") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: ("section") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.startLoading) }, { type: ("button") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.increase) }, { type: ("button") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.decrease) }, { type: ("button") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
    __VLS_asFunctionalDirective(__VLS_directives.vOnce)(null, __assign({}, __VLS_directiveBindingRestFields), null, null);
    (__VLS_ctx.count);
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
    (__VLS_ctx.count >= 0
        ? "".concat(__VLS_ctx.count).padStart(2, '0')
        : "-".concat(String(Math.abs(__VLS_ctx.count)).padStart(2, '0')));
    __VLS_elementAsFunction(__VLS_intrinsicElements.hr)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: ("section section__1") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)(__assign(__assign({ type: ("text") }, { class: ("input") }), { id: ("input"), value: ((__VLS_ctx.inputValue)) }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (function () { return (__VLS_ctx.inputValue = ''); }) }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: ("input-value") }));
    (__VLS_ctx.inputValue);
    __VLS_elementAsFunction(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: ("section section__1") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)(__assign({ class: ("label label--default") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)(__assign(__assign(__assign(__assign(__assign({ onInput: (__VLS_ctx.enterName) }, { onFocus: (__VLS_ctx.focusElement) }), { onBlur: (__VLS_ctx.blurElement) }), { type: ("text"), id: ("input") }), { class: ("input input--default") }), { value: ((__VLS_ctx.name)) }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.resetName) }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: ("input-value") }));
    (__VLS_ctx.name);
    // @ts-ignore
    /** @type { [typeof DemoComponent, typeof DemoComponent, ] } */ ;
    // @ts-ignore
    var __VLS_0 = __VLS_asFunctionalComponent(DemoComponent, new DemoComponent(__assign({ 'onUpdate:modelValue': {} })));
    var __VLS_1 = __VLS_0.apply(void 0, __spreadArray([__assign({ 'onUpdate:modelValue': {} })], __VLS_functionalComponentArgsRest(__VLS_0), false));
    var __VLS_5;
    var __VLS_6 = {
        'onUpdate:modelValue': (__VLS_ctx.handleClick)
    };
    var __VLS_2;
    var __VLS_3;
    var __VLS_4;
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (__VLS_ctx.clickEmit);
    ['demo', 'section', 'section', 'section__1', 'input', 'input-value', 'section', 'section__1', 'label', 'label--default', 'input', 'input--default', 'input-value',];
    var __VLS_slots;
    var $slots;
    var __VLS_inheritedAttrs;
    var $attrs;
    var __VLS_refs = {};
    var $refs;
    var $el;
    return {
        attrs: {},
        slots: __VLS_slots,
        refs: $refs,
        rootEl: $el,
    };
}
;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () {
        return {
            DemoComponent: DemoComponent,
            startLoading: startLoading,
            count: count,
            inputValue: inputValue,
            name: name,
            increase: increase,
            decrease: decrease,
            enterName: enterName,
            resetName: resetName,
            focusElement: focusElement,
            blurElement: blurElement,
            clickEmit: clickEmit,
            handleClick: handleClick,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup: function () {
        return {};
    },
    __typeEl: {},
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=DemoView.vue.js.map