<template>
  <page-layout>
      <InputText
        label="Label"
        v-model:value="value"
        required
        :validators="SignupValidator.password"
      />
    <!-- <input type="color"> -->
  </page-layout>
</template>
<script setup lang="ts">
import { PageLayout } from "../layout";
import { InputText } from "../components/Forms/";
import { SignupValidator } from "../server/rulesets";

import { ref, watch } from "vue";
// import { DogPreview } from "../components/Cards";

const value = ref("");
const expand = ref(false);
// watch(value, () => console.log(value.value));

// watch(value, () => console.log(value.value));

// const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'dwadwada'];
</script>
<script lang="ts">
export default {
  name: "Test",
};
</script>
<style scoped></style>
