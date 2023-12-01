<template>
  <section>
    <InputDynamicWrapped v-model="value" type="time" />
  </section>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { InputDynamicWrapped } from "../components/Forms";

const value = ref(125);
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
  flex-direction: column;
}
</style>
