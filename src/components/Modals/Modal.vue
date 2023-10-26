<template>
  <ion-modal class="modal" ref="modal" :trigger="trigger">
    <ion-header
      class="layout-wrapper header ion-no-border"
      v-show="!hideHeader"
    >
      <BackButton v-show="!hideHeaderBack" @click="CloseModal" />
      <div id="title" v-show="title">{{ title?.toUpperCase() }}</div>
    </ion-header>
    <ion-content class="layout-wrapper main">
      <main>
        <slot
          name="modalSlot"
          :closeModal="CloseModal"
          :page="page"
          :max="maxPages"
        />
      </main>
    </ion-content>
    <ion-footer
      class="layout-wrapper footer ion-no-border"
      v-show="!hideFooter"
    >
      <BackButton
        v-show="!hideFooterBack"
        @click="() => (page === 1 ? CloseModal() : Back())"
      />
      <ForwardButton
        v-show="!hideFooterSubmit"
        @click="() => (page === maxPages ? Submit() : Next())"
      />
    </ion-footer>
  </ion-modal>
</template>

<script setup lang="ts">
import BackButton from "../Buttons/BackButton.vue";
import ForwardButton from "../Buttons/ForwardButton.vue";
import {
  IonModal,
  IonHeader,
  IonContent,
  IonFooter,
  modalController,
} from "@ionic/vue";

import { ref } from "vue";
const page = ref(1);

const Add = (i: number, max: number) =>
  (page.value = Math.max(1, Math.min(max, i + page.value)));

const Back = () => {
  Add(-1, props.maxPages);
  emit("back");
};

const Next = () => {
  Add(1, props.maxPages);
  emit("next");
};

const CloseModal = () => {
  modalController.dismiss();
  setTimeout(() => emit("close"), 200);
};

const Submit = () => {
  emit("submit");
};

const props = defineProps({
  title: String,
  trigger: String,
  maxPages: {
    type: Number,
    default: 1,
  },
  hideHeaderBack: Boolean,
  hideHeader: Boolean,
  hideFooter: Boolean,
  hideFooterBack: Boolean,
  hideFooterSubmit: Boolean,
});

const emit = defineEmits(["submit", "close", "back", "next"]);
</script>

<style scoped>
.modal {
  overflow-y: scroll;
  min-width: 320px;
  --header-height: 50px;
  --main-height: 0px;
  --footer-height: 50px;
  --padding-side: 15px;
  --header-padding-top: 20;
  --header-padding-bottom: 0;
  --footer-padding-top: 20;
  --footer-padding-bottom: 0;
}

.layout-wrapper {
  width: 100%;
  padding-left: var(--padding-side);
  padding-right: var(--padding-side);
  background-color: var(--ion-color-primary);
}

.main {
  --padding-start: var(--padding-side);
  --padding-end: var(--padding-side);
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: var(--main-height);
}

.header {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  height: var(--header-height);
  --padding-top: var(--header-padding-top);
  --padding-bottom: var(--header-padding-bottom);
}

.header .back-button {
  position: absolute;
  left: var(--padding-side);
}

.header #title {
  font-weight: 700;
  font-size: var(--fs4);
  font-family: var(--font-family-Rubik);
}

.footer {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  height: var(--footer-height);
  --padding-top: var(--footer-padding-top);
  --padding-bottom: var(--footer-padding-bottom);
}
</style>

<style>

.template-wrapper {
  width: 100%;
  height: 90%;
  margin: 2% 0 8%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
