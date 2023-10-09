<template>
  <ButtonModal :design="1" text="Sign In" id="SignIn">
    <template #modalContent="{}">
      <!-- <SignInPage /> -->
      <TextInput />
    </template>
  </ButtonModal>
</template>

<script setup lang="ts">
import ButtonModal from '../Buttons/ButtonModal.vue';
// import { SignInPage } from '../../views';
import TextInput from '../Forms/TextInput.vue';
</script>

<script lang="ts">
export default {
  name: "SignInModal"
};
</script>

<style scoped>

</style>
