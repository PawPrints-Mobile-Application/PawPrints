<template>
  <button
    class="button-rippled ion-activatable ion-focusable"
    :style="{ backgroundColor: color }"
  >
    <slot />
    <ion-ripple-effect />
  </button>
</template>
<script setup lang="ts">
import { IonRippleEffect } from "@ionic/vue";
import { computed } from "vue";

const props = defineProps({
  state: {
    type: String,
    default: "normal",
    validator: (value: string) =>
      ["normal", "danger", "success"].includes(value),
  },
});

const color = computed(
  () =>
    `var(--ion-color-${props.state === "normal" ? "tertiary" : props.state})`
);
</script>
<style scoped>
.button-rippled {
  --size: var(--fs1);

  margin: 0;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 3px 5px 3px 3px;
  border-radius: 10px;
  font-size: var(--size);
  font-weight: 400;
  color: var(--ion-color-primary);

  transition: all 150ms ease-out;
}

.button-rippled:active {
  opacity: 0.7;
}

.button-rippled:disabled {
  opacity: 0.4;
}
</style>
