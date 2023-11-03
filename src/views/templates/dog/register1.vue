<template>
  <section class="template-wrapper">
    <InputText
      type="text"
      id="name"
      v-model:model-value="name"
      placeholder="Doggo Name"
      label="Doggo Name"
      hide-helper
      no-validate
    />
    <InputDate v-model="birthday" label="Birthday" id="birthday" />
    <InputDropdown
      v-model="breed"
      label="Doggo Breed"
      id="breed"
      :options="constants.breeds"
      placeholder="Choose a breed"
    />
    <InputText
      type="text"
      id="color"
      v-model:model-value="color"
      placeholder="Colour"
      label="Colour"
      hide-helper
      no-validate
    />
  </section>
</template>

<script setup lang="ts">
import { InputText, InputDropdown, InputDate } from "../../../components/Forms";
import { computed } from "vue";

const props = defineProps({
  modelName: {
    type: String,
    default: "",
    required: true,
  },
  modelBirthday: {
    type: String,
    default: "",
    required: true,
  },
  modelBreed: {
    type: String,
    default: "",
    required: true,
  },
  modelColor: {
    type: String,
    default: "",
    required: true,
  },
});

const name = computed({
  get() {
    return props.modelName;
  },
  set(value) {
    emit("update:modelName", value);
  },
});
const birthday = computed({
  get() {
    return props.modelBirthday;
  },
  set(value) {
    emit("update:modelBirthday", value);
  },
});
const breed = computed({
  get() {
    return props.modelBreed;
  },
  set(value) {
    emit("update:modelBreed", value);
  },
});
const color = computed({
  get() {
    return props.modelColor;
  },
  set(value) {
    emit("update:modelColor", value);
  },
});

const emit = defineEmits([
  "update:modelName",
  "update:modelBirthday",
  "update:modelBreed",
  "update:modelColor",
]);
const constants = {
  breeds: ["1", "2"],
};
</script>

<script lang="ts">
export default {
  name: "register1",
};
</script>
<style scoped>
.template-wrapper {
  height: 100%;
  justify-content: space-evenly;
}

.input-text {
  width: 100%;
}
</style>
