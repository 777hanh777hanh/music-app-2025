import router from '@/router';
var useChangeView = function () {
    var changeView = function (view) {
        router.push(view !== null && view !== void 0 ? view : '/not-found').then(function () { });
    };
    var goBackView = function () {
        // check if it has previous page and it's not home page
        var hasPreviousPage = router.pages.length > 1 &&
            router.pages[router.pages.length - 2] !== '/';
        // go back to previous page if it exists, otherwise go to home page
        if (hasPreviousPage) {
            router.back();
        }
        else {
            router.push('/').then(function () { });
        }
    };
    return {
        changeView: changeView,
        goBackView: goBackView
    };
};
export default useChangeView;
//# sourceMappingURL=useChangeView.js.map