<template>
  <ButtonIcon class="button-back" :icon="icon" />
</template>
<script setup lang="ts">
import { ButtonIcon } from ".";
import { chevronBack as icon } from "ionicons/icons";
</script>
<style scoped>
.button-back {
  color: var(--theme-tertiary);
  font-size: 40px;
}
</style>
