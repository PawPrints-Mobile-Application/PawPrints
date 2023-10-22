<template>
  <page-layout>
    <DropdownInput
      :values="[1, 2, 3, 4]"
      :defaultDisabled="-1"
      label="Text"
      name="text"
      v-model:model-value="test"
    />
  </page-layout>
</template>
<script setup lang="ts">
import { PageLayout } from "../../layout";
import { DropdownInput } from "../../components/Forms";
import { ref } from "vue";

const test = ref(-1);
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
