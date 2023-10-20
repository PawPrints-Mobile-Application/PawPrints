<template>
  <IconButton class="back-button" @click="() => emit('click')" :icon="icon" />
</template>

<script setup lang="ts">
import IconButton from "./IconButton.vue";
import { caretBack as icon } from "ionicons/icons";
const emit = defineEmits(['click']);
</script>

<style scoped>
.back-button {
  --size: var(--fs4);
}
</style>
