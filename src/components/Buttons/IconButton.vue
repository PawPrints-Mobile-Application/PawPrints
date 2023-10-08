<template>
    <button
      class="ion-activatable ion-focusable"
      :id="id"
      @click="
        () => {
          onClick;
        togglePress(icon, iconAfter);
        }
      "
      :onmousedown="onPseudoMount(icon, iconAfter)"
      :style="backgroundColor && {backgroundColor: `var(--ion-color-${backgroundColor})`}"
    >
      <ion-icon :icon="currentIcon" :color="color" size="large" />
      <ion-ripple-effect
        v-show="[false, undefined].includes(noRipple) && [false, undefined, null, ''].includes(iconAfter)"
      />
    </button>
</template>
<script setup lang="ts">
import { IonIcon, IonRippleEffect } from "@ionic/vue";
import { ref } from "vue";

const currentIcon = ref("");
const pseudoMount = ref(false);
const onPseudoMount = (iconBefore:any, iconAfter:any) => {
  if (pseudoMount.value) return;
  pseudoMount.value = true;
  SetIcon(iconBefore, iconAfter, false);
};
const SetIcon = (iconBefore:any, iconAfter:any, value:boolean) => currentIcon.value = ([false, undefined, null, ''].includes(iconAfter) || !value ? iconBefore : iconAfter);
const togglePress = (iconBefore:any, iconAfter:any) => {
  SetIcon(iconBefore, iconAfter, true);
  setTimeout(() => SetIcon(iconBefore, iconAfter, false), 150);
};
</script>

<script lang="ts">
export default {
    name: "IconButton",
  props: ["id", "noRipple", "color", "backgroundColor", "onClick", 'icon', 'iconAfter'],
}
</script>
<style>
    
</style>