<template>
  <InputDynamicWrapped
    type="text"
    v-model="name"
    placeholder="Doggo Name"
    label="Doggo Name"
  />
  <InputDynamicWrapped
    type="date"
    v-model="birthday"
    label="Birthday"
    hide-input
    disable-future
    @state-expanded="(value) => emit('state-expanded', value)"
  />
  <InputDropdown
    v-model="breed"
    label="Doggo Breed"
    :options="constants.breeds"
    placeholder="Choose a breed"
    @state-expanded="(value) => emit('state-expanded', value)"
  />
  <InputDynamicWrapped
    type="color"
    v-model="color"
    placeholder="Colour"
    label="Colour"
  />
</template>

<script setup lang="ts">
import { InputDynamicWrapped, InputDropdown } from "../../../components/Forms";
import { computed, watch } from "vue";

const props = defineProps({
  name: String,
  birthday: String,
  breed: String,
  color: String,
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
  "state-expanded",
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
.input-text {
  width: 100%;
}
</style>
