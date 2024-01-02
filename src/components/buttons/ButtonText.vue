<template>
  <ButtonRippled class="button-text"
    ><TextSubheading class="Rubik subheading normal" :value="value"
  /></ButtonRippled>
</template>
<script setup lang="ts">
import { ButtonRippled, TextSubheading } from "..";

defineProps({
  value: String,
});
</script>
<style scoped>
.button-text {
  padding: 10px 30px;
  min-width: 130px;
  background-color: var(--theme-tertiary-background);
  color: var(--theme-tertiary-text);
}
.text {
  color: inherit;
}
</style>
