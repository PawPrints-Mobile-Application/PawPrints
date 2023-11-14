<template>
  <section class="template-wrapper">
    <InputText
      type="text"
      v-model:value="name"
      placeholder="Doggo Name"
      label="Doggo Name"
    />
    <InputDate v-model:value="birthday" label="Birthday" hide-input />
    <InputDropdown
      v-model:value="breed"
      label="Doggo Breed"
      :options="constants.breeds"
      placeholder="Choose a breed"
    />
    <InputColor
      type="text"
      v-model:value="color"
      placeholder="Colour"
      label="Colour"
    />
  </section>
</template>

<script setup lang="ts">
import {
  InputText,
  InputDropdown,
  InputDate,
  InputColor,
} from "../../../components/Forms";
import { computed, watch } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  birthday: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});

const name = computed({
  get() {
    return props.name;
  },
  set(value) {
    emit("update:name", value);
  },
});

const birthday = computed({
  get() {
    return props.birthday;
  },
  set(value) {
    emit("update:birthday", value);
  },
});

const breed = computed({
  get() {
    return props.breed;
  },
  set(value) {
    emit("update:breed", value);
  },
});

const color = computed({
  get() {
    return props.color;
  },
  set(value) {
    emit("update:color", value);
  },
});

const emit = defineEmits([
  "update:name",
  "update:birthday",
  "update:breed",
  "update:color",
  "empty",
]);
const constants = {
  breeds: ["1", "2"],
};

const isEmpty = () =>
  [name, birthday, breed, color]
    .map((element) => element.value === "")
    .reduce((acc, val) => acc || val);

watch(
  () => isEmpty(),
  () => emit("empty", isEmpty())
);

defineExpose({ isEmpty });
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
