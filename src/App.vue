<template>
  <ion-app>
    <ion-router-outlet></ion-router-outlet>
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet, toastController } from "@ionic/vue";
import { SplashScreen } from "@capacitor/splash-screen";
import { onBeforeMount, onMounted, onUnmounted } from "vue";
import {
  globeOutline as networkOffline,
  wifiOutline as networkOnline,
} from "ionicons/icons";

onBeforeMount(() => {
  sessionStorage.setItem("appInitialized", "false");
});
onMounted(async () => {
  SplashScreen.show();
  setTimeout(() => {
    SplashScreen.hide();
  }, 0);

  window.addEventListener("online", async () => await SetConnectivity(true));
  window.addEventListener("offline", async () => await SetConnectivity(false));
  await SetConnectivity(navigator.onLine);
  sessionStorage.setItem("appInitialized", "true");
});

onUnmounted(() => {
  window.removeEventListener("online", async () => await SetConnectivity(true));
  window.removeEventListener(
    "offline",
    async () => await SetConnectivity(false)
  );
});

// CONNECTIVITY EVENT LISTENER
const SetConnectivity = async (isNetOnline: boolean) => {
  const conn = isNetOnline ? "online" : "offline";
  sessionStorage.setItem("network", conn);
  if (sessionStorage.getItem("appInitialized") === "true" || !isNetOnline)
    ConnectivityToast(isNetOnline);
};

const ConnectivityToast = async (isNetOnline: boolean) => {
  const conn = isNetOnline ? "online" : "offline";
  const toast = await toastController.create({
    cssClass: "toast-connectivity",
    message: `Network ${conn}`,
    duration: 2000,
    position: "top",
    icon: isNetOnline ? networkOnline : networkOffline,
    buttons: [
      {
        text: "X",
        role: "cancel",
      },
    ],
  });
  return toast.present();
};
</script>

<script lang="ts">
export default {
  name: "App",
};
</script>

<style scoped>
ion-toast.toast-connectivity {
  --background: var(--ion-color-danger);
}
</style>
