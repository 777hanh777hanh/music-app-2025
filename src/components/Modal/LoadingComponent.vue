<script setup lang="ts">
	import { storeToRefs } from 'pinia';
	import { IonSpinner } from '@ionic/vue';

	import useCommonStore from '@/stores/common';
	import { onMounted, ref, watch } from 'vue';

	const props = defineProps({
		closeLayer: {
			type: Boolean,
			default: false
		},
		duration: {
			type: Number,
			default: 3000
		},
		openOnLoad: {
			type: Boolean,
			default: false
		}
	});

	const commonStore = useCommonStore();

	const { isLoading } = storeToRefs(commonStore);
	const { finishLoad, startLoading } = commonStore;

	const timer = ref<undefined | number>(undefined);

	const handleCloseLoading = () => {
		finishLoad();
	};

	const closeOutside = () => {
		if (props.closeLayer) {
			handleCloseLoading();
		}
	};

	watch(
		() => isLoading.value,
		(newValue) => {
			if (newValue) {
				timer.value = setTimeout(() => {
					finishLoad();
				}, props.duration);
			} else {
				clearTimeout(timer.value);
				timer.value = void 0;
			}
		}
	);

	onMounted(() => {
		if (props.openOnLoad) {
			startLoading();
		}
	});
</script>

<template>
	<Teleport to="body">
		<div v-if="isLoading" class="loading">
			<div class="loading__layer" @click="closeOutside"></div>
			<div class="loading__spinner">
				<IonSpinner
					class="loading__spinner-icon"
					name="bubbles"
					:duration="750"
				></IonSpinner>
			</div>
		</div>
	</Teleport>
</template>

<style scoped lang="scss">
	.loading {
		position: fixed;
		height: 100dvh;
		width: 100dvw;
		top: 0;
		left: 0;
		z-index: 999999;
		transition: 0.3s linear;

		&__layer {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.7);
		}

		&__spinner {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 50px;
			height: 50px;
		}

		&__spinner-icon {
			width: 100%;
			height: 100%;
		}
	}
</style>
