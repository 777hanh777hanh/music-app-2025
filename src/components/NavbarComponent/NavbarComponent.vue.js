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
import { onMounted, ref } from 'vue';
import { useMusicStore } from '@/stores/music';
//	Music Icons
import shuffleIcon from '/assets/svgs/shuffle.svg';
import prevIcon from '/assets/svgs/prev.svg';
import playIcon from '/assets/svgs/play.svg';
import loopIcon from '/assets/svgs/loop.svg';
import pauseIcon from '/assets/svgs/pause.svg';
var playButton = ref();
var musicStore = useMusicStore();
var currentSong = musicStore.currentSong, playSong = musicStore.playSong, pauseSong = musicStore.pauseSong, stopSong = musicStore.stopSong, prevSong = musicStore.prevSong, nextSong = musicStore.nextSong, toggleLoopSong = musicStore.toggleLoopSong, toggleRandomSong = musicStore.toggleRandomSong;
var _a = storeToRefs(musicStore), isPlaying = _a.isPlaying, loopSong = _a.loopSong, randomSong = _a.randomSong;
var handlePlaySong = function () {
    if (!isPlaying.value) {
        playSong();
    }
    else {
        pauseSong();
    }
};
var handlePrevSong = function () {
    stopSong();
    prevSong();
    playSong();
};
var handleNextSong = function () {
    stopSong();
    nextSong();
    playSong();
};
onMounted(function () {
    playButton.value.click();
});
; /* PartiallyEnd: #3632/scriptSetup.vue */
function __VLS_template() {
    var __VLS_ctx = {};
    var __VLS_components;
    var __VLS_directives;
    ['active', 'active', 'navbar-item__icon', 'active',];
    // CSS variable injection 
    // CSS variable injection end 
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: ("navbar") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: ("navbar__list") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign(__assign({ onClick: (__VLS_ctx.toggleRandomSong) }, { class: ("navbar-item") }), { class: (({ active: __VLS_ctx.randomSong })) }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.img)(__assign({ src: ((__VLS_ctx.shuffleIcon)), alt: ("") }, { class: ("navbar-item__icon") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ onClick: (__VLS_ctx.handlePrevSong) }, { class: ("navbar-item") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.img)(__assign({ src: ((__VLS_ctx.prevIcon)), alt: ("") }, { class: ("navbar-item__icon") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign(__assign(__assign({ onClick: (__VLS_ctx.handlePlaySong) }, { class: ("navbar-item navbar-item__play") }), { ref: ("playButton") }), { class: (({ playing: !__VLS_ctx.isPlaying })) }));
    // @ts-ignore navigation for `const playButton = ref()`
    /** @type { typeof __VLS_ctx.playButton } */ ;
    if (!__VLS_ctx.isPlaying) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.img)(__assign({ src: ((__VLS_ctx.playIcon)), alt: ("") }, { class: ("navbar-item__icon") }));
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.img)(__assign({ src: ((__VLS_ctx.pauseIcon)), alt: ("") }, { class: ("navbar-item__icon") }));
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ onClick: (__VLS_ctx.handleNextSong) }, { class: ("navbar-item") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.img)(__assign({ src: ((__VLS_ctx.prevIcon)), alt: ("") }, { class: ("navbar-item__icon navbar-item__icon--next") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign(__assign({ onClick: (__VLS_ctx.toggleLoopSong) }, { class: ("navbar-item") }), { class: (({ active: __VLS_ctx.loopSong })) }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.img)(__assign({ src: ((__VLS_ctx.loopIcon)), alt: ("") }, { class: ("navbar-item__icon") }));
    ['navbar', 'navbar__list', 'navbar-item', 'active', 'navbar-item__icon', 'navbar-item', 'navbar-item__icon', 'navbar-item', 'navbar-item__play', 'playing', 'navbar-item__icon', 'navbar-item__icon', 'navbar-item', 'navbar-item__icon', 'navbar-item__icon--next', 'navbar-item', 'active', 'navbar-item__icon',];
    var __VLS_slots;
    var $slots;
    var __VLS_inheritedAttrs;
    var $attrs;
    var __VLS_refs = {
        'playButton': __VLS_nativeElements['div'],
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
            shuffleIcon: shuffleIcon,
            prevIcon: prevIcon,
            playIcon: playIcon,
            loopIcon: loopIcon,
            pauseIcon: pauseIcon,
            playButton: playButton,
            toggleLoopSong: toggleLoopSong,
            toggleRandomSong: toggleRandomSong,
            isPlaying: isPlaying,
            loopSong: loopSong,
            randomSong: randomSong,
            handlePlaySong: handlePlaySong,
            handlePrevSong: handlePrevSong,
            handleNextSong: handleNextSong,
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
//# sourceMappingURL=NavbarComponent.vue.js.map