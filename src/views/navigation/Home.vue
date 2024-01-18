<template>
  <LayoutPage>
    <LayoutHeader :label="`Henlo, ${UserInfo.GetUsername()}`" />
    <main>
      <section class="date-container">
        <TextTitle :value="date" />
      </section>
      <CardTrivia />
      <section class="schedule">
        <Refresher @refresh="Refresh" />
        <TextSubheading value="Today's History" class="bold" />
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
import {
  computed,
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  ref,
  Ref,
  watch,
} from "vue";
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

const GetLogs = (pid: string) => {
  try {
    let lids = latids.value.get(GetLATID(new Date(), pid))!;
    if (logs.value.size === 0) return [];
    return lids.map((lid) => logs.value.get(lid)!);
  } catch (e) {
    return [];
  }
};

const Refresh = (event: any) => {
  PawprintsEvent.EventDispatcher("sync-dogs");
  PawprintsEvent.EventDispatcher("sync-logs");
  setTimeout(() => event.target.complete(), 500);
};

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
  if (!!logs.value.get(value.log.lid)) return;
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
const RequestLogs = () => PawprintsEvent.EventDispatcher("request-logs");

// -------------------------- DOGS --------------------------
const dogs: Ref<Map<string, PropsDog>> = ref(new Map());

const UpdateDogs = (values: Map<string, PropsDog>) => values.forEach(UpdateDog);
const UpdateDog = (value: PropsDog) => dogs.value.set(value.pid, value);
const RequestDogs = () => PawprintsEvent.EventDispatcher("request-dogs");

const db = ref();
const UpdateDB = (value: any) => {
  if (!value) return;
  db.value = value;
  update.value = true;
};

const update = ref(false);
watch(
  () => !!db.value && update.value,
  () => {
    RequestDogs();
    RequestLogs();
    update.value = false;
  }
);

const ResetData = () => {
  dogs.value = new Map();
};

onBeforeMount(() => {
  DatabaseMounter.Mount(UpdateDB);
  PawprintsEvent.AddEventListener("update-dogs", UpdateDogs);
  PawprintsEvent.AddEventListener("create-dog", UpdateDog);

  PawprintsEvent.AddEventListener("update-logs", UpdateLogs);
  PawprintsEvent.AddEventListener("create-log", UpdateLog);

  PawprintsEvent.AddEventListener("reset-data", ResetData);
});

onMounted(() => {
  if (!db.value) DatabaseMounter.Request();
  else update.value = true;
});

onBeforeUnmount(() => {
  DatabaseMounter.Unmount(UpdateDB);
  PawprintsEvent.RemoveEventListener("update-dogs", UpdateDogs);
  PawprintsEvent.RemoveEventListener("create-dog", UpdateDog);

  PawprintsEvent.RemoveEventListener("update-logs", UpdateLogs);
  PawprintsEvent.RemoveEventListener("create-log", UpdateLog);

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
  padding-top: 50px;
  padding-bottom: 50px;
}

.text-title {
  margin: auto;
}

.schedule {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
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
