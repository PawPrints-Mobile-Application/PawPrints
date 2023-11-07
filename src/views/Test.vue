<template>
  <page-layout>
    <InputSearch v-model:value="value" keepOpen />
    
  </page-layout>
</template>
<script setup lang="ts">
import { PageLayout } from "../layout";
import { InputSearch } from "../components/Forms";

import { ref } from "vue";
// import { DogPreview } from "../components/Cards";

const value = ref("");

// watch(value, () => console.log(value.value));

// const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'dwadwada'];
</script>
<script lang="ts">
export default {
  name: "Test",
};
</script>
<style scoped></style>
