<template>
  <page-layout>
    <TextInput
      type="text"
      label="Text"
      name="text"
    />
    <br>
    <DateInput v-model="value" />
  </page-layout>
</template>
<script setup lang="ts">
import { PageLayout } from '../../layout';
import DateInput from '../../components/Forms/DateInput.vue';
import { TextInput } from '../../components/Forms';
import { ref } from 'vue';

const value = ref('2023-10-22');
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
.page-layout {
  --padding-side: 10px;
}
</style>
