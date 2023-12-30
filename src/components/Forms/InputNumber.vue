<template>
  <input
    class="forms input-number text poppins paragraph"
    type="number"
    v-model="value"
  />
</template>
<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  modelValue: Number,
});

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
    emit("input", value);
  },
});

const emit = defineEmits(["update:modelValue", "input"]);
</script>
<style scoped>
.input-number {
  --background: var(--theme-secondary-background);
  --color: var(--theme-secondary-text);
  --outline: var(--theme-tertiary-background);
  --radius: 5px;
  --text-align: left;
  --font-weight: 400;
  background-color: var(--background);
  color: var(var(--color));
  border: none;
  outline: none;
  border-radius: var(--radius);
  padding: 5px 10px;
  width: 100%;
  height: 30px;
  text-align: var(--text-align);
  font-weight: var(--font-weight);

  &:is(:active, :hover, :focus) {
    outline: 2px solid var(--outline);
  }
}
</style>
