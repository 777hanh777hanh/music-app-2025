import { computed, ComputedRef, Ref, ref } from 'vue';
// Options API
import { defineStore } from 'pinia';

// Composition API
export const useCounterStore = defineStore('counter', () => {
	const count: Ref<number> = ref<number>(0);
	const doubleCount: ComputedRef<number> = computed(() => count.value * 2);

	function increment() {
		count.value++;
	}

	return { count, doubleCount, increment };
});

// Options API
export const useCounterStoreOptionsAPI = defineStore('counterOptionsAPI', {
	state: () => ({
		count1: 0
	}),
	getters: {
		doubleCount: (state) => state.count1 * 2
	},
	actions: {
		increment() {
			this.count1 += 1;
		}
	}
});
