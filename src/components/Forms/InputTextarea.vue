<template>
  <section
    class="input-textarea text small poppins"
    :class="{ selected: state.focused }"
  >
    <textarea
      v-if="!freeze"
      ref="reference"
      v-model="value"
      @focus="Focus"
      @blur="Blur"
      @input="Input"
      @change="emit('change', value)"
      :placeholder="placeholder"
      :disabled="disabled"
      @keyup.enter="emit('return', value)"
    />
    <div v-else>
      {{ value }}
    </div>
  </section>
</template>
<script setup lang="ts">
import { computed, reactive, ref } from "vue";

const props = defineProps({
  modelValue: String,
  hidden: Boolean, // Turns text into password
  show: Boolean,
  freeze: Boolean,
  placeholder: String,
  disabled: Boolean,
  rows: {
    type: Number,
    default: 4,
  },
  cols: {
    type: Number,
    default: 50,
  },
});

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
    emit("input");
  },
});

// State Machine
const state = reactive({
  touched: false,
  edited: false,
  focused: false,
});

const Focus = () => {
  if (!state.touched) {
    state.touched = true;
    emit("first-touch");
  }
  state.focused = true;
  emit("focus");
};

const Input = () => {
  if (!state.edited) {
    state.edited = true;
    emit("first-edit");
  }
};

const Blur = () => {
  state.focused = false;
  emit("blur");
};

const reference = ref();
const ForceFocus = () => reference.value.focus();
const ForceBlur = () => reference.value.blur();

const emit = defineEmits([
  "update:modelValue",
  "focus",
  "blur",
  "first-touch",
  "first-edit",
  "change",
  "input",
  "return",
]);
defineExpose({ state, ForceFocus, ForceBlur });
</script>
<style scoped>
.input-textarea {
  --background: var(--theme-secondary-background);
  --text: var(--theme-secondary-text);
  --outline: var(--theme-tertiary-background);
  height: 100px;
  border-radius: 6px;
  overflow: scroll;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--background);

  > textarea:is(:active, :hover, :focus) {
    outline: none;
  }
}

.selected {
  outline: 2px solid var(--outline);
}

textarea,
div {
  min-height: 100%;
  background-color: var(--background);
  color: var(--text);
  border: none;
  padding: 10px;
  width: 100%;
  height: 30px;
  border-radius: 6px;
}

textarea {
  min-height: 95%;
  align-self: center;
}

div {
  opacity: 0.7;
}
</style>
