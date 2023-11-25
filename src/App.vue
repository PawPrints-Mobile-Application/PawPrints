<template>
  <ion-app>
    <ion-router-outlet />
    <ToastNetwork />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { SplashScreen } from "@capacitor/splash-screen";
import { onBeforeMount, onMounted } from "vue";
import { ToastNetwork } from "./components/Toasts";

onBeforeMount(() => {
  sessionStorage.setItem("appInitialized", "false");
});
onMounted(async () => {
  SplashScreen.show();
  setTimeout(() => {
    SplashScreen.hide();
  }, 0);

  sessionStorage.setItem("appInitialized", "true");
});
</script>

<script lang="ts">
export default {
  name: "App",
};
</script>

<style scoped>
</style>
