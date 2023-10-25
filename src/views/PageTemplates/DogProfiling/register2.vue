<template>
  <section class="template-wrapper">
    <TextInput
      type="text"
      id="name"
      v-model:model-value="name"
      placeholder="Doggo Name"
      label="Doggo Name"
    />
    <DateInput v-model="birthday" label="Birthday" id="birthday" />
    <DropdownInput
      v-model="breed"
      label="Doggo Breed"
      id="breed"
      :options="constants.breeds"
      placeholder="Choose a breed"
    />
    <TextInput
      type="text"
      id="color"
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
  </script>
  
  <script lang="ts">
  export default {
    name: "register2",
    routeInfo: {
      filename: "register2",
      path: "/dog/register/page2",
      meta: {
        requiresAuth: false,
        requiresInternet: false,
      },
    },
  };
  </script>
  <style scoped>
  .wrapper {
    width: 100%;
  }
  </style>
  