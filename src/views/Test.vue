<template>
  <section>
    <ButtonSignOut />
    <InputDynamicWrapped type="dropdown" v-model="value" :options="options" />
  </section>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { ButtonSignOut } from "../components/Buttons";
import InputDynamicWrapped from "../components/Forms/InputDynamicWrapped.vue";

const value = ref("");
const options = [1, 2, 3, 4, 7, 8, 9, 10, 11, 12, 13, 14, 15];
</script>
<script lang="ts">
export default {
  name: "Test",
};
</script>
<style scoped>
section {
  display: flex;
  gap: 10px;
}
</style>
