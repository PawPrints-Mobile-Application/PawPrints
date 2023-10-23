<template>
  <page-layout>
    <AddPetButton />
  </page-layout>
</template>
<script setup lang="ts">
import { PageLayout } from "../../layout";
import { AddPetButton } from "../../components/Buttons";

</script>
<script lang="ts">
export default {
  name: "Test",
  routeInfo: {
    filename: "Test",
    path: "/test",
    meta: {
      requiresAuth: false,
      requiresInternet: false,
    },
  },
};
</script>
<style scoped>
.page-layout {
  --padding-side: 10px;
}
</style>
