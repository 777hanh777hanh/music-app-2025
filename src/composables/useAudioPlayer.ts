import { computed, ref, watch } from 'vue';

// Use the createAudioElement function you provided
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

export function useAudioPlayer(
	currentSongIndex,
	loopSong,
	randomSong,
	listSongs
) {
	const isPlaying = ref(false);
	const player = ref<HTMLAudioElement | null>(null);
	const currentSong = ref(listSongs[currentSongIndex.value]);
	const duration = ref(0);
	const currentTime = ref(0);
	const currentSongThumbnail = ref(null);
	let updateInterval: number | null = null;

	const setupAudio = async () => {
		if (player.value) {
			player.value.removeAttribute('src');
			player.value.load();
		}

		// Cập nhật `currentSong`
		currentSong.value = listSongs[currentSongIndex.value];

		// Cập nhật `thumbnail`
		currentSongThumbnail.value = currentSong.value.thumbnail;

		// Lưu vào localStorage
		saveCurrentSong();

		// Tạo Audio instance
		player.value = createAudioElement(
			currentSong.value.audio,
			loopSong.value,
			0.5
		);

		currentTime.value = 0;

		// Thêm các event listeners
		player.value.addEventListener('loadedmetadata', () => {
			duration.value = player.value?.duration ?? 0;
		});

		player.value.addEventListener('play', () => {
			isPlaying.value = true;
			startUpdatingTime();
		});

		player.value.addEventListener('pause', () => {
			isPlaying.value = false;
			stopUpdatingTime();
		});

		player.value.addEventListener('ended', () => {
			isPlaying.value = true;
			handleEndSong();
		});

		// Thiết lập request headers để ngăn chặn IDM
		// Lưu ý: Không thể thiết lập headers với HTMLAudioElement trực tiếp
		// Cần sử dụng fetch API hoặc XMLHttpRequest nếu cần headers tùy chỉnh

		if (isPlaying.value) {
			try {
				setTimeout(() => {
					player.value && player.value.play();
				}, 10);
			} catch (error) {
				console.error('🔴 Safari Play Error:', error);
			}
		}
	};

	// Tải bài hát từ localStorage trước khi khởi chạy
	loadCurrentSong();

	const startUpdatingTime = () => {
		if (updateInterval) return;
		updateInterval = window.setInterval(() => {
			if (player.value) {
				currentTime.value = player.value.currentTime;
			}
		}, 1000);
	};

	const stopUpdatingTime = () => {
		if (updateInterval) {
			clearInterval(updateInterval);
			updateInterval = null;
		}
	};

	// Theo dõi thay đổi `currentSongIndex`
	watch(currentSongIndex, () => {
		setupAudio();
	});

	// Theo dõi thay đổi `loopSong`
	watch(loopSong, (newValue) => {
		if (player.value) {
			player.value.loop = newValue;
		}
	});

	// Lưu bài hát hiện tại vào localStorage
	function saveCurrentSong() {
		localStorage.setItem('currentSong', JSON.stringify(currentSong.value));
		localStorage.setItem('isPlaying', JSON.stringify(isPlaying.value));
	}

	function playSong() {
		console.log('🎵 Playing song:', currentSong.value);
		try {
			setTimeout(() => {
				player.value?.play().catch((e) => {
					console.error(e);
					isPlaying.value = false;
				});
			}, 10);
			isPlaying.value = true;
		} catch (error) {
			console.error('🔴 Safari Play Error:', error);
			isPlaying.value = false;
		}
	}

	const pauseSong = () => {
		player.value?.pause();
		isPlaying.value = false;
	};

	const stopSong = () => {
		if (player.value) {
			player.value.pause();
			player.value.currentTime = 0;
		}
		isPlaying.value = false;
	};

	const nextSong = () => {
		currentSongIndex.value =
			(currentSongIndex.value + 1) % listSongs.length;
	};

	const prevSong = () => {
		currentSongIndex.value =
			(currentSongIndex.value - 1 + listSongs.length) % listSongs.length;
	};

	const getCurrentSongIndex = computed(() => {
		return currentSongIndex.value;
	});

	const handleEndSong = () => {
		if (loopSong.value) {
			// Với HTMLAudioElement, loop đã được xử lý tự động
			// Nhưng chúng ta vẫn cần xử lý cho trường hợp thay đổi bài hát
			if (!player.value?.loop) {
				setupAudio();
			}
		} else if (randomSong.value) {
			if (listSongs.length > 1) {
				currentSongIndex.value = getRandomSongIndex();
			}
		} else {
			nextSong();
		}
	};

	async function loadCurrentSong() {
		const storedSong = localStorage.getItem('currentSong');
		if (!storedSong) {
			currentSongIndex.value = 0;
		} else {
			const parsedSong = JSON.parse(storedSong);
			const foundIndex = listSongs.findIndex(
				(song) => song.audio === parsedSong.audio
			);

			currentSongIndex.value = foundIndex !== -1 ? foundIndex : 0;
		}

		currentSong.value = listSongs[currentSongIndex.value];
		console.log('🎵 Loaded song from localStorage:', currentSong.value);
		setupAudio();

		// Khôi phục trạng thái phát
		const storedIsPlaying = localStorage.getItem('isPlaying');
		if (storedIsPlaying && JSON.parse(storedIsPlaying)) {
			playSong();
		}
	}

	const seekTime = (time: number) => {
		if (time < 0) time = 0;
		if (time > duration.value) time = duration.value;

		if (player.value) {
			player.value.currentTime = time;
			currentTime.value = time;
		}
	};

	const getRandomSongIndex = () => {
		let randomIndex;
		do {
			randomIndex = Math.floor(Math.random() * listSongs.length);
		} while (randomIndex === currentSongIndex.value);
		return randomIndex;
	};

	return {
		currentSong,
		isPlaying,
		currentTime,
		duration,
		currentSongThumbnail,
		saveCurrentSong,
		playSong,
		pauseSong,
		stopSong,
		nextSong,
		prevSong,
		seekTime,
		getCurrentSongIndex
	};
}
