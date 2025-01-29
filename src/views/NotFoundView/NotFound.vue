<script setup>
	import useChangeView from '@/hook/useChangeView.ts';

	const { goBackView } = useChangeView();
</script>

<template>
	<div class="not-found">
		<h1>404 <span>Not Found</span></h1>
		<a @click="goBackView" class="desc">Go back</a>
	</div>
</template>

<style scoped lang="scss">
	h1 {
		margin-top: 30px;
		text-align: center;
		color: chocolate;
		font-size: 3rem;

		span {
			color: #f2f2f2;
			font-size: 1.5rem;
		}
	}

	.not-found {
		flex-basis: 100%;
		display: flex;
		flex-direction: column;
		place-items: center;
	}

	.desc {
		margin-top: 20px;
		padding: 8px 16px;
		width: max-content;
		cursor: pointer;
	}
</style>
