<template>
  <section class="add-pet-button-wrapper">
    <button class="add-pet-button" :id="`add-pet-${id}`">
      <div id="button-line-1" class="button-line" />
      <div id="button-line-2" class="button-line" />
    </button>
    <Modal
      :trigger="`add-pet-${id}`"
      title="Doggo Profile"
      :max-pages="pages.length"
      @submit="Submit"
      @dismiss="ClearForm"
      hide-header-back
      :disable-next="disabler[currentPage - 1]"
      v-model:page="currentPage"
    >
      <template #modalSlot="{ page }">
        <PetAvatar :background-color="form.color" />
        <register1
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
        />
      </template>
    </Modal>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { Default as PetAvatar } from "../../components/Avatars/Pets";
import { Modal } from "../Modals";
import { Add } from "../../server/models/Dogs";
import { SeedGenerator } from "../../utils";
import { register1 } from "../../views/_templates/index";
import { register2 } from "../../views/_templates/index";

const form = reactive({
  name: "",
  birthday: "",
  breed: "",
  color: "#FFD80A",
  inoutdoors: "",
  fixing: "",
});

const pages = [register1, register2];
const currentPage = ref(1);
const disabler = ref([true, true]);

const ClearForm = () => {
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
  id: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["submit"]);
</script>

<style scoped>
.add-pet-button {
  --size: 45px;
  width: var(--size);
  height: var(--size);
  background-color: var(--ion-color-tertiary);
  border-radius: 8px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
}

.button-line {
  --line-size: calc(var(--size) * 0.7);
  position: absolute;
  width: var(--line-size);
  height: 4px;
  background-color: var(--ion-color-primary);
  border-radius: 30px;
}

#button-line-1 {
  transform: rotateZ(90deg);
}

.add-pet-button:active {
  background-color: var(--ion-color-tertiary-shade);
}

.modal {
  --main-height: 400px;
}

.pet-avatar {
  --size: 100px;
}
</style>
../../server/sqlite/data/DogProfile
