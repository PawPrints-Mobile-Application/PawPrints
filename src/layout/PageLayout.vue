<template>
  <ion-page class="page-layout">
    <ion-header
      class="layout-wrapper header ion-no-border"
      v-show="showHeader"
      :translucent="true"
      collapse="fade"
    >
      <slot name="pageHeader" />
    </ion-header>
    <ion-content
      class=""
      :class="['ion-content-scroll-host']"
      :fullscreen="true"
    >
      <main class="layout-wrapper main">
        <slot name="pageContent"><slot /></slot>
      </main>
    </ion-content>
    <ion-footer
      class="layout-wrapper footer ion-no-border"
      v-show="showFooter"
      :translucent="true"
      collapse="fade"
    >
      <slot name="pageFooter" />
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import { useSlots } from "vue";
import { IonPage, IonHeader, IonContent, IonFooter } from "@ionic/vue";
const slots = useSlots();

const showHeader = !!slots.pageHeader;
const showFooter = !!slots.pageFooter;
</script>

<style scoped>
.ion-page.page-layout {
  --padding-side: 15px;
  --header-padding-top: 20px;
  --header-padding-bottom: 0;
  --footer-padding-top: 0;
  --footer-padding-bottom: 20px;

  --main-justify-content: center;
  overflow-y: scroll;
  min-width: 320px;
  padding-left: var(--padding-side);
  padding-right: var(--padding-side);
  background-color: var(--ion-color-primary);
}

.layout-wrapper {
  width: 100%;
}

.ion-page.page-layout .header {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  --padding-top: var(--header-padding-top);
  --padding-bottom: var(--header-padding-bottom);
  height: var(--header-height);
  min-height: 60px;
}

.ion-page.page-layout .footer {
  transform: translateY(-56px);
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  --padding-top: var(--footer-padding-top);
  --padding-bottom: var(--footer-padding-bottom);
  height: var(--footer-height);
  min-height: 60px;
}

.ion-page.page-layout ion-content {
  --offset-bottom: auto !important;
  --overflow: hidden;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
}

.ion-page.page-layout ion-content main {
  display: flex;
  flex-flow: column nowrap;
  justify-content: var(--main-justify-content);
  align-items: center;
  min-height: 100%;
  margin-bottom: 15px;
}

.ion-page.page-layout ion-content::part(background) {
  background-color: var(--background-color);
  min-height: 100%;
}

.ion-page.page-layout ion-content::part(scroll) {
  min-height: 100%;
}
</style>
