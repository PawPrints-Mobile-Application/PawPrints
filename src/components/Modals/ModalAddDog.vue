<template>
  <LayoutModal
    ref="modal"
    :isOpen="isOpen"
    title="Doggo Profile"
    @submit="Submit"
    @clear="ClearForm"
    @dismiss="Dismiss"
    :max="pages.length"
    v-model:page="page"
    :disable-next="disabler[page - 1]"
    close-on-submit
    :can-dismiss="canDismiss"
  >
    <PetAvatar :background-color="form.color" />
    <register1
      v-if="page === 1"
      @empty="(value) => (disabler[0] = value)"
      v-model:name="form.name"
      v-model:birthday="form.birthday"
      v-model:breed="form.breed"
      v-model:color="form.color"
      @state-expanded="(value) => SetDismiss(!value)" />
    <register2
      v-else-if="page === 2"
      @empty="(value) => (disabler[1] = value)"
      v-model:inoutdoors="form.inoutdoors"
      v-model:fixing="form.fixing"
  /></LayoutModal>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { LayoutModal } from "../../layout";

import { Default as PetAvatar } from "../../components/Avatars/Pets";
import { Add } from "../../server/models/Dogs";
import { SeedGenerator } from "../../utils";
import { register1, register2 } from "../../views/_templates";

const canDismiss = ref(true);
const SetDismiss = (value: boolean) => {
  if (value) {
    setTimeout(() => {
      canDismiss.value = value;
    }, 10);
  } else canDismiss.value = value;
};

const form = reactive({
  name: "",
  birthday: "",
  breed: "",
  color: "#FFD80A",
  inoutdoors: "",
  fixing: "",
});

const pages = [register1, register2];
const page = ref(1);
const disabler = ref([true, true]);

const Dismiss = () => {
  emit("dismiss");
  ClearForm();
};

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
    localStorage.getItem("authEmail")! === "Guest"
      ? undefined
      : localStorage.getItem("authID")!
  ).then(() => {
    canDismiss.value = true;
    emit("submit", pid);
    Dismiss();
  });
};

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["submit", "dismiss"]);
</script>

<style scoped>
.pet-avatar {
  --max-size: 100px;
}
</style>
