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
      @close="ClearForm"
      hide-header-back
      style-justify-content="space-around"
    >
      <template #modalSlot="{ page }">
        <PetAvatar :background-color="form.color" />
        <register1
          v-if="page === 1"
          v-model:model-name="form.name"
          v-model:model-birthday="form.birthday"
          v-model:model-breed="form.breed"
          v-model:model-color="form.color"
        />
        <register2 v-else-if="page === 2" 
          v-model:model-inoutdoors="form.inoutdoors"
          v-model:model-fixing="form.fixing"
          />
      </template>
    </Modal>
  </section>
</template>

<script setup lang="ts">
import { reactive, defineAsyncComponent } from "vue";
import { Default as PetAvatar } from "../../components/Avatars/Pets";
import { templates } from "../../pages/templates";
import { Modal } from "../Modals";
import { InsertData } from "../../server/sqlite/models/User/DogProfile";

const register1 = defineAsyncComponent(templates.register1);
const register2 = defineAsyncComponent(templates.register2);

const pages = [register1, register2];

const ClearForm = () => {
  form.name = "";
  form.birthday = "";
  form.breed = "";
  form.color = "";
  form.inoutdoors = "";
  form.fixing = "";
};

const form = reactive({
  name: "",
  birthday: "",
  breed: "",
  color: "",
  inoutdoors: '',
  fixing: '',
});

const Submit = () => {
  console.log(form);
  InsertData({
    pid: `${localStorage.getItem('authID')}${new Date().getUTCDate()}`,
    uid: localStorage.getItem('authID')!,
    name: form.name,
    birthday: form.birthday,
    breed: form.breed,
    color: form.color,
    inoutdoor: form.inoutdoors === 'outdoors' ? 1 : 0,
    fixing: form.fixing === 'none' ? 0 : (form.fixing === 'spayed' ? 2 : 1),
  });
};

defineProps({
  id: {
    type: String,
    required: true
  }
});
</script>

<style scoped>
.add-pet-button {
  --size: 35px;
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
