<template>
  <LayoutPage>
    <header>
      <ButtonBack @click="Navigate" />
      <TextHeading :value="dog?.props.name" />
      <Avatar type="dog" :value="dog?.props.breed" :color="dog?.props.color" />
    </header>
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
  </LayoutPage>
</template>
<script setup lang="ts">
import { LayoutPage } from "../../layout";
import { Ref, onBeforeMount, onMounted, onUnmounted, ref } from "vue";
import { useRoute } from "vue-router";
import { PawprintsEvent, SegmentOption } from "../../utils";
import {
  Avatar,
  ButtonBack,
  InputSegment,
  TextHeading,
  Refresher,
} from "../../components";
import {
  documents as listView,
  calendar as calendarView,
} from "ionicons/icons";
import { LayoutPIDCalendarView } from "../../layout";
import { Props as PropsDog } from "../../server/models/Dogs";
import { Props as PropsLAD } from "../../server/models/LogAddressingData";
import { useIonRouter } from "@ionic/vue";
const ionRouter = useIonRouter();
const Navigate = () => ionRouter.navigate("/dogs", "forward", "replace");

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

const SetData = (dogData: DogData) => (dog.value = dogData);
const RequestData = () =>
  PawprintsEvent.EventDispatcher("request-dog-data", params.value.pid);

onBeforeMount(() => {
  PawprintsEvent.AddEventListener("response-dog-data", SetData);
  PawprintsEvent.AddEventListener("ready-data", RequestData);
});

onMounted(() => {
  if (!dog.value) RequestData();
});

onUnmounted(() => {
  PawprintsEvent.RemoveEventListener("response-dog-data", SetData);
  PawprintsEvent.RemoveEventListener("ready-data", RequestData);
});
</script>

<style scoped>
header {
  width: 100%;
  display: flex;
  gap: 5px;
  justify-content: space-between;
  align-items: center;
}

main {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.avatar {
  width: 60px;
}

.text-heading {
  color: var(--theme-primary-text);
}

.input-segment {
  --padding: 10px;
}
</style>
