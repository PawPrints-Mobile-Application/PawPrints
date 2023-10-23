<template>
  <section class="add-pet-button-wrapper">
    <button class="add-pet-button" id="add-pet">
      <div id="button-line-1" class="button-line" />
      <div id="button-line-2" class="button-line" />
    </button>
    <Modal
      trigger="add-pet"
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
        <register2 v-else-if="page === 2" />
      </template>
    </Modal>
  </section>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { Default as PetAvatar } from "../../components/Avatars/Pets";
import { register1, register2 } from "../../views/PageTemplates/DogProfiling";
import { Modal } from "../Modals";

const pages = [register1, register2];

const ClearForm = () => {
  form.name = "";
  form.birthday = "";
  form.breed = "";
  form.color = "";
};

const form = reactive({
  name: "",
  birthday: "",
  breed: "",
  color: "",
});

const Submit = () => {
  console.log("submit");
};
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
