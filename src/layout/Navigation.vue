<template>
  <ion-page class="main-page">
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar class="tab-bar" slot="bottom">
        <ion-tab-button
          v-for="page in pages"
          :id="`tab-button-${page.name}`"
          class="tab-button"
          :tab="page.name"
          :href="page.path"
          layout="icon-start"
        >
          <ion-icon
            :icon="page.path === currentRoute ? page.icon.active : page.icon.default"
            :color="page.path === currentRoute ? 'tertiary' : 'black'"
          />
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
} from "@ionic/vue";
import {pages} from "../views/NavPages";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useIonRouter, useBackButton } from "@ionic/vue";
import { App } from '@capacitor/app';
const ionRouter = useIonRouter();
const router = useRouter();
const currentRoute = computed(() => router.currentRoute.value.path)

useBackButton(-1, () => {
    if (!ionRouter.canGoBack()) {
      App.exitApp();
    }
  });
</script>

<script lang="ts">
export default {
  name: "Navigation"
};
</script>

<style scoped>
.tab-bar {
  --background: var(--ion-color-primary);
}

.tab-button {
  --ripple-color: var(--ion-color-tertiary);
}

.tab-button::after {
  content: '';
  --width: calc(80vw / 4);
  --height: 40px;
  border-radius: 10px;
  width: var(--width);
  height: var(--height);
  position: absolute;
  transform: translate(calc((-3px - var(--width) / 2)),calc((-28px - var(--height) / 2)));
}
</style>
