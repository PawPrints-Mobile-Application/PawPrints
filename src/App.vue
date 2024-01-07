<template>
  <ion-app>
    <ion-router-outlet />
    <!-- <ToastNetwork /> -->
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import {
  onMounted,
  reactive,
  ref,
  watch,
  onUnmounted,
  onBeforeMount,
  Ref,
} from "vue";
import { UserInfo, Themes, PawprintsEvent } from "./utils";
import { Connect, Open, Close } from "./server/sqlite";
import { CreateModels } from "./server/models";
import { Props as DogProps, GetAll as GetDogs } from "./server/models/Dogs";

const state = reactive({
  userFound: false,

  auth: false,
  themes: false,
  localDatabase: false,
});

const dogs: Ref<DogProps[]> = ref([]);
const UpdateDogs = () =>
  GetDogs(db.value).then((values) => (dogs.value = values));
const AddToDogs = (value: DogProps) => dogs.value.push(value);
const SendDogs = () =>
  PawprintsEvent.EventDispatcher("response-dogs", dogs.value);

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
      PawprintsEvent.EventDispatcher("response-db", db.value);
    })
    .then(UpdateDogs);
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

onBeforeMount(async () => {
  PawprintsEvent.AddEventListener("request-db", ResponseDB);
  PawprintsEvent.AddEventListener("add-to-dogs", AddToDogs);
  PawprintsEvent.AddEventListener("request-dogs", SendDogs);
  await LocalDatabase();
});

onMounted(() => {
  GetAuth();
});

onUnmounted(async () => {
  await Close(db.value);
  PawprintsEvent.RemoveEventListener("request-db", ResponseDB);
  PawprintsEvent.RemoveEventListener("add-to-dogs", AddToDogs);
  PawprintsEvent.RemoveEventListener("request-dogs", SendDogs);
});
</script>

<script lang="ts">
export default {
  name: "App",
};
</script>

<style scoped></style>
