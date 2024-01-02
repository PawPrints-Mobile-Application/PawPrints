<template>
  <ButtonRippled class="button-icon">
    <ion-icon :icon="value" />
  </ButtonRippled>
</template>
<script setup lang="ts">
import { ButtonRippled } from "..";
import { IonIcon } from "@ionic/vue";

defineProps({
  value: {
    type: String,
    required: true,
  },
});
</script>
<style scoped>
</style>
