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
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref } from 'vue';
import { useMusicStore } from '@/stores/music';
var musicStore = useMusicStore();
var _a = storeToRefs(musicStore), currentTimeFormat = _a.currentTimeFormat, durationFormat = _a.durationFormat, duration = _a.duration, currentTime = _a.currentTime, currentSong = _a.currentSong, isPlaying = _a.isPlaying;
var seekTime = musicStore.seekTime, playSong = musicStore.playSong, pauseSong = musicStore.pauseSong;
var progressBar = ref(null);
var isDragging = ref(false);
var tempSeekTime = ref(0); // Giá trị tạm thời khi kéo dot
var wasPlayingBeforeDrag = ref(false); // Ghi nhớ trạng thái phát nhạc trước khi kéo
// 🔹 Tính toán phần trăm tiến trình dựa trên `tempSeekTime` nếu đang kéo
var progressPercent = computed(function () {
    if (!duration.value)
        return 0;
    return isDragging.value
        ? (tempSeekTime.value / duration.value) * 100
        : (currentTime.value / duration.value) * 100;
});
// 🔹 Xử lý click vào thanh progress bar để tua ngay
var handleClickOnProgressBar = function (event) {
    if (!progressBar.value || !duration.value)
        return;
    var clientX = event instanceof MouseEvent
        ? event.clientX
        : event.touches[0].clientX;
    var rect = progressBar.value.getBoundingClientRect();
    var clickX = clientX - rect.left;
    var percent = Math.max(0, Math.min(clickX / rect.width, 1));
    var seekTimeValue = duration.value * percent;
    seekTime(seekTimeValue);
};
// 🔹 Bắt đầu kéo `dot`
var handleDragStart = function (event) {
    isDragging.value = true;
    tempSeekTime.value = currentTime.value; // Gán giá trị tạm thời ban đầu
    wasPlayingBeforeDrag.value = isPlaying.value; // Lưu trạng thái đang phát nhạc
    // Tạm dừng nhạc khi kéo
    pauseSong();
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);
    document.addEventListener('touchmove', handleDragMove, {
        passive: false
    });
    document.addEventListener('touchend', handleDragEnd);
};
// 🔹 Khi di chuyển chuột hoặc cảm ứng, cập nhật UI nhưng không phát nhạc
var handleDragMove = function (event) {
    if (!isDragging.value || !progressBar.value || !duration.value)
        return;
    event.preventDefault(); // Ngăn trình duyệt cuộn trang khi touch
    var clientX = event instanceof MouseEvent
        ? event.clientX
        : event.touches[0].clientX;
    var rect = progressBar.value.getBoundingClientRect();
    var moveX = clientX - rect.left;
    var percent = Math.max(0, Math.min(moveX / rect.width, 1));
    tempSeekTime.value = duration.value * percent; // Cập nhật giá trị tạm thời khi kéo
    currentTime.value = tempSeekTime.value; // Cập nhật UI nhưng không tua nhạc
};
// 🔹 Khi thả chuột/cảm ứng, cập nhật `seekTime` và phát nhạc nếu cần
var handleDragEnd = function () {
    isDragging.value = false;
    seekTime(tempSeekTime.value); // Cập nhật nhạc chính thức
    // Nếu trước đó nhạc đang phát, tiếp tục phát lại
    if (wasPlayingBeforeDrag.value) {
        playSong();
    }
    document.removeEventListener('mousemove', handleDragMove);
    document.removeEventListener('mouseup', handleDragEnd);
    document.removeEventListener('touchmove', handleDragMove);
    document.removeEventListener('touchend', handleDragEnd);
};
onMounted(function () {
    playSong();
});
; /* PartiallyEnd: #3632/scriptSetup.vue */
function __VLS_template() {
    var _a, _b;
    var __VLS_ctx = {};
    var __VLS_components;
    var __VLS_directives;
    // CSS variable injection 
    // CSS variable injection end 
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: ("song") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: ("song__info") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: ("song__thumb") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.img)(__assign({ src: (((_a = __VLS_ctx.currentSong) === null || _a === void 0 ? void 0 : _a.thumbnail)), alt: ("") }, { class: ("song__thumb-img") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: ("song__time") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: ("song__current-time") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.currentTimeFormat);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: ("song__duration-time") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.durationFormat);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign(__assign(__assign({ onClick: (__VLS_ctx.handleClickOnProgressBar) }, { class: ("song__duration") }), { ref: ("progressBar") }), { style: (({ '--progress-width': __VLS_ctx.progressPercent + '%' })) }));
    // @ts-ignore navigation for `const progressBar = ref()`
    /** @type { typeof __VLS_ctx.progressBar } */ ;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign(__assign(__assign({ onMousedown: (__VLS_ctx.handleDragStart) }, { onTouchStart: (__VLS_ctx.handleDragStart) }), { class: ("song__dot") }), { style: (({ left: __VLS_ctx.progressPercent + '%' })) }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: ("song__title") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)(__assign({ class: ("song__title-text") }));
    __VLS_asFunctionalDirective(__VLS_directives.vHtml)(null, __assign(__assign({}, __VLS_directiveBindingRestFields), { value: ((_b = __VLS_ctx.currentSong) === null || _b === void 0 ? void 0 : _b.title) }), null, null);
    ['song', 'song__info', 'song__thumb', 'song__thumb-img', 'song__time', 'song__current-time', 'song__duration-time', 'song__duration', 'song__dot', 'song__title', 'song__title-text',];
    var __VLS_slots;
    var $slots;
    var __VLS_inheritedAttrs;
    var $attrs;
    var __VLS_refs = {
        'progressBar': __VLS_nativeElements['div'],
    };
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
            currentTimeFormat: currentTimeFormat,
            durationFormat: durationFormat,
            currentSong: currentSong,
            progressBar: progressBar,
            progressPercent: progressPercent,
            handleClickOnProgressBar: handleClickOnProgressBar,
            handleDragStart: handleDragStart,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup: function () {
        return {};
    },
    __typeRefs: {},
    __typeEl: {},
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=SongComponent.vue.js.map