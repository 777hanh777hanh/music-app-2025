<script setup>
	import { NavbarComponent } from '@/components/NavbarComponent';
	import { SongComponent } from '@/components/SongComponent';
</script>

<template>
	<div class="home">
		<div class="container container--mobile home__wrapper">
			<div class="inner">
				<SongComponent />
			</div>
		</div>
		<NavbarComponent />
	</div>
</template>

<style scoped lang="scss">
	@use '@/assets/styles/utils';

	.home {
		justify-self: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: min(575.98px, 100%);
		height: 100%;

		background: var(--bg-dark-app-clr);
		border-radius: 4px;
		overflow: hidden;

		@media only screen and (max-width: 575.98px) {
			border-radius: 0;
		}

		&__wrapper {
			flex: 1;
		}
	}

	.inner {
		flex: 1;
		width: 100%;
	}
</style>
