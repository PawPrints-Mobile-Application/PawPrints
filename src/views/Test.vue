<template>
  <page-layout>
    <InputDate
      label="Label"
      v-model:value="value"
      required
      :options="months"
      hideInput
    />
    <!-- <input type="color"> -->
  </page-layout>
</template>
<script setup lang="ts">
import { PageLayout } from "../layout";
import { InputDate } from "../components/Forms/";
import { SignupValidator } from "../server/rulesets";

import { ref, watch } from "vue";
// import { DogPreview } from "../components/Cards";

const value = ref("");

watch(value, () => console.log(value.value));

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
  "dwadwada",
];
</script>
<script lang="ts">
export default {
  name: "Test",
};
</script>
<style scoped>
.input-select {
  width: 100%;
}
</style>
