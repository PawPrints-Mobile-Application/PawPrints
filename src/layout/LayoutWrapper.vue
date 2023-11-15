<template>
  <ion-header
    class="layout-header"
    :class="{
      'on-scroll-top': scrollDetail.scrollTop === 0,
      'ion-no-border': scrollDetail.scrollTop === 0,
      'default-margin': !noDefaultMargin,
      hide:
        !showHeader ||
        !!disableHeader ||
        (!!disableHeaderOnScroll && scrollDetail.scrollTop !== 0),
    }"
    :translucent="true"
    collapse="fade"
  >
    <slot name="header" />
  </ion-header>
  <ion-content
    class="layout-content ion-content-scroll-host"
    :class="{
      'in-anti-navigation': inAntiNavigation,
      'disable-scroll': !!disableScroll,
    }"
    :fullscreen="true"
    :scroll-events="true"
    @ion-scroll="(data) => OnScroll(data.detail)"
    @ion-scroll-start="emit('scroll-start')"
    @ion-scroll-end="emit('scroll-end')"
  >
    <main
      :class="{
        'default-margin': !noDefaultMargin,
      }"
    >
      <section :style="{ justifyContent: justify }">
        <slot name="content"> <slot /></slot>
      </section>
    </main>
  </ion-content>
  <ion-footer
    class="layout-footer ion-no-border"
    :class="{
      'default-margin': !noDefaultMargin,
      hide: !showFooter || disableFooter,
    }"
    :translucent="true"
    collapse="fade"
  >
    <slot name="footer" />
  </ion-footer>
</template>
<script setup lang="ts">
import { IonHeader, IonContent, IonFooter, ScrollDetail } from "@ionic/vue";
import { reactive, useSlots } from "vue";
const slots = useSlots();

const showHeader = !!slots.header;
const showFooter = !!slots.footer;

const scrollDetail = reactive({
  scrolling: false,
  scrollTop: 0,
});
const OnScroll = (_scrollDetail: ScrollDetail) => {
  scrollDetail.scrolling = _scrollDetail.isScrolling;
  scrollDetail.scrollTop = _scrollDetail.scrollTop;

  if (scrollDetail.scrolling) emit("scrolling");
  if (scrollDetail.scrollTop === 0) emit("on-scroll-top");
  else emit("off-scroll-top");
};

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
.layout-wrapper {
  height: 100%;
  width: 100%;
}

.layout-header {
  --background-color: var(--background-color-primary);
  --background-color-header: var(--background-color);
  background-color: var(--background-color-header);
  min-height: 30px;
  max-height: 70px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 200ms ease-out;
}

.layout-content::part(background) {
  --background-color: var(--background-color-primary);
  --background-color-content: var(--background-color);
  background-color: var(--background-color-content);
  min-height: 100%;
}

.layout-content::part(scroll) {
  min-height: 100%;
}

.disable-scroll {
  --offset-bottom: auto !important;
  --overflow: hidden;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
}

.layout-content main {
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.layout-content.in-anti-navigation main {
  min-height: 100svh;
}

.layout-content main section {
  padding-block: 10px;
  flex: 1 0 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.layout-footer {
  --background-color: var(--background-color-primary);
  --background-color-footer: var(--background-color);
  background-color: var(--background-color-footer);
  min-height: 30px;
  max-height: 70px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 200ms ease-out;
}

.default-margin {
  --default-margin: 20px;
  padding-inline: var(--default-margin);
}

.on-scroll-top {
  min-height: 70px;
  max-height: 70px;
}

/* Overrides all */
.hide {
  min-height: 0px !important;
  max-height: 0px !important;
}
</style>
