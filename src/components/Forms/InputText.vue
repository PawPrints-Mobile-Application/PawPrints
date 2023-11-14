<template>
  <section class="input-text default-input">
    <InputLabel
      :value="label"
      v-show="!!label"
      :show-requirement="!!required || (state.taken && !!validators)"
      :requirement-color="validity.requirementColor"
      :requirement-text="validity.requirementText"
    />
    <InputBox
      v-model:value="value"
      @input="emit('input')"
      @change="emit('change')"
      :disabled="disabled"
      :placeholder="placeholder"
      :type="type === 'password' && (state.show || show) ? 'text' : type"
      :freeze="freeze"
      :icon="
        type === 'password' ? (state.show ? hideIcon : showIcon) : undefined
      "
      @icon:click="
        () => {
          if (type === 'password') state.show = !state.show;
        }
      "
    />
    <InputHelper :validators="validators" :validated="validity.values" />
  </section>
</template>
<script setup lang="ts">
import { InputValidator } from "../../utils";
import { InputLabel, InputBox, InputHelper } from ".";
import { computed, reactive } from "vue";
import { eye as showIcon, eyeOff as hideIcon } from "ionicons/icons";

const props = defineProps({
  label: String,
  required: Boolean,
  placeholder: String,
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
  show: Boolean
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
  show: false,
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
  emit("update:valid", validity.strength);
};

const Reevaluate = () => (value.value = props.value);

const emit = defineEmits([
  "update:value",
  "update:valid",
  "input",
  "change",
  "icon:click",
  "validate",
  "valid",
  "invalid",
  "accepted",
  "considered",
]);

defineExpose({ Reevaluate });
</script>
<style scoped>
.input-text {
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
