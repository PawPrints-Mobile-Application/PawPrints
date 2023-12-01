<template>
  <ButtonText class="button-submit" :label="label" />
</template>
<script setup lang="ts">
import { ButtonText } from ".";

defineProps({
  label: {
    type: String,
    default: 'Submit'
  }
})

</script>
<style scoped>
.button-submit {
  background-color: var(--theme-success-background);
  color: var(--theme-success-text);
}
</style>
