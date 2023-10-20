<template>
  <section class="checkbox" :class="{ focused: focused }">
    <div class="checkbox-container" :class="{ checked: value }">
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
    <label class="checkbox-label" v-show="!!label || $slots.default" :for="name">
      <slot v-if="!!$slots.default" />
      <span v-else>{{ label }}</span>
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
  justify-content: center;
  align-items: center;
  border-radius: var(--border-radius);
  background-color: var(--ion-color-secondary);
}

.focused .checkbox-container {
  outline: 1px solid black;
}

.checkbox-input {
  width: calc(var(--size) - 1px);
  height: calc(var(--size) - 1px);
  opacity: 0;
}

.checkbox-custom {
  display: none;
  position: absolute;
  width: calc(var(--size) - 5px);
  height: calc(var(--size) - 5px);
  border-radius: 10px;
  background-color: var(--ion-color-black);
  opacity: 0.5;
}

.checked .checkbox-custom {
  display: block;
}

.checkbox-label {
  width: 100%;
}
</style>
