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
      root="../../../"
      :src="form.breed"
      :style="{ backgroundColor: form.color }"
    />
    <section class="add-dog-form">
      <div>
        <TextSubheading>Doggo Name</TextSubheading>
        <InputText placeholder="Doggo Name" v-model="form.name" />
      </div>
      <div>
        <TextSubheading>Date of Birth</TextSubheading>
        <InputDate v-model="form.birthday" hide-input disable-future />
      </div>
      <div>
        <TextSubheading>Doggo Breed</TextSubheading>
        <InputDropdown
          v-model="form.breed"
          class="dropdown"
          :options="breeds.map((breed) => breed.name)"
          :count="6"
          searchable
        />
      </div>
      <div>
        <TextSubheading>Icon Color</TextSubheading>
        <InputColor v-model="form.color" />
      </div>
    </section>
  </LayoutModal>
</template>

<script setup lang="ts">
import { reactive, computed } from "vue";
import { LayoutModal } from "../../layout";

import { Avatar } from "../Avatars";
import { Add } from "../../server/models/Dogs";
import { SeedGenerator, GetUID, breeds } from "../../utils";
import { TextSubheading } from "../Texts";
import { InputDropdown, InputText, InputDate, InputColor } from "../Forms";

const form = reactive({
  name: "",
  birthday: new Date(),
  breed: "",
  color: "#FFD80A",
});

const disabled = computed(() =>
  [form.name, form.birthday, form.breed].includes("")
);
const Discard = () => {
  emit("discard");
  ClearForm();
};

const ClearForm = () => {
  console.log("Clearing...");
  form.name = "";
  form.birthday = new Date();
  form.breed = "";
  form.color = "#FFD80A";
};

const Submit = () => {
  const pid = SeedGenerator().toString();
  Add(
    {
      pid: pid,
      name: form.name,
      birthday: form.birthday.toString(),
      breed: form.breed,
      color: form.color,
      logs: [],
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

.add-dog-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 2px;
  gap: 15px;

  > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
}

label {
  color: var(--theme-secondary-text);
}

.dropdown {
  --select-active-background: white;
}
</style>
