<template>
  <LayoutPage>
    <header>
      <ButtonBack />
      <TextHeading :value="dog?.name" />
      <Avatar type="dog" :value="dog?.breed" :color="dog?.color" />
    </header>
    <main>
      <IonRefresher slot="fixed" @ionRefresh="Refresher($event)"
        ><IonRefresherContent
      /></IonRefresher>
      <InputSegment :options="views" v-model="view" show="both" />
      <section
        class="view view-data"
        v-show="!!dog"
        v-if="view === views[1].label"
      >
        <LayoutPIDCalendarView
          v-model:model-month="data.month"
          v-model:model-year="data.year"
          :logs="data.logs"
        />
      </section>
      <section class="view view-list" v-show="!!dog" v-else>
        <LayoutPIDListView
          v-model:model-month="data.month"
          v-model:model-year="data.year"
          :logs="data.logs"
        />
      </section>
    </main>
  </LayoutPage>
</template>
<script setup lang="ts">
import { IonRefresher, IonRefresherContent } from "@ionic/vue";
import { LayoutPage } from "../../layout";
import { Ref, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { PawprintsEvent, SegmentOption } from "../../utils";
import {
  Avatar,
  ButtonBack,
  InputSegment,
  TextHeading,
} from "../../components";
import { Props } from "../../server/models/Dogs";
import {
  documents as listView,
  calendar as calendarView,
} from "ionicons/icons";

const route = useRoute();
const params = ref(route.params);

const Refresher = (_: any) => PawprintsEvent.EventDispatcher("reload-dogs");

const dog: Ref<Props> = ref({
  pid: params.value.toString(),
  name: "Name",
  birthday: new Date(),
  breed: "",
  color: "",
  logs: [],
});

const views = [
  new SegmentOption("Calendar View", calendarView),
  new SegmentOption("List View", listView),
];
const view = ref(views[0]);

onMounted(() => {});
</script>

<style scoped>
header {
  width: 100%;
  display: flex;
  gap: 5px;
  justify-content: space-between;
  align-items: center;
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
