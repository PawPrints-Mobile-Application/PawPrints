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
      <PopupDropdown
        ref="dropdownRef"
        v-else-if="type === 'dropdown'"
        v-model="dropdownValue"
        :options="
          options?.map((option) => new DropdownOption(option.toString()))
        "
        :count="count"
        :searchable="searchable"
        :hideInput="hideInput"
      />
      <slot v-else name="icon"><slot /></slot>
    </section>
  </section>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { InputBox, InputColorPicker } from ".";
import { PopupCalendar, PopupDropdown } from "../Popup";
import { DropdownOption, LocalDate } from "../../utils";
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
});

const freezer = () =>
  !!props.freeze ||
  props.type === "date" ||
  (props.type === "dropdown" && !!props.hideInput);

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
});

const dropdownValue = computed({
  get() {
    if (!props.modelValue || props.modelValue === "") {
      dropdownValue.value = new DropdownOption("");
    }
    return new DropdownOption(props.modelValue!.toString());
  },
  set(value) {
    const temp = value.label;
    emit("update:modelValue", temp);
    emit("change", temp);
  },
});

const dateRef = ref();
const dropdownRef = ref();

const IconClick = () => emit("icon-click");
const Click = () => {
  if (props.type === "date") dateRef.value.Trigger();
  if (props.type === "dropdown" && !!props.hideInput)
    dropdownRef.value.Trigger();
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
  --outline: 2px solid var(--theme-tertiary);
  background-color: var(--theme-secondary);
  color: var(--theme-text);
  border-radius: 6px;
  width: 100%;
  padding: 5px 10px;
  height: max-content;
  display: flex;
  gap: 5px;

  &.focused {
    outline: var(--outline);
  }
}

.input-box {
  flex: 1 0 0;
  --outline: none;
  background-color: inherit;
}

.icon {
  min-width: 30px;
  height: 30px;
  display: flex;
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
