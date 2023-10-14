<template>
  <page-layout id="page-layout"> </page-layout>
</template>

<script setup lang="ts">
import PageLayout from "../components/PageLayout.vue";

import SplashToLogin from "./SplashToLogin.vue";
import Home from "./Home.vue";

import { onMounted } from "vue";
import { getCurrentUser } from "../server/firebase";
import { useIonRouter } from "@ionic/vue";
const ionRouter = useIonRouter();
const Redirect = async () =>
  ionRouter.navigate(
    `/${
      (await getCurrentUser()) ? Home.name : SplashToLogin.name
    }`,
    "forward",
    "replace"
  );

onMounted(Redirect);
</script>

<script lang="ts">
export default {
  name: "LandingPage",
};
</script>
<style scoped>
#page-layout {
  height: 100%;
  background-color: var(--ion-color-tertiary);
}
</style>
