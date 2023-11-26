<template>
  <ButtonRippled class="button-icon" @mousehold="emit('mousehold')">
    <ion-icon :icon="icon" />
    <TextSmall v-show="!!label">{{ label }}</TextSmall>
  </ButtonRippled>
</template>
<script setup lang="ts">
import { ButtonRippled } from ".";
import { IonIcon } from "@ionic/vue";
import { TextSmall } from "../Texts";

defineProps({
  icon: {
    type: String,
    required: true,
  },
  label: String,
});

const emit = defineEmits(["mousehold"]);
</script>
<style scoped>
.button-icon {
  width: var(--button-size);
  height: var(--button-size);
  display: flex;
  flex-direction: column;

  > ion-icon {
    transform: var(--transform);
  }

  > * {
    color: inherit;
  }
}
</style>
