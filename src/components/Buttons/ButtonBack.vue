<template>
  <ButtonIcon class="button button-back" :icon="icon" />
</template>
<script setup lang="ts">
import { ButtonIcon } from ".";
import { chevronBack as icon } from "ionicons/icons";
</script>
<style scoped>
.button-back {
  color: var(--theme-tertiary-background);
  background-color: var(--theme-primary-background);
  font-size: 40px;
}
</style>
