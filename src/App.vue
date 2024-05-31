<template>
  <ion-app>
    <ion-router-outlet />
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
import { GetLATID, Sync as SyncAllLogs } from "./server/models/Logs";

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
    .then(SyncDogs)
    .then(SyncLogs);
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
const SyncData = () => SyncDogs().then(SyncLogs);

// -------------------------- DOGS --------------------------
const dogs: Ref<Map<string, PropsDog>> = ref(new Map());
const SendDogs = () => 
  PawprintsEvent.EventDispatcher("update-dogs", dogs.value);
const SendDog = (pid: string) =>
  PawprintsEvent.EventDispatcher("set-dog", dogs.value.get(pid));
const UpdateDog = (dog: PropsDog) => {
  dogs.value.set(dog.pid, dog);
  PawprintsEvent.EventDispatcher("count-dogs", dogs.value.size);
};
const UpdateDogs = (propsDogs: PropsDog[]) => {
  propsDogs.forEach(UpdateDog);
  PawprintsEvent.EventDispatcher("count-dogs", dogs.value.size);
  SendDogs();
};
const InitDogs = () => GetDogs(db.value!).then(UpdateDogs);
const SyncDogs = () =>
  SyncAllDogs(db.value!, UserInfo.GetUID(true)).then(InitDogs);

// -------------------------- LOGS --------------------------
const latids: Ref<Map<string, string[]>> = ref(new Map());
const logs: Ref<Map<string, PropsLAD>> = ref(new Map());
const SendLogs = () =>
  PawprintsEvent.EventDispatcher("update-logs", {
    latids: latids.value,
    logs: logs.value,
  });
const UpdateLog = (value: {
  log: PropsLAD;
  DStart: Date;
  DEnd: Date;
  pid: string;
}) => {
  const startDate = new Date(
    value.DStart.getFullYear(),
    value.DStart.getMonth(),
    value.DStart.getDate()
  );
  const endDtate = new Date(
    value.DEnd.getFullYear(),
    value.DEnd.getMonth(),
    value.DEnd.getDate()
  );
  for (
    let date = startDate;
    date <= endDtate;
    date.setDate(date.getDate() + 1)
  ) {
    const latid = GetLATID(date, value.pid);
    logs.value.set(value.log.lid, value.log);
    let lids = latids.value.get(latid);
    if (!lids) lids = new Array<string>();
    lids.push(value.log.lid);
    latids.value.set(latid, lids);
  }
};
const UpdateLogs = async (propsLADs: PropsLAD[]) => {
  propsLADs.forEach((propsLAD) => logs.value.set(propsLAD.lid, propsLAD));
  return GetLAT(db.value!).then((propsLATs: PropsLAT[]) => {
    propsLATs.forEach((propsLAT) =>
      latids.value.set(propsLAT.latid, propsLAT.lids)
    );
    SendLogs();
  });
};
const InitLogs = () => GetLAD(db.value!).then(UpdateLogs);
const SyncLogs = () =>
  SyncAllLogs(db.value!, UserInfo.GetUID(true)).then(InitLogs);

const ResetData = () => {
  dogs.value = new Map();
  logs.value = new Map();
  latids.value = new Map();
};

onBeforeMount(() => {
  PawprintsEvent.AddEventListener("request-db", SendDatabase);
  PawprintsEvent.AddEventListener("set-themes", SetThemes);
  PawprintsEvent.AddEventListener("sync-data", SyncData);

  PawprintsEvent.AddEventListener("create-dog", UpdateDog);
  PawprintsEvent.AddEventListener("request-dogs", SendDogs);
  PawprintsEvent.AddEventListener("request-dog", SendDog);
  PawprintsEvent.AddEventListener("update-dog", UpdateDog);
  PawprintsEvent.AddEventListener("sync-dogs", SyncDogs);

  PawprintsEvent.AddEventListener("request-logs", SendLogs);
  PawprintsEvent.AddEventListener("update-log", UpdateLog);
  PawprintsEvent.AddEventListener("sync-logs", SyncLogs);

  PawprintsEvent.AddEventListener("reset-data", ResetData);
});

onMounted(() => setTimeout(InitDatabase, 1));

onUnmounted(async () => {
  if (!!db.value) await Close(db.value);
  PawprintsEvent.RemoveEventListener("request-db", SendDatabase);
  PawprintsEvent.RemoveEventListener("set-themes", SetThemes);
  PawprintsEvent.RemoveEventListener("sync-data", SyncData);

  PawprintsEvent.RemoveEventListener("request-dogs", SendDogs);
  PawprintsEvent.RemoveEventListener("request-dog", SendDog);
  PawprintsEvent.RemoveEventListener("update-dog", UpdateDog);
  PawprintsEvent.RemoveEventListener("sync-dogs", SyncDogs);

  PawprintsEvent.RemoveEventListener("request-logs", SendLogs);
  PawprintsEvent.RemoveEventListener("update-log", UpdateLog);
  PawprintsEvent.RemoveEventListener("sync-logs", SyncLogs);

  PawprintsEvent.RemoveEventListener("reset-data", ResetData);
});
</script>

<script lang="ts">
export default {
  name: "App",
};
</script>

<style scoped></style>
