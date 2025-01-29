import { computed, ref, watch } from 'vue';
import { Howl } from 'howler';

export function useAudioPlayer(
	currentSongIndex,
	loopSong,
	randomSong,
	listSongs
) {
	const isPlaying = ref(false);
	const player = ref<Howl | null>(null);
	const currentSong = ref(listSongs[currentSongIndex.value]);
	const duration = ref(0);
	const currentTime = ref(0);
	const currentSongThumbnail = ref(null);
	let updateInterval: number | null = null;

	const setupHowler = async () => {
		if (player.value) {
			player.value.unload();
		}

		// Cập nhật `currentSong`
		currentSong.value = listSongs[currentSongIndex.value];

		// Cập nhật `thumbnail`
		currentSongThumbnail.value = currentSong.value.thumbnail;

		// Lưu vào localStorage
		saveCurrentSong();

		// Tạo Howler instance
		player.value = new Howl({
			src: [currentSong.value.audio],
			html5: true,
			preload: true,
			autoplay: true,
			onload: () => {
				duration.value = player.value?.duration() ?? 0;
			},
			onplay: () => {
				isPlaying.value = true;
				startUpdatingTime();
			},
			onpause: () => {
				isPlaying.value = false;
				stopUpdatingTime();
			},
			onend: () => {
				handleEndSong();
			},
			xhr: {
				method: 'GET',
				headers: {
					'Cache-Control': 'no-store', // ✅ Ngăn IDM cache file
					'X-Requested-With': 'XMLHttpRequest' // ✅ Ngăn IDM nhận diện là file tải về
				}
			}
		});
	};

	// Tải bài hát từ localStorage trước khi khởi chạy
	loadCurrentSong();

	const startUpdatingTime = () => {
		if (updateInterval) return;
		updateInterval = window.setInterval(() => {
			if (player.value) {
				currentTime.value = player.value.seek() as number;
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
		setupHowler();
	});

	// Lưu bài hát hiện tại vào localStorage
	function saveCurrentSong() {
		localStorage.setItem('currentSong', JSON.stringify(currentSong.value));
		localStorage.setItem('isPlaying', JSON.stringify(isPlaying.value));
	}

	function playSong() {
		console.log('🎵 Playing song:', currentSong.value);
		console.log('🎵 Playing song:', player.value);
		try {
			player.value?.play();
		} catch (error) {
			console.error('🔴 Safari Play Error:', error);
		}
		isPlaying.value = true;
	}

	const pauseSong = () => {
		player.value?.pause();
		isPlaying.value = false;
	};

	const stopSong = () => {
		player.value?.stop();
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
			setupHowler();
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
		setupHowler();
		playSong();
	}

	const seekTime = (time: number) => {
		if (time < 0) time = 0;
		if (time > duration.value) time = duration.value;
		currentTime.value = time;
		player.value?.seek(time);
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
