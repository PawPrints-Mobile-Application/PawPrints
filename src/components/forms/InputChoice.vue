<template>
  <section class="input-choice">
    <div
      class="choice"
      v-for="(option, key) in options"
      :class="{selected: options?.indexOf(modelValue!) === key}"
      @click="() => (value = option.toString())"
    >
      {{ option }}
    </div>
  </section>
</template>
<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  options: Array<String>,
  modelValue: String,
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
.input-choice {
  --default-background: var(--theme-primary-background);
  --default-text: var(--theme-primary-text);
  --default-outline: var(--theme-primary-text);
  --active-background: var(--theme-quadratic-background);
  --active-text: var(--theme-quadratic-text);
  --active-outline: var(--theme-quadratic-text);

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.choice {
  background-color: var(--default-background);
  color: var(--default-text);
  outline: 2px solid var(--default-outline);
  font-weight: 700;
  width: max-content;
  width: 30px;
  height: 30px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.5;
}

.selected {
  background-color: var(--active-background);
  color: var(--active-text);
  outline: 2px solid var(--active-outline);
  opacity: 1;
}
</style>
