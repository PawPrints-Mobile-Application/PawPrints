<template>
  <div class="input-wrapper">
    <InputLabel
      :value="label"
      :showRequirement="showRequirement"
      :requirementText="requirementText"
      :requirementColor="requirementColor"
    />
    <slot />
  </div>
</template>
<script setup lang="ts">
import { InputLabel } from "..";

defineProps({
  label: String,
  showRequirement: Boolean,
  requirementText: {
    type: String,
    default: "Required",
  },
  requirementColor: {
    type: String,
    default: "danger",
  },
});
</script>
<style scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  color: var(--theme-primary-text);
}
</style>
