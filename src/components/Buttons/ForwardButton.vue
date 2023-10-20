<template>
  <IconButton class="forward-button" @click="() => emit('click')" :icon="icon" />
</template>

<script setup lang="ts">
import IconButton from "./IconButton.vue";
import { caretForward as icon } from "ionicons/icons";
const emit = defineEmits(['click']);
</script>

<style scoped>
.forward-button {
  --size: var(--fs4);
}
</style>
