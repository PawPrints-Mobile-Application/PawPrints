<template>
  <section
    class="text-input"
    :class="{
      focused: state.focused,
      taken: value !== '',
      animated: animated,
      'hide-label': !!hideLabel,
      touched: state.touched,
      required: props.required,

      strong: state.strength === 1,
      medium: state.strength === 0,
      weak: state.strength === -1,
    }"
  >
    <label v-show="!hideLabel" :for="id">{{ label }}</label>
    <div class="content" @click="ForceFocus">
      <ion-icon v-show="!!icon" id="icon" class="icon" :icon="icon" />
      <input
        ref="input"
        :id="id"
        @input="() => console.log(state.isPassword)"
        :type="
          (state.isPassword && !show) || (!state.focused && value === '')
            ? 'text'
            : type
        "
        @focus="Focus"
        @blur="Blur"
        v-model="value"
        :placeholder="GetPlaceholder()"
        :disabled="!!disabled"
      />
      <ion-icon
        v-show="
          (value !== '' && !!validators) ||
          (value === '' && props.required && state.touched)
        "
        id="indicator"
        class="icon"
        :icon="GetIcon()"
      />
    </div>
    <ul
      v-show="!!validators && !hideHelper"
      class="helper-container"
      :class="{ 'always-show': alwaysShowHelper }"
    >
      <li
        v-for="(validator, id) in validators"
        :style="{
          color: `var(--ion-color-${
            valids[id] ? 'success' : validator.intensity
          })`,
        }"
      >
        {{ validator.helperText }}
      </li>
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
  icon: String,
  validators: Array<Validator>,
  placeholder: String,
  modelValue: {
    type: String,
    required: true,
  },
  modelValid: Boolean,

  // Actions
  disabled: Boolean,
  hideLabel: Boolean,
  animated: {
    type: Boolean,
    default: true,
  },

  // Only works on passwords
  show: {
    type: Boolean,
    default: false,
  },
  alwaysShowHelper: Boolean,
  hideHelper: Boolean,
});

const valid = ref(false);
const valids = ref(Array(props.validators?.length).fill(false));
const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    if (!!props.validators) {
      valids.value = props.validators?.map((func) => func.callback(value));
      valid.value = valids.value.reduce((acc, val) => acc && val);
      let temp: null | Boolean = null;
      valids.value.forEach((value, id) => {
        if (props.validators![id].intensity === "danger") return;
        temp = !!temp ? temp && value : value;
      });
      state.strength = valid.value ? 1 : !!temp ? 0 : -1;
      emit("validate", state.strength);
      emit("update:modelValid", valid.value);
    }
    emit("input", value);
    emit("update:modelValue", value);
  },
});

const emit = defineEmits([
  "update:modelValue",
  "validate",
  "update:modelValid",
  "focus",
  "blur",
  "input",
]);

const icons = {
  validation: {
    success: validationSuccess,
    warning: validationWarning,
  },
  passwordStrength: {
    strong: passwordStrong,
    medium: passwordMedium,
    weak: passwordWeak,
  },
  calendar: calendar,
  expand: expand,
  icon: props.icon,
  required: required,
};
const GetIcon = () => {
  if (value.value === "" && !!props.required) return icons.required;
  if (!props.validators) return "";

  let temp = "";
  if (state.strength == 1) {
    temp =
      props.type === "password"
        ? icons.passwordStrength.strong
        : icons.validation.success;
  } else if (state.strength === 0) {
    temp = icons.passwordStrength.medium;
  } else {
    temp =
      props.type === "password"
        ? icons.passwordStrength.strong
        : icons.validation.warning;
  }

  return temp;
};

const state = reactive({
  focused: false,
  touched: false,
  icon: "",
  isPassword: props.type === "password",
  helper: false,
  strength: -2,
});

const Focus = () => {
  state.focused = true;
  state.touched = true;
  emit("focus");
};

const ForceFocus = () => input.value.focus();

const Blur = () => {
  state.focused = false;
  emit("blur");
};

const GetPlaceholder = () =>
  state.focused || props.hideLabel
    ? !props.placeholder
      ? props.label
      : props.placeholder
    : "";

defineExpose({ ForceFocus });
</script>

<style scoped>
.text-input {
  --border-radius: 6px;
  --width: 100%;
  --height: max-content;
  --padding-inline: 20px;
  --validation-color: none;

  width: var(--width);
  height: var(--height);
  min-height: 35px;

  font-family: Rubik;
  font-size: 14px;
  font-weight: 400;
}

label {
  position: absolute;
}

.animated label {
  transform: translate(calc(var(--padding-inline) + 2px), 29px);
  transition: all 150ms ease-out;
}

.text-input:not(.animated) label,
.taken label,
.focused label {
  font-weight: 700;
  transform: translate(0, 0);
}

.content {
  --icon-size: 30px;

  width: 100%;
  height: 35px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  background-color: var(--ion-color-secondary);
  gap: 5px;
  border-radius: var(--border-radius);
  padding-inline: var(--padding-inline);
  outline: 2px solid var(--validation-color);
}

.text-input:not(.hide-label) .content {
  margin-top: 20px;
}

.valid,
.strong {
  --validation-color: var(--ion-color-success);
}

.medium {
  --validation-color: var(--ion-color-warning);
}

.invalid,
.weak,
.required.touched:not(.taken):not(.focused) {
  --validation-color: var(--ion-color-danger);
}

.focused .content {
  background-color: var(--ion-color-secondary-shade);
}

.icon {
  min-width: var(--icon-size);
  min-height: var(--icon-size);
  border-radius: 7px;
}

input {
  background: none;
  border: none;
  width: 100%;
}

.focused input {
  outline: none;
}

input::-webkit-calendar-picker-indicator {
  display: none;
}

#indicator {
  color: var(--validation-color);
}

.helper-container {
  margin-top: 0;
  margin-inline: auto;
  width: inherit;
  opacity: 0;
  font-size: var(--fs1);
  margin-top: 5px;
}

.invalid .helper-container,
.medium .helper-container,
.weak .helper-container {
  opacity: 1;
}

.always-show {
  opacity: 1 !important;
}
</style>
