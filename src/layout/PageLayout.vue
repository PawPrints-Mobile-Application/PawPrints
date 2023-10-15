<template>
  <ion-page class="main-page" :class="class" :id="id">
    <header v-show="showHeader" class="page-header-container" :id="`page-header-container-${id}`">
      <slot name="pageHeader" :id="`page-header-${id}`" />
    </header>
    <main class="page-content-container" :id="`page-content-container-${id}`">
      <slot v-if="useDefaultSlot" class="page-content"/>
      <slot v-else name="pageContent" class="page-content"/>
    </main>
  </ion-page>
</template>

<script setup lang="ts">
import { useSlots } from "vue";
import { IonPage } from "@ionic/vue";
const slots = useSlots();

const showHeader = !!slots.pageHeader;
const useDefaultSlot = !slots.pageContent || !!slots.default;
</script>

<script lang="ts">
export default {
  props: ['page-title', 'id', 'class'],
};
</script>

<style scoped>
:root{
  --page-content-justify-content: flex-start;
}

.page-header-container {
  --page-header-width: 100%;
  --page-header-height: max-content;
  width: var(--page-header-width);
  height: var(--page-header-height);
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  /* border-bottom: 1px solid var(--ion-color-secondary); */
}

.page-content-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: var(--page-content-justify-content);
  align-items: center;
}
</style>

<style>
.main-page {
  position: absolute !important;
  --main-page-padding-top: var(--content-padding-top);
  --main-page-padding-right: var(--content-padding-right);
  --main-page-padding-down: var(--content-padding-down);
  --main-page-padding-left: var(--content-padding-left);
  --main-page-padding: var(--main-page-padding-top)
    var(--main-page-padding-right) var(--main-page-padding-down)
    var(--main-page-padding-left);
}

.page-header-container {
  --page-header-padding-top: var(--main-page-padding-top);
  --page-header-padding-right: var(--main-page-padding-right);
  --page-header-padding-down: var(--main-page-padding-down);
  --page-header-padding-left: var(--main-page-padding-left);
  --page-header-padding: var(--page-header-padding-top)
    var(--page-header-padding-right) var(--page-header-padding-down)
    var(--page-header-padding-left);
  padding: var(--page-header-padding);

  --page-header-icon-height: 80px;
  --page-header-icon-width: var(--page-header-icon-height);
}

.page-content-container {
  --page-content-padding-top: 0px;
  --page-content-padding-right: var(--main-page-padding-right);
  --page-content-padding-down: var(--main-page-padding-down);
  --page-content-padding-left: var(--main-page-padding-left);
  --page-content-padding: var(--page-content-padding-top)
    var(--page-content-padding-right) var(--page-content-padding-down)
    var(--page-content-padding-left);
  padding: var(--page-content-padding);
}

.page-header-title {
  text-align: center;
  font-family: Poppins;
  font-size: var(--fs6);
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: var(--ion-color-black);
  min-width: calc(100% - var(--page-header-icon-width) - var(--page-header-padding-left) - var(--page-header-padding-right));
}

.page-header-icon {
  height: var(--page-header-icon-height);
  width: var(--page-header-icon-width);
}

.page-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}
</style>
