<template>
  <ButtonText class="button-auth" :label="label" />
</template>
<script setup lang="ts">
import { ButtonText } from ".";

defineProps({
  label: {
    type: String,
    required: true,
  },
});
</script>
<style scoped>
.button-text {
  max-height: 50px;
  min-height: 50px;
  width: 200px;
  font-size: var(--fs2);
}
</style>
