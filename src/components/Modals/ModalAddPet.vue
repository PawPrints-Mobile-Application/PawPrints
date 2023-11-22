<template>
  <ButtonModal
    ref="modal"
    :trigger="trigger"
    title="Doggo Profile"
    @submit="Submit"
    @clear="ClearForm"
    @dismiss="ClearForm"
    :max="pages.length"
    v-model:page="page"
    :disable-next="disabler[page - 1]"
    close-on-submit
  >
    <template #button><ButtonAddPet /></template>

    <PetAvatar :background-color="form.color" />
    <!-- <register1
      v-if="page === 1"
      @empty="(value) => (disabler[0] = value)"
      v-model:name="form.name"
      v-model:birthday="form.birthday"
      v-model:breed="form.breed"
      v-model:color="form.color"
    />
    <register2
      v-else-if="page === 2"
      @empty="(value) => (disabler[1] = value)"
      v-model:inoutdoors="form.inoutdoors"
      v-model:fixing="form.fixing"
    /> -->
  </ButtonModal>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { ButtonModal, ButtonAddPet } from "../Buttons";

import { Default as PetAvatar } from "../../components/Avatars/Pets";
import { Add } from "../../server/models/Dogs";
import { SeedGenerator } from "../../utils";
//   import { register1 } from "../../views/_templates/index";
//   import { register2 } from "../../views/_templates/index";

const form = reactive({
  name: "",
  birthday: "",
  breed: "",
  color: "#FFD80A",
  inoutdoors: "",
  fixing: "",
});

const pages = [
  //register1, register2
];
const page = ref(1);
const disabler = ref([true, true]);

const ClearForm = () => {
  console.log("Clearing...");
  disabler.value = [true, true];
  form.name = "";
  form.birthday = "";
  form.breed = "";
  form.color = "#FFD80A";
  form.inoutdoors = "";
  form.fixing = "";
};

const Submit = () =>
  Add(
    {
      pid: SeedGenerator().toString(),
      name: form.name,
      birthday: form.birthday,
      breed: form.breed,
      color: form.color,
      inoutdoor: form.inoutdoors,
      fixing: form.fixing,
      events: [],
      notes: [],
    },
    localStorage.getItem("authEmail")! === "Guest"
      ? undefined
      : localStorage.getItem("authID")!
  ).then(() => emit("submit"));

defineProps({
  trigger: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["submit"]);
</script>

<style scoped>
.pet-avatar {
  --max-size: 100px;
}
</style>
