<template>
  <ButtonRippled class="button-icon">
    <ion-icon :icon="icon" />
  </ButtonRippled>
</template>
<script setup lang="ts">
import { ButtonRippled } from ".";
import { IonIcon } from "@ionic/vue";

defineProps({
  icon: {
    type: String,
    required: true,
  },
});
</script>
<style scoped>
.button-rippled {
  background-color: var(--bg-color);
}
.button-icon {
  width: var(--button-size);
  height: var(--button-size);
}
</style>
