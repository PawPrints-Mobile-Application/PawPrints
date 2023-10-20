<template>
  <page-layout>
    <Searchbox v-model="value" :onReturn="() => console.log(value)" />
  </page-layout>
</template>
<script setup lang="ts">
import { PageLayout } from '../../layout';
import Searchbox from '../../components/Forms/Searchbox.vue';
import { ref } from 'vue';

const value = ref('');
</script>
<script lang="ts">
export default {
  name: "Test",
  routeInfo: {
    filename: 'Test',
    path: "/test",
    meta: {
      requiresAuth: false,
      requiresInternet: false,
    },
  },
};
</script>
<style scoped>
</style>
