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
  padding: 10px 30px;
  min-width: 130px;
  background-color: var(--theme-button-normal);
  color: var(--theme-button-text);

  > .text {
    color: inherit;
  }
}
</style>
