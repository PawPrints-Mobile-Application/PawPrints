<template>
    <textarea
      class="forms input-textarea font poppins paragraph"
      :type="type"
      v-model="value"
    />
  </template>
  <script setup lang="ts">
  import { computed } from "vue";
  
  const props = defineProps({
    modelValue: String,
    type: {
      type: String,
      default: "text",
      validator: (value: string) => ["text", "email"].includes(value),
    },
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
  .input-textarea {
    --background: var(--theme-secondary-background);
    --color: var(--theme-secondary-text);
    --outline: var(--theme-tertiary-background);
    --radius: 5px;
    --text-align: left;
    background-color: var(--background);
    color: var(var(--color));
    border: none;
    outline: none;
    border-radius: var(--radius);
    padding: 5px 10px;
    width: 100%;
    height: 100px;
    text-align: var(--text-align);
  
    &:is(:active, :hover, :focus) {
      outline: 2px solid var(--outline);
    }
  }
  </style>
  