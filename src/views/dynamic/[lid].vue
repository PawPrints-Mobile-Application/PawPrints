<template>
  <LayoutPage>
    <LayoutHeader :returnTarget="'/dogs/' + dog?.pid!">
      <section class="header">
        <TextHeading :value="state.isEditing ? 'Editing Log' : 'Log Preview'" />
        <Avatar type="dog" :value="dog?.breed" :color="dog?.color" />
      </section>
    </LayoutHeader>
    <main>
      <section class="top">
        <div class="right">
          <TextSubheading :value="log.category" class="top-texts" />
          <TextSmall :value="log.type" class="top-texts" />
        </div>
        <IonIcon :icon="iconSrc" class="icon" />
      </section>
      <TextHeading :value="log.title" />
      <div class="time">
        <TextParagraph :value="log.TStart.toString()" />
        <TextParagraph value="-" v-show="log.TStart.value != log.TEnd.value" />
        <TextParagraph
          :value="log.TEnd.toString()"
          v-show="log.TStart.value != log.TEnd.value"
        />
      </div>
      <div class="value" v-show="!!log.units && !!log.value">
        <TextSubheading value="Value: " />
        <TextSubheading :value="log.value" />
        <TextSubheading :value="log.units" />
      </div>
      <div class="note heading-text">
        <InputLabel value="Note: " />
        <TextSmall :value="log.note" />
      </div>
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
import { IonIcon } from "@ionic/vue";
import { useRoute } from "vue-router";
import { LayoutHeader, LayoutPage } from "../../layout";
import {
  DatabaseMounter,
  LocalTime,
  PawprintsEvent,
  ObjectToMap,
} from "../../utils";
import {
  Enums,
  Props as PropsLAD,
} from "../../server/models/LogAddressingData";
import { Props as PropsDog } from "../../server/models/Dogs";
import {
  Avatar,
  TextHeading,
  TextParagraph,
  TextSmall,
  TextSubheading,
  InputLabel,
} from "../../components";

const route = useRoute();
const params = ref(route.params);
const pid = ref(params.value.pid.toString());
const lid = ref(params.value.lid.toString());

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
const log: Ref<PropsLAD> = ref({
  lid: "",
  title: "",
  type: "",
  category: "",
  value: "",
  units: "",
  TStart: new LocalTime(0),
  TEnd: new LocalTime(0),
  note: "",
});
const iconSrc: Ref<string> = ref("");
const UpdateLogs = (values: {
  latids: Map<string, string[]>;
  logs: Map<string, PropsLAD>;
}) => {
  logs.value = values.logs;
  Array.from(values.latids.entries()).forEach((value) =>
    latids.value.set(value[0], value[1])
  );
  log.value = getLog();
  console.log(log.value.TStart.toString());
  iconSrc.value = ObjectToMap(Enums.Category).get(log.value.category).icon;
};
// const UpdateLog = (value: {
//   log: PropsLAD;
//   DStart: Date;
//   DEnd: Date;
//   pid: string;
// }) => {
//   if (!!logs.value.get(value.log.lid)) return;
//   const startDate = new Date(
//     value.DStart.getFullYear(),
//     value.DStart.getMonth(),
//     value.DStart.getDate()
//   );
//   const endDtate = new Date(
//     value.DEnd.getFullYear(),
//     value.DEnd.getMonth(),
//     value.DEnd.getDate()
//   );
//   for (
//     let date = startDate;
//     date <= endDtate;
//     date.setDate(date.getDate() + 1)
//   ) {
//     const latid = GetLATID(date, value.pid);
//     logs.value.set(value.log.lid, value.log);
//     let lids = latids.value.get(latid);
//     if (!lids) lids = new Array<string>();
//     lids.push(value.log.lid);
//     latids.value.set(latid, lids);
//   }
// };
const RequestLogs = () => PawprintsEvent.EventDispatcher("request-logs");
const getLog = () => logs.value.get(lid.value)!;

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
  // PawprintsEvent.AddEventListener("create-log", UpdateLog);

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
  // PawprintsEvent.RemoveEventListener("create-log", UpdateLog);

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
  align-items: center;
  gap: 5px;
}

.top {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: var(--theme-secondary-background);
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  margin-bottom: 20px;

  .right {
    width: max-content;
  }
}

.top-texts {
  color: var(--theme-secondary-text);
}

.icon {
  font-size: 25px;
  color: var(--theme-primary-text);
}

.value {
  display: flex;
  width: 100%;
}

.time {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.note {
  width: 100%;
  background-color: var(--theme-secondary-background);
  color: var(--theme-secondary-text);
  border-radius: 10px;
  padding: 10px;

  .text-small {
    margin-top: 10px;
    background-color: var(--theme-primary-background);
    color: var(--theme-primary-text);
    border-radius: 5px;
    padding: 5px;
  }
}

.heading-text {
  color: var(--theme-secondary-text);
}

.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.button-danger {
  width: 100%;
}
</style>
