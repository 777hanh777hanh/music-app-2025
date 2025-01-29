var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { computed, ref, watch } from 'vue';
import { Howl } from 'howler';
export function useAudioPlayer(currentSongIndex, loopSong, randomSong, listSongs) {
    var isPlaying = ref(false);
    var player = ref(null);
    var currentSong = ref(listSongs[currentSongIndex.value]);
    var duration = ref(0);
    var currentTime = ref(0);
    var currentSongThumbnail = ref(null);
    var updateInterval = null;
    var setupHowler = function () {
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
            autoplay: true,
            onload: function () {
                var _a, _b;
                duration.value = (_b = (_a = player.value) === null || _a === void 0 ? void 0 : _a.duration()) !== null && _b !== void 0 ? _b : 0;
            },
            onplay: function () {
                isPlaying.value = true;
                startUpdatingTime();
            },
            onpause: function () {
                isPlaying.value = false;
                stopUpdatingTime();
            },
            onend: function () {
                handleEndSong();
            }
        });
    };
    // Tải bài hát từ localStorage trước khi khởi chạy
    loadCurrentSong();
    var startUpdatingTime = function () {
        if (updateInterval)
            return;
        updateInterval = window.setInterval(function () {
            if (player.value) {
                currentTime.value = player.value.seek();
            }
        }, 1000);
    };
    var stopUpdatingTime = function () {
        if (updateInterval) {
            clearInterval(updateInterval);
            updateInterval = null;
        }
    };
    // Theo dõi thay đổi `currentSongIndex`
    watch(currentSongIndex, function () {
        setupHowler();
    });
    // Lưu bài hát hiện tại vào localStorage
    function saveCurrentSong() {
        localStorage.setItem('currentSong', JSON.stringify(currentSong.value));
        localStorage.setItem('isPlaying', JSON.stringify(isPlaying.value));
    }
    function playSong() {
        var _a;
        console.log('🎵 Playing song:', currentSong.value);
        console.log('🎵 Playing song:', player.value);
        (_a = player.value) === null || _a === void 0 ? void 0 : _a.play();
        isPlaying.value = true;
    }
    var pauseSong = function () {
        var _a;
        (_a = player.value) === null || _a === void 0 ? void 0 : _a.pause();
        isPlaying.value = false;
    };
    var stopSong = function () {
        var _a;
        (_a = player.value) === null || _a === void 0 ? void 0 : _a.stop();
        isPlaying.value = false;
    };
    var nextSong = function () {
        currentSongIndex.value =
            (currentSongIndex.value + 1) % listSongs.length;
    };
    var prevSong = function () {
        currentSongIndex.value =
            (currentSongIndex.value - 1 + listSongs.length) % listSongs.length;
    };
    var getCurrentSongIndex = computed(function () {
        return currentSongIndex.value;
    });
    var handleEndSong = function () {
        if (loopSong.value) {
            setupHowler();
        }
        else if (randomSong.value) {
            if (listSongs.length > 1) {
                currentSongIndex.value = getRandomSongIndex();
            }
        }
        else {
            nextSong();
        }
    };
    function loadCurrentSong() {
        return __awaiter(this, void 0, void 0, function () {
            var storedSong, parsedSong, foundIndex;
            return __generator(this, function (_a) {
                storedSong = localStorage.getItem('currentSong');
                if (!storedSong)
                    return [2 /*return*/];
                parsedSong = JSON.parse(storedSong);
                foundIndex = listSongs.findIndex(function (song) { return song.audio === parsedSong.audio; });
                currentSongIndex.value = foundIndex !== -1 ? foundIndex : 0;
                currentSong.value = listSongs[currentSongIndex.value];
                console.log('🎵 Loaded song from localStorage:', currentSong.value);
                setupHowler();
                playSong();
                return [2 /*return*/];
            });
        });
    }
    var seekTime = function (time) {
        var _a;
        if (time < 0)
            time = 0;
        if (time > duration.value)
            time = duration.value;
        currentTime.value = time;
        (_a = player.value) === null || _a === void 0 ? void 0 : _a.seek(time);
    };
    var getRandomSongIndex = function () {
        var randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * listSongs.length);
        } while (randomIndex === currentSongIndex.value);
        return randomIndex;
    };
    return {
        currentSong: currentSong,
        isPlaying: isPlaying,
        currentTime: currentTime,
        duration: duration,
        currentSongThumbnail: currentSongThumbnail,
        saveCurrentSong: saveCurrentSong,
        playSong: playSong,
        pauseSong: pauseSong,
        stopSong: stopSong,
        nextSong: nextSong,
        prevSong: prevSong,
        seekTime: seekTime,
        getCurrentSongIndex: getCurrentSongIndex
    };
}
//# sourceMappingURL=useAudioPlayer.js.map