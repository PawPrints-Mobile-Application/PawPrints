<template>
  <LayoutPage>
    <LayoutHeader returnTarget="/dogs">
      <section class="header">
        <TextHeading :value="dog?.props.name" />
        <Avatar
          type="dog"
          :value="dog?.props.breed"
          :color="dog?.props.color"
        />
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
        <LayoutPIDCalendarView v-model="date" :logs="dog?.logs" />
      </section>
      <section class="view view-list" v-show="!!dog" v-else>
        <!-- <LayoutPIDListView
          v-model:model-month="calendar.month"
          v-model:model-year="calendar.year"
          :logs="calendar.logs"
        /> -->
      </section>
    </main>
    <ModalAddLog :db="db" :pid="dog?.props.pid" @success="AddLog" />
  </LayoutPage>
</template>
<script setup lang="ts">
import { LayoutPage, LayoutHeader } from "../../layout";
import { Ref, onBeforeMount, onMounted, onUnmounted, ref } from "vue";
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
import { Props as PropsDog } from "../../server/models/Dogs";
import { Props as PropsLAD } from "../../server/models/LogAddressingData";
import { GetLATID } from "../../server/models/Logs";

const route = useRoute();
const params = ref(route.params);

const Refresh = (event: any) => {
  PawprintsEvent.EventDispatcher("reload-dogs");
  setTimeout(() => event.target.complete(), 500);
};

const date = ref(new Date());

type DogData = {
  props: PropsDog;
  logs: Map<string, Map<string, PropsLAD>>;
};
const dog: Ref<DogData | undefined> = ref();

const views = [
  new SegmentOption("Calendar View", calendarView),
  new SegmentOption("List View", listView),
];
const view = ref(views[0]);

const SetData = (dogData: DogData) => {
  if (!dogData) return;
  dog.value = dogData;
};
const RequestData = () =>
  PawprintsEvent.EventDispatcher("request-dog-data", params.value.pid);
const AddLog = (value: { propsLAD: PropsLAD; date: Date }) => {
  const latid = GetLATID(value.date, dog.value?.props.pid!);
  let logs = dog.value?.logs.get(latid);
  if (!logs) logs = new Map<string, PropsLAD>();
  else logs.set(value.propsLAD.lid, value.propsLAD);
  console.log(dog.value?.logs);
  PawprintsEvent.EventDispatcher("add-to-logs", value);
};

const db = ref();
const UpdateDB = (value: any) => {
  if (!value) return;
  db.value = value;
  setTimeout(() => PawprintsEvent.EventDispatcher("request-dogs"), 1);
};

onBeforeMount(() => {
  PawprintsEvent.AddEventListener("response-dog-data", SetData);
  DatabaseMounter.Mount(UpdateDB, RequestData);
});

onMounted(() => {
  DatabaseMounter.Request();
  if (!dog.value) RequestData();
});

onUnmounted(() => {
  PawprintsEvent.RemoveEventListener("response-dog-data", SetData);
  PawprintsEvent.RemoveEventListener("ready-data", RequestData);
  DatabaseMounter.Unmount(UpdateDB, RequestData);
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
