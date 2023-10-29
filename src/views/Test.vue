<template>
  <page-layout>
    <!-- <AddPetButton id="test" /> -->

    <InputDropdown id="dropdown" placeholder="Month" v-model:model-value="value" :options="months" required design="input-only" />
    
  </page-layout>
</template>
<script setup lang="ts">
import { PageLayout } from "../layout";
import {
  InputDropdown
} from "../components/Forms";
import { ref } from "vue";

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// import { Validator } from "../utils";

// const validators = [
//   new Validator((value: string) => value.length > 7, "Danger", "danger"),
//   new Validator((value: string) => value.length > 3, "Warning", "warning"),
// ];

const value = ref("");
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

.input-dropdown {
  --input-width: 80px;
}
</style>
