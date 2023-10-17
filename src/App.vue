<template>
  <ion-app>
    <ion-router-outlet></ion-router-outlet>
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { SplashScreen } from "@capacitor/splash-screen";
import { onMounted, onUnmounted } from "vue";

onMounted(() => {
  SplashScreen.show();
  setTimeout(() => {
    SplashScreen.hide();
  }, 0);

  SetConnectivity(navigator.onLine ? 'online' : 'offline');
  window.addEventListener('online', () => SetConnectivity('online'));
  window.addEventListener('offline', () => SetConnectivity('offline'));
});

onUnmounted(() => {
  window.removeEventListener('online', () => SetConnectivity('online'));
  window.removeEventListener('offline', () => SetConnectivity('offline'));
})

// CONNECTIVITY EVENT LISTENER
const SetConnectivity = (temp: 'online' | 'offline') => {
  window.localStorage.setItem('connectivity', temp);
  console.log(`Connectivity set to ${temp}!`);
};
</script>

<script lang="ts">
export default {
  name: "App",
};
</script>

<style scoped></style>
