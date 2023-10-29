<template>
  <section
    class="forms-input input-text"
    :class="{
      focused: state.focused,
      taken: state.taken,
      touched: state.touched,
      required: !!props.required,
      disabled: !!props.disabled
    }"
    :data-strength="validity.strength"
    :data-design="design"
    @click="ForceFocus"
  >
    <label :for="id" v-show="design !== 'input-only'">{{ label }}</label>
    <div class="input-container flex-container">
      <input
        ref="input"
        :id="id"
        class="flex-item"
        :type="
          (type === 'password' && !show) || state.focused || state.taken
            ? 'text'
            : type
        "
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
    <ul class="helper-container" v-show="design !== 'input-only'">
      <li v-for="(text, key) in validators" :data-strength="validity.valids[key] ? 'true' : validators![key].intensity">{{ text.helperText }}</li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import {
  checkmarkDoneCircle as validationSuccess,
  closeCircle as validationWarning,
  shieldCheckmark as passwordStrong,
  checkmarkCircle as passwordMedium,
  alertCircle as passwordWeak,
  calendar,
  chevronExpand as expand,
  alert as required,
} from "ionicons/icons";
import { IonIcon } from "@ionic/vue";
import { Validator } from "../../utils";

const input = ref();
const props = defineProps({
  label: String,
  id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
    validators: (value: string) =>
      ["text", "password", "email", "date"].includes(value),
  },
  required: Boolean,
  validators: Array<Validator>,
  placeholder: String,
  modelValue: {
    type: String,
    required: true,
  },
  modelValid: Boolean,
  design: {
    type: String,
    default: "classic",
    validators: (value: string) => ["classic", "input-only"].includes(value),
  },

  // Actions
  disabled: Boolean,
  // Only works on passwords
  show: {
    type: Boolean,
    default: false,
  },
});

const validity = reactive({
  valids: Array(props.validators?.length),
  considered: false, // True when all of warning validator intensities are satisfied
  accepted: false, // True when all of danger and warning validator intensities are satisfied
  strength: -2,
});
const DataEvaluator = (value: string) => {
  let considered = true;
  let accepted = true;
  props.validators?.map((validator, id) => {
    const temp = validator.callback(value);
    validity.valids[id] = temp;
    accepted &&= temp;
    if (validator.intensity === "danger") return;
    considered &&= temp;
  });

  validity.considered = considered;
  validity.accepted = accepted;
  validity.strength =
    Number(accepted) + Number(considered) + Number(state.taken) - 2;

  emit("validity", validity.strength);
};

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("input", value);
    emit("update:modelValue", value);
    state.taken = value !== "";
    DataEvaluator(value);
    GetIcon();
  },
});

const icons = {
  strong: props.type === "password" ? passwordStrong : validationSuccess,
  medium: passwordMedium,
  weak: props.type === "password" ? passwordWeak : validationWarning,
  calendar: calendar,
  expand: expand,
  required: required,
};
const GetIcon = () => {
  if (!state.taken) {
    state.icon = state.touched && !!props.required ? icons.required : "";
    return;
  }

  switch (validity.strength) {
    case -1:
      state.icon = icons.weak;
      break;
    case 0:
      state.icon = icons.medium;
      break;
    case 1:
      state.icon = icons.strong;
      break;
    default:
      state.icon = "";
      break;
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
