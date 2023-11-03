<template>
  <button class="icon-button" :class="['ion-activatable ion-focusable']" :disabled="!!disabled">
    <ion-icon id="icon" :icon="icon" />
    <ion-ripple-effect />
  </button>
</template>
<script setup lang="ts">
import { IonIcon, IonRippleEffect } from "@ionic/vue";

defineProps({
  noRipple: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    required: true,
  },
  disabled: Boolean
});
</script>
<style scoped>
.icon-button {
  --color: var(--ion-color-primary);
  --padding: 3px 5px 3px 3px;
  --border-radius: 10px;
  --margin: 10px 0;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--padding);
  border-radius: var(--border-radius);
  margin: var(--margin);
  background-color: var(--ion-color-tertiary);
}

.icon-button:active {
  opacity: 0.7;
}

.icon-button:disabled {
  opacity: 0.4;
}

.icon-button ion-icon#icon {
  font-size: var(--size);
  color: var(--color);
}
</style>
