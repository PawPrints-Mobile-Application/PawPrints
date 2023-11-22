<template>
  <InputRadio
    label="Does your dog belong indoors or outdoors?"
    id="inoutdoors"
    v-model="inoutdoors"
    :options="['Indoors', 'Outdoors']"
  />
  <InputRadio
    label="Is your pet neutered or spayed?"
    id="fixing"
    v-model="fixing"
    :options="['Neutered', 'Spayed', 'None']"
  />
</template>

<script setup lang="ts">
import { InputRadio } from "../../../components/Forms";
import { computed, watch } from "vue";

const props = defineProps({
  inoutdoors: String,
  fixing: String,
});

const inoutdoors = computed({
  get() {
    return props.inoutdoors;
  },
  set(value) {
    emit("update:inoutdoors", value);
  },
});

const fixing = computed({
  get() {
    return props.fixing;
  },
  set(value) {
    emit("update:fixing", value);
  },
});

const emit = defineEmits(["update:inoutdoors", "update:fixing", "empty"]);

const isEmpty = () =>
  [inoutdoors, fixing]
    .map((element) => element.value === "")
    .reduce((acc, val) => acc || val);

watch(
  () => isEmpty(),
  () => emit("empty", isEmpty())
);

defineExpose({ isEmpty });
</script>

<script lang="ts">
export default {
  name: "register2",
};
</script>
<style scoped>
</style>
