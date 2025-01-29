<script setup lang="ts">
	import { storeToRefs } from 'pinia';
	import { onMounted, ref } from 'vue';

	import { useCounterStoreOptionsAPI } from '@/stores/counter';
	import { useSoundStore } from '@/stores/soundStore';
	import { bgAudio, btnAudio } from '@/constants';

	const counterStore = useCounterStoreOptionsAPI();
	const soundStore = useSoundStore();
	const { count1, doubleCount } = storeToRefs(counterStore);
	const { currentSound } = storeToRefs(soundStore);
	const { playSound, changeSound } = soundStore;
	const { increment } = counterStore;

	const soundButton = ref<any>(null);
	soundButton.value = btnAudio;
	const playSoundButton = async () => {
		await changeSound(btnAudio);
		await playSound();
	};

	const playSoundButtonSecond = async () => {
		await changeSound(bgAudio);
		await playSound();
	};

	onMounted(async () => {
		if (!soundButton.value || !currentSound.value) {
			await changeSound(soundButton.value);
		}
		await currentSound.value?.volume(0.5);
	});
</script>

<template lang="html">
	<h1>This is Sound View</h1>

	<h4>{{ count1 }}</h4>
	<h4>{{ doubleCount }}</h4>
	<button @click="increment">Increase</button>

	<div class="separate"></div>

	<section class="section sound-view">
		<button @click="playSoundButton">Sound A</button>
		<button @click="playSoundButtonSecond">Sound B</button>
	</section>
</template>

<style scoped lang="scss">
	.separate {
		margin-block: 5rem;
	}

	.sound-view {
		display: flex;
		align-items: center;
		gap: 8rem;
	}
</style>
