<template>
  <LayoutModal
    ref="modal"
    :isOpen="isOpen"
    title="Doggo Profile"
    @submit="Submit"
    @clear="ClearForm"
    @discard="Discard"
    :disable-submit="disabled"
    close-on-submit
    :canDismiss="!isOpen"
    button-submit-text="Save"
  >
    <Avatar
      type="dog"
      :src="form.breed.value"
      :style="{ backgroundColor: form.color }"
    />
    <InputDynamicWrapped
      type="text"
      v-model="form.name"
      placeholder="Doggo Name"
      label="Doggo Name"
    />
    <InputDynamicWrapped
      type="date"
      v-model="form.birthday"
      label="Birthday"
      hide-input
      disable-future
    />
    <InputDropdown
      v-model="form.breed"
      label="Doggo Breed"
      :options="breeds"
      placeholder="Choose a breed"
      :count="6"
      searchable
    />
    <InputDynamicWrapped
      type="color"
      v-model="form.color"
      placeholder="Colour"
      label="Colour"
    />
  </LayoutModal>
</template>

<script setup lang="ts">
import { reactive, computed, watch } from "vue";
import { LayoutModal } from "../../layout";

import { Avatar } from "../Avatars";
import { Add } from "../../server/models/Dogs";
import {
  SeedGenerator,
  GetUID,
  breeds,
  DropdownOption,
  ObjectToMap,
} from "../../utils";
import { InputDynamicWrapped, InputDropdown } from "../Forms";

const form = reactive({
  name: "",
  birthday: "",
  breed: new DropdownOption("", ""),
  color: "#FFD80A",
});

const defaultValues = reactive({
  name: "",
  birthday: "",
  breed: new DropdownOption("", ""),
  color: "#FFD80A",
});

const disabled = computed(() => {
  let temp = true;
  const defVal = ObjectToMap(defaultValues);
  ObjectToMap(form).forEach((value, key) => {
    if (key === "breed") temp &&= value.value === defVal.get(key).value;
    else temp &&= value === defVal.get(key);
  });
  return temp;
});

const Discard = () => {
  emit("discard");
  ClearForm();
};

const ClearForm = () => {
  console.log("Clearing...");
  form.name = defaultValues.name;
  form.birthday = defaultValues.birthday;
  form.breed = defaultValues.breed;
  form.color = defaultValues.color;
};

const Submit = () => {
  const pid = SeedGenerator().toString();
  Add(
    {
      pid: pid,
      name: form.name,
      birthday: form.birthday,
      breed: form.breed.value,
      color: form.color,
      logs: props.dog!.logs,
    },
    GetUID()
  ).then(() => {
    emit("submit", pid);
    Discard();
  });
};

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  dog: Object,
});

const emit = defineEmits(["submit", "discard"]);

watch(
  () => props.dog,
  () => {
    defaultValues.name = props.dog!.name;
    defaultValues.birthday = props.dog!.birthday;
    defaultValues.breed = props.dog!.breed;
    defaultValues.color = props.dog!.color;
    ClearForm();
  }
);
</script>

<style scoped>
.avatar {
  --size: 100px;
  --image-scale: 90%;
}
</style>
