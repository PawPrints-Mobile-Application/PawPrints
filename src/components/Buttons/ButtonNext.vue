<template>
  <ButtonIcon class="button button-next" :icon="icon" />
</template>
<script setup lang="ts">
import { ButtonIcon } from ".";
import { chevronForward as icon } from "ionicons/icons";
</script>
<style scoped>
.button-next {
  color: var(--theme-tertiary-background);
  background-color: var(--theme-primary-background);
  font-size: 40px;
}
</style>
