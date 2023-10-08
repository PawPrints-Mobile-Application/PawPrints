<template>
  <ion-button
    v-show="conditionToShow === true || conditionToShow === undefined"
    :class="class"
    :color="color"
    :id="id"
    :expand="expand"
    @click="onClick"
    >
    <slot />
  </ion-button>
</template>
<script lang="ts">
import { IonButton } from "@ionic/vue";
export default {
  name: "Button",
  components: { IonButton },
  props: ['onClick', 'conditionToShow', 'id', 'class', 'color', 'expand'],
};
</script>
<style scoped>
ion-button {
  --box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
</style>
