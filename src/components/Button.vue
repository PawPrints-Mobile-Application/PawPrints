<template>
  <ion-button
    v-show="conditionToShow"
    :class="class"
    :color="color"
    :id="id"
    :expand="expand"
    @click="onClickFunction"
    >
    <slot />
  </ion-button>
</template>
<script lang="ts">
import { IonButton } from "@ionic/vue";
export default {
  name: "Button",
  components: { IonButton },
  props: ['onClickFunction', 'conditionToShow', 'id', 'class', 'color', 'expand'],
};
</script>
<style scoped>
</style>
