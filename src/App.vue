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
import { CustomEvent, SetRootStyle, ObjectToMap } from "./utils";
import themes from "./theme";

onBeforeMount(() => {
  sessionStorage.setItem("appInitialized", "false");
});
onMounted(async () => {
  SplashScreen.show();
  setTimeout(() => {
    SplashScreen.hide();
  }, 0);

  sessionStorage.setItem("appInitialized", "true");
  CustomEvent.EventListener("reload-mode", () => {
    const theme = ObjectToMap(themes).get(localStorage.getItem("colorTheme")!);
    const mode = ObjectToMap(theme).get(localStorage.getItem("colorMode")!);
    SetRootStyle(mode);
  });
  CustomEvent.EventDispatcher("reload-mode");
});
</script>

<script lang="ts">
export default {
  name: "App",
};
</script>

<style scoped></style>
