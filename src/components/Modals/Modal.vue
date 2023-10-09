<template>
  <ion-modal class="modal" ref="modal" :trigger="trigger">
    <header v-show="design === 1">
      <BackButton type="0" id="header-back-button" :onClick="closeModal" background-color="primary"/>
      <h1 v-show="title">{{ title?.toUpperCase() }}</h1>
    </header>
    <main class="modal-content">
      <slot name="modalSlot" :closeModal="closeModal" :page="page" :max="maxPages" />
    </main>
    <footer v-show="design === 0">
      <BackButton type="1" filled id="back-button" :onClick="() => page === 1 ? closeModal() : Add(-1, maxPages)" color="primary" background-color="tertiary"/>
      <ForwardButton v-show="!(page === maxPages && onSubmit === defaultFunction)" type="1" filled id="forward-button" :onClick="() => page === maxPages ? onSubmit() : Add(1, maxPages)" color="primary" background-color="tertiary"/>
    </footer>
  </ion-modal>
</template>

<script setup lang="ts">
import BackButton from '../Buttons/BackButton.vue';
import ForwardButton from "../Buttons/ForwardButton.vue";
import {
  IonModal,
  modalController
} from "@ionic/vue";

import { ref } from "vue";
const page = ref(1);

const Add = (i : number, max: number) => page.value = Math.max(1, Math.min(max, i + page.value));

const closeModal = () => modalController.dismiss();
</script>

<script lang="ts">
const defaultFunction = () => null;
export default {
  name: "Modal",
  props: {
    design: {
      type: Number,
      default: 0
    },
    title: String,
    trigger: String,
    allowButtons: { type: Boolean, default: true },
    closeButton: { type: Boolean, default: true },
    prevButton: Boolean,
    nextButton: Boolean,
    maxPages: {
      type: Number,
      default: 1
    },
    onSubmit: {
      type: Function,
      default: defaultFunction
    }
  }
};
</script>

<style scoped>
header {
  position: absolute;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row nowrap;
  padding: 20px 0 10px;
  margin-top: 10px;
}

#header-back-button {
  position: absolute;
  left: 10px;
}

h1 {
  margin: 0;
  font-weight: 700;
  font-family: var(--font-family-Rubik);
}

.modal-content {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column wrap;
  height: 100%;
}

footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 10px 0 20px;
}
</style>
