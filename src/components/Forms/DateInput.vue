<template>
  <section
    class="forms-input input-date"
    :class="{
      focused: state.focused,
      taken: state.taken,
      touched: state.touched,
      required: !!props.required,
      disabled: !!props.disabled,
    }"
    :data-design="design"
    @click="ForceFocus"
  >
    <label :for="id" v-show="design !== 'input-only'">{{ label }}</label>
    <div class="input-container flex-container">
      <input
        ref="input"
        :id="id"
        class="flex-item"
        type="date"
        v-model="value"
        :placeholder="GetPlaceholder()"
        @focus="Focus"
        @blur="Blur"
        :disabled="!!props.disabled"
      />
      <ion-icon
        class="icon-indicator"
        v-show="state.icon !== ''"
        :icon="state.icon"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import {
  calendar as collapsed,
  calendarClear as expanded,
  alert as required,
} from "ionicons/icons";
import { IonIcon } from "@ionic/vue";

const input = ref();
const props = defineProps({
  label: String,
  id: {
    type: String,
    required: true,
  },
  required: Boolean,
  placeholder: String,
  modelValue: {
    type: String,
    required: true,
  },
  design: {
    type: String,
    default: "classic",
    validators: (value: string) => ["classic", "input-only"].includes(value),
  },

  // Actions
  disabled: Boolean,
});
const value = computed({
  get() {
    if (props.modelValue.trim() === '') return
    return props.modelValue;
  },
  set(value) {
    emit("input", value);
    emit("update:modelValue", value);
    state.taken = value !== "";
    GetIcon();
  },
});

const icons = {
  expanded: expanded,
  collapsed: collapsed,
  required: required,
};
const GetIcon = () => {
  if (!state.taken) {
    state.icon = state.touched && !!props.required ? icons.required : "";
    return;
  }
};

const state = reactive({
  focused: false,
  touched: false,
  taken: false,
  icon: "",
});

const Focus = () => {
  state.focused = true;
  state.touched = true;
  if (!!props.required) {
    state.icon = "";
  }
  emit("focus");
};

const ForceFocus = () => input.value.focus();

const Blur = () => {
  state.focused = false;
  if (!!props.required) {
    state.icon = icons.required;
  }
  emit("blur");
};

const GetPlaceholder = () =>
  (!state.taken && state.focused) || props.design === "input-only"
    ? props.placeholder
    : "";

const emit = defineEmits([
  "update:modelValue",
  "validity",
  "update:modelValid",
  "focus",
  "blur",
  "input",
]);

defineExpose({ ForceFocus });
</script>
