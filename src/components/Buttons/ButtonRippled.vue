<template>
  <button
    class="button-rippled ion-activatable ion-focusable"
    @mousedown="Mousedown"
    @mouseup="Mouseup"
  >
    <slot />
    <ion-ripple-effect />
  </button>
</template>
<script setup lang="ts">
import { IonRippleEffect } from "@ionic/vue";
import { ref } from "vue";

const props = defineProps({
  holdSeconds: {
    type: Number,
    default: 2000,
  },
});

const holding = ref(false);
const Mousedown = () => {
  holding.value = true;
  // console.log("mouse down");
  setTimeout(() => {
    if (holding.value) emit("mousehold");
  }, props.holdSeconds);
};
const Mouseup = () => {
  // console.log("mouse up");
  holding.value = false;
};

const emit = defineEmits(["mousehold"]);
</script>
<style scoped>
.button-rippled {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;

  padding: 3px;
  margin: 0;
  border-radius: 10px;
  font-size: var(--size);
  font-weight: 400;
  background-color: var(--ion-color-primary);
  color: var(--ion-color-black);

  transition: all 150ms ease-out;
}

.button-rippled:active {
  opacity: 0.7;
}

.button-rippled:disabled {
  opacity: 0.4;
}
</style>
