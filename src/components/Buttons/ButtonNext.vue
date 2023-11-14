<template>
  <ButtonText class="button-next" :state="state" label="Next" v-if="type === 'text'" />
  <ButtonIcon class="button-next" :state="state" :icon="icon" v-else />
</template>
<script setup lang="ts">
import { ButtonText, ButtonIcon } from ".";
import { caretForward as icon } from "ionicons/icons";

defineProps({
  type: {
    type: String,
    default: "text",
    validator: (value: string) => ["text", "icon"].includes(value),
  },
  state: {
    type: String,
    default: "normal",
    validator: (value: string) =>
      ["normal", "danger", "success"].includes(value),
  },
});
</script>
<style scoped>
.button-icon {
  --size: var(--fs0);
  flex: 1 0 0;
  padding: 0;
  height: 36px;
}
</style>
