<template>
  <ButtonIcon class="search-button" :icon="icon" />
</template>
<script setup lang="ts">
import ButtonIcon from "./ButtonIcon.vue";
import { search as icon } from "ionicons/icons";
</script>
<style scoped>
.search-button {
  background-color: var(--ion-color-secondary);
  --size: var(--fs0);
}
</style>
