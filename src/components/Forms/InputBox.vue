<template>
  <section class="input-box text subheading poppins">
    <input
      v-if="!freeze"
      ref="reference"
      :type="GetType()"
      v-model="value"
      @focus="Focus"
      @blur="Blur"
      @input="Input"
      @change="emit('change', value)"
      :placeholder="!placeholder ? `Input ${type}` : placeholder"
      :disabled="disabled"
    />
    <div v-else>
      {{ value }}
    </div>
  </section>
</template>
<script setup lang="ts">
import { computed, reactive, ref } from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "text",
    validator: (value: string) =>
      [
        // value type String
        "text",
        "password",
        "email",
        "time",
        "color",
        "date",

        // value type Number
        "number",
        "range",
      ].includes(value),
  },
  modelValue: [String, Number],
  hidden: Boolean, // Turns text into password
  show: Boolean,
  freeze: Boolean,
  placeholder: String,
  disabled: Boolean,
});

const GetType = () => {
  if (!!props.hidden) return "password";
  if (
    (props.type === "password" && !!props.show) ||
    ["color", "date"].includes(props.type)
  )
    return "text";
  return props.type;
};

const defaults = {
  text: "",
  number: 0,
  get() {
    if (["number", "range"].includes(props.type)) return this.number;
    else return this.text;
  },
};

const value = computed({
  get() {
    if (!props.modelValue) return defaults.get();
    return props.modelValue;
  },
  set(value: string | number) {
    emit("update:modelValue", value);
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
]);
defineExpose({ state, ForceFocus, ForceBlur });
</script>
<style scoped>
input,
div {
  background-color: var(--ion-color-secondary);
  border-radius: 6px;
  border: none;
  padding: 2px 10px;
  width: 100%;
  height: 30px;
}

div {
  opacity: 0.7;
}

input[type="date"]::-webkit-inner-spin-button,
input[type="date"]::-webkit-calendar-picker-indicator {
  display: none;
  -webkit-appearance: none;
}

input[type="password"]::-ms-reveal,
input[type="password"]::-ms-clear {
  display: none;
}
</style>
