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
    <section class="add-log-form">
      <InputDynamicWrapped
        label="Title"
        :placeholder="GetTitle()"
        hideValidator
        v-model="form.title"
      />
      <InputDynamicWrapped
        type="dropdown"
        :options="GetRecordTypeOptions()"
        v-model="form.recordType"
        label="Record Type"
        hideInput
        :count="7"
        hideValidator
      />
      <div class="record-value" v-show="isRecord()">
        <InputLabel value="Record Value" />
        <div>
          <InputDynamicWrapped
            :type="hasUnits() ? 'number' : 'text'"
            placeholder="Record Value"
            hideValidator
            v-model="form.recordValue"
          />
          <InputChoice
            v-show="hasUnits()"
            :options="GetRecordUnitOptions()"
            v-model="form.recordUnits"
          />
        </div>
      </div>
      <div class="date-time">
        <InputLabel :value="`Record${isRecord() ? ' ' : ' Start '}Date`" />
        <div>
          <InputDynamicWrapped
            v-model="form.DStart"
            type="date"
            hideValidator
            hide-icon
          />
          <InputDynamicWrapped
            class="time"
            v-model="form.TStart"
            type="time"
            hideValidator
            hideIcon
          />
        </div>
      </div>
      <div class="date-time" v-show="!isRecord()">
        <InputLabel value="Record End Date" />
        <div>
          <InputDynamicWrapped
            v-model="form.DEnd"
            type="date"
            hideValidator
            hideIcon
          />
          <InputDynamicWrapped
            class="time"
            v-model="form.TEnd"
            type="time"
            hideValidator
            hideIcon
          />
        </div>
      </div>
      <InputTextareaWrapped v-model="form.note" label="Note (Optional)" />
    </section>
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
  InputLabel,
} from "../Forms";
import {
  LocalDate,
  LocalTime,
  SegmentOption,
  TwoCharactersFormat,
} from "../../utils";
import {
  documents as recordIcon,
  calendar as scheduleIcon,
} from "ionicons/icons";
import { Add, Enums } from "../../server/models/Logs";
import { SeedGenerator, GetUID } from "../../utils";

const GetTitle = () => (form.recordType === "" ? "Title" : form.recordType);

const isRecord = () => logSegment.value.label === logSegments[0].label;
const hasUnits = () => new Enums.Record().hasUnits(form.recordType);

const GetRecordTypeOptions = () =>
  new Enums.Record().getRecordTypes(!isRecord()).map((value) => value.name);

const GetRecordUnitOptions = () =>
  new Enums.Record().getUnits(form.recordType, []);

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
    form.type = value.label!;
  },
});

const GetCurrentTime = () =>
  new LocalTime(
    `${TwoCharactersFormat(new Date().getHours())}${TwoCharactersFormat(
      new Date().getMinutes()
    )}`
  ).toString();

const form = reactive({
  title: "",
  type: logSegments[0].label!,
  recordType: GetRecordTypeOptions()[0],
  recordValue: "",
  recordUnits: "kg",
  DStart: new LocalDate(new Date()).toLocaleDateString("YYYY/MM/DD", "-"),
  TStart: GetCurrentTime(),
  DEnd: new LocalDate(new Date()).toLocaleDateString("YYYY/MM/DD", "-"),
  TEnd: GetCurrentTime(),
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
  form.type = logSegments[0].label!;
  form.recordType = GetRecordTypeOptions()[0];
  form.recordValue = "";
  form.recordUnits = "kg";
  form.DStart = new LocalDate(new Date()).toLocaleDateString("YYYY/MM/DD", "-");
  form.TStart = GetCurrentTime();
  form.DEnd = new LocalDate(new Date()).toLocaleDateString("YYYY/MM/DD", "-");
  form.TEnd = GetCurrentTime();
  form.note = "";
};

const Submit = () => {
  const lid = SeedGenerator().toString();
  Add(
    {
      lid: lid,
      type: form.type,
      title: form.title,
      recordType: form.recordType,
      recordValue: form.recordValue,
      recordUnits: form.recordUnits,
      DStart: new Date(form.DStart),
      TStart: new LocalTime(form.TStart),
      DEnd: new Date(form.DEnd),
      TEnd: new LocalTime(form.TEnd),
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
.add-log-form {
  width: 100%;
}

.avatar {
  --size: 100px;
  --image-scale: 90%;
}
.add-log-form {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.record-value {
  display: flex;
  flex-direction: column;
}
.record-value div {
  display: flex;
  gap: 6px;
}

.date-time {
  width: 100%;
}

.date-time div {
  display: flex;
  gap: 6px;
}

.time {
  min-width: 115px;
  max-width: 115px;
}
</style>
