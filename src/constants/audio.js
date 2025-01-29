import { Howl } from 'howler';
import { computed } from 'vue';
var supportsWebAudio = computed(function () {
    return (function () {
        return !!(window.AudioContext || window.webkitAudioContext);
    })();
});
var btnAudio = new Howl({
    src: ['/assets/audio/button.mp3'],
    html5: true
});
var bgAudio = new Howl({
    src: ['/assets/audio/HoangHon.mp3'],
    html5: true
});
export { btnAudio, bgAudio };
//# sourceMappingURL=audio.js.map