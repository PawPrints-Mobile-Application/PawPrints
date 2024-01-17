<template>
  <LayoutPage>
    <LayoutHeader returnTarget="/dogs">
      <section class="header">
        <TextHeading :value="dog?.name" />
        <Avatar type="dog" :value="dog?.breed" :color="dog?.color" />
      </section>
    </LayoutHeader>
    <main>
      <Refresher @refresh="Refresh" />
      <InputSegment :options="views" v-model="view" show="both" />
      <section
        class="view view-data"
        v-show="!!dog"
        v-if="view.label === views[0].label"
      >
        <LayoutPIDCalendarView
          v-model="date"
          :latids="latids"
          :logs="logs"
          :pid="pid"
        />
      </section>
      <section class="view view-list" v-show="!!dog" v-else>
        <LayoutPIDListView
          v-model="date"
          :latids="latids"
          :logs="logs"
          :pid="pid"
        />
      </section>
    </main>
    <ModalAddLog :db="db" :pid="pid" />
  </LayoutPage>
</template>
<script setup lang="ts">
import { LayoutPage, LayoutHeader, LayoutPIDListView } from "../../layout";
import { Ref, onBeforeMount, onBeforeUnmount, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { DatabaseMounter, PawprintsEvent, SegmentOption } from "../../utils";
import {
  Avatar,
  InputSegment,
  TextHeading,
  Refresher,
  ModalAddLog,
} from "../../components";
import {
  documents as listView,
  calendar as calendarView,
} from "ionicons/icons";
import { LayoutPIDCalendarView } from "../../layout";
import { Props as PropsLAD } from "../../server/models/LogAddressingData";
import { GetLATID } from "../../server/models/Logs";
import { Props as PropsDog } from "../../server/models/Dogs";

const route = useRoute();
const params = ref(route.params);
const pid = ref(params.value.pid.toString());
const date = ref(new Date());

const views = [
  new SegmentOption("Calendar View", calendarView),
  new SegmentOption("List View", listView),
];
const view = ref(views[0]);

const Refresh = (event: any) => {
  PawprintsEvent.EventDispatcher("sync-logs");
  setTimeout(() => event.target.complete(), 500);
};

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
  setTimeout(RequestDog, 10);
  setTimeout(SyncLogs, 20);
};

const ResetData = () => {
  logs.value = new Map();
  latids.value = new Map();
};

onBeforeMount(() => {
  DatabaseMounter.Mount(UpdateDB);
  PawprintsEvent.AddEventListener("set-dog", UpdateDog);
  PawprintsEvent.AddEventListener("update-logs", UpdateLogs);
  PawprintsEvent.AddEventListener("update-log", UpdateLog);

  PawprintsEvent.AddEventListener("reset-data", ResetData);
});

onMounted(() => {
  DatabaseMounter.Request();
});

onBeforeUnmount(() => {
  DatabaseMounter.Unmount(UpdateDB);
  PawprintsEvent.RemoveEventListener("set-dog", UpdateDog);
  PawprintsEvent.RemoveEventListener("update-logs", UpdateLogs);
  PawprintsEvent.RemoveEventListener("update-log", UpdateLog);

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
}

.avatar {
  width: 60px;
}

main {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-segment {
  --padding: 10px;
}
</style>
