<template>
  <ion-button id="modal-SignIn" expand="block" color="tertiary"
    >Sign In</ion-button
  >
  <Modal class="modal-container" trigger="modal-SignIn" :allowButtons="false">
    <template #modalSlot="{ closeButton }">
      <ion-button v-on:click="closeButton">Close</ion-button>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { IonButton } from "@ionic/vue";
import Modal from "../components/Modal.vue";
</script>

<script lang="ts">
export default {
  name: "SignInModal"
};
</script>

<style scoped>
#modal-SignIn {
  font-weight: bold;
  font-size: 1.5rem;
  width: 90%;
  min-width: 150px;
  --border-radius: 10px;
  margin-top: 10px;
}

.signin-content {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column wrap;
  height: 100%;
}

.content-title {
  font-size: 3rem;
  font-weight: bold;
}

ion-item {
  margin-top: 20px;
}
</style>
