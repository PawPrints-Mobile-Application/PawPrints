<template>
  <ion-header
    class="layout-header"
    :class="{
      'ion-no-border': scrollDetail.scrollTop === 0,
      'default-margin': !noDefaultMargin,
    }"
    :translucent="true"
    collapse="fade"
    v-show="showHeader && !disableHeader"
  >
    <slot name="header" />
  </ion-header>
  <ion-content
    class="layout-content ion-content-scroll-host"
    :fullscreen="true"
    :scroll-events="true"
    @ion-scroll="(data) => OnScroll(data.detail)"
  >
    <main
      :class="{
        'default-margin': !noDefaultMargin,
      }"
    >
      <section>
        <slot name="content"> <slot /></slot>
      </section>
    </main>
  </ion-content>
  <ion-footer
    class="layout-footer ion-no-border"
    :class="{
      'default-margin': !noDefaultMargin,
    }"
    :translucent="true"
    collapse="fade"
    v-show="showFooter && !disableFooter"
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
  scrollMax: 0,
});
const OnScroll = (_scrollDetail: ScrollDetail) => {
  scrollDetail.scrolling = _scrollDetail.isScrolling;
  scrollDetail.scrollTop = _scrollDetail.scrollTop;
};

defineProps({
  noDefaultMargin: Boolean,
  disableHeader: Boolean,
  disableFooter: Boolean,
});
</script>
<style scoped>
.layout-wrapper {
  --background-color: var(--background-color-primary);
  --default-margin: 20px;
  height: 100%;
  width: 100%;
}

.layout-header {
  background-color: var(--background-color);
  min-height: 30px;
  max-height: 70px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.layout-content::part(background) {
  background-color: var(--background-color);
  min-height: 100%;
}

.layout-content::part(scroll) {
  min-height: 100%;
}

main {
  width: 100%;
  min-height: 100%;

  > section {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
  }
}

.layout-footer {
  background-color: var(--background-color);
  min-height: 30px;
  max-height: 70px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.default-margin {
  padding-inline: var(--default-margin);
}
</style>
