<template>
  <section class="input-text default-input">
    <section class="header">
      <InputLabel :value="label" v-show="!!label" />
      <span
        class="requirement"
        v-show="!!required || (state.taken && !!validators)"
        :data-color="validity.requirementColor"
        >{{ validity.requirementText }}</span
      >
    </section>
    <InputBox
      v-model:value="value"
      @input="emit('input')"
      @change="emit('change')"
      :disabled="disabled"
      :type="type"
      :freeze="freeze"
    />
    <InputHelper :validators="validators" :validated="validity.values" />
  </section>
</template>
<script setup lang="ts">
import { InputLabel, InputBox, InputHelper, InputValidator } from ".";
import { computed, reactive } from "vue";

const props = defineProps({
  label: String,
  required: Boolean,
  value: {
    type: String,
    required: true,
  },
  disabled: Boolean,
  type: {
    type: String,
    default: "text",
    validator: (value: string) =>
      ["text", "email", "password", "color"].includes(value),
  },
  validators: Array<InputValidator>,
  freeze: Boolean,
});

const value = computed({
  get() {
    return props.value;
  },
  set(value) {
    state.taken = value !== "";
    Evaluate(value);
    emit("update:value", value);
  },
});

const state = reactive({
  taken: false,
});

const validity = reactive({
  values: new Array<boolean>(),
  strength: -2,
  requirementText: "Required",
  requirementColor: "danger",
});

const Evaluate = (value: string) => {
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
};

const emit = defineEmits([
  "update:value",
  "input",
  "change",
  "icon:click",
  "validate",
  "valid",
  "invalid",
  "accepted",
  "considered",
]);
</script>
<style scoped>
.input-text {
  display: flex;
  flex-direction: column;

  > .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    > .requirement {
      font-size: var(--fs4);
    }
  }
}
</style>
