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
import { reactive, computed } from "vue";
import { LayoutModal } from "../../layout";

import { Avatar } from "../Avatars";
import { Add } from "../../server/models/Dogs";
import { SeedGenerator, GetUID, breeds, DropdownOption } from "../../utils";
import { InputDynamicWrapped, InputDropdown } from "../Forms";

const form = reactive({
  name: "",
  birthday: "",
  breed: new DropdownOption("", ""),
  color: "#FFD80A",
});

const disabled = computed(() =>
  [form.name, form.birthday, form.breed.value].includes("")
);
const Discard = () => {
  emit("discard");
  ClearForm();
};

const ClearForm = () => {
  console.log("Clearing...");
  form.name = "";
  form.birthday = "";
  form.breed = new DropdownOption("", "");
  form.color = "#FFD80A";
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
      logs: []
    },
    GetUID()
  ).then(() => {
    emit("submit", pid);
    Discard();
  });
};

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["submit", "discard"]);
</script>

<style scoped>
.avatar {
  --size: 100px;
  --image-scale: 90%;
}
</style>
