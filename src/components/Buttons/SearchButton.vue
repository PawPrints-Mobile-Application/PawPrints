<template>
  <IconButton class="search-button" @click="() => emit('click')" :icon="icon" />
</template>
<script setup lang="ts">
import IconButton from "./IconButton.vue";
import { search as icon } from "ionicons/icons";

const emit = defineEmits(["click"]);
</script>
<style scoped>
.search-button {
  background-color: var(--ion-color-secondary);
  --size: var(--fs5);
}
</style>
