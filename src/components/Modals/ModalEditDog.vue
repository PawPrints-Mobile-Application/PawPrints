<template>
  <LayoutModal
    ref="modal"
    :isOpen="isOpen"
    title="Doggo Profile"
    @submit="Submit"
    @clear="ClearForm"
    @discard="Discard"
    :disable-submit="disableSave"
    :disable-clear="disableClear"
    button-submit-text="Save"
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
      hideValidator
    />
    <InputDynamicWrapped
      type="date"
      v-model="form.birthday"
      label="Birthday"
      hide-input
      disable-future
      hideValidator
    />
    <InputDynamicWrapped
      type="dropdown"
      v-model="form.breed"
      label="Doggo Breed"
      :options="breeds"
      placeholder="Choose a breed"
      :count="6"
      searchable
      hideValidator
    />
    <InputDynamicWrapped
      type="color"
      v-model="form.color"
      placeholder="Colour"
      label="Colour"
      hideValidator
    />
    <ButtonText label="Delete Dog" />
  </LayoutModal>
</template>

<script setup lang="ts">
import { reactive, computed, watch } from "vue";
import { LayoutModal } from "../../layout";

import { Avatar } from "../Avatars";
import { Add } from "../../server/models/Dogs";
import { GetUID, breeds, ObjectToMap } from "../../utils";
import { InputDynamicWrapped } from "../Forms";
import { ButtonText } from "../Buttons";

const form = reactive({
  name: "",
  birthday: "",
  breed: "",
  color: "#FFD80A",
});

const defaultValues = reactive({
  name: "",
  birthday: "",
  breed: "",
  color: "#FFD80A",
});

const disableSave = computed(() => isBlank() || disableClear.value);

const isBlank = () => {
  let temp = false;
  ObjectToMap(form).forEach((value, key) => {
    if (key === "breed") temp ||= value.value === "";
    else temp ||= value === "";
  });
  return temp;
};

const disableClear = computed(() => {
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
  Add(
    {
      pid: props.dog!.pid,
      name: form.name,
      birthday: form.birthday,
      breed: form.breed,
      color: form.color,
      logs: props.dog!.logs,
    },
    GetUID()
  ).then(() => {
    emit("submit", props.dog!.pid);
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

.button-text {
  background-color: var(--theme-warning-background);
  color: var(--theme-warning-text);
  width: 100%;
}
</style>
