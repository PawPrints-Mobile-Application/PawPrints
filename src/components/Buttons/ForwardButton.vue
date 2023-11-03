<template>
  <IconButton class="forward-button" @click="() => emit('click')" :icon="icon" :disabled="disabled" />
</template>

<script setup lang="ts">
import IconButton from "./IconButton.vue";
import { caretForward as icon } from "ionicons/icons";

defineProps({
  disabled: Boolean
})

const emit = defineEmits(['click']);
</script>

<style scoped>
.forward-button {
  --size: var(--fs1);
  --padding: 3px 3px 3px 5px;
}
</style>
