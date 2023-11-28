<template>
  <section>
    <ButtonSignOut/>
  </section>
</template>
<script setup lang="ts">
import { ButtonSignOut } from "../components/Buttons";
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
