<template>
  <LayoutModal
    ref="modal"
    :isOpen="isOpen"
    title="Activity Log"
    @submit="Submit"
    @clear="ClearForm"
    @dismiss="Dismiss"
    :max="pages.length"
    v-model:page="page"
    :disable-next="disabler[page - 1]"
    close-on-submit
    :can-dismiss="canDismiss"
  >
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

    <InputDynamicWrapped
      type="text"
      :label="`${state.activity} Title`"
      v-model:value="form.title"
    />
    <!-- <InputDate label="Start Date" :value="form.DTStart.toLocaleDateString()" @change="(value) => form.DTStart = new Date(value)"/> -->
    <InputDynamicWrapped
      type="text"
      :label="`${state.activity} Details`"
      v-model:value="form.details"
    />
  </LayoutModal>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { LayoutModal } from "../../layout";

import { Add } from "../../server/models/Dogs";
import { SeedGenerator, GetUID } from "../../utils";
import { register1, register2 } from "../../views/_templates";

const canDismiss = ref(true);
const SetDismiss = (value: boolean) => {
  if (value) {
    setTimeout(() => {
      canDismiss.value = value;
    }, 10);
  } else canDismiss.value = value;
};

const form = reactive({
  name: "",
  birthday: "",
  breed: "",
  color: "#FFD80A",
  inoutdoors: "",
  fixing: "",
});

const pages = [register1, register2];
const page = ref(1);
const disabler = ref([true, true]);

const Dismiss = () => {
  emit("dismiss");
  ClearForm();
};

const ClearForm = () => {
  console.log("Clearing...");
  disabler.value = [true, true];
  form.name = "";
  form.birthday = "";
  form.breed = "";
  form.color = "#FFD80A";
  form.inoutdoors = "";
  form.fixing = "";
};

const Submit = () => {
  const pid = SeedGenerator().toString();
  Add(
    {
      pid: pid,
      name: form.name,
      birthday: form.birthday,
      breed: form.breed,
      color: form.color,
      inoutdoor: form.inoutdoors,
      fixing: form.fixing,
      events: [],
      notes: [],
    },
    GetUID()
  ).then(() => {
    canDismiss.value = true;
    emit("submit", pid);
    Dismiss();
  });
};

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["submit", "dismiss"]);
</script>

<style scoped>
.avatar {
  --size: 100px;
}
</style>
