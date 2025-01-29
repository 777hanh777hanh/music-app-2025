import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSoundStore = defineStore('soundStore', () => {
	// state
	const currentSound = ref<any>(null);

	// actions
	const changeSound = async (newSound: any) => {
		await currentSound.value?.unload();
		currentSound.value = newSound;
	};
	const playSound = async () => {
		if (currentSound.value) {
			await currentSound.value.play();
		}
	};
	const stopSound = async () => {
		if (currentSound.value) {
			await currentSound.value.stop();
		}
	};

	return {
		currentSound,
		playSound,
		stopSound,
		changeSound
	};
});
