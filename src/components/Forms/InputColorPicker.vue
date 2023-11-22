<template>
  <section class="input-color-picker">
    <input type="color" v-model="value" />
    <div :style="{ backgroundColor: value }" />
  </section>
</template>
<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  modelValue: String,
});

const value = computed({
  get() {
    if ([undefined, ""].includes(props.modelValue)) return "#000000";
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const emit = defineEmits(["update:modelValue"]);
</script>
<style scoped>
.input-color-picker {
  --size: 30px;
  width: var(--size);
  height: var(--size);
  display: flex;
  overflow: hidden;
  border-radius: 6px;


  > * {
    width: var(--size);
    height: var(--size);
  }

  > input {
    position: absolute;
    opacity: 0;
  }
}
</style>
