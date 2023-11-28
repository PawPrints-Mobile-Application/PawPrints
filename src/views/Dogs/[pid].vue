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
          <Avatar type="dog" :src="dog?.breed.value" :color="dog?.color" />
          <TextSmall>Edit Profile</TextSmall>
        </section>
      </header>
    </template>
    <InputSegment
      class="logs-segment"
      :options="viewSegments"
      v-model="state.viewSegment"
      show="both"
    />
    <section
      class="logs"
      v-show="!!dog"
      v-if="state.viewSegment === viewSegments[0]"
    ></section>
    <ModalAddLog
      :isOpen="modalOpen.log"
      @submit="SubmitModal"
      @discard="CloseModalLog"
    />
    <ModalEditDog
      :isOpen="modalOpen.dog"
      @submit="SubmitModal"
      @discard="CloseModalLog"
      :dog="dog"
    />
  </LayoutPage>
</template>
<script setup lang="ts">
import { LayoutPage } from "../../layout";
import { ButtonBack } from "../../components/Buttons";
import { TextHeading, TextSmall } from "../../components/Texts";
import { Avatar } from "../../components/Avatars";
import { ModalAddLog, ModalEditDog } from "../../components/Modals";
import { Get, Props } from "../../server/models/Dogs";
import { InputSegment } from "../../components/Forms";
import { CustomEvent, SegmentOption } from "../../utils";
import { ref, reactive, Ref } from "vue";
import { onIonViewDidEnter, useIonRouter } from "@ionic/vue";
import { documents as logView, calendar as calendarView } from "ionicons/icons";
import { useRoute } from "vue-router";
const ionRouter = useIonRouter();

const route = useRoute();
const params = ref(route.params);
const pid = ref();
const dog: Ref<Props | undefined> = ref();

const viewSegments = [
  new SegmentOption("Calendar View", calendarView),
  new SegmentOption("Log View", logView),
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
  log: false,
});
const CloseModalLog = () => {
  modalOpen.dog = false;
  modalOpen.log = false;
};
const SubmitModal = () => {
  CustomEvent.EventDispatcher("reload-page-information");
};

onIonViewDidEnter(() => {
  CustomEvent.EventListener("modal-log-add", () => (modalOpen.log = true));
  if (typeof params.value.pid === "string") pid.value = params.value.pid;
  else pid.value = params.value.pid.join("");

  Get(pid.value).then((value: Props) => {
    dog.value = value;
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

  > .button-back {
    min-width: 40px;
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
    > .avatar {
      --size: 50px;
      --image-scale: 80%;
    }

    > .text-small {
      position: absolute;
      padding: 2px;
      background-color: var(--theme-tertiary);
      color: var(--theme-primary);
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
</style>
