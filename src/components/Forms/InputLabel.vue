<template>
  <section class="input-label">
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

  > .requirement {
    font-size: var(--fs4);
  }
}
</style>
