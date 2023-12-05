<template>
  <LayoutPage
    justify="flex-start"
    @on-scroll-top="() => (state.hideCard = false)"
    @off-scroll-top="() => (state.hideCard = true)"
  >
    <template #header>
      <header>
        <ButtonBack type="icon" @click="() => ionRouter.back()" />
        <TextHeading>{{ dog?.name }}</TextHeading>
        <section class="edit-profile" @click="EditProfile">
          <Avatar type="dog" :src="dog?.breed" :color="dog?.color" />
          <TextSmall>Edit Profile</TextSmall>
        </section>
      </header>
    </template>
    <InputSegment
      class="logs-segment"
      :options="viewSegments"
      v-model="state.viewSegment"
      show="both"
      @select="CustomEvent.EventDispatcher('reload-display')"
    />
    <section
      class="view view-calendar"
      v-show="!!dog"
      v-if="state.viewSegment.label === viewSegments[0].label"
    >
      <LayoutPIDCalendarView
        v-model:model-month="calendar.month"
        v-model:model-year="calendar.year"
        :logs="calendar.logs"
      />
    </section>
    <section class="view view-list" v-show="!!dog" v-else>
      <LayoutPIDListView
        v-model:model-month="calendar.month"
        v-model:model-year="calendar.year"
        :logs="calendar.logs"
      />
    </section>
    <ModalEditDog
      :isOpen="modalOpen.dog"
      @submit="ReloadPage"
      @discard="CloseModalLog"
      :dog="dog"
    />
    <ModalAddLog
      :isOpen="modalOpen.logAdd"
      :pid="pid"
      :date="modalOpen.logDate"
      @submit="ReloadLogs"
      @discard="CloseModalLog"
    />
    <ModalEditLog
      :isOpen="modalOpen.logEdit"
      :pid="pid"
      :date="modalOpen.logDate"
      @submit="ReloadLogs"
      @discard="CloseModalLog"
    />
  </LayoutPage>
</template>
<script setup lang="ts">
import {
  LayoutPage,
  LayoutPIDListView,
  LayoutPIDCalendarView,
} from "../../layout";
import { Avatar } from "../../components/Avatars";
import { ButtonBack } from "../../components/Buttons";
import { TextHeading, TextSmall } from "../../components/Texts";
import {
  ModalAddLog,
  ModalEditDog,
  ModalEditLog,
} from "../../components/Modals";
import { Get as GetDog, Props } from "../../server/models/Dogs";
import { InputSegment } from "../../components/Forms";
import { CustomEvent, SegmentOption } from "../../utils";
import { ref, reactive, Ref } from "vue";
import {
  onIonViewDidEnter,
  onIonViewWillEnter,
  useIonRouter,
} from "@ionic/vue";
import {
  documents as listView,
  calendar as calendarView,
} from "ionicons/icons";
import { useRoute } from "vue-router";
import { Get as GetLog, Props as PropsLog } from "../../server/models/Logs";
import { Get as GetLAT } from "../../server/models/LogAddressingTable";
const ionRouter = useIonRouter();

const route = useRoute();
const params = ref(route.params);
const pid = ref();
const dog: Ref<Props | undefined> = ref();

const viewSegments = [
  new SegmentOption("Calendar View", calendarView),
  new SegmentOption("List View", listView),
];
const state = reactive({
  hideCard: false,
  viewSegment: viewSegments[0],
});

const EditProfile = () => {
  modalOpen.dog = true;
  console.log(true);
};

const modalOpen = reactive({
  dog: false,
  logAdd: false,
  logEdit: false,
  logDate: new Date(),
  logPID: '',
});
const CloseModalLog = () => {
  modalOpen.dog = false;
  modalOpen.logAdd = false;
  modalOpen.logEdit = false;
};
const ReloadPage = async () =>
  GetDog(pid.value).then((value: Props) => {
    dog.value = value;
  });

const calendar = reactive({
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
  logs: new Map<number, PropsLog[]>(),
});

const ReloadLogs = async () => {
  calendar.logs = new Map<number, PropsLog[]>();
  const startDate = new Date(calendar.year, calendar.month, 1);
  const endDate = new Date(calendar.year, calendar.month + 1, 0);
  for (
    let date = startDate;
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    let temp = new Array<PropsLog>();
    const props = await GetLAT(date);
    if (!!props) {
      for (let lid of props.logs) {
        const propsLog = await GetLog(lid.toString(), date);
        temp.push(propsLog);
      }
    }
    temp.sort((a, b) => {
      const TStart = a.TStart.value - b.TStart.value;
      if (TStart !== 0) return TStart;
      return a.TEnd.value - b.TEnd.value;
    });
    calendar.logs.set(date.getDate(), temp);
  }
};

onIonViewWillEnter(async () => {
  if (typeof params.value.pid === "string") pid.value = params.value.pid;
  else pid.value = params.value.pid.join("");
  await ReloadPage()
    .then(ReloadLogs)
    .then(() => CustomEvent.EventDispatcher("reload-display"));
});

onIonViewDidEnter(() => {
  CustomEvent.EventListener("modal-log-add", (value: Date) => {
    modalOpen.logDate = !value ? new Date() : value;
    modalOpen.logAdd = true;
  });
  CustomEvent.EventListener("reload-logs", ReloadLogs);
  CustomEvent.EventListener("modal-log-edit", (value: string) => {
    modalOpen.logPID = !value ? '' : value;
    modalOpen.logEdit = true;
  });
});
</script>

<script lang="ts">
export default {
  name: "Profile",
};
</script>

<style scoped>
header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-block: 10px;
  min-height: 70;

  > .button-back {
    max-width: 20px;
  }

  > .text-heading {
    width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
  }

  > .edit-profile {
    width: 120px;
    height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--theme-button-middle-text);
    > .avatar {
      --size: 50px;
      --image-scale: 80%;
    }

    > .text-small {
      position: absolute;
      padding: 2px;
      background-color: var(--theme-tertiary-background);
      border-radius: 6px;
      font-size: 10px;
      transform: translateY(27px);
    }
  }
}

.input-mainSegments {
  margin-block: 10px;
}

.logs {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.logs-segment {
  --item-flex: 1 0 0;
}

.view {
  width: 100%;
}
</style>
