<template>
  <section>dwadw</section>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import SeedGenerator from "../utils/SeedGenerator";

onMounted(() => {
  console.log(SeedGenerator());
});
</script>
<style scoped></style>
