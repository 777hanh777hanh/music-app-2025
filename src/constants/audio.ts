import { Howl } from 'howler';
import { computed } from 'vue';

interface Window {
	webkitAudioContext?: typeof AudioContext;
}

const supportsWebAudio = computed(() =>
	(function () {
		return !!(window.AudioContext || (window as Window).webkitAudioContext);
	})()
);

const btnAudio = new Howl({
	src: ['/assets/audio/button.mp3'],
	html5: true
});

const bgAudio = new Howl({
	src: ['/assets/audio/HoangHon.mp3'],
	html5: true
});

export { btnAudio, bgAudio };
