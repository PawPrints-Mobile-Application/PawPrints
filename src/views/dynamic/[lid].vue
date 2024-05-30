<template>
  <LayoutPage>
    <LayoutHeader
      :returnTarget="'/dogs/' + dog?.pid!"
    >
      <section class="header">
        <TextHeading :value="state.isEditing ? 'Editing Log' : 'Log Preview'" />
        <Avatar type="dog" :value="dog?.breed" :color="dog?.color" />
      </section>
    </LayoutHeader>
    <main>
        
    </main>
  </LayoutPage>
</template>
<script setup lang="ts">
import {
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  watch,
  Ref,
} from "vue";
import { useRoute } from "vue-router";
import { LayoutHeader, LayoutPage } from "../../layout";
import { DatabaseMounter, PawprintsEvent } from "../../utils";
import { Props as PropsLAD } from "../../server/models/LogAddressingData";
import { Props as PropsDog } from "../../server/models/Dogs";
import { GetLATID } from "../../server/models/Logs";
import { Avatar, TextHeading } from "../../components";

const route = useRoute();
const params = ref(route.params);
const pid = ref(params.value.pid.toString());

const state = reactive({
  isEditing: false,
});

const dog: Ref<PropsDog | undefined> = ref();
const UpdateDog = (value: PropsDog) => (dog.value = value);
const RequestDog = () =>
  PawprintsEvent.EventDispatcher("request-dog", pid.value);

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
    RequestDog();
    RequestLogs();
    update.value = false;
  }
);

const ResetData = () => {
  logs.value = new Map();
  latids.value = new Map();
};

onBeforeMount(() => {
  DatabaseMounter.Mount(UpdateDB);
  PawprintsEvent.AddEventListener("set-dog", UpdateDog);
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
  PawprintsEvent.RemoveEventListener("set-dog", UpdateDog);
  PawprintsEvent.RemoveEventListener("update-logs", UpdateLogs);
  PawprintsEvent.RemoveEventListener("create-log", UpdateLog);

  PawprintsEvent.RemoveEventListener("reset-data", ResetData);
});
</script>
<style scoped>
.header {
  width: 100%;
  display: flex;
  gap: 5px;
  justify-content: space-between;
  align-items: center;
  padding-left: 40px;
}

.text-heading {
  color: var(--theme-primary-text);
  font-weight: bold;
}

.avatar {
  width: 60px;
}

main {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>
