import { defineStore } from 'pinia';
import { computed, onMounted, ref } from 'vue';
import { useAudioPlayer } from '@/composables/useAudioPlayer';
import { formatTimeToString } from '@/utils/music';
var useMusicStore = defineStore('music-store', function () {
    var musicList = [
        {
            title: 'Hoàng Hôn \n(KxK X NVC Music) | Út Nhị Cover',
            thumbnail: '/assets/images/songs/HoangHon.png',
            audio: '/assets/audio/HoangHon.mp3'
        },
        {
            title: 'Túp Lều Vàng - Nguyễn Đình Vũ X Nboro | Official Mv Lyrics',
            thumbnail: '/assets/images/songs/TupLeuVang.png',
            audio: '/assets/audio/TupLeuVang.mp4'
        },
        {
            title: 'Thương Nhau Tới Bến - Nal | Cover Út Nhị Mino',
            thumbnail: '/assets/images/songs/ThuongNhauToiBen.png',
            audio: '/assets/audio/ThuongNhauToiBen.mp4'
        },
        {
            title: 'Đón Một Năm Mới - Út Nhị Mino | NVC Media',
            thumbnail: '/assets/images/songs/DonMotNamMoi.png',
            audio: '/assets/audio/DonMotNamMoi.mp4'
        },
        {
            title: 'Này Này Anh Ơi | Trà My ft Út Nhị | Cover Út Nhị Mino',
            thumbnail: '/assets/images/songs/NayNayAnhOi.png',
            audio: '/assets/audio/NayNayAnhOi.mp4'
        }
    ];
    var currentSongIndex = ref(0);
    var loopSong = ref(false);
    var randomSong = ref(false);
    // Sử dụng composable để quản lý player
    var _a = useAudioPlayer(currentSongIndex, loopSong, randomSong, musicList), isPlaying = _a.isPlaying, currentSong = _a.currentSong, currentTime = _a.currentTime, duration = _a.duration, currentSongThumbnail = _a.currentSongThumbnail, playSong = _a.playSong, pauseSong = _a.pauseSong, stopSong = _a.stopSong, nextSong = _a.nextSong, prevSong = _a.prevSong, seekTime = _a.seekTime;
    // 🟢 Tải lại giá trị từ localStorage khi ứng dụng khởi chạy
    onMounted(function () {
        var storedLoop = localStorage.getItem('loop-song');
        var storedRandom = localStorage.getItem('random-song');
        if (storedLoop !== null) {
            loopSong.value = JSON.parse(storedLoop);
        }
        if (storedRandom !== null) {
            randomSong.value = JSON.parse(storedRandom);
        }
    });
    var toggleLoopSong = function () {
        loopSong.value = !loopSong.value;
        localStorage.setItem('loop-song', JSON.stringify(loopSong.value));
    };
    var toggleRandomSong = function () {
        randomSong.value = !randomSong.value;
        localStorage.setItem('random-song', JSON.stringify(randomSong.value));
    };
    var progressPercent = computed(function () {
        if (!duration.value)
            return 0;
        return (currentTime.value / duration.value) * 100;
    });
    var currentTimeFormat = computed(function () {
        return formatTimeToString(currentTime.value);
    });
    var durationFormat = computed(function () { return formatTimeToString(duration.value); });
    onMounted(function () {
        playSong();
    });
    return {
        musicList: musicList,
        currentSong: currentSong,
        isPlaying: isPlaying,
        currentTimeFormat: currentTimeFormat,
        durationFormat: durationFormat,
        currentTime: currentTime,
        duration: duration,
        progressPercent: progressPercent,
        playSong: playSong,
        pauseSong: pauseSong,
        stopSong: stopSong,
        nextSong: nextSong,
        prevSong: prevSong,
        currentSongThumbnail: currentSongThumbnail,
        toggleLoopSong: toggleLoopSong,
        toggleRandomSong: toggleRandomSong,
        seekTime: seekTime,
        loopSong: loopSong,
        randomSong: randomSong
    };
});
export { useMusicStore };
//# sourceMappingURL=music.js.map