<template>
  <LayoutModal
    ref="modal"
    :isOpen="isOpen"
    title="Doggo Profile"
    @submit="Submit"
    @clear="ClearForm"
    @discard="Discard"
    close-on-submit
    :canDismiss="!isOpen"
  >
    <Avatar
      type="dog"
      :src="form.breed"
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
      :options="constants.breeds"
      placeholder="Choose a breed"
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
import { reactive, ref } from "vue";
import { LayoutModal } from "../../layout";

import { Avatar } from "../Avatars";
import { Add } from "../../server/models/Dogs";
import { SeedGenerator, GetUID } from "../../utils";
import { InputDynamicWrapped, InputDropdown } from "../Forms";
const constants = {
  breeds: ["1", "2"],
};

const form = reactive({
  name: "",
  birthday: "",
  breed: "",
  color: "#FFD80A",
  inoutdoors: "",
  fixing: "",
});

const disabled = ref(true);
const Discard = () => {
  emit("discard");
  ClearForm();
};

const ClearForm = () => {
  console.log("Clearing...");
  disabled.value = true;
  form.name = "";
  form.birthday = "";
  form.breed = "";
  form.color = "#FFD80A";
  form.inoutdoors = "";
  form.fixing = "";
};

const Submit = () => {
  const pid = SeedGenerator().toString();
  Add(
    {
      pid: pid,
      name: form.name,
      birthday: form.birthday,
      breed: form.breed,
      color: form.color,
      inoutdoor: form.inoutdoors,
      fixing: form.fixing,
      events: [],
      notes: [],
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
}
</style>
