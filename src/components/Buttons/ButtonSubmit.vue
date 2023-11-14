<template>
  <ButtonText
    class="button-submit"
    :state="state"
    :label="label"
    v-if="type === 'text'"
  />
  <ButtonIcon class="button-submit" :state="state" :icon="icon" v-else />
</template>
<script setup lang="ts">
import { ButtonText, ButtonIcon } from ".";
import { send as icon } from "ionicons/icons";

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
  label: {
    type: String,
    default: "Submit"
  }
});
</script>
<style scoped>
.button-icon {
  flex: 1 0 0;
  padding: 0;
  height: 36px;
}
</style>
