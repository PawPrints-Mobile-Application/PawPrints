<template>
  <ion-button
    v-show="conditionToShow === true || conditionToShow === undefined"
    class="button"
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
:root {
  --width: max-content;
  --min-width: 150px;
}

.button {
  --box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: inherit;
  font-weight: 600;
  font-size: 1.5rem;
  min-width: var(--min-width);
  width: var(--width);
  --border-radius: 10px;
  margin-top: 10px;
  text-transform: none;
}
</style>
