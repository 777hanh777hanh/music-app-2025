<script setup lang="ts">
	import { storeToRefs } from 'pinia';
	import { computed, onMounted, ref } from 'vue';
	import { useMusicStore } from '@/stores/music';

	const musicStore = useMusicStore();
	const {
		currentTimeFormat,
		durationFormat,
		duration,
		currentTime,
		currentSong,
		isPlaying
	} = storeToRefs(musicStore);
	const { seekTime, playSong, pauseSong } = musicStore;

	const progressBar = ref<HTMLElement | null>(null);
	const isDragging = ref(false);
	const tempSeekTime = ref(0); // Giá trị tạm thời khi kéo dot
	const wasPlayingBeforeDrag = ref(false); // Ghi nhớ trạng thái phát nhạc trước khi kéo

	// 🔹 Tính toán phần trăm tiến trình dựa trên `tempSeekTime` nếu đang kéo
	const progressPercent = computed(() => {
		if (!duration.value) return 0;
		return isDragging.value
			? (tempSeekTime.value / duration.value) * 100
			: (currentTime.value / duration.value) * 100;
	});

	// 🔹 Xử lý click vào thanh progress bar để tua ngay
	const handleClickOnProgressBar = (event: MouseEvent | TouchEvent) => {
		if (!progressBar.value || !duration.value) return;

		let clientX =
			event instanceof MouseEvent
				? event.clientX
				: event.touches[0].clientX;
		const rect = progressBar.value.getBoundingClientRect();
		const clickX = clientX - rect.left;
		const percent = Math.max(0, Math.min(clickX / rect.width, 1));
		const seekTimeValue = duration.value * percent;

		seekTime(seekTimeValue);
	};

	// 🔹 Bắt đầu kéo `dot`
	const handleDragStart = (event: MouseEvent | TouchEvent) => {
		isDragging.value = true;
		tempSeekTime.value = currentTime.value; // Gán giá trị tạm thời ban đầu
		wasPlayingBeforeDrag.value = isPlaying.value; // Lưu trạng thái đang phát nhạc

		// Tạm dừng nhạc khi kéo
		pauseSong();

		document.addEventListener('mousemove', handleDragMove);
		document.addEventListener('mouseup', handleDragEnd);
		document.addEventListener('touchmove', handleDragMove, {
			passive: false
		});
		document.addEventListener('touchend', handleDragEnd);
	};

	// 🔹 Khi di chuyển chuột hoặc cảm ứng, cập nhật UI nhưng không phát nhạc
	const handleDragMove = (event: MouseEvent | TouchEvent) => {
		if (!isDragging.value || !progressBar.value || !duration.value) return;

		event.preventDefault(); // Ngăn trình duyệt cuộn trang khi touch

		let clientX =
			event instanceof MouseEvent
				? event.clientX
				: event.touches[0].clientX;
		const rect = progressBar.value.getBoundingClientRect();
		const moveX = clientX - rect.left;
		const percent = Math.max(0, Math.min(moveX / rect.width, 1));
		tempSeekTime.value = duration.value * percent; // Cập nhật giá trị tạm thời khi kéo
		currentTime.value = tempSeekTime.value; // Cập nhật UI nhưng không tua nhạc
	};

	// 🔹 Khi thả chuột/cảm ứng, cập nhật `seekTime` và phát nhạc nếu cần
	const handleDragEnd = () => {
		isDragging.value = false;
		seekTime(tempSeekTime.value); // Cập nhật nhạc chính thức

		// Nếu trước đó nhạc đang phát, tiếp tục phát lại
		if (wasPlayingBeforeDrag.value) {
			playSong();
		}

		document.removeEventListener('mousemove', handleDragMove);
		document.removeEventListener('mouseup', handleDragEnd);
		document.removeEventListener('touchmove', handleDragMove);
		document.removeEventListener('touchend', handleDragEnd);
	};

	onMounted(() => {
		playSong();
	});
</script>

<template>
	<div class="song">
		<div class="song__info">
			<div class="song__thumb">
				<img
					:src="currentSong?.thumbnail"
					alt=""
					class="song__thumb-img"
				/>
			</div>
			<div class="song__time">
				<div class="song__current-time">
					<span>{{ currentTimeFormat }}</span>
				</div>
				<div class="song__duration-time">
					<span>{{ durationFormat }}</span>
				</div>
			</div>
			<div
				class="song__duration"
				ref="progressBar"
				@click="handleClickOnProgressBar"
				:style="{ '--progress-width': progressPercent + '%' }"
			>
				<div
					@mousedown="handleDragStart"
					@touchStart="handleDragStart"
					class="song__dot"
					:style="{ left: progressPercent + '%' }"
				></div>
			</div>
			<div class="song__title">
				<h1 class="song__title-text" v-html="currentSong?.title"></h1>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
	.inner {
		width: 100%;
	}

	.song {
		height: 100%;

		&__info {
			display: flex;
			flex-direction: column;
			align-items: center;
			color: var(--white-clr);

			width: 100%;
			height: 100%;
			padding: 16px 8px 8px;
		}

		&__thumb {
			display: flex;
			width: 100%;
			padding-top: 62.5%;
			position: relative;

			&-img {
				position: absolute;
				top: 0;
				left: 0;
				display: flex;
				width: 100%;
				height: 100%;
				object-fit: cover;
				border-radius: 4px;
			}
		}

		&__time {
			margin-top: 24px;
			display: flex;
			justify-content: space-between;
			width: 100%;
		}

		&__duration {
			position: relative;
			margin-top: 24px;
			padding-top: 12px;
			padding-bottom: 12px;
			height: 4px;
			width: 100%;
			cursor: pointer;

			&::after {
				content: '';
				position: absolute;
				top: 50%;
				left: 0;
				width: var(--progress-width); // here
				height: 4px;
				background: var(--navbar-bg-clr);
				border-radius: 99999px;
				translate: 0 -50%;
			}

			&::before {
				content: '';
				position: absolute;
				top: 50%;
				left: 0;
				width: 100%;
				height: 4px;
				background: var(--duration-line);
				border-radius: 99999px;
				translate: 0 -50%;
				transition: left 0.5s linear;
			}
		}

		&__dot {
			position: absolute;
			top: 50%;
			left: var(--progress-width); // here
			width: 18px;
			height: 18px;
			border-radius: 50%;
			background: var(--navbar-bg-clr);

			transform: translateX(-50%) translateY(-50%);
			transition: translate 0.5s linear;
		}

		&__title {
			flex: 1;

			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 24px;
			margin-bottom: 24px;

			& h1 {
				margin: 0;
				line-height: 1.5;
				white-space: pre-line;
				text-align: center;
			}
		}
	}
</style>
