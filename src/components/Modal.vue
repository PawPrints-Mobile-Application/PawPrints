<template>
  <ion-modal class="modal" ref="modal" :trigger="trigger">
    <ion-content>
      <header v-show="allowButtons === true">
        <ion-button
          v-show="prevButton === true"
          class="prev-button"
          color="primary"
          @click="closeModal"
          >{{ "<<" }}</ion-button
        >
        <ion-button
          v-show="closeButton === true"
          class="close-button"
          color="danger"
          @click="closeModal"
          >Close</ion-button
        >
        <ion-button
          v-show="nextButton === true"
          class="next-button"
          color="primary"
          @click="closeModal"
          >{{ ">>" }}</ion-button
        >
      </header>
      <main class="modal-content">
        <slot name="modalSlot" :closeButton="closeModal" />
      </main>
    </ion-content>
  </ion-modal>
</template>

<script lang="ts">
import {
  IonContent,
  IonButton,
  IonModal,
  IonToolbar,
  IonButtons,
  modalController,
} from "@ionic/vue";
const closeModal = () => modalController.dismiss();

import { defineComponent } from "vue";
export default defineComponent({
  name: "Modal",
  components: { IonContent, IonButton, IonModal, IonToolbar, IonButtons },
  props: {
    trigger: String,
    allowButtons: { type: Boolean, default: true },
    closeButton: { type: Boolean, default: true },
    prevButton: Boolean,
    nextButton: Boolean,
  },
  data() {
    return { closeModal };
  }
});
</script>

<style scoped>
header {
  width: 100%;
  padding: 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row nowrap;
  gap: 75px;
}

ion-button {
  border-radius: 10px;
  font-size: 1.5rem;
}

.modal-content {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column wrap;
  height: 100%;
}
</style>
