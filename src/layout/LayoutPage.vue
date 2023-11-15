<template>
  <ion-page class="layout-page">
    <LayoutWrapper
      :inAntiNavigation="inAntiNavigation"
      :justify="justify"
      :noDefaultMargin="noDefaultMargin"
      :disableHeader="!showHeader || disableHeader"
      :disableFooter="!showFooter || disableFooter"
      :hideScrollbar="hideScrollbar"
      :disableScroll="disableScroll"
      :disableHeaderOnScroll="disableHeaderOnScroll"
      @off-scroll-top="emit('off-scroll-top')"
      @on-scroll-top="emit('on-scroll-top')"
      @scroll-end="emit('scroll-end')"
      @scroll-start="emit('scroll-start')"
      @scrolling="emit('scrolling')"
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
  inAntiNavigation: Boolean,
  justify: {
    type: String,
    default: "center",
    validator: (value: string) => ["center", "flex-start", "space-between", "space-around", "space-evenly"].includes(value),
  },
  noDefaultMargin: Boolean,
  disableHeader: Boolean,
  disableFooter: Boolean,
  hideScrollbar: Boolean,
  disableScroll: Boolean,
  disableHeaderOnScroll: Boolean,
});

const emit = defineEmits([
  "scroll-start",
  "scroll-end",
  "scrolling",
  "on-scroll-top",
  "off-scroll-top",
]);
</script>
<style scoped>
.layout-page {
  --background-color: var(--background-color-primary);
  --default-margin: 20px;
  height: 100%;
  width: 100%;
}
</style>
