<template>
  <ion-page class="layout-page">
    <LayoutWrapper
      :noDefaultMargin="noDefaultMargin"
      :disableHeader="!showHeader"
      :disableFooter="!showFooter"
      :hideScrollbar="hideScrollbar"
      :disableScroll="disableScroll"
    >
      <template #header>
        <slot name="header" />
      </template>
      <template #content>
        <slot name="content"><slot /></slot>
      </template>
      <template #footer>
        <slot name="footer" />
      </template>
    </LayoutWrapper>
  </ion-page>
</template>
<script setup lang="ts">
import { IonPage } from "@ionic/vue";
import { LayoutWrapper } from ".";
import { useSlots } from "vue";
const slots = useSlots();

const showHeader = !!slots.header;
const showFooter = !!slots.footer;
defineProps({
  noDefaultMargin: Boolean,
  hideScrollbar: Boolean,
  disableScroll: Boolean,
});
</script>
<style scoped>
.layout-page {
  --background-color: var(--background-color-primary);
  --default-margin: 20px;
  height: 100%;
  width: 100%;
}
</style>
