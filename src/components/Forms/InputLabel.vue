<template>
    <label class="input-label" :for="for">{{ label }}</label>
</template>
<script setup lang="ts">
defineProps(['for', 'label'])
</script>
<style scoped>
label {
  font-family: Rubik;
  font-size: var(--fs3);
  font-weight: 700;
}
</style>