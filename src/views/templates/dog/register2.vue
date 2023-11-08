<template>
  <section class="template-wrapper">
    <InputRadio
      label="Does your dog belong indoors or outdoors?"
      id="inoutdoors"
      v-model:value="inoutdoors"
      :options="['Indoors', 'Outdoors']"
    />
    <InputRadio
      label="Is your pet neutered or spayed?"
      id="fixing"
      v-model:value="fixing"
      :options="['Neutered', 'Spayed', 'None']"
    />
  </section>
</template>

<script setup lang="ts">
import { InputRadio } from "../../../components/Forms";
import { computed } from "vue";

const props = defineProps({
  inoutdoors: {
    type: String,
    required: true,
  },
  fixing: {
    type: String,
    required: true,
  },
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

const emit = defineEmits(["update:inoutdoors", "update:fixing"]);
</script>

<script lang="ts">
export default {
  name: "register2",
};
</script>
<style scoped>
.template-wrapper {
  height: 100%;
  justify-content: space-evenly;
}
</style>
