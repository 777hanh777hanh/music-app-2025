<script setup>
const emit = defineEmits(['update:modelValue']);

const clickEmit = () => {
	emit('update:modelValue', 'new value');
};
</script>

<template>
	<p @click="clickEmit">Demo Component</p>
</template>
