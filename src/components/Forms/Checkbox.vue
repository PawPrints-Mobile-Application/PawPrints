<template>
  <section class="checkbox" :class="{ focused: focused }">
    <div class="checkbox-container" :class="{ checked: value }">
      <div>
      <input
        class="checkbox-input"
        type="checkbox"
        :name="name"
        :checked="checked"
        v-model="value"
        :onFocus="() => (focused = true)"
        :onBlur="() => (focused = false)"
        :disabled="disabled"
      />
      <span class="checkbox-custom" @click="() => (value = false)" />
      </div>
    </div>
    <label class="checkbox-label" v-show="!!label || $slots.default" :for="name">
      <slot v-if="!!$slots.default" @click="() => (value = !value)" />
      <span v-else @click="() => (value = !value)">{{ label }}</span>
    </label>
  </section>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  label: String,
  checked: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  modelValue: Boolean,
});

const focused = ref(false);
const _value = ref(props.modelValue);
const value = computed({
  get() {
    return _value.value;
  },
  set(value: boolean) {
    _value.value = value;
    emit("update:modelValue", value);
    emit("input", props.modelValue);
  },
});

const emit = defineEmits(["input", "update:modelValue"]);
</script>
<style scoped>
.checkbox {
  --size: 13px;
  --border-radius: 3px;

  text-align: justify;
  font-family: Rubik;
  font-size: 12px;
  font-weight: 400;

  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
}

.checkbox-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: var(--border-radius);
  background-color: var(--ion-color-secondary);
  --input-size: calc(var(--size) - 1px);
  --circle-size: calc(var(--size) - 5px);
  width: var(--size);
  height: var(--size);
  overflow: hidden;
}

.checkbox-container div {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.focused .checkbox-container {
  outline: 1px solid black;
}

.checkbox-input {
  width: var(--input-size);
  height: var(--input-size);
  opacity: 0;
}

.checkbox-custom {
  position: relative;
  width: var(--circle-size);
  height: var(--circle-size);
  border-radius: 10px;
  background-color: var(--ion-color-black);
  opacity: 0.5;
}

.checked .checkbox-custom {
  transform: translateX(calc(0px - (var(--input-size) + var(--circle-size))/2));
}

.checkbox-label {
  width: 100%;
}
</style>
