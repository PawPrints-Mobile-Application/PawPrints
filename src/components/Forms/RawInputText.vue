<template>
  <section
    class="raw-input-text"
    :class="{
      focused: state.focused,
      taken: state.taken,
      touched: state.touched,
      required: !!props.required,
      disabled: !!props.disabled,
    }"
    :data-strength="validity.strength"
    :data-show-outline="state.showIcon && design !== 'input-only' && !props.icon"
    :data-design="design"
  >
    <section class="input-main">
      <input
        ref="input"
        :id="id"
        class="input-input"
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
        :maxLength="maxLength"
      />
      <ion-icon
        class="input-icon"
        v-show="state.showIcon && design !== 'input-only'"
        :icon="state.icon.icon"
        :color="state.icon.color"
        @click="() => emit('iconClick')"
      />
    </section>
    <ul class="input-helper" v-show="design !== 'input-only' && !hideHelper">
      <li
        v-for="(text, key) in validators"
        :style="{
            color: GetStyleColor(validity.valids[key] ? 'success' : validators![key].intensity)
        }"
      >
        {{ text.helperText }}
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import {
  checkmarkDoneCircle as validationSuccess,
  closeCircle as validationWarning,
  shieldCheckmark as passwordStrong,
  checkmarkCircle as passwordMedium,
  alertCircle as passwordWeak,
  alert as required,
} from "ionicons/icons";
import { IonIcon } from "@ionic/vue";
import { Validator } from "../../utils";

const GetStyleColor = (value: "success" | "warning" | "danger") =>
  `var(--ion-color-${value})`;

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
      ["text", "password", "email", "date", "number"].includes(value),
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
  maxLength: {
    type: Number,
    default: 9999,
  },

  // Actions
  disabled: Boolean,
  // Only works on passwords
  show: {
    type: Boolean,
    default: false,
  },
  hideHelper: Boolean,

  icon: String,
});

const validity = reactive({
  valids: Array(props.validators?.length),
  considered: false, // True when all of danger validator intensities are satisfied
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
    if (validator.intensity === "warning") return;
    considered &&= temp;
  });

  validity.considered = considered;
  validity.accepted = accepted;
  validity.strength =
    Number(accepted) + Number(considered) + Number(state.taken) - 2;

  emit("update:modelValid", validity.accepted);
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
  strong: {
    icon: props.type === "password" ? passwordStrong : validationSuccess,
    color: "success",
  },
  medium: {
    icon: passwordMedium,
    color: "warning",
  },
  weak: {
    icon: props.type === "password" ? passwordWeak : validationWarning,
    color: "danger",
  },
  required: {
    icon: required,
    color: "danger",
  },
};

const SetIcon = (icon: string) => {
  state.icon = {
      icon: icon,
      color: 'white'
    };
    state.showIcon = true;
}

const GetIcon = () => {
  if (!!props.icon) {
    state.icon = {
      icon: props.icon,
      color: 'white'
    };
    state.showIcon = true;
    return;
  }

  state.showIcon = state.taken;
  state.icon = icons.strong;
  if (validity.strength === -1) {
    state.icon = icons.weak;
  } else if (validity.strength === 0) {
    state.icon = icons.medium;
  }
};

const state = reactive({
  focused: false,
  touched: false,
  taken: false,
  icon: {
    icon: !!props.icon ? props.icon : "" ,
    color: "white",
  },
  showIcon: false,
});

const Focus = () => {
  state.focused = true;
  state.touched = true;
  state.showIcon = false || !!props.icon;
  emit("focus");
};

onMounted(() => {
  state.showIcon = false || !!props.icon;
})

const ForceFocus = () => input.value.focus();

const Blur = () => {
  state.focused = false;
  if (!!props.required && !state.taken) {
    state.icon = icons.required;
    state.showIcon = true;
  }
  emit("blur");
};

const GetPlaceholder = () =>
  (!state.taken && state.focused) || props.design === "input-only" || (!state.taken && !state.focused && props.design === "classic")
    ? props.placeholder
    : "";

const emit = defineEmits([
  "update:modelValue",
  "update:modelValid",
  "validity",
  "focus",
  "blur",
  "input",
  "iconClick"
]);

defineExpose({ ForceFocus, GetIcon, SetIcon });
</script>
<style scoped>
.raw-input-text {
  --background-color: var(--ion-color-secondary);
  --outline-color: var(--ion-color-black);
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-family: Rubik;
  font-size: var(--fs3);
}

.raw-input-text[data-show-outline="true"] > .input-main {
  outline: 2px solid var(--outline-color);
}
.raw-input-text[data-show-outline="false"] > .input-main {
  outline: none;
}

.raw-input-text:is(
    [data-strength="-1"],
    .touched.required[data-strength="-2"]:not(.focused)
  )
  > .input-main {
  --outline-color: var(--ion-color-danger);
}
.raw-input-text[data-strength="0"] > .input-main {
  --outline-color: var(--ion-color-warning);
}
.raw-input-text[data-strength="1"] > .input-main {
  --outline-color: var(--ion-color-success);
}

.input-main,
.input-helper {
  width: 100%;
  display: flex;
}

.input-main {
  padding: 2px 5px;
  background-color: var(--background-color);
  border-radius: 6px;
}

.input-input {
  height: 30px;
  width: 20px;
  flex: 1 0 0;
  background: none;
  border: none;
}

.input-input::-webkit-calendar-picker-indicator {
  display: none;
}

.input-input:is(:active, :hover, :focus) {
  outline: none;
}

.input-icon {
  font-size: var(--fs0);
}

.input-helper {
  flex-direction: column;
  font-size: var(--fs4);
}
</style>
