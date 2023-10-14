<template>
  <ion-app>
    <ion-router-outlet></ion-router-outlet>
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { SplashScreen } from "@capacitor/splash-screen";
import { onMounted } from "vue";

onMounted(() => {
  SplashScreen.show();
  setTimeout(() => {
    SplashScreen.hide();
  }, 0);
});
</script>

<script lang="ts">
export default {
  name: "App",
};
</script>

<style scoped></style>
