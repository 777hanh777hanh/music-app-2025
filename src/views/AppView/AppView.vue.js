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
import { RouterLink, RouterView } from 'vue-router';
import { pathNames } from '@/constants';
import HelloWorld from '@/components/HelloWorld.vue';
import LoadingComponent from '@/components/Modal/LoadingComponent.vue';
; /* PartiallyEnd: #3632/scriptSetup.vue */
function __VLS_template() {
    var __VLS_ctx = {};
    var __VLS_components;
    var __VLS_directives;
    ['router-link-exact-active', 'logo',];
    // CSS variable injection 
    // CSS variable injection end 
    __VLS_elementAsFunction(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.img)(__assign(__assign({ alt: ("Vue logo") }, { class: ("logo") }), { src: ("@/assets/logo.svg"), width: ("125"), height: ("125") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: ("wrapper") }));
    // @ts-ignore
    /** @type { [typeof HelloWorld, ] } */ ;
    // @ts-ignore
    var __VLS_0 = __VLS_asFunctionalComponent(HelloWorld, new HelloWorld({
        msg: ("You did it!"),
    }));
    var __VLS_1 = __VLS_0.apply(void 0, __spreadArray([{
            msg: ("You did it!"),
        }], __VLS_functionalComponentArgsRest(__VLS_0), false));
    __VLS_elementAsFunction(__VLS_intrinsicElements.nav, __VLS_intrinsicElements.nav)({});
    var __VLS_5 = {}.RouterLink;
    /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ] } */ ;
    // @ts-ignore
    var __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
        to: ((__VLS_ctx.pathNames.home)),
    }));
    var __VLS_7 = __VLS_6.apply(void 0, __spreadArray([{
            to: ((__VLS_ctx.pathNames.home)),
        }], __VLS_functionalComponentArgsRest(__VLS_6), false));
    __VLS_10.slots.default;
    var __VLS_10;
    var __VLS_11 = {}.RouterLink;
    /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ] } */ ;
    // @ts-ignore
    var __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11({
        to: ((__VLS_ctx.pathNames.about)),
    }));
    var __VLS_13 = __VLS_12.apply(void 0, __spreadArray([{
            to: ((__VLS_ctx.pathNames.about)),
        }], __VLS_functionalComponentArgsRest(__VLS_12), false));
    __VLS_16.slots.default;
    var __VLS_16;
    var __VLS_17 = {}.RouterLink;
    /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ] } */ ;
    // @ts-ignore
    var __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({
        to: ((__VLS_ctx.pathNames.demo)),
    }));
    var __VLS_19 = __VLS_18.apply(void 0, __spreadArray([{
            to: ((__VLS_ctx.pathNames.demo)),
        }], __VLS_functionalComponentArgsRest(__VLS_18), false));
    __VLS_22.slots.default;
    var __VLS_22;
    var __VLS_23 = {}.RouterLink;
    /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ] } */ ;
    // @ts-ignore
    var __VLS_24 = __VLS_asFunctionalComponent(__VLS_23, new __VLS_23({
        to: ((__VLS_ctx.pathNames.soundClick)),
    }));
    var __VLS_25 = __VLS_24.apply(void 0, __spreadArray([{
            to: ((__VLS_ctx.pathNames.soundClick)),
        }], __VLS_functionalComponentArgsRest(__VLS_24), false));
    __VLS_28.slots.default;
    var __VLS_28;
    var __VLS_29 = {}.RouterLink;
    /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ] } */ ;
    // @ts-ignore
    var __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({
        to: ("/hihi"),
    }));
    var __VLS_31 = __VLS_30.apply(void 0, __spreadArray([{
            to: ("/hihi"),
        }], __VLS_functionalComponentArgsRest(__VLS_30), false));
    __VLS_34.slots.default;
    var __VLS_34;
    var __VLS_35 = {}.RouterView;
    /** @type { [typeof __VLS_components.RouterView, ] } */ ;
    // @ts-ignore
    var __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35({}));
    var __VLS_37 = __VLS_36.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_36), false));
    // @ts-ignore
    /** @type { [typeof LoadingComponent, typeof LoadingComponent, ] } */ ;
    // @ts-ignore
    var __VLS_41 = __VLS_asFunctionalComponent(LoadingComponent, new LoadingComponent({
        closeLayer: ((true)),
        duration: ((1000)),
        openOnLoad: ((true)),
    }));
    var __VLS_42 = __VLS_41.apply(void 0, __spreadArray([{
            closeLayer: ((true)),
            duration: ((1000)),
            openOnLoad: ((true)),
        }], __VLS_functionalComponentArgsRest(__VLS_41), false));
    var __VLS_46 = {}.RouterView;
    /** @type { [typeof __VLS_components.RouterView, ] } */ ;
    // @ts-ignore
    var __VLS_47 = __VLS_asFunctionalComponent(__VLS_46, new __VLS_46({}));
    var __VLS_48 = __VLS_47.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_47), false));
    // @ts-ignore
    /** @type { [typeof LoadingComponent, typeof LoadingComponent, ] } */ ;
    // @ts-ignore
    var __VLS_52 = __VLS_asFunctionalComponent(LoadingComponent, new LoadingComponent({
        closeLayer: ((true)),
        duration: ((1000)),
        openOnLoad: ((true)),
    }));
    var __VLS_53 = __VLS_52.apply(void 0, __spreadArray([{
            closeLayer: ((true)),
            duration: ((1000)),
            openOnLoad: ((true)),
        }], __VLS_functionalComponentArgsRest(__VLS_52), false));
    ['logo', 'wrapper',];
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
            RouterLink: RouterLink,
            RouterView: RouterView,
            pathNames: pathNames,
            HelloWorld: HelloWorld,
            LoadingComponent: LoadingComponent,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup: function () {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=AppView.vue.js.map