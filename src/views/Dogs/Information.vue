<template>
  <LayoutPage
    justify="flex-start"
    @on-scroll-top="() => (state.hideCard = false)"
    @off-scroll-top="() => (state.hideCard = true)"
  >
    <template #header>
      <header>
        <ButtonBack
          type="icon"
          label="Back to Dogs List"
          @click="() => ionRouter.back()"
        />
        <TextHeading>Dog Information</TextHeading>
      </header>
    </template>
    <DogCard :dog="dog" />
    <InputDynamicWrapped
      label="Name"
      :placeholder="dog?.name"
      v-model="form.name"
    />
    <InputDynamicWrapped
      type="date"
      label="Birthday"
      :placeholder="dog?.birthday"
      v-model="form.birthday"
    />
    <ButtonText id="delete-dog" label="Delete Dog" state="danger" />
    <IonActionSheet
      trigger="delete-dog"
      header="Are you sure you want to delete your dog?"
      sub-header="Or mark them as deceased?"
      :buttons="actionSheetButtons"
      @didDismiss="(event) => ClickDeleteDog(event)"
    />
  </LayoutPage>
</template>
<script setup lang="ts">
import { LayoutPage } from "../../layout";
import { TextHeading } from "../../components/Texts";
import { InputDynamicWrapped } from "../../components/Forms";
import { ButtonText } from "../../components/Buttons";
import { Remove } from "../../server/models/Dogs";
import { GetUID, CustomEvent as CEvent } from "../../utils";

import { useRoute } from "vue-router";
import { ref, reactive, Ref } from "vue";
import { DogCard } from "../../components/Cards";
import { onIonViewDidEnter, useIonRouter, IonActionSheet } from "@ionic/vue";
import { ButtonBack } from "../../components/Buttons";
import { ModalAddLog } from "../../components/Modals";
import { Get, Props } from "../../server/models/Dogs";
import { InputSegment, InputSegmentIcon } from "../../components/Forms";
import { NoteCardPreview, EventCardPreview } from "../../components/Cards";
import {
  documents as logView,
  calendar as calendarView,
  barChart as analysisView,
} from "ionicons/icons";
const ionRouter = useIonRouter();

const route = useRoute();
const params = ref(route.params);
const pid = ref();
const dog: Ref<Props | undefined> = ref();

const mainSegments = [logView, calendarView, analysisView];
const logsSegments = ["Notes", "Events"];
const state = reactive({
  hideCard: false,
  mainSegment: mainSegments[0],
  logsSegment: logsSegments[0],
});

const form = reactive({
  name: "",
  birthday: "",
  breed: "",
  color: "",
  inoutdoor: "",
  fixing: "",
  events: new Array<string>(),
  notes: new Array<string>(),
});

const ClickDeleteDog = (event: CustomEvent) => {
  if (!event.detail) return;
  console.log(event.detail.data.action);
  if (event.detail.data.action === "delete")
    Remove(dog.value!.pid, GetUID()).then(() => {
      CEvent.EventDispatcher("reload", "dogs");
      setTimeout(() => {
        ionRouter.navigate("/dogs", "forward", "replace");
      }, 500);
    });
};

const actionSheetButtons = [
  {
    text: "Delete",
    role: "destructive",
    data: {
      action: "delete",
    },
  },
  {
    text: "Deceased",
    data: {
      action: "deceased",
    },
  },
  {
    text: "Cancel",
    role: "cancel",
    data: {
      action: "cancel",
    },
  },
];

onIonViewDidEnter(() => {
  if (typeof params.value.pid === "string") pid.value = params.value.pid;
  else pid.value = params.value.pid.join("");

  Get(pid.value).then((value: Props) => {
    dog.value = value;
    form.name = value.name;
    form.birthday = value.birthday;
    form.breed = value.breed;
    form.color = value.color;
    form.inoutdoor = value.inoutdoor;
    form.fixing = value.fixing;
    form.events = value.events;
    form.notes = value.notes;
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
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  margin-block: 10px;

  > .button-back {
    min-width: 40px;
  }

  > .text-heading {
    width: 100%;
  }
}

.button-text {
  max-height: 50px;
  width: 100%;
}
</style>
