import { computed } from 'vue';

interface Window {
	webkitAudioContext?: typeof AudioContext;
}

function createAudioElement(
	src: string,
	loop: boolean = false,
	volume: number = 1
): HTMLAudioElement {
	// Thay vì sử dụng new Audio(), hãy tạo thẻ audio bằng DOM API
	const audio = document.createElement('audio');

	// Thiết lập source
	audio.src = src;

	// Thêm các thuộc tính cần thiết cho iOS
	audio.setAttribute('playsinline', '');
	audio.setAttribute('webkit-playsinline', '');
	audio.setAttribute('preload', 'auto');

	// Các thuộc tính khác
	audio.loop = loop;
	audio.volume = volume;
	audio.preload = 'auto';

	audio.addEventListener('error', (e) => {
		const error = (audio as any).error;
		// console.error(
		// 	'Audio error code:',
		// 	error ? error.code : 'unknown'
		// );
		// console.error('Error loading audio:', src, e);

		// Hiển thị thông tin chi tiết về lỗi
		if (error) {
			switch (error.code) {
				case 1:
					console.error('MEDIA_ERR_ABORTED');
					break;
				case 2:
					console.error('MEDIA_ERR_NETWORK');
					break;
				case 3:
					console.error('MEDIA_ERR_DECODE');
					break;
				case 4:
					// console.error('MEDIA_ERR_SRC_NOT_SUPPORTED');
					break;
				default:
					console.error('Unknown error');
			}
		}

		// useHandleError().handleError(e);
	});

	return audio;
}

const supportsWebAudio = computed(() =>
	(function () {
		return !!(window.AudioContext || (window as Window).webkitAudioContext);
	})()
);

// const btnAudio = new Howl({
// 	src: ['/assets/audio/button.mp3'],
// 	html5: true
// });

const btnAudio = createAudioElement('/assets/audio/button.mp3', false, 0.7);

const bgAudio = createAudioElement('/assets/audio/HoangHon.mp3', false, 0.7);

export { btnAudio, bgAudio };
