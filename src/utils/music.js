var formatTimeToString = function (time) {
    var minutes = Math.floor(time / 60);
    var seconds = Math.floor(time % 60);
    return "".concat(minutes.toString().padStart(2, '0'), ":").concat(seconds.toString().padStart(2, '0'));
};
export { formatTimeToString };
//# sourceMappingURL=music.js.map