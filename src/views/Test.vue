<template>
  <page-layout>
    <AddPetButton id="test" />
    <TextInput
      id="text"
      label="Label"
      type="text"
      :validators="validators"
      v-model:model-value="value"
    />

    <DateInput
      id="text"
      label="Label"
      type="text"
      :validators="validators"
      v-model:model-value="value"
      :options="['1', '2', '3', '4', '5', '6', '7', '8', '9']"
      placeholder="Choose a text"
    />

    <Checkbox label="Checkbox" id="checkbox" :checked="true" />
    <RadioInput
      label="Label"
      type="checkbox"
      id="label"
      v-model="radio"
      :options="['1', '2', '3', '4', '5', '6', '7', '8', '9'].reverse()"
      allowOthers
    />
  </page-layout>
</template>
<script setup lang="ts">
import { PageLayout } from "../layout";
import {
  TextInput,
  Checkbox,
  DateInput,
  RadioInput,
} from "../components/Forms";
import { AddPetButton } from "../components/Buttons";
import { ref } from "vue";
import { Validator } from "../utils";

const validators = [
  new Validator((value: string) => value.length > 7, "Danger", "danger"),
  new Validator((value: string) => value.length > 3, "Warning", "warning"),
];

const value = ref("");
const radio = ref("");
</script>
<script lang="ts">
export default {
  name: "Test",
};
</script>
<style scoped>
.page-layout {
  --padding-side: 10px;
}
</style>
