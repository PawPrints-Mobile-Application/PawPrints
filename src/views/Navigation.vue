<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet />
      <NavigationBar />
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { NavigationBar } from "../components/Others";
import { IonPage, IonTabs, IonRouterOutlet } from "@ionic/vue";
</script>

<script lang="ts">
export default {
  name: "Navigation",
};
</script>

<style scoped>
</style>
