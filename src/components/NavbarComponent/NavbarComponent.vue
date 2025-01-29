<script setup lang="ts">
	import { storeToRefs } from 'pinia';
	import { onMounted, ref } from 'vue';
	import { useMusicStore } from '@/stores/music';

	//	Music Icons
	import shuffleIcon from '/assets/svgs/shuffle.svg';
	import prevIcon from '/assets/svgs/prev.svg';
	import playIcon from '/assets/svgs/play.svg';
	import loopIcon from '/assets/svgs/loop.svg';
	import pauseIcon from '/assets/svgs/pause.svg';

	const playButton = ref();
	const musicStore = useMusicStore();
	const {
		currentSong,
		playSong,
		pauseSong,
		stopSong,
		prevSong,
		nextSong,
		toggleLoopSong,
		toggleRandomSong
	} = musicStore;
	const { isPlaying, loopSong, randomSong } = storeToRefs(musicStore);

	const handlePlaySong = () => {
		if (!isPlaying.value) {
			playSong();
		} else {
			pauseSong();
		}
	};

	const handlePrevSong = () => {
		stopSong();
		prevSong();
		playSong();
	};

	const handleNextSong = () => {
		stopSong();
		nextSong();
		playSong();
	};

	onMounted(() => {
		(playButton.value as HTMLDivElement).click();
	});
</script>

<template>
	<div class="navbar">
		<div class="navbar__list">
			<div
				class="navbar-item"
				:class="{ active: randomSong }"
				@click="toggleRandomSong"
			>
				<img :src="shuffleIcon" alt="" class="navbar-item__icon" />
			</div>
			<div class="navbar-item" @click="handlePrevSong">
				<img :src="prevIcon" alt="" class="navbar-item__icon" />
			</div>
			<div
				class="navbar-item navbar-item__play"
				ref="playButton"
				:class="{ playing: !isPlaying }"
				@click="handlePlaySong"
			>
				<img
					v-if="!isPlaying"
					:src="playIcon"
					alt=""
					class="navbar-item__icon"
				/>
				<img v-else :src="pauseIcon" alt="" class="navbar-item__icon" />
			</div>
			<div class="navbar-item" @click="handleNextSong">
				<img
					:src="prevIcon"
					alt=""
					class="navbar-item__icon navbar-item__icon--next"
				/>
			</div>
			<div
				class="navbar-item"
				:class="{ active: loopSong }"
				@click="toggleLoopSong"
			>
				<img :src="loopIcon" alt="" class="navbar-item__icon" />
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
	@use '@/assets/styles/utils';

	.navbar {
		padding: 12px 0 12px;
		width: 100%;
		background: var(--navbar-bg-clr);
		border-top-right-radius: 50%;
		border-top-left-radius: 50%;

		&__list {
			padding-top: 48px;
			width: 100%;
			display: flex;
			justify-content: space-around;
			gap: 24px;
		}

		.navbar-item {
			display: flex;
			align-items: center;
			justify-content: center;
			box-sizing: content-box;

			padding: 16px;
			width: 30px;
			height: 30px;
			border-radius: 50%;
			cursor: pointer;

			transition: box-shadow 0.19s linear;

			&:not(.navbar-item__play) {
				background: rgba(0, 0, 0, 0.1);
				width: 22px;
				height: 22px;

				&.active,
				&:hover {
					box-shadow: 0 0 0 1px var(--white-clr);
				}

				@include utils.Responsive(MD) {
					&:hover:not(.active) {
						border: initial;
					}
				}

				&.active .navbar-item__icon {
					filter: var(--icon-active-clr);
				}
			}

			&__play {
				background: var(--white-clr);
			}

			&__icon {
				width: 100%;
				height: 100%;
				display: block;
				filter: var(--icon-clr);
				transition: filter 0.18s ease-in-out;
			}

			&__play.playing .navbar-item__icon {
				margin-left: 5px;

				&.active,
				&:hover {
					filter: var(--icon-clr);
				}
			}

			&__icon--next {
				rotate: 180deg;
			}
		}
	}
</style>
