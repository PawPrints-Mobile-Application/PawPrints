<template>
  <section class="input-textarea-wrapped">
    <InputLabel
      :value="label"
      v-show="!!label"
      :show-requirement="!!required || (state.taken && !!validators)"
      :requirement-color="validity.requirementColor"
      :requirement-text="validity.requirementText"
    />
    <InputTextarea
      v-model="value"
      :freeze="freeze"
      @focus="emit('focus')"
      @blur="emit('blur')"
      @first-edit="emit('first-edit')"
      @first-touch="emit('first-touch')"
      @change="emit('change', value)"
      @input="emit('input', value)"
      @click="emit('click')"
      @icon-click="emit('icon-click')"
      @return="(value) => emit('return', value)"
      :show="show"
      :hidden="hidden"
      :placeholder="placeholder"
      :disabled="disabled"
    />
    <InputHelper :validators="validators" :validated="validity.values" />
  </section>
</template>
<script setup lang="ts">
import { InputValidator } from "../../utils";
import { InputLabel, InputHelper, InputTextarea } from ".";
import { computed, reactive } from "vue";

const props = defineProps({
  // For InputDynamic
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
  "return",
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
.input-textarea-wrapped {
  width: 98%;
  display: flex;
  flex-direction: column;
}

.input-textarea {
  min-width: 100%;
}
</style>
