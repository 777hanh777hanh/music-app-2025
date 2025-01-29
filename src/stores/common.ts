import { defineStore } from 'pinia';
import { ref } from 'vue';

const useCommonStore = defineStore('common-store', () => {
	const isLoading = ref<boolean>(false);

	const finishLoad = () => {
		isLoading.value = false;
	};
	const startLoading = () => {
		isLoading.value = true;
		console.log(isLoading.value);
	};

	return {
		isLoading,
		startLoading,
		finishLoad
	};
});

export default useCommonStore;
