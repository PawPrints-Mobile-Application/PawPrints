<template>
  <form class="dog-register-page1" method="POST" @submit.prevent="Submit">
    <TextInput
      type="text"
      name="name"
      v-model:model-value="form.name"
      placeholder="Doggo Name"
      label="Doggo Name"
    />
  </form>
</template>

<script setup lang="ts">
import { TextInput } from "../../../components/Forms";
import { reactive } from "vue";

const form = reactive({
  name: "",
});

const Submit = () => {};
</script>

<script lang="ts">
export default {
  name: "register0",
  routeInfo: {
    filename: "register0",
    path: "/dog/register",
    meta: {
      requiresAuth: false,
      requiresInternet: false,
    },
  },
};
</script>
<style scoped>
</style>
