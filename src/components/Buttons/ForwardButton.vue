<template>
  <IconButton id="back-button" className="back-button" :on-click="onClick"
      :background-color="backgroundColor"
      :color="color"
      :class="class"
      :no-ripple="noRipple"
      :icon="GetIcons(type, design, filled)[0]"
      :icon-after="GetIcons(type, design, filled)[1]"
      />
</template>

<script setup lang="ts">
// import { IonIcon, IonRippleEffect } from "@ionic/vue";
import IconButton from "./IconButton.vue";
import {
  arrowForward,
  chevronForward,
  returnDownForward,
  returnUpForward,
  arrowForwardCircle,
  caretForwardCircle,
  chevronForwardCircle,
  playForward,
  playForwardCircle,
  playSkipForward,
  playSkipForwardCircle,
  arrowForwardCircleOutline,
  caretForwardCircleOutline,
  chevronForwardCircleOutline,
  playForwardOutline,
  playForwardCircleOutline,
  playSkipForwardOutline,
  playSkipForwardCircleOutline,
} from "ionicons/icons";

const designsList = [
  [arrowForward, chevronForward, returnDownForward, returnUpForward],
  [
    arrowForwardCircle,
    caretForwardCircle,
    chevronForwardCircle,
    playForward,
    playForwardCircle,
    playSkipForward,
    playSkipForwardCircle,
  ],
  [
    arrowForwardCircleOutline,
    caretForwardCircleOutline,
    chevronForwardCircleOutline,
    playForwardOutline,
    playForwardCircleOutline,
    playSkipForwardOutline,
    playSkipForwardCircleOutline,
  ],
];
const GetIcons = (type: any, design: any, filled: any) => {
  const iconBefore = GetIcon(type, design, filled, false);
  const iconAfter = GetType(type) === 0 ? undefined : GetIcon(type, design, filled, true);
  return [iconBefore, iconAfter];
}

const GetType = (type:any) => [undefined, null, NaN, '', false, 'false'].includes(type) ? 0 : Number(type);

const GetIcon = (type: any, design: any, filled: any, value: boolean) => {
  const outlined = [null, NaN, true, "true", 1, "1", ""].includes(filled) === value;
  const curType = GetType(type);
  return designsList[curType + (!outlined || curType === 0 ? 0 : 1)][design === undefined ? 0 : Number(design)];
};
</script>

<script lang="ts">
export default {
  name: "ForwardButton",
  props: ["class", "type", "design", "onClick", "noRipple", "color", "filled", "backgroundColor"],
};
</script>
<style scoped>
#back-button, .back-button {
  position: relative;
  overflow: hidden;
  padding: 2px 20px;
  border-radius: 10px;
  width: max-content;
  height: max-content;
  background-color: #0000;
}
</style>
