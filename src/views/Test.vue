<template>
  <section>
    <div>{{ SeedGenerator(new Date()) }}</div>
    <div>{{ trial() }}</div>
  </section>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { InputDynamicWrapped } from "../components/Forms";
import { SeedGenerator } from "../utils";

const value = ref("1:25 PM");
const options = [1, 2, 3, 4, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const trial = () => {
  let a = 0;
  let DStart = new Date();
  let DEnd = new Date(2024, 0, 1);
  for (let i = DStart; i < DEnd; i.setDate(i.getDate() + 1)) {
    a++;
  }
  return a;
};
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
