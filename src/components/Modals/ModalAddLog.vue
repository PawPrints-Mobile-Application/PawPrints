<template>
  <LayoutModal
    ref="modal"
    :isOpen="isOpen"
    title="Add Log"
    @submit="Submit"
    @clear="ClearForm"
    @discard="Discard"
    :disable-submit="disabled"
    close-on-submit
    :canDismiss="!isOpen"
    justify="flex-start"
  >
    <template #header>
      <InputSegment :options="logSegments" v-model="logSegment" show="both" />
    </template>
    <InputDynamicWrapped label="Title" :placeholder="GetTitle()" />
    <InputDynamicWrapped
      type="dropdown"
      :options="GetRecordTypeOptions()"
      v-model="form.recordType"
      label="Record Type"
      :hideInput="isRecord()"
      :count="6"
    />
    <InputDynamicWrapped label="Record Value" placeholder="Record Value">
      <InputChoice
        v-show="isRecord()"
        :options="GetRecordUnitOptions()"
        v-model="form.recordUnits"
      />
    </InputDynamicWrapped>
    <InputTextareaWrapped v-model="form.note" label="Note" />
  </LayoutModal>
</template>

<script setup lang="ts">
import { reactive, computed, ref, onMounted, watch } from "vue";
import { LayoutModal } from "../../layout";
import {
  InputSegment,
  InputDynamicWrapped,
  InputChoice,
  InputTextareaWrapped,
} from "../Forms";
import { SegmentOption } from "../../utils";
import {
  documents as recordIcon,
  calendar as scheduleIcon,
} from "ionicons/icons";
import { Add } from "../../server/models/Logs";
import { SeedGenerator, GetUID } from "../../utils";

const GetTitle = () => (form.recordType === "" ? "Title" : form.recordType);

const isRecord = () => logSegment.value.label === logSegments[0].label;

const GetRecordTypeOptions = () => {
  let temp = ["Vaccine", "Medicine", "Symptoms", "Activity"];
  if (isRecord()) temp = temp.concat(["Weight", "Temperature"]);
  return temp;
};

const GetRecordUnitOptions = () => {
  if (!isRecord()) return new Array<string>();
  if (form.recordType === "Weight") return ["kg", "lb"];
  else if (form.recordType === "Temperature") return ["°C", "°F"];
  return new Array<string>();
};

const logSegments = [
  new SegmentOption("Record", recordIcon),
  new SegmentOption("Schedule", scheduleIcon),
];
const _logSegment = ref(logSegments[0]);
const logSegment = computed({
  get() {
    return _logSegment.value;
  },
  set(value) {
    _logSegment.value = value;
    form.recordType = GetRecordTypeOptions()[0];
  },
});

const form = reactive({
  title: "",
  recordType: "",
  recordValue: 0,
  recordUnits: "kg",
  DTStart: new Date(),
  DTEnd: new Date(),
  note: "",
});

watch(
  () => form.recordType,
  () => {
    if (isRecord()) form.recordUnits = GetRecordUnitOptions()[0];
  }
);

const disabled = computed(() => [form.title].includes(""));

const Discard = () => {
  emit("discard");
  ClearForm();
};

const ClearForm = () => {
  form.title = "";
  form.recordType = "";
  form.recordValue = 0;
  form.recordUnits = "kg";
  form.DTStart = new Date();
  form.DTEnd = new Date();
  form.note = "";
};

const Submit = () => {
  const lid = SeedGenerator().toString();
  Add(
    {
      lid: lid,
      title: form.title,
      recordType: form.recordType,
      recordValue: form.recordValue,
      recordUnits: form.recordUnits,
      DTStart: form.DTStart,
      DTEnd: form.DTEnd,
      note: form.note,
    },
    GetUID()
  ).then(() => {
    emit("submit", lid);
    Discard();
  });
};

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["submit", "discard"]);

onMounted(() => {
  form.recordType = GetRecordTypeOptions()[0];
});
</script>

<style scoped>
.avatar {
  --size: 100px;
  --image-scale: 90%;
}
</style>
