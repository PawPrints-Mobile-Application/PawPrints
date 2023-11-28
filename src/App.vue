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
import { CustomEvent } from "./utils";

onBeforeMount(() => {
  sessionStorage.setItem("appInitialized", "false");
});
onMounted(async () => {
  SplashScreen.show();
  setTimeout(() => {
    SplashScreen.hide();
  }, 0);

  sessionStorage.setItem("appInitialized", "true");
  CustomEvent.EventDispatcher("reload-mode");
});
</script>

<script lang="ts">
export default {
  name: "App",
};
</script>

<style scoped></style>
