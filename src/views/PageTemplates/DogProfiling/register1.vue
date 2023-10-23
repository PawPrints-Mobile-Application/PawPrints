<template>
  <section class="template-wrapper">
  <TextInput
    type="text"
    name="name"
    v-model:model-value="name"
    placeholder="Doggo Name"
    label="Doggo Name"
  />
  <DateInput v-model="birthday" label="Birthday" name="birthday" />
  <DropdownInput
    v-model="breed"
    label="Doggo Breed"
    name="breed"
    :values="constants.breeds"
    default-disabled=""
    placeholder="Choose a breed"
  />
  <TextInput
    type="text"
    name="color"
    v-model:model-value="color"
    placeholder="Colour"
    label="Colour"
  />
  </section>
</template>

<script setup lang="ts">
import { TextInput, DateInput, DropdownInput } from "../../../components/Forms";
import { computed } from "vue";

const props = defineProps({
  modelName: {
    type: String,
    default: '',
    required: true,
  },
  modelBirthday: {
    type: String,
    default: '',
    required: true,
  },
  modelBreed: {
    type: String,
    default: '',
    required: true,
  },
  modelColor: {
    type: String,
    default: '',
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
  routeInfo: {
    filename: "register1",
    path: "/dog/register/page1",
    meta: {
      requiresAuth: false,
      requiresInternet: false,
    },
  },
};
</script>
<style scoped>
</style>
