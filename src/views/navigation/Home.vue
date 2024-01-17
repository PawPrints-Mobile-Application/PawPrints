<template>
  <LayoutPage>
    <LayoutHeader :label="`Henlo, ${UserInfo.GetUsername()}`" />
    <main>
      <section class="date-container">
        <TextTitle :value="date" />
        <CardTrivia />
      </section>
      <section class="schedule">
        <Refresher @refresh="Refresh" />
        <TextSubheading value="Today's Schedule" class="bold" />
        <section class="dog-log" v-for="dog in Array.from(dogs.values())">
          <aside class="identity">
            <Avatar type="dog" :value="dog.breed" :color="dog.color" />
            <TextParagraph :value="dog.name" class="bold" />
          </aside>
          <aside class="logs">
            <CardLog v-for="log of GetLogs(dog.pid)" :log="log" />
          </aside>
        </section>
      </section>
    </main>
  </LayoutPage>
</template>
<script setup lang="ts">
import { computed, onBeforeMount, onMounted, ref, Ref } from "vue";
import { LayoutPage, LayoutHeader } from "../../layout";
import {
  Calendar,
  DatabaseMounter,
  PawprintsEvent,
  UserInfo,
} from "../../utils";
import {
  TextTitle,
  CardTrivia,
  TextSubheading,
  Avatar,
  TextParagraph,
  CardLog,
  Refresher,
} from "../../components";
import { Props as PropsDog } from "../../server/models/Dogs";
import { Props as PropsLAD } from "../../server/models/LogAddressingData";
import { GetLATID } from "../../server/models/Logs";

const date = computed(
  () => `${Calendar.monthsShort[new Date().getMonth()]} ${new Date().getDate()}`
);

const Refresh = (event: any) => {
  PawprintsEvent.EventDispatcher("sync-data");
  setTimeout(() => event.target.complete(), 500);
};

const GetLogs = (pid: string) => {
  let lids = latids.value.get(GetLATID(new Date(), pid))!;
  return lids.map((lid) => logs.value.get(lid)!);
};

// -------------------------- DOGS --------------------------
const dogs: Ref<Map<string, PropsDog>> = ref(new Map());
const UpdateDogs = (values: Map<string, PropsDog>) => values.forEach(UpdateDog);
const UpdateDog = (value: PropsDog) => dogs.value.set(value.pid, value);
const SyncDogs = () => PawprintsEvent.EventDispatcher("request-dogs");

// -------------------------- LOGS --------------------------
const latids: Ref<Map<string, string[]>> = ref(new Map());
const logs: Ref<Map<string, PropsLAD>> = ref(new Map());
const UpdateLogs = (values: {
  latids: Map<string, string[]>;
  logs: Map<string, PropsLAD>;
}) => {
  logs.value = values.logs;
  Array.from(values.latids.entries()).forEach((value) =>
    latids.value.set(value[0], value[1])
  );
};
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
const SyncLogs = () => PawprintsEvent.EventDispatcher("request-logs");

const db = ref();
const UpdateDB = (value: any) => {
  if (!value) return;
  db.value = value;
  setTimeout(SyncDogs, 10);
  setTimeout(SyncLogs, 20);
};

const ResetData = () => {
  dogs.value = new Map();
  logs.value = new Map();
  latids.value = new Map();
};

onBeforeMount(() => {
  DatabaseMounter.Mount(UpdateDB);
  PawprintsEvent.AddEventListener("update-logs", UpdateLogs);
  PawprintsEvent.AddEventListener("update-log", UpdateLog);

  PawprintsEvent.AddEventListener("update-dogs", UpdateDogs);
  PawprintsEvent.AddEventListener("update-dog", UpdateDog);

  PawprintsEvent.AddEventListener("reset-data", ResetData);
});

onMounted(() => {
  DatabaseMounter.Request();
});

onBeforeMount(() => {
  DatabaseMounter.Unmount(UpdateDB);
  PawprintsEvent.RemoveEventListener("update-logs", UpdateLogs);
  PawprintsEvent.RemoveEventListener("update-log", UpdateLog);

  PawprintsEvent.RemoveEventListener("update-dogs", UpdateDogs);
  PawprintsEvent.RemoveEventListener("update-dog", UpdateDog);

  PawprintsEvent.RemoveEventListener("reset-data", ResetData);
});
</script>
<style scoped>
main {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.date-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.text-title {
  margin: auto;
}

.schedule {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.dog-log {
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: var(--theme-secondary-dark-background);
  border-radius: 10px;
  padding: 5px;
  gap: 5px;
}

.identity {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
}

.logs {
  flex: 1 0 0;
}

.avatar {
  width: 70px;
}
</style>
