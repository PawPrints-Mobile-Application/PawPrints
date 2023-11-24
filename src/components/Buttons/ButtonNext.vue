<template>
  <ButtonText class="button-next" :label="label" v-if="type === 'text'" />
  <ButtonIcon class="button-next" :icon="icon" v-else />
</template>
<script setup lang="ts">
import { ButtonText, ButtonIcon } from ".";
import { chevronForward as icon } from "ionicons/icons";

defineProps({
  label: {
    type: String,
    default: "Next",
  },
  type: {
    type: String,
    default: "text",
    validator: (value: string) => ["text", "icon"].includes(value),
  },
});
</script>
<style scoped>
.button-icon {
  --size: var(--fs0);
  flex: 1 0 0;
  padding: 0;
  height: 40px;
  color: var(--ion-color-black);
  --transform: scale(140%);
}
</style>
