<template>
  <LayoutPage>{{ params.pid }}</LayoutPage>
</template>
<script setup lang="ts">
import { LayoutPage } from "../../layout";
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const params = ref(route.params);
</script>

<style scoped></style>
