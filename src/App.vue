<template>
  <ion-app>
    <ion-router-outlet />
    <!-- <ToastNetwork /> -->
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { onMounted, reactive, ref, watch, onUnmounted } from "vue";
import { UserInfo, Themes, PawprintsEvent } from "./utils";
import { Connect, Open, Close } from "./server/sqlite";
import { CreateModels } from "./server/models";

const state = reactive({
  userFound: false,

  auth: false,
  themes: false,
  localDatabase: false,
});

watch(
  () => state.auth && state.themes && state.localDatabase === true,
  () => {
    if (state.userFound) PawprintsEvent.EventDispatcher("transition to home");
    else PawprintsEvent.EventDispatcher("transition to auth");
  }
);

const db = ref();
const LocalDatabase = () =>
  Connect()
    .then((val) => {
      db.value = val;
      return Open(db.value);
    })
    .then(() => CreateModels(db.value))
    .then(() => {
      state.localDatabase = true;
      PawprintsEvent.EventDispatcher("initialized-localDatabase");
    });
const ResponseDB = () =>
  PawprintsEvent.EventDispatcher("response-db", db.value);

const GetAuth = () => {
  if (!!UserInfo.GetSubscription()) {
    state.userFound = true;
    Themes.Set(UserInfo.GetTheme());
    PawprintsEvent.EventDispatcher("initialized-themes");
  }
  state.auth = true;
  state.themes = true;
  PawprintsEvent.EventDispatcher("initialized-auth");
};

onMounted(async () => {
  PawprintsEvent.AddEventListener("request-db", ResponseDB);
  await LocalDatabase();
  GetAuth();
});

onUnmounted(async () => {
  await Close(db.value);
  PawprintsEvent.RemoveEventListener("request-db", ResponseDB);
});
</script>

<script lang="ts">
export default {
  name: "App",
};
</script>

<style scoped></style>
