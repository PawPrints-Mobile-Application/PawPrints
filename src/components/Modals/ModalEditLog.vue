<template>
  <LayoutModal
    ref="modal"
    :isOpen="isOpen"
    title="Edit Log"
    close-on-submit
    @submit="Submit"
    @clear="ClearForm"
    @discard="Discard"
    :canDismiss="!isOpen"
    justify="flex-start"
    :disable-submit="disableSave"
    :disable-clear="disableClear"
    button-submit-text="Save"
    :disable-footer="disableEdit"
  >
    <template #header>
      <section class="header">
        <TextHeading>{{ disableEdit ? "Preview" : "Edit" }} Log</TextHeading>
        <ButtonLock v-model="disableEdit" @click="ClearForm" />
      </section>
    </template>
    <section class="content">
      <header>
        <IonIcon :icon="new Enums.Record().get(props.log?.recordType!).icon" />
        <TextHeading>{{ props.log?.recordType! }}</TextHeading>
      </header>
      <InputDynamicWrapped
        label="Record Title"
        :freeze="disableEdit"
        v-model="form.title"
        hideIcon
        hideValidator
      />
      <div class="record-row record-value">
        <InputLabel value="Record Value" />
        <div>
          <InputDynamicWrapped
            :type="hasUnits() ? 'number' : 'text'"
            placeholder="Record Value"
            :freeze="disableEdit"
            hideIcon
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
      <div class="record-row record-time">
        <InputLabel value="Record Value" />
        <div>
          <InputDynamicWrapped
            class="time"
            v-model="form.TStart"
            :freeze="disableEdit"
            type="time"
            hideValidator
            hideIcon
          />
          <InputDynamicWrapped
            class="time"
            v-model="form.TStart"
            :freeze="disableEdit"
            type="time"
            hideValidator
            hideIcon
          />
        </div>
      </div>
      <InputTextareaWrapped
        v-model="form.note"
        label="Note (Optional)"
        :freeze="disableEdit"
      />
    </section>
  </LayoutModal>
</template>

<script setup lang="ts">
import { reactive, watch, ref, PropType, computed } from "vue";
import { IonIcon } from "@ionic/vue";
import { LayoutModal } from "../../layout";
import {
  InputDynamicWrapped,
  InputChoice,
  InputTextareaWrapped,
  InputLabel,
} from "../Forms";
import { LocalTime } from "../../utils";
import { Enums, Props } from "../../server/models/Logs";
import { AddLogs } from "../../server/models/LogAddressingTable";
import { GetUID, ObjectToMap } from "../../utils";
import { ButtonLock } from "../Buttons";
import { TextHeading } from "../Texts";

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  log: Object as PropType<Props>,
});

const form = reactive({
  title: "",
  recordValue: "",
  recordUnits: "",
  TStart: "",
  TEnd: "",
  note: "",
});

const defaultValues = reactive({
  title: "",
  recordValue: "",
  recordUnits: "",
  TStart: "",
  TEnd: "",
  note: "",
});

const disableSave = computed(() => isBlank() || disableClear.value);

const isBlank = () => {
  let temp = false;
  ObjectToMap(form).forEach((value, key) => {
    if (!["recordUnits", "note"].includes(key)) temp ||= value === "";
  });
  return temp;
};

const disableClear = computed(() => {
  let temp = true;
  const defVal = ObjectToMap(defaultValues);
  ObjectToMap(form).forEach(
    (value, key) => (temp &&= value === defVal.get(key))
  );
  return temp;
});

const hasUnits = () => new Enums.Record().hasUnits(props.log?.recordType!);
const GetRecordUnitOptions = () =>
  new Enums.Record().getUnits(props.log?.recordType!, [""]);

const disableEdit = ref(true);

const Discard = () => {
  emit("discard");
  ClearForm();
};

const ClearForm = () => {
  console.log("Clearing...");
  form.title = defaultValues.title;
  form.recordValue = defaultValues.recordValue;
  form.recordUnits = defaultValues.recordUnits;
  form.TStart = defaultValues.TStart;
  form.TEnd = defaultValues.TEnd;
  form.note = defaultValues.note;
};

const Submit = () => {
  AddLogs(
    {
      lid: props.log?.lid!,
      pid: props.log?.pid!,
      type: props.log?.type!,
      title: form.title,
      recordType: props.log?.recordType!,
      recordValue: form.recordValue,
      recordUnits: form.recordUnits,
      TStart: new LocalTime(form.TStart),
      TEnd: new LocalTime(form.TEnd),
      DStart: props.log?.DStart!,
      DEnd: props.log?.DEnd!,
      note: form.note,
    },
    GetUID()
  ).then(() => {
    emit("submit", props.log!.pid);
    Discard();
  });
};

const emit = defineEmits(["submit", "discard"]);

watch(
  () => props.log,
  () => {
    defaultValues.title = props.log?.title!;
    defaultValues.recordValue = props.log?.recordValue!;
    defaultValues.recordUnits = props.log?.recordUnits!;
    defaultValues.TStart = props.log?.TStart?.toString()!;
    defaultValues.TEnd = props.log?.TEnd?.toString()!;
    defaultValues.note = props.log?.note!;
    ClearForm();
  }
);
</script>

<style scoped>
.header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
  width: 100%;
  height: 100%;
}

.content {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  opacity: 0.7;
  font-size: var(--fs0);
}

.record-row {
  display: flex;
  flex-direction: column;

  > div {
    display: flex;
    gap: 6px;
  }
}

.input-textarea-wrapped {
  height: 200px;
}
</style>
