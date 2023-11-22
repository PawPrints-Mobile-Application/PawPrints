<template>
  <section class="input-label default-input text">
    <label class="text font-bold" :for="props.for">{{ value }}</label>
    <span
      class="requirement"
      v-show="!!showRequirement"
      :data-color="requirementColor"
      >{{ requirementText }}</span
    >
  </section>
</template>
<script setup lang="ts">
const props = defineProps({
  for: String,
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

  > .text {
    font-size: var(--font-size);
    font-weight: 700;
  }

  > .requirement {
    font-size: var(--fs4);
  }
}
</style>
