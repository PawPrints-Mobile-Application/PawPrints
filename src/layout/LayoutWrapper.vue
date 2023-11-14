<template>
  <ion-header
    class="layout-header"
    :class="{
      'ion-no-border': scrollDetail.scrollTop === 0,
      'default-margin': !noDefaultMargin,
      hide: !showHeader || disableHeader,
    }"
    :translucent="true"
    collapse="fade"
  >
    <slot name="header" />
  </ion-header>
  <ion-content
    class="layout-content ion-content-scroll-host"
    :class="{
      'disable-scroll': !!disableScroll,
    }"
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
  hideScrollbar: Boolean,
  disableScroll: Boolean,
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
  transition: all 200ms ease-out;
}

.layout-content::part(background) {
  background-color: var(--background-color);
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

.layout-content main section {
  flex: 1 0 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.layout-footer {
  background-color: var(--background-color);
  min-height: 30px;
  max-height: 70px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 200ms ease-out;
}

.default-margin {
  padding-inline: var(--default-margin);
}

.hide {
  min-height: 0px;
  max-height: 0px;
}
</style>
