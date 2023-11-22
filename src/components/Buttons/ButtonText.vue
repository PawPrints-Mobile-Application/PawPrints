<template>
  <ButtonRippled class="button-text">{{ label }}</ButtonRippled>
</template>
<script setup lang="ts">
import { ButtonRippled } from ".";

defineProps({
  label: String,
});
</script>
<style scoped>
.button-text {
  font-weight: 600;
  --size: var(--fs2);
  padding: 10px 30px;
  flex: 1 0 0;
}
</style>
