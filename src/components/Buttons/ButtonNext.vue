<template>
  <ButtonIcon class="button-next" :icon="icon" />
</template>
<script setup lang="ts">
import { ButtonIcon } from ".";
import { chevronForward as icon } from "ionicons/icons";
</script>
<style scoped>
.button-back {
  color: var(--theme-tertiary);
  font-size: 40px;
}
</style>
