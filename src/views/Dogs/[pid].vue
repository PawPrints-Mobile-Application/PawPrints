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
        <InputSegment
          :options="mainSegments"
          v-model:value="state.mainSegment"
        />
      </header>
    </template>
    <DogCard :dog="dog" />
    <section
      class="logs"
      v-show="!!dog"
      v-if="state.mainSegment === mainSegments[0]"
    >
      <ModalAddActivity trigger="add-activity" />
      <InputSegment
        class="logs-segment"
        :options="logsSegments"
        v-model:value="state.logsSegment"
      />
      <NoteCardPreview
        :notes="dog?.notes"
        v-if="state.logsSegment === logsSegments[0]"
      />
      <EventCardPreview :notes="dog?.events" v-else />
    </section>
  </LayoutPage>
</template>
<script setup lang="ts">
import { LayoutPage } from "../../layout";
import { useRoute } from "vue-router";
import { ref, reactive, Ref } from "vue";
import { DogCard } from "../../components/Cards";
import { onIonViewDidEnter, useIonRouter } from "@ionic/vue";
import { ButtonBack } from "../../components/Buttons";
import { ModalAddActivity } from "../../components/Modals";
import { Get, Props } from "../../server/models/Dogs";
import { InputSegment } from "../../components/Forms";
import { NoteCardPreview, EventCardPreview } from "../../components/Cards";
const ionRouter = useIonRouter();

const route = useRoute();
const params = ref(route.params);
const pid = ref();
const dog: Ref<Props | undefined> = ref();

const mainSegments = ["Log View", "Calendar View"];
const logsSegments = ["Notes", "Events"];
const state = reactive({
  hideCard: false,
  mainSegment: mainSegments[0],
  logsSegment: logsSegments[0],
});

onIonViewDidEnter(() => {
  if (typeof params.value.pid === "string") pid.value = params.value.pid;
  else pid.value = params.value.pid.join("");

  Get(pid.value).then((value: Props) => {
    dog.value = value;
    console.log(value.notes);
  });
});
</script>

<script lang="ts">
export default {
  name: "[pid]",
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
