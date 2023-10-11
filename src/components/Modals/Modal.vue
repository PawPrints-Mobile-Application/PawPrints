<template>
  <ion-modal ref="modal" :trigger="trigger">
    <div class="modal">
      <section class="modal-header" v-show="design === 1">
        <BackButton type="0" id="header-back-button" class="header-back-button" :onClick="closeModal" background-color="primary"/>
        <div id="header-title" v-show="title">{{ title?.toUpperCase() }}</div>
      </section>
      <main class="modal-content">
        <slot name="modalSlot" :closeModal="closeModal" :page="page" :max="maxPages" />
      </main>
      <section class="modal-footer" v-show="design === 0">
        <BackButton type="1" filled id="footer-back-button" class="footer-back-button" :onClick="() => page === 1 ? closeModal() : Add(-1, maxPages)" color="primary" background-color="tertiary"/>
        <ForwardButton v-show="!(page === maxPages && onSubmit === defaultFunction)" type="1" filled id="footer-forward-button" class="footer-forward-button" :onClick="() => page === maxPages ? onSubmit() : Add(1, maxPages)" color="primary" background-color="tertiary"/>
      </section>
    </div>
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
    },
    id: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
.modal {
  overflow: hidden scroll;
  --icon-size: 40px;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-flow: column nowrap;
  padding: 0;
  min-width: 320px;
  background-color: var(--ion-color-primary);
  --modal-header-height: 70px;
}

.modal-header {
  width: 100%;
  position: absolute;
  height: var(--modal-header-height);
  display: flex;
  z-index: 99;
  top: 0;
  background-color: inherit;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
}


.header-back-button {
  position: absolute;
  left: calc(var(--content-padding-left) / 2);
  font-size: var(--icon-size);
}

#header-title {
  font-weight: 700;
  font-size: 3rem;
  font-family: var(--font-family-Rubik);
}


.modal-content {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-flow: column wrap;
  height: max-content;
  padding: 0
    var(--content-padding-right) var(--content-padding-down)
    var(--content-padding-left);
  overflow: hidden scroll;
  width: 100%;
  margin-top: var(--modal-header-height);
}

.modal-footer {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 10px;
  background-color: inherit;
}

.footer-forward-button, .footer-back-button {
  font-size: 35px;
}
</style>
