<template>
  <InputWrapper
    :label="label"
    :id="id"
    :design="design"
    class="input-text"
    :hide-label="hideLabel"
  >
    <RawInputText
      ref="input"
      :type="type"
      :label="label"
      :id="id"
      :placeholder="placeholderRef"
      :required="required"
      v-model:modelValid="valid"
      v-model:modelValue="value"
      :validators="validators"
      :hideHelper="hideHelper"
      :design="design === 'label-inline' ? 'input-only' : design"
      :maxLength="maxLength"
      :disabled="disabled"
      :no-validate="noValidate"
      :show="show"
      :icon="icon"
      @input="(value) => emit('input', value)"
      @focus="() => {
        emit('focus');
        if (design !== 'label-inline') return;
        placeholderRef = placeholder!;
        hideLabel = false;
      }"
      @blur="() => {
        emit('blur');
        if (design !== 'label-inline') return;
        placeholderRef = '';
        hideLabel = value === '';
      }"
      @validity="(value) => emit('validity', value)"
      @iconClick="() => emit('iconClick')"
    />
  </InputWrapper>
</template>

<script setup lang="ts">
import { RawInputText, InputWrapper } from ".";
import { Validator } from "../../utils";
import { computed, ref } from "vue";

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
    validators: (value: string) => ["classic", "input-only", "label-inline"].includes(value),
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
  noValidate: Boolean,
});

const placeholderRef = ref( props.design === 'label-inline' ? '' : props.placeholder);
const hideLabel = ref(true)

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const valid = computed({
  get() {
    return props.modelValid;
  },
  set(valid) {
    emit("update:modelValid", valid);
  },
});

const RefreshIcon = () => input.value.GetIcon();
const SetIcon = (icon: string) => input.value.SetIcon(icon);
const ForceFocus = () => input.value.ForceFocus();

const emit = defineEmits([
  "update:modelValue",
  "validity",
  "update:modelValid",
  "focus",
  "blur",
  "input",
  "iconClick",
]);

defineExpose({ ForceFocus, RefreshIcon, SetIcon });
</script>
