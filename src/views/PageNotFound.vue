<template>
  <PageLayout> 404 Page not found: {{ GetPath() }} </PageLayout>
</template>
<script setup lang="ts">
import { PageLayout } from "../layout";
import { useRoute } from "vue-router";
// URL Path Parts: .../:0/:1/:2/:3/:4/:5
const route = useRoute();
const GetPath = () => {
  let array = new Array(6);
  Object.keys(route.params).forEach(
    (key) => (array[Number(key)] = route.params[key])
  );
  return "/" + array.reduce((acc, val) => {
    if (!!val) return acc + "/" + val;
  });
};
</script>

<script lang="ts">
export default {
  name: "PageNotFound",
};
</script>
<style scoped></style>
