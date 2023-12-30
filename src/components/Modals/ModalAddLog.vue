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
      <div>
        <TextSubheading>Title</TextSubheading>
        <InputText :placeholder="GetTitle()" v-model="form.title" />
      </div>
      <div>
        <TextSubheading>Record Type</TextSubheading>
        <InputDropdown
          :options="GetRecordTypeOptions()"
          v-model="form.recordType"
          hideInput
          :count="7"
          hideValidator
          @change="SetRecordUnits"
        />
      </div>
      <div class="record-value">
        <TextSubheading>Record Value</TextSubheading>
        <div>
          <InputText placeholder="Record Value" v-model="form.recordValue" />
          <InputChoice
            v-show="hasUnits()"
            :options="GetRecordUnitOptions()"
            v-model="form.recordUnits"
          />
        </div>
      </div>
      <div class="date-time">
        <TextSubheading :value="`Record${isRecord() ? ' ' : ' Start '}Date`" />
        <div>
          <InputDate v-model="form.DStart" hideIcon display="number" />
          <InputTime v-model="form.TStart" hideIcon />
        </div>
      </div>
      <div class="date-time" v-show="!isRecord()">
        <TextSubheading value="Record End Date" />
        <div>
          <InputDate v-model="form.DEnd" hideIcon display="number" />
          <InputTime v-model="form.TEnd" hideIcon />
        </div>
      </div>
      <div>
        <TextSubheading value="Note (Optional)" />
        <InputTextarea v-model="form.note" />
      </div>
    </section>
  </LayoutModal>
</template>

<script setup lang="ts">
import { reactive, computed, ref, onMounted, PropType } from "vue";
import { LayoutModal } from "../../layout";
import {
  InputDate,
  InputSegment,
  InputTime,
  InputTextarea,
  InputDropdown,
  InputText,
  InputChoice,
} from "../Forms";
import { TextSubheading } from "../Texts";
import { LocalTime, SegmentOption, TwoCharactersFormat } from "../../utils";
import {
  documents as recordIcon,
  calendar as scheduleIcon,
} from "ionicons/icons";
import { Enums } from "../../server/models/Logs";
import { AddLogs } from "../../server/models/LogAddressingTable";
import { Add as EditDog, Props } from "../../server/models/Dogs";
import { SeedGenerator, GetUID, CustomEvent } from "../../utils";

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  dog: Object as PropType<Props>,
  date: {
    type: Date,
    default: new Date(),
  },
});

const GetTitle = () => (form.recordType === "" ? "Title" : form.recordType);

const isRecord = () => logSegment.value.label === logSegments[0].label;
const hasUnits = () => new Enums.Record().hasUnits(form.recordType);

const GetRecordTypeOptions = () =>
  new Enums.Record().getRecordTypes(!isRecord()).map((value) => value.name);

const GetRecordUnitOptions = () =>
  new Enums.Record().getUnits(form.recordType, [""]);

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
    SetRecordUnits();
  },
});

const SetRecordUnits = () => {
  if (isRecord()) form.recordUnits = GetRecordUnitOptions()[0];
  else form.recordUnits = "";
};

const GetCurrentTime = () =>
  new LocalTime(
    `${TwoCharactersFormat(new Date().getHours())}${TwoCharactersFormat(
      new Date().getMinutes()
    )}`
  );

const form = reactive({
  title: "",
  type: "",
  recordType: "",
  recordValue: "",
  recordUnits: "",
  DStart: new Date(props.date),
  TStart: GetCurrentTime(),
  DEnd: new Date(props.date),
  TEnd: GetCurrentTime(),
  note: "",
});

const disabled = computed(() =>
  [IdentifyTitle(), form.recordValue].includes("")
);

const Discard = () => {
  emit("discard");
  ClearForm();
};

const ClearForm = () => {
  logSegment.value = logSegments[0];
  form.title = "";
  form.recordValue = "";
  form.DStart = new Date(props.date);
  form.TStart = GetCurrentTime();
  form.DEnd = new Date(props.date);
  form.TEnd = GetCurrentTime();
  form.note = "";
};

const IdentifyTitle = () => {
  if (form.recordType === "Others") return form.title;
  return form.title.trim() === "" ? form.recordType : form.title;
};

const Submit = () => {
  const lid = SeedGenerator().toString();
  props.dog!.logs.push(lid);
  AddLogs(
    {
      lid: lid,
      pid: props.dog?.pid!,
      type: form.type,
      title: IdentifyTitle(),
      recordType: form.recordType,
      recordValue: form.recordValue,
      recordUnits: form.recordUnits,
      TStart: form.TStart,
      TEnd: form.TEnd,
      DStart: new Date(form.DStart),
      DEnd: new Date(form.DEnd),
      note: form.note,
    },
    GetUID()
  )
    .then(() => EditDog(props.dog!, GetUID()))
    .then(() => {
      CustomEvent.EventDispatcher("reload-logs");
      emit("submit", lid);
      Discard();
    });
};

const emit = defineEmits(["submit", "discard"]);

onMounted(() => {
  CustomEvent.EventListener("modal-log-add", () => setTimeout(ClearForm, 1));
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
