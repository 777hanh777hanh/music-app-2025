import { defineStore } from 'pinia';
import { computed, onMounted, ref } from 'vue';
import { useAudioPlayer } from '@/composables/useAudioPlayer';
import { formatTimeToString } from '@/utils/music';

const useMusicStore = defineStore('music-store', () => {
	const musicList = [
		{
			title: 'Hoàng Hôn \n(KxK X NVC Music) | Út Nhị Cover',
			thumbnail: '/assets/images/songs/HoangHon.png',
			audio: '/assets/audio/HoangHon.mp3'
		},
		{
			title: 'Túp Lều Vàng - Nguyễn Đình Vũ X Nboro | Official Mv Lyrics',
			thumbnail: '/assets/images/songs/TupLeuVang.png',
			audio: '/assets/audio/TupLeuVang.mp3'
		},
		{
			title: 'Thương Nhau Tới Bến - Nal | Cover Út Nhị Mino',
			thumbnail: '/assets/images/songs/ThuongNhauToiBen.png',
			audio: '/assets/audio/ThuongNhauToiBen.mp3'
		},
		{
			title: 'Đón Một Năm Mới - Út Nhị Mino | NVC Media',
			thumbnail: '/assets/images/songs/DonMotNamMoi.png',
			audio: '/assets/audio/DonMotNamMoi.mp3'
		},
		{
			title: 'Này Này Anh Ơi | Trà My ft Út Nhị | Cover Út Nhị Mino',
			thumbnail: '/assets/images/songs/NayNayAnhOi.png',
			audio: '/assets/audio/NayNayAnhOi.mp3'
		}
	];

	const currentSongIndex = ref(0);
	const loopSong = ref(false);
	const randomSong = ref(false);

	// Sử dụng composable để quản lý player
	const {
		isPlaying,
		currentSong,
		currentTime,
		duration,
		currentSongThumbnail,
		playSong,
		pauseSong,
		stopSong,
		nextSong,
		prevSong,
		seekTime
	} = useAudioPlayer(currentSongIndex, loopSong, randomSong, musicList);

	// 🟢 Tải lại giá trị từ localStorage khi ứng dụng khởi chạy
	onMounted(() => {
		const storedLoop = localStorage.getItem('loop-song');
		const storedRandom = localStorage.getItem('random-song');

		if (storedLoop !== null) {
			loopSong.value = JSON.parse(storedLoop);
		}
		if (storedRandom !== null) {
			randomSong.value = JSON.parse(storedRandom);
		}
	});

	const toggleLoopSong = () => {
		loopSong.value = !loopSong.value;
		localStorage.setItem('loop-song', JSON.stringify(loopSong.value));
	};

	const toggleRandomSong = () => {
		randomSong.value = !randomSong.value;
		localStorage.setItem('random-song', JSON.stringify(randomSong.value));
	};

	const progressPercent = computed(() => {
		if (!duration.value) return 0;
		return (currentTime.value / duration.value) * 100;
	});

	const currentTimeFormat = computed(() =>
		formatTimeToString(currentTime.value)
	);
	const durationFormat = computed(() => formatTimeToString(duration.value));

	onMounted(() => {
		playSong();
	});

	return {
		musicList,
		currentSong,
		isPlaying,
		currentTimeFormat,
		durationFormat,
		currentTime,
		duration,
		progressPercent,
		playSong,
		pauseSong,
		stopSong,
		nextSong,
		prevSong,
		currentSongThumbnail,
		toggleLoopSong,
		toggleRandomSong,
		seekTime,
		loopSong,
		randomSong
	};
});

export { useMusicStore };
