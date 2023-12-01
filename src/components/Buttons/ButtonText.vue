<template>
  <ButtonRippled class="button-text"
    ><TextSubheading class="text Rubik subheading normal">{{
      label
    }}</TextSubheading></ButtonRippled
  >
</template>
<script setup lang="ts">
import { ButtonRippled } from ".";
import { TextSubheading } from "../Texts";

defineProps({
  label: String,
});
</script>
<style scoped>
.button-text {
  --padding: 10px 30px;
  padding: var(--padding);
  min-width: 130px;
  background-color: var(--theme-tertiary-background);
  color: var(--theme-tertiary-text);
}
.text {
  color: inherit;
}
</style>
