<template>
  <ion-app>
    <ion-router-outlet />
    <!-- <ToastNetwork /> -->
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { onBeforeMount, reactive } from "vue";
import { UserInfo, Themes, PawprintsEvent } from "./utils";

const state = reactive({
  userFound: false,

  auth: false,
  themes: false,
  localDatabase: false,
});

const GetAuth = () => {
  if (!!UserInfo.GetSubscription()) {
    state.userFound = true;
    Themes.Set(UserInfo.GetTheme());
    PawprintsEvent.EventDispatcher("initialized", "themes");
  }
  state.auth = true;
  PawprintsEvent.EventDispatcher("initialized", "auth");
};

const LocalDatabase = () => {};

onBeforeMount(() => {
  GetAuth();
});
</script>

<script lang="ts">
export default {
  name: "App",
};
</script>

<style scoped></style>
