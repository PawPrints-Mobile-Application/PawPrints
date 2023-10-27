<template>
  <section class="template-wrapper">
    <RadioInput
      label="Does your dog belong indoors or outdoors?"
      id="inoutdoors"
      v-model="_inoutdoors"
      :options="['Indoors', 'Outdoors']"
      @input="() => emit('update:modelInoutdoors', _inoutdoors)"
    />
    <RadioInput
      label="Is your pet neutered or spayed?"
      id="fixing"
      v-model="_fixing"
      :options="['Neutered', 'Spayed', 'None']"
      @input="() => emit('update:modelFixing', _fixing)"
    />
  </section>
</template>

<script setup lang="ts">
import { RadioInput } from "../../../components/Forms";
import { ref } from "vue";

const props = defineProps({
  modelInoutdoors: {
    type: String,
    default: "",
    required: true,
  },
  modelFixing: {
    type: String,
    default: "",
    required: true,
  },
});

const _inoutdoors = ref(props.modelInoutdoors);
const _fixing = ref(props.modelFixing);

const emit = defineEmits(["update:modelInoutdoors", "update:modelFixing"]);
</script>

<script lang="ts">
export default {
  name: "register2",
};
</script>
<style scoped>
.wrapper {
  width: 100%;
}

.radio-input {
  margin: 20px 0;
}
</style>
