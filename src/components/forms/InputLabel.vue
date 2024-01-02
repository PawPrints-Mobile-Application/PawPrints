<template>
  <section class="input-label default-input font">
    <TextSubheading :value="value" />
    <span
      class="requirement"
      v-show="!!showRequirement"
      :data-color="requirementColor"
      >{{ requirementText }}</span
    >
  </section>
</template>
<script setup lang="ts">
import { TextSubheading } from "..";

defineProps({
  value: String,
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
.input-label {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  --font-size: var(--fs3);
  color: var(--theme-primary-text);

  > .text {
    font-size: var(--font-size);
    font-weight: 700;
  }

  > .requirement {
    font-size: var(--fs4);
  }
}
</style>
