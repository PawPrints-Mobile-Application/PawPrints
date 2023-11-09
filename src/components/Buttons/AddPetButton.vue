<template>
  <section class="add-pet-button-wrapper">
    <button class="add-pet-button" :id="`add-pet-${id}`">
      <div id="button-line-1" class="button-line" />
      <div id="button-line-2" class="button-line" />
    </button>
    <Modal
      ref="modal"
      :trigger="`add-pet-${id}`"
      title="Doggo Profile"
      :max-pages="pages.length"
      @submit="Submit"
      @close="ClearForm"
      hide-header-back
      style-justify-content="space-around"
      :disable-next="disabler"
      v-model:page="currentPage"
    >
      <template #modalSlot="{ page }">
        <PetAvatar :background-color="form.color" />
        <register1
          v-if="page === 1"
          v-model:name="form.name"
          v-model:birthday="form.birthday"
          v-model:breed="form.breed"
          v-model:color="form.color"
        />
        <register2
          v-else-if="page === 2"
          v-model:inoutdoors="form.inoutdoors"
          v-model:fixing="form.fixing"
        />
      </template>
    </Modal>
  </section>
</template>

<script setup lang="ts">
import { reactive, defineAsyncComponent, ref, computed } from "vue";
import { Default as PetAvatar } from "../../components/Avatars/Pets";
import { templates } from "../../views/templates";
import { Modal } from "../Modals";
import { InsertData } from "../../server/sqlite/data/DogProfile";

const register1 = defineAsyncComponent(templates.register1);
const register2 = defineAsyncComponent(templates.register2);

const modal = ref();
const pages = [register1, register2];
const currentPage = ref(1);
const disabler = computed(() => {
  switch (currentPage.value) {
    case 1:
      return [form.name, form.birthday, form.breed, form.color]
        .map((value) => value === "")
        .reduce((acc, val) => acc || val);
    default:
      return [form.inoutdoors, form.fixing]
        .map((value) => value === "")
        .reduce((acc, val) => acc || val);
  }
});

const ClearForm = () => {
  form.name = "";
  form.birthday = "";
  form.breed = "";
  form.color = "#FFD80A";
  form.inoutdoors = "";
  form.fixing = "";
};

const form = reactive({
  name: "",
  birthday: "",
  breed: "",
  color: "#FFD80A",
  inoutdoors: "",
  fixing: "",
});

const Submit = () => {
  // Save Dog Locally
  InsertData({
    pid: new Date()[Symbol.toPrimitive]("number").toString(),
    uid: localStorage.getItem("authID")!,
    name: form.name,
    birthday: form.birthday,
    breed: form.breed,
    color: form.color,
    inoutdoor: form.inoutdoors === "outdoors" ? 1 : 0,
    fixing: form.fixing === "none" ? 0 : form.fixing === "spayed" ? 2 : 1,
  }).then(() => emit("submit"));
};

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