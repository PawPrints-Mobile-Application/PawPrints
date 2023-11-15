<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet/>
      <ion-tab-bar class="tab-bar" slot="bottom">
        <ion-tab-button
          v-for="route in navigationRecords"
          :id="`tab-button-${route.name}`"
          class="tab-button"
          :tab="route.name"
          :href="`/${route.name}`"
          layout="icon-start"
        >
          <ion-icon
            :icon="isOnTab(`/${route.name}`) ? route.icons!.active : route.icons!.default
            "
            :color="isOnTab(`/${route.name}`) ? 'tertiary' : 'black'"
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
import { navigationRecords } from ".";
import { useRouter } from "vue-router";
import { useIonRouter, useBackButton } from "@ionic/vue";
import { App } from "@capacitor/app";
const ionRouter = useIonRouter();
const router = useRouter();
const isOnTab = (path: string) =>
  router.currentRoute.value.path.toLowerCase() === path.toLowerCase();

useBackButton(-1, () => {
  if (!ionRouter.canGoBack()) {
    App.exitApp();
  }
});
</script>

<script lang="ts">
export default {
  name: "Navigation",
};
</script>

<style scoped>
.tab-bar {
  --background: var(--ion-color-primary);
}

.tab-button {
  --ripple-color: var(--ion-color-tertiary);
}
</style>
