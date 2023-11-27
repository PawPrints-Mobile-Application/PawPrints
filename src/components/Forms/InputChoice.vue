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
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.choice {
  outline: 2px solid var(--theme-black);
  background-color: var(--theme-quadratic);
  color: var(--theme-primary);
  font-weight: 700;
  width: max-content;
  width: 30px;
  height: 30px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.selected {
  background-color: var(--theme-primary);
  color: var(--theme-tertiary);
  outline: 2px solid var(--theme-tertiary);
}
</style>
