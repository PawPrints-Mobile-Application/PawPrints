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
import { CreateModels, ClearModels, SyncModels } from "./server/models";
import { Props as PropsDog, GetAll as GetDogs } from "./server/models/Dogs";
import { Props as PropsLAD } from "./server/models/LogAddressingData";
import { Get as GetLogs } from "./server/models/Logs";

const state = reactive({
  userFound: false,

  auth: false,
  themes: false,
  localDatabase: false,
});

type DogData = {
  props: PropsDog;
  logs: Map<string, Map<string, PropsLAD>>;
};
const dogs: Ref<Map<string, DogData>> = ref(new Map());

const ResetData = () => {
  dogs.value = new Map();
  return ClearModels(db.value);
};
const SyncData = () => SyncModels(db.value, UserInfo.GetUID()).then(FetchDogs);

// Dog Props
const FetchDogs = () =>
  GetDogs(db.value).then(async (values) => {
    for (const value of values) {
      const latids = value.latids;
      const logs = new Map<string, Map<string, PropsLAD>>();
      for (const latid of latids) {
        logs.set(
          latid,
          await GetLogs(db.value, new Date(Number(latid)), value.pid)
        );
      }
      dogs.value.set(value.pid, { props: value, logs: logs });
    }
  });
const AddDog = (value: PropsDog) =>
  dogs.value.set(value.pid, {
    props: value,
    logs: new Map(),
  });
const SendDogs = () =>
  PawprintsEvent.EventDispatcher("response-dogs", dogs.value);
const SendDog = (pid: string) =>
  PawprintsEvent.EventDispatcher("response-dog-data", dogs.value.get(pid));

// Initialization
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
    .then(SyncData)
    .then(() => PawprintsEvent.EventDispatcher("ready-data"));
const ResponseDB = () =>
  PawprintsEvent.EventDispatcher("response-db", db.value);

const GetAuth = () => {
  if (!!UserInfo.GetSubscription()) {
    state.userFound = true;
    SetThemes();
    PawprintsEvent.EventDispatcher("initialized-themes");
  }
  state.auth = true;
  state.themes = true;
  PawprintsEvent.EventDispatcher("initialized-auth");
};

const SetThemes = () => {
  Themes.Set(UserInfo.GetTheme());
  PawprintsEvent.EventDispatcher("updated-themes");
};

watch(
  () => state.auth && state.themes && state.localDatabase === true,
  () => {
    if (state.userFound) PawprintsEvent.EventDispatcher("transition to home");
    else PawprintsEvent.EventDispatcher("transition to auth");
  }
);

onBeforeMount(() => {
  PawprintsEvent.AddEventListener("sync-data", SyncData);
  PawprintsEvent.AddEventListener("reset-data", ResetData);
  PawprintsEvent.AddEventListener("request-db", ResponseDB);
  PawprintsEvent.AddEventListener("add-to-dogs", AddDog);
  PawprintsEvent.AddEventListener("request-dogs", SendDogs);
  PawprintsEvent.AddEventListener("set-themes", SetThemes);
  PawprintsEvent.AddEventListener("request-dog-data", SendDog);
});

onMounted(async () => {
  await LocalDatabase();
  GetAuth();
});

onUnmounted(async () => {
  await Close(db.value);
  PawprintsEvent.RemoveEventListener("sync-data", SyncData);
  PawprintsEvent.RemoveEventListener("reset-data", ResetData);
  PawprintsEvent.RemoveEventListener("request-db", ResponseDB);
  PawprintsEvent.RemoveEventListener("add-to-dogs", AddDog);
  PawprintsEvent.RemoveEventListener("request-dogs", SendDogs);
  PawprintsEvent.RemoveEventListener("set-themes", SetThemes);
  PawprintsEvent.RemoveEventListener("request-dog-data", SendDog);
});
</script>

<script lang="ts">
export default {
  name: "App",
};
</script>

<style scoped></style>
