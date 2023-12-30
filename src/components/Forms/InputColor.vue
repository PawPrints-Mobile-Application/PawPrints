<template>
  <section class="forms input-color">
    <input
      class="text poppins paragraph"
      :placeholder="placeholder"
      v-model="value"
    />
    <InputColorPicker v-model="value" />
  </section>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { InputColorPicker } from ".";

const props = defineProps({
  modelValue: String,
  show: Boolean,
  placeholder: String,
});

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const emit = defineEmits(["update:modelValue"]);
</script>
<style scoped>
.input-color {
  --background: var(--theme-secondary-background);
  --color: var(--theme-secondary-text);
  --outline: var(--theme-tertiary-background);
  --radius: 5px;
  --icon: var(--theme-tertiary-background);
  --text-align: left;
  --font-weight: 400;
  background-color: var(--background);
  color: var(var(--color));
  width: 100%;
  height: 30px;
  border-radius: var(--radius);
  padding: 5px 10px;
  display: flex;
  gap: 5px;

  &:is(:active, :hover, :focus) {
    outline: 2px solid var(--outline);
  }
}

input {
  text-align: var(--text-align);
  font-weight: var(--font-weight);
  background-color: inherit;
  color: inherit;
  border: none;
  outline: none;
  flex: 1 0 0;

  &:is(:active, :hover, :focus) {
    outline: none;
  }
}

.input-color-picker {
  position: relative;
  transform: translateY(-5px) scale(0.9);
}
</style>
