<template>
  <section
    class="input-dynamic text subheading poppins"
    :class="{ focused: state.focused }"
  >
    <InputBox
      ref="reference"
      v-model="value"
      :type="type"
      :freeze="freezer()"
      @focus="emit('focus')"
      @blur="emit('blur')"
      @first-edit="emit('first-edit')"
      @first-touch="emit('first-touch')"
      @change="emit('change', value)"
      @input="emit('input', value)"
      @click="Click"
      @return="(value) => emit('return', value)"
      :show="valueShow"
      :hidden="hidden"
      :placeholder="placeholder"
      :disabled="disabled"
    />
    <section class="icon" v-show="!hideIcon" @click="IconClick">
      <InputColorPicker v-if="type === 'color'" v-model="colorValue" />
      <ButtonShow v-else-if="type === 'password'" v-model="valueShow" />
      <PopupCalendar
        ref="dateRef"
        :saveOnChange="saveOnChange"
        v-else-if="type === 'date'"
        v-model="dateValue"
        :disableFuture="disableFuture"
      />
      <PopupTime
        ref="timeRef"
        v-else-if="type === 'time'"
        v-model="timeValue"
      />
      <slot v-else name="icon"><slot /></slot>
    </section>
  </section>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { InputBox, InputColorPicker } from ".";
import { PopupCalendar, PopupTime } from "../Popup";
import {
  DropdownOption,
  LocalDate,
  LocalTime,
  TwoCharactersFormat,
} from "../../utils";
import { ButtonShow } from "../Buttons";

const props = defineProps({
  type: String,
  modelValue: [String, Number],
  hidden: Boolean, // Turns text into password
  show: Boolean,
  freeze: Boolean,
  hideIcon: Boolean,
  placeholder: String,
  disabled: Boolean,
  // Date
  saveOnChange: Boolean,
  disableFuture: Boolean,
  // Dropdown
  options: Array<String | Number>,
  count: {
    type: Number,
    default: 5,
    validate: (value: number) => value <= 10 && value > 0,
  },
  searchable: Boolean,
  hideInput: Boolean,
  hideDropdownIcon: Boolean,
});

const freezer = () =>
  !!props.freeze ||
  props.type === "date" ||
  (props.type === "dropdown" && !!props.hideInput) ||
  props.type === "time";

const _show = ref(false);
const valueShow = computed({
  get() {
    return _show.value || !!props.show;
  },
  set(value) {
    _show.value = value;
  },
});

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const colorValue = computed({
  get() {
    return props.modelValue?.toString();
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const dateValue = computed({
  get() {
    if (!props.modelValue || props.modelValue === "") {
      dateValue.value = new LocalDate().GetDate();
    }
    return new Date(props.modelValue!);
  },
  set(value) {
    const temp = new LocalDate(value).toLocaleDateString("YYYY/MM/DD", "-");
    emit("update:modelValue", temp);
    emit("change", temp);
  },
});q

const StringToLocalTime = () => {
  if (typeof props.modelValue! === "number")
    return new LocalTime(props.modelValue!);
  const colonIdx = props.modelValue!.indexOf(":");
  const hoursConverted = Number(props.modelValue!.substring(0, colonIdx));
  const minutes = Number(
    props.modelValue!.substring(colonIdx + 1, colonIdx + 3)
  );
  const ampm = props.modelValue!.indexOf("AM") !== -1 ? "AM" : "PM";
  let hours = hoursConverted + (ampm === "AM" ? 0 : 12);
  if (hoursConverted === 12) hours = 12;
  return new LocalTime(
    `${TwoCharactersFormat(hours)}${TwoCharactersFormat(minutes)}`
  );
};

const timeValue = computed({
  get() {
    if (!props.modelValue || props.modelValue === "") {
      timeValue.value = new LocalTime(0);
    }
    return StringToLocalTime();
  },
  set(value) {
    emit("update:modelValue", value.toString());
    emit("change", value.toString());
  },
});

const dateRef = ref();
const dropdownRef = ref();
const timeRef = ref();

const IconClick = () => emit("icon-click");
const Click = () => {
  if (props.type === "date") dateRef.value.Trigger();
  if (props.type === "dropdown" && !!props.hideInput)
    dropdownRef.value.Trigger();
  if (props.type === "time" && !props.freeze) timeRef.value.Trigger();
  emit("click");
};

const reference = ref();
const ForceFocus = () => reference.value.ForceFocus();
const ForceBlur = () => reference.value.ForceBlur();
const state = computed(() =>
  !!reference.value
    ? reference.value.state
    : {
        touched: false,
        edited: false,
        focused: false,
      }
);

const emit = defineEmits([
  "update:modelValue",
  "focus",
  "blur",
  "first-touch",
  "first-edit",
  "change",
  "input",
  "click",
  "icon-click",
  "return",
]);
defineExpose({ state, ForceFocus, ForceBlur });
</script>
<style scoped>
.input-dynamic {
  --input-background: var(--theme-secondary-background);
  --input-text: var(--theme-secondary-text);
  --input-outline: 2px solid var(--theme-tertiary-background);
  background-color: var(--input-background);
  color: var(--text);
  border-radius: 6px;
  width: 100%;
  padding: 5px 10px;
  height: max-content;
  display: flex;
  gap: 5px;

  &.focused {
    outline: var(--input-outline);
  }
}

.input-box {
  flex: 1 0 0;
  --outline: none;
  --background: var(--input-background);
  --text: var(--input-text);
}

.icon {
  min-width: 30px;
  height: 30px;
  display: flex;
  --color: var(--theme-tertiary-background);
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
