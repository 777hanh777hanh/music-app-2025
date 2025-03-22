import { defineStore } from 'pinia';
import { computed, onMounted, ref } from 'vue';
import { useAudioPlayer } from '@/composables/useAudioPlayer';
import { formatTimeToString } from '@/utils/music';

// interface ExtendedDocument extends Document {
// 	msHidden?: boolean;
// 	webkitHidden?: boolean;
// }

const useMusicStore = defineStore('music-store', () => {
	const musicList = [
		{
			title: 'Hoàng Hôn \n(KxK X NVC Music) | Út Nhị Cover',
			thumbnail: '/assets/images/songs/HoangHon.png',
			audio: 'https://xvatxthpyzulekbtgezd.supabase.co/storage/v1/object/public/Audio//Hoanghon.mp4'
		},
		{
			title: 'Túp Lều Vàng - Nguyễn Đình Vũ X Nboro | Official Mv Lyrics',
			thumbnail: '/assets/images/songs/TupLeuVang.png',
			audio: 'https://xvatxthpyzulekbtgezd.supabase.co/storage/v1/object/public/Audio//Tupleuvang.mp4'
		},
		{
			title: 'Thương Nhau Tới Bến - Nal | Cover Út Nhị Mino',
			thumbnail: '/assets/images/songs/ThuongNhauToiBen.png',
			audio: 'https://xvatxthpyzulekbtgezd.supabase.co/storage/v1/object/public/Audio//ThuongNhauToiBen.mp4'
		},
		{
			title: 'Đón Một Năm Mới - Út Nhị Mino | NVC Media',
			thumbnail: '/assets/images/songs/DonMotNamMoi.png',
			audio: 'https://xvatxthpyzulekbtgezd.supabase.co/storage/v1/object/public/Audio//DonMotNamMoi.mp4'
		},
		{
			title: 'Này Này Anh Ơi | Trà My ft Út Nhị | Cover Út Nhị Mino',
			thumbnail: '/assets/images/songs/NayNayAnhOi.png',
			audio: 'https://xvatxthpyzulekbtgezd.supabase.co/storage/v1/object/public/Audio//NayNayAnhOi.mp4'
		},
		{
			title: 'Bật Tình Yêu Lên - Hòa Minzy X Tăng Duy Tân',
			thumbnail: '/assets/images/songs/BatTinhYeuLen.png',
			audio: 'https://xvatxthpyzulekbtgezd.supabase.co/storage/v1/object/public/Audio//BatTinhYeuLen.mp4'
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
		// playSong();
	});

	// const playSound = (context: 'bg' | 'game' = 'bg') => {
	// 	// Prevent playing if muted or no audio elements
	// 	if (isPlaying.value) return;
	// 	if (!currentSong.value) return;
	//
	// 	const isHidden =
	// 		(document as ExtendedDocument).hidden ||
	// 		(document as ExtendedDocument).msHidden ||
	// 		(document as ExtendedDocument).webkitHidden ||
	// 		false;
	//
	// 	if (isHidden) return;
	//
	// 	try {
	// 		// Pause other audio
	// 		currentSong.value?.pause();
	// 		currentSong.value.currentTime = 0;
	//
	// 		// Play selected audio
	// 		const playPromise = currentSong.value?.play();
	//
	// 		// Handle potential autoplay restrictions
	// 		if (playPromise !== undefined) {
	// 			playPromise.catch((error) => {
	// 				console.warn('Autoplay was prevented:', error);
	// 			});
	// 		}
	//
	// 		isPlaying.value = true;
	// 	} catch (error) {
	// 		console.error('Error playing sound:', error);
	// 	}
	// };

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
		// playSound,
		currentSongThumbnail,
		toggleLoopSong,
		toggleRandomSong,
		seekTime,
		loopSong,
		randomSong
	};
});

export { useMusicStore };
