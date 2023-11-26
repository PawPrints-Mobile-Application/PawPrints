<template>
  <ButtonText class="button-clear" label="Clear" />
</template>
<script setup lang="ts">
import { ButtonText } from ".";
</script>
<style scoped>
.button-clear {
  background-color: var(--theme-button-warning);
  color: var(--theme-button-text);
}
</style>
