<template>
  <button class="button button-rippled ion-activatable ion-focusable">
    <slot />
    <ion-ripple-effect />
  </button>
</template>
<script setup lang="ts">
import { IonRippleEffect } from "@ionic/vue";
</script>
<style scoped>
.button-rippled {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  transition: all 150ms ease-out;
  border-radius: 10px;
}

.button-rippled:active {
  opacity: 0.7;
}

.button-rippled:disabled {
  opacity: 0.2;
}
</style>
