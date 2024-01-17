<template>
  <ion-app>
    <ion-router-outlet />
    <!-- <ToastNetwork /> -->
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { onMounted, reactive, ref, onUnmounted, onBeforeMount, Ref } from "vue";
import { UserInfo, Themes, PawprintsEvent } from "./utils";
import { Connect, Open, Close } from "./server/sqlite";
import { CreateModels } from "./server/models";
import {
  GetAll as GetDogs,
  Props as PropsDog,
  SyncAll as SyncAllDogs,
} from "./server/models/Dogs";
import {
  Props as PropsLAD,
  GetAll as GetLAD,
} from "./server/models/LogAddressingData";
import {
  GetAll as GetLAT,
  Props as PropsLAT,
} from "./server/models/LogAddressingTable";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import { GetLATID } from "./server/models/Logs";

const state = reactive({
  userFound: false,

  auth: false,
  themes: false,
  localDatabase: false,
});

// -------------------------- DB --------------------------
const db: Ref<SQLiteDBConnection | undefined> = ref();
const InitDatabase = () =>
  Connect()
    .then((val) => {
      db.value = val;
      return Open(db.value);
    })
    .then(() => CreateModels(db.value!))
    .then(() => {
      state.localDatabase = true;
      PawprintsEvent.EventDispatcher("init-db");
      SendDatabase();
    })
    .then(GetAuth)
    .then(() => PawprintsEvent.EventDispatcher("ready-app"))
    .then(InitDogs)
    .then(InitLogs);
const SendDatabase = () =>
  PawprintsEvent.EventDispatcher("response-db", db.value);

const GetAuth = () => {
  PawprintsEvent.EventDispatcher("user-finder", !!UserInfo.GetUID(true));
  SetThemes();
  PawprintsEvent.EventDispatcher("init-themes");
};

const SetThemes = () => {
  Themes.Set(UserInfo.GetTheme());
  PawprintsEvent.EventDispatcher("updated-themes");
};

// -------------------------- DOGS --------------------------
const dogs: Ref<Map<string, PropsDog>> = ref(new Map());
const SendDogs = () =>
  PawprintsEvent.EventDispatcher("update-dogs", dogs.value);
const SendDog = (pid: string) =>
  PawprintsEvent.EventDispatcher("set-dog", dogs.value.get(pid));
const UpdateDog = (dog: PropsDog) => dogs.value.set(dog.pid, dog);
const UpdateDogs = (propsDogs: PropsDog[]) => {
  propsDogs.forEach(UpdateDog);
  SendDogs();
};
const InitDogs = () => GetDogs(db.value!).then(UpdateDogs);
const SyncDogs = () =>
  SyncAllDogs(db.value!, UserInfo.GetUID(true)).then(UpdateDogs);

// -------------------------- LOGS --------------------------
const latids: Ref<Map<string, string[]>> = ref(new Map());
const logs: Ref<Map<string, PropsLAD>> = ref(new Map());
const SendLogs = () =>
  PawprintsEvent.EventDispatcher("update-logs", {
    latids: latids.value,
    logs: logs.value,
  });
const UpdateLog = (
  log: PropsLAD,
  pid: string,
  date: { DStart: Date; DEnd: Date }
) => {
  const startDate = new Date(
    date.DStart.getFullYear(),
    date.DStart.getMonth(),
    date.DStart.getDate()
  );
  const endDtate = new Date(
    date.DEnd.getFullYear(),
    date.DEnd.getMonth(),
    date.DEnd.getDate()
  );
  for (
    let date = startDate;
    date <= endDtate;
    date.setDate(date.getDate() + 1)
  ) {
    const latid = GetLATID(date, pid);
    logs.value.set(log.lid, log);
    let lids = latids.value.get(latid);
    if (!lids) lids = new Array<string>();
    lids.push(log.lid);
    latids.value.set(latid, lids);
  }
};
const UpdateLogs = async (propsLATs: PropsLAT[]) => {
  propsLATs.forEach((propsLAT) =>
    latids.value.set(propsLAT.latid, propsLAT.lids)
  );
  return GetLAD(db.value!).then((propsLADs) => {
    propsLADs.forEach((propsLAD) => logs.value.set(propsLAD.lid, propsLAD));
    SendLogs();
  });
};
const InitLogs = () => GetLAT(db.value!).then(UpdateLogs);
const SyncLogs = () => {};

onBeforeMount(() => {
  PawprintsEvent.AddEventListener("request-db", SendDatabase);
  PawprintsEvent.AddEventListener("set-themes", SetThemes);

  PawprintsEvent.AddEventListener("request-dogs", SendDogs);
  PawprintsEvent.AddEventListener("request-dog", SendDog);
  PawprintsEvent.AddEventListener("update-dog", UpdateDog);
  PawprintsEvent.AddEventListener("sync-dogs", SyncDogs);

  PawprintsEvent.AddEventListener("request-logs", SendLogs);
  PawprintsEvent.AddEventListener("update-log", UpdateLog);
  PawprintsEvent.AddEventListener("sync-logs", SyncLogs);

  // PawprintsEvent.AddEventListener("sync-data", SyncData);
  // PawprintsEvent.AddEventListener("reset-data", ResetData);
  // PawprintsEvent.AddEventListener("request-db", ResponseDB);
  // PawprintsEvent.AddEventListener("add-to-dogs", AddDog);
  // PawprintsEvent.AddEventListener("add-to-logs", AddLog);
  // PawprintsEvent.AddEventListener("request-dogs", SendDogs);
  // PawprintsEvent.AddEventListener("request-dog-data", SendDog);
});

onMounted(() => setTimeout(InitDatabase, 1));

onUnmounted(async () => {
  if (!!db.value) await Close(db.value);
  PawprintsEvent.RemoveEventListener("request-db", SendDatabase);
  PawprintsEvent.RemoveEventListener("set-themes", SetThemes);

  PawprintsEvent.RemoveEventListener("request-dogs", SendDogs);
  PawprintsEvent.RemoveEventListener("request-dog", SendDog);
  PawprintsEvent.RemoveEventListener("update-dog", UpdateDog);
  PawprintsEvent.RemoveEventListener("sync-dogs", SyncDogs);

  PawprintsEvent.RemoveEventListener("request-logs", SendLogs);
  PawprintsEvent.RemoveEventListener("update-log", UpdateLog);
  PawprintsEvent.RemoveEventListener("sync-logs", SyncLogs);

  // PawprintsEvent.RemoveEventListener("sync-data", SyncData);
  // PawprintsEvent.RemoveEventListener("reset-data", ResetData);
  // PawprintsEvent.RemoveEventListener("request-db", ResponseDB);
  // PawprintsEvent.RemoveEventListener("add-to-dogs", AddDog);
  // PawprintsEvent.RemoveEventListener("add-to-logs", AddLog);
  // PawprintsEvent.RemoveEventListener("request-dogs", SendDogs);
  // PawprintsEvent.RemoveEventListener("request-dog-data", SendDog);
});
</script>

<script lang="ts">
export default {
  name: "App",
};
</script>

<style scoped></style>
