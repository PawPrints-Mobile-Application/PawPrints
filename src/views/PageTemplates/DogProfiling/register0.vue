<template>
  <form class="dog-register-page1" method="POST" @submit.prevent="Submit">
    <TextInput
      type="text"
      name="name"
      v-model:model-value="form.name"
      placeholder="Doggo Name"
      label="Doggo Name"
    />
    <DateInput v-model="form.birthday" label="Birthday" name="birthday" />
    <DropdownInput v-model="form.breed" label="Doggo Breed" name="breed" :values="constants.breeds" default-disabled="" placeholder="Choose a breed" />
    <TextInput
      type="text"
      name="color"
      v-model:model-value="form.color"
      placeholder="Colour"
      label="Colour"
    />
  </form>
</template>

<script setup lang="ts">
import { TextInput, DateInput, DropdownInput } from "../../../components/Forms";
import { reactive } from "vue";

const form = reactive({
  name: '',
  birthday: '',
  breed: '',
  color: '',
});

const constants = {
  breeds: ['1', '2']
}

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
