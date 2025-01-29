<script lang="ts" setup>
	import { ref } from 'vue';
	import DemoComponent from '@/components/demoComponent.vue';
	import useCommonStore from '@/stores/common';

	// store
	const { startLoading } = useCommonStore();

	const count = ref<number>(10);
	const inputValue = ref<string>('');
	const name = ref<string>('');

	const increase = () => {
		console.log('Increase!');
		return count.value++;
	};
	const decrease = () => {
		console.log('Decrease!');
		return count.value--;
	};

	const enterName = ($event: Event) => {
		name.value = ($event.target as HTMLInputElement).value;
	};
	const resetName = () => {
		name.value = '';
	};

	const focusElement = ($event: Event) => {
		const parentNode = ($event.target as HTMLInputElement)
			.parentNode as any;
		if (parentNode instanceof HTMLLabelElement) {
			parentNode.classList.add('focused');
		}
	};

	const blurElement = ($event: Event) => {
		const parentNode = ($event.target as HTMLInputElement)
			.parentNode as any;
		if (parentNode instanceof HTMLLabelElement) {
			parentNode.classList.remove('focused');
		}
	};

	const clickEmit = ref('');

	const handleClick = (data) => {
		clickEmit.value = data;
	};
</script>

<template>
	<div class="demo">
		<div class="section">
			<button type="button" @click="startLoading">Start Loading</button>
		</div>

		<button type="button" @click.prevent.stop="increase">Increase!</button>
		<button type="button" @click.prevent.stop="decrease">Decrease!</button>

		<!-- First: {{ count }} -->
		<h2 v-once>First: {{ count }}</h2>
		<h2>
			Count:
			{{
				count >= 0
					? `${count}`.padStart(2, '0')
					: `-${String(Math.abs(count)).padStart(2, '0')}`
			}}
		</h2>

		<hr />

		<section class="section section__1">
			<input type="text" class="input" id="input" v-model="inputValue" />
			<button @click="() => (inputValue = '')">Reset Value</button>
			<p class="input-value">{{ inputValue }}</p>
		</section>

		<section class="section section__1">
			<label class="label label--default"
				><input
					type="text"
					id="input"
					class="input input--default"
					:value="name"
					@input="enterName"
					@focus="focusElement"
					@blur="blurElement"
			/></label>
			<button @click="resetName">Reset Value</button>
			<p class="input-value">{{ name }}</p>
		</section>

		<!-- Demo Component	-->
		<DemoComponent @update:modelValue="handleClick"></DemoComponent>
		<p>{{ clickEmit }}</p>
	</div>
</template>

<style lang="scss" scoped>
	h2 {
		margin-top: 2.4rem;
	}

	hr {
		margin-block: 4rem;
	}

	.demo {
		--white-clr: #ccc;
	}

	button {
		padding: 8px 14px;
		width: auto;
		height: 50px;
		cursor: pointer;
		border-radius: 8px;

		&:hover {
			background: #2f2f2f;
			color: var(--white-clr);
		}
	}

	.section {
		margin-top: 24px;

		&__1 {
			display: flex;
			align-items: center;
			justify-content: flex-start;
			gap: 48px;
		}
	}

	.input {
		display: flex;
		align-items: center;
		position: relative;
		padding: 4px 8px;
		background: transparent;
		outline: none;
		border: none;
		color: var(--white-clr);
		line-height: 1.5;
		font-size: 16px;
		caret-color: currentColor;
		border-bottom: 1px solid currentColor;
	}

	.label {
		display: flex;
		align-items: center;

		&--default::before {
			content: '';
			display: flex;
			align-items: center;
			justify-content: center;
			background-image: url('/assets/svgs/checked.svg');
			background-repeat: no-repeat;
			background-size: contain;
			width: 16px;
			aspect-ratio: 1;

			rotate: 30deg;
			visibility: hidden;
			opacity: 0;
			scale: 0.7;

			transition: 1s cubic-bezier(0.4, 0, 0.2, 1);
		}

		&--default.focused::before {
			visibility: visible;
			opacity: 1;
			scale: 1;
		}
	}
</style>
