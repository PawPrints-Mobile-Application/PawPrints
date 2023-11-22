<template>
  <ButtonModal
    ref="modal"
    :trigger="trigger"
    title="Logs"
    @submit="Submit"
    @clear="ClearForm"
    @dismiss="ClearForm"
    :max="pages.length"
    v-model:page="page"
    :disable-next="disabler[page - 1]"
    close-on-submit
    justify="flex-start"
  >
    <template #button><ButtonAddLog /></template>

    <InputSegment :options="activitySegments" v-model="state.activity" />
    <section class="specifics-wrapper" v-show="isEvent">
      <InputSegmentIcon
        :icons="eventSegments"
        v-model="state.event"
        @select="
          (value) => {
            form.type = EventSegmentToText(value);
          }
        "
      />
      <div>
        <TextSubheading>Type: </TextSubheading>
        <TextSubheading v-if="state.event !== eventSegments[3]">{{
          EventSegmentToText(state.event)
        }}</TextSubheading>
        <InputBox v-else v-model:value="eventTypeOthers" placeholder="Others" />
      </div>
    </section>

    <InputDynamicWrapped type="text" :label="`${state.activity} Title`" v-model:value="form.title" />
    <!-- <InputDate label="Start Date" :value="form.DTStart.toLocaleDateString()" @change="(value) => form.DTStart = new Date(value)"/> -->
    <InputDynamicWrapped type="text" :label="`${state.activity} Details`" v-model:value="form.details" />
  </ButtonModal>
</template>

<script setup lang="ts">
import {
  bandage as vaccine,
  eyedrop as medicine,
  fastFood as food,
  ellipsisHorizontal as others,
} from "ionicons/icons";
import { reactive, ref, computed } from "vue";
import { ButtonModal, ButtonAddLog } from "../Buttons";
import { InputSegment, InputSegmentIcon, InputBox, InputDynamicWrapped } from "../Forms";
import { TextSubheading } from "../Texts/";

const props = defineProps({
  trigger: {
    type: String,
    required: true,
  },
  date: Date,
});

import { SeedGenerator } from "../../utils";
import { register1 } from "../../views/_templates/index";
import { register2 } from "../../views/_templates/index";
import { Add as AddNote } from "../../server/models/Notes";
import { Add as AddEvent } from "../../server/models/Events";
import { Get as GetDog, Add as EditDog } from "../../server/models/Dogs";

const activitySegments = ["Note", "Event"];

const eventSegments = [vaccine, medicine, food, others];
const eventTypes = ["Vaccines", "Medicines", "Foods", "Others"];
const eventTypeOthers = ref("");
const EventSegmentToText = (eventSegment: string) =>
  eventTypes[eventSegments.indexOf(eventSegment)];

const state = reactive({
  activity: activitySegments[0],
  event: eventSegments[0],
});
const isEvent = computed(() => state.activity === activitySegments[1]);

const form = reactive({
  id: "",
  title: "",
  details: "",
  dogs: [],
  DTStart: !props.date ? new Date() : props.date,
  DTEnd: !props.date ? new Date() : props.date,
  type: "",
});

const pages = [register1, register2];
const page = ref(1);
const disabler = ref([true, true]);

const ClearForm = () => {
  console.log("Clearing...");
  disabler.value = [true, true];
};

const Submit = () => {

};
// Add(
//   {
//     pid: SeedGenerator().toString(),
//     name: form.name,
//     birthday: form.birthday,
//     breed: form.breed,
//     color: form.color,
//     inoutdoor: form.inoutdoors,
//     fixing: form.fixing,
//     events: [],
//     notes: [],
//   },
//   localStorage.getItem("authEmail")! === "Guest"
//     ? undefined
//     : localStorage.getItem("authID")!
// ).then(() => emit("submit"));

const emit = defineEmits(["submit"]);
</script>

<style scoped>
.pet-avatar {
  --max-size: 100px;
}

.specifics-wrapper {
  max-height: 90px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  transition: all 200ms ease-out;

  > div {
    align-items: center;
    width: 100%;
    display: flex;
    gap: 10px;
    height: 40px;

    .input-box {
      --background-color: var(--ion-color-primary-shade);
    }
  }
}

.input-segment {
  --item-flex: 1 0 0;
}
</style>
