<template>
  <ButtonText class="button-back" :label="label" v-if="type === 'text'" />
  <ButtonIcon class="button-back" :icon="icon" v-else />
</template>
<script setup lang="ts">
import { ButtonText, ButtonIcon } from ".";
import { chevronBack as icon } from "ionicons/icons";

defineProps({
  label: {
    type: String,
    default: "Back",
  },
  type: {
    type: String,
    default: "text",
    validator: (value: string) => ["text", "icon"].includes(value),
  },
});
</script>
<style scoped>
.button-text {
  color: var(--ion-color-black);
}

.button-icon {
  --size: var(--fs0);
  flex: 1 0 0;
  padding: 0;
  height: 40px;
  color: var(--ion-color-black);
  --transform: scale(140%);
}
</style>
