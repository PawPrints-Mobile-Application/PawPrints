<template>
  <button
    class="ion-activatable ion-focusable"
    id="back-button"
    @click="
      () => {
        onClick;
        togglePress(type, design, filled);
      }
    "
    :onmousedown="onPseudoMount(type, design, filled)" :style="backgroundColor && {backgroundColor: `var(--ion-color-${backgroundColor})`}"
  >
    <ion-icon :icon="icon" :color="color" size="large" />
    <ion-ripple-effect
      v-show="[false, undefined].includes(noRipple) && Number(type) === 0"
    />
  </button>
</template>

<script setup lang="ts">
import { IonIcon, IonRippleEffect } from "@ionic/vue";
import { ref } from "vue";
import {
  arrowBack,
  chevronBack,
  returnDownBack,
  returnUpBack,
  arrowBackCircle,
  caretBackCircle,
  chevronBackCircle,
  playBack,
  playBackCircle,
  playSkipBack,
  playSkipBackCircle,
  arrowBackCircleOutline,
  caretBackCircleOutline,
  chevronBackCircleOutline,
  playBackOutline,
  playBackCircleOutline,
  playSkipBackOutline,
  playSkipBackCircleOutline,
} from "ionicons/icons";

const designsList = [
  [arrowBack, chevronBack, returnDownBack, returnUpBack],
  [
    arrowBackCircle,
    caretBackCircle,
    chevronBackCircle,
    playBack,
    playBackCircle,
    playSkipBack,
    playSkipBackCircle,
  ],
  [
    arrowBackCircleOutline,
    caretBackCircleOutline,
    chevronBackCircleOutline,
    playBackOutline,
    playBackCircleOutline,
    playSkipBackOutline,
    playSkipBackCircleOutline,
  ],
];
const pseudoMount = ref(false);
const onPseudoMount = (type: any, design: any, filled: any) => {
  if (pseudoMount.value) return;
  pseudoMount.value = true;
  SetIcon(type, design, filled, false);
};

const icon = ref("");
const togglePress = (type: any, design: any, filled: any) => {
  SetIcon(type, design, filled, true);
  setTimeout(() => SetIcon(type, design, filled, false), 150);
};

const SetIcon = (type: any, design: any, filled: any, value: boolean) =>
  (icon.value = GetIcon(type, design, filled, value));

const GetIcon = (type: any, design: any, filled: any, value: boolean) => {
  const outlined = [null, NaN, true, "true", 1, "1", ""].includes(filled) === value;
  const curType = [undefined, null, NaN, '', false, 'false'].includes(type) ? 0 : Number(type);
  return designsList[curType + (!outlined || curType === 0 ? 0 : 1)][design === undefined ? 0 : Number(design)];
};
</script>

<script lang="ts">
export default {
  name: "BackButton",
  props: ["type", "design", "onClick", "noRipple", "color", "filled", "backgroundColor"],
};
</script>
<style>
#back-button {
  position: relative;
  overflow: hidden;
  padding: 2px 20px;
  border-radius: 10px;
  width: max-content;
  height: max-content;
  background-color: #0000;
}
</style>
