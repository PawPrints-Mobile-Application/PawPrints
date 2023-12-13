<template>
  <ul class="input-validator">
    <li
      v-for="(validator, i) of validators!"
      :style="{
        color: `var(--theme-${
          valids[i] ? 'success' : validator.helper.intensity
        }-background`,
      }"
    >
      <TextSmall> {{ validator.helper.text }}</TextSmall>
    </li>
  </ul>
</template>
<script setup lang="ts">
import { PropType, ref, watch } from "vue";
import { LocalTime, Validator } from "../../utils";
import { TextSmall } from "../Texts";

const valids = ref(new Array());
const accepted = ref(false);
const considered = ref(false);

const Validate = (value: any) => {
  accepted.value = false;
  considered.value = false;
  valids.value = props.validators?.map((validator) => {
    const temp = validator.callback(value);
    accepted.value &&= temp;
    if (validator.helper.intensity === "danger") considered.value &&= temp;
    return temp;
  })!;
  emit("valids", valids.value);
  emit("accepted", accepted.value);
  emit("considered", considered.value);
};

watch(
  () => props.value,
  () => Validate(props.value)
);

const props = defineProps({
  validators: Object as PropType<Array<Validator>>,
  modelValid: Boolean,
  value: [String, Number, Object, Date, LocalTime],
});

const emit = defineEmits(["valids", "accepted", "considered"]);
</script>
<style scoped>
.input-validator {
  margin: 0;
}
</style>
