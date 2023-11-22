<template>
  <ion-page>
    <ion-router-outlet />
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonRouterOutlet } from "@ionic/vue";
import { useIonRouter, useBackButton } from "@ionic/vue";
import { App } from "@capacitor/app";
const ionRouter = useIonRouter();

useBackButton(-1, () => {
  if (!ionRouter.canGoBack()) {
    App.exitApp();
  }
});
</script>

<script lang="ts">
export default {
  name: "AntiNavigation",
};
</script>

<style scoped>
</style>
