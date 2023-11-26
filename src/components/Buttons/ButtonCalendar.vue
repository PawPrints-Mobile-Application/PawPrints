<template>
  <button class="button-calendar" @click="Click">
    <div class="background" />
    <div class="line" />
    <div
      v-for="key in GetLocation()"
      class="dot"
      :style="{
        transform: state
          ? `translate(${key.x}px, ${key.y}px)`
          : 'translate(0,-8px)',
      }"
    />
  </button>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
const props = defineProps({
  modelValue: Boolean,
});

const _state = ref(false);
const state = computed({
  get() {
    return !props.modelValue ? _state.value : props.modelValue;
  },
  set(value) {
    _state.value = value;
  },
});

const GetLocation = () => {
  let temp = [];
  for (let i = 0; i < 5; i++) {
    const distance = 10;
    const x = [-distance, 0, distance][i % 3];
    const y = Math.floor(i / 3) * 8;
    temp.push({ x, y });
  }
  return temp;
};

const Click = () => {
  state.value = !state.value;
  emit("click", state.value);
  emit("update:modelValue", state.value);
  if (state.value) emit("expand");
  else emit("collapse");
};

const emit = defineEmits(["update:modelValue", "expand", "collapse", "click"]);
</script>
<style scoped>
.button-calendar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 30px;
  
  > .background {
    border-radius: 5px;
    width: 30px;
    aspect-ratio: 1;
    background-color: var(--theme-tertiary);
  }

  > .line {
    position: absolute;
    width: 30px;
    height: 3px;
    background-color: var(--theme-secondary);
    transform: translateY(-8px);
  }

  > .dot {
    position: absolute;
    width: 3px;
    aspect-ratio: 1;
    background-color: var(--theme-secondary);
    transition: all 200ms ease-out;
  }
}
</style>
