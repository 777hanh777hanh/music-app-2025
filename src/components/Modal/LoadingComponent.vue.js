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
import { storeToRefs } from 'pinia';
import { IonSpinner } from '@ionic/vue';
import useCommonStore from '@/stores/common';
import { onMounted, ref, watch } from 'vue';
var props = defineProps({
    closeLayer: {
        type: Boolean,
        default: false
    },
    duration: {
        type: Number,
        default: 3000
    },
    openOnLoad: {
        type: Boolean,
        default: false
    }
});
var commonStore = useCommonStore();
var isLoading = storeToRefs(commonStore).isLoading;
var finishLoad = commonStore.finishLoad, startLoading = commonStore.startLoading;
var timer = ref(undefined);
var handleCloseLoading = function () {
    finishLoad();
};
var closeOutside = function () {
    if (props.closeLayer) {
        handleCloseLoading();
    }
};
watch(function () { return isLoading.value; }, function (newValue) {
    if (newValue) {
        timer.value = setTimeout(function () {
            finishLoad();
        }, props.duration);
    }
    else {
        clearTimeout(timer.value);
        timer.value = void 0;
    }
});
onMounted(function () {
    if (props.openOnLoad) {
        startLoading();
    }
});
; /* PartiallyEnd: #3632/scriptSetup.vue */
function __VLS_template() {
    var __VLS_ctx = {};
    var __VLS_components;
    var __VLS_directives;
    // CSS variable injection 
    // CSS variable injection end 
    var __VLS_0 = {}.Teleport;
    /** @type { [typeof __VLS_components.Teleport, typeof __VLS_components.Teleport, ] } */ ;
    // @ts-ignore
    var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        to: ("body"),
    }));
    var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([{
            to: ("body"),
        }], __VLS_functionalComponentArgsRest(__VLS_1), false));
    var __VLS_6 = {};
    if (__VLS_ctx.isLoading) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: ("loading") }));
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ onClick: (__VLS_ctx.closeOutside) }, { class: ("loading__layer") }));
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: ("loading__spinner") }));
        var __VLS_7 = {}.IonSpinner;
        /** @type { [typeof __VLS_components.IonSpinner, typeof __VLS_components.IonSpinner, ] } */ ;
        // @ts-ignore
        var __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7(__assign({ class: ("loading__spinner-icon") }, { name: ("bubbles"), duration: ((750)) })));
        var __VLS_9 = __VLS_8.apply(void 0, __spreadArray([__assign({ class: ("loading__spinner-icon") }, { name: ("bubbles"), duration: ((750)) })], __VLS_functionalComponentArgsRest(__VLS_8), false));
    }
    __VLS_5.slots.default;
    var __VLS_5;
    ['loading', 'loading__layer', 'loading__spinner', 'loading__spinner-icon',];
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
            IonSpinner: IonSpinner,
            isLoading: isLoading,
            closeOutside: closeOutside,
        };
    },
    props: {
        closeLayer: {
            type: Boolean,
            default: false
        },
        duration: {
            type: Number,
            default: 3000
        },
        openOnLoad: {
            type: Boolean,
            default: false
        }
    },
});
export default (await import('vue')).defineComponent({
    setup: function () {
        return {};
    },
    props: {
        closeLayer: {
            type: Boolean,
            default: false
        },
        duration: {
            type: Number,
            default: 3000
        },
        openOnLoad: {
            type: Boolean,
            default: false
        }
    },
    __typeEl: {},
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=LoadingComponent.vue.js.map