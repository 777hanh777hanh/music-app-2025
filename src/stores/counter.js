import { computed, ref } from 'vue';
// Options API
import { defineStore } from 'pinia';
// Composition API
export var useCounterStore = defineStore('counter', function () {
    var count = ref(0);
    var doubleCount = computed(function () { return count.value * 2; });
    function increment() {
        count.value++;
    }
    return { count: count, doubleCount: doubleCount, increment: increment };
});
// Options API
export var useCounterStoreOptionsAPI = defineStore('counterOptionsAPI', {
    state: function () { return ({
        count1: 0
    }); },
    getters: {
        doubleCount: function (state) { return state.count1 * 2; }
    },
    actions: {
        increment: function () {
            this.count1 += 1;
        }
    }
});
//# sourceMappingURL=counter.js.map