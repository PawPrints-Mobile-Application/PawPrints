<template>
    <label class="input-label text font-bold" :for="props.for">{{ value }}</label>
</template>
<script setup lang="ts">
const props = defineProps({
    for: String,
    value: String
})
</script>
<style scoped>
    
</style>