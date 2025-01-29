import { defineStore } from 'pinia';
import { ref } from 'vue';
var useCommonStore = defineStore('common-store', function () {
    var isLoading = ref(false);
    var finishLoad = function () {
        isLoading.value = false;
    };
    var startLoading = function () {
        isLoading.value = true;
        console.log(isLoading.value);
    };
    return {
        isLoading: isLoading,
        startLoading: startLoading,
        finishLoad: finishLoad
    };
});
export default useCommonStore;
//# sourceMappingURL=common.js.map