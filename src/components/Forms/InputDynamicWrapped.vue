<template>
  <section class="input-dynamic-wrapped">
    <InputLabel
      :value="label"
      v-show="!!label"
      :show-requirement="!!required || (state.taken && !!validators)"
      :requirement-color="validity.requirementColor"
      :requirement-text="validity.requirementText"
    />
    <InputDynamic
      v-model="value"
      :type="type"
      :freeze="freeze"
      @focus="emit('focus')"
      @blur="emit('blur')"
      @first-edit="emit('first-edit')"
      @first-touch="emit('first-touch')"
      @change="emit('change', value)"
      @input="emit('input', value)"
      @click="emit('click')"
      @icon-click="emit('icon-click')"
      :show="show"
      :hidden="hidden"
      :placeholder="placeholder"
      :disabled="disabled"
      :hideIcon="hideIcon"
      :disableFuture="disableFuture"
      @state-expanded="(value) => emit('state-expanded', value)"
    >
      <slot name="icon"><slot /></slot>
    </InputDynamic>
    <InputHelper :validators="validators" :validated="validity.values" />
  </section>
</template>
<script setup lang="ts">
import { InputValidator } from "../../utils";
import { InputLabel, InputDynamic, InputHelper } from ".";
import { computed, reactive } from "vue";

const props = defineProps({
  // For InputDynamic
  type: String,
  modelValue: [String, Number],
  hidden: Boolean, // Turns text into password
  show: Boolean,
  freeze: Boolean,
  hideIcon: Boolean,
  saveOnChange: Boolean,
  placeholder: String,
  disabled: Boolean,
  disableFuture: Boolean,
  // For InputLabel
  label: String,
  required: Boolean,
  // For InputHelper
  validators: Array<InputValidator>,
});

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    if (!value) return;
    state.taken = value !== "";
    Evaluate(value);
    emit("update:modelValue", value);
  },
});

const state = reactive({
  taken: false,
  show: false,
});

const validity = reactive({
  values: new Array<boolean>(),
  strength: -2,
  requirementText: "Required",
  requirementColor: "danger",
});

const Evaluate = (value: string | number) => {
  if (!props.validators) return;
  let considered = true;
  let accepted = true;

  validity.values = props.validators.map((validator) => {
    const temp = validator.callback(value);
    accepted &&= temp;
    if (validator.helper.intensity === "danger") considered &&= temp;
    return temp;
  });

  validity.strength =
    Number(accepted) + Number(considered) + Number(state.taken) - 2;

  switch (validity.strength) {
    case 1:
      validity.requirementText = "Accepted";
      validity.requirementColor = "success";
      emit("valid");
      emit("accepted");
      break;
    case 0:
      validity.requirementText = "Considered";
      validity.requirementColor = "warning";
      emit("considered");
      break;
    case -1:
      validity.requirementText = "Invalid";
      validity.requirementColor = "danger";
      emit("invalid");
      break;
    default:
      validity.requirementText = "Required";
      validity.requirementColor = "danger";
      emit("invalid");
      break;
  }

  emit("validate", validity.strength);
  emit("update:modelValid", validity.strength);
};

const Reevaluate = () => (value.value = props.modelValue);

const emit = defineEmits([
  // For InputDynamic
  "update:modelValue",
  "focus",
  "blur",
  "first-touch",
  "first-edit",
  "change",
  "input",
  "click",
  "icon-click",
  "state-expanded",
  // For InputHelper
  "update:modelValid",
  "validate",
  "valid",
  "invalid",
  "accepted",
  "considered",
]);

defineExpose({ Reevaluate });
</script>
<style scoped>
.input-dynamic-wrapped {
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
