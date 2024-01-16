<template>
  <Modal
    trigger="modal-add-log"
    :disableBack="state.processing"
    @dismiss="Clear"
  >
    <template #header><TextHeading class="bold" value="ADD LOG" /> </template>

    <section class="form" :class="{ hide: state.processing }">
      <InputSegment :options="viewOptions" v-model="type" show="both" />
      <InputWrapper label="Title">
        <InputText placeholder="Title" v-model="form.title" />
      </InputWrapper>
      <InputWrapper label="Category">
        <InputDropdown
          :options="categories"
          trigger="dropdown-categories"
          v-model="form.category"
          closeOnSelect
        />
      </InputWrapper>
      <InputWrapper
        label="Record Value"
        v-show="form.type.label === viewOptions[0].label"
      >
        <section class="flex-horizontal">
          <InputText placeholder="Value" v-model="form.value" />
          <InputChoice
            v-show="!!GetUnits()"
            :options="GetUnits()"
            v-model="form.units"
          />
        </section>
      </InputWrapper>
      <InputWrapper
        :label="
          form.type.label === viewOptions[0].label
            ? 'Record Date'
            : 'Record Start Date'
        "
      >
        <section class="flex-horizontal">
          <InputDate v-model="form.DStart" trigger="date-start" hideIcon />
          <InputTime v-model="form.TStart" trigger="time-start" hideIcon />
        </section>
      </InputWrapper>
      <InputWrapper
        label="Record End Date"
        v-show="form.type.label === viewOptions[1].label"
      >
        <section class="flex-horizontal">
          <InputDate v-model="form.DEnd" trigger="date-end" hideIcon />
          <InputTime v-model="form.TEnd" trigger="time-end" hideIcon />
        </section>
      </InputWrapper>
      <InputWrapper label="Note">
        <InputTextarea v-model="form.note" />
      </InputWrapper>

      <div class="buttons">
        <ButtonDanger value="Clear" @click="Clear" :disabled="disableClear" />
        <ButtonSuccess value="Save" @click="Process" :disabled="disableSave" />
      </div>
    </section>
  </Modal>
</template>
<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import {
  Modal,
  TextHeading,
  InputWrapper,
  InputText,
  InputDropdown,
  ButtonDanger,
  ButtonSuccess,
  InputSegment,
  InputDate,
  InputTime,
  InputTextarea,
  InputChoice,
} from "..";
import {
  SeedGenerator,
  LocalTime,
  SegmentOption,
  ObjectToMap,
  UserInfo,
  PawprintsEvent,
} from "../../utils";
import { SetBatch } from "../../server/models/Logs";
import { Enums, Props } from "../../server/models/LogAddressingData";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import {
  documents as recordIcon,
  calendar as scheduleIcon,
} from "ionicons/icons";

const props = defineProps({
  db: SQLiteDBConnection,
  pid: String,
});

const viewOptions = [
  new SegmentOption("Record", recordIcon),
  new SegmentOption("Schedule", scheduleIcon),
];
const GetCategories = () => {
  const names = new Array<string>();
  const categories = new Array();
  ObjectToMap(Enums.Category).forEach((category, name) => {
    if (form.type.label === viewOptions[1].label && !category.canSchedule)
      return;
    names.push(name);
    categories.push(category);
  });
  return {
    names,
    categories,
  };
};
const GetUnits = () => ObjectToMap(Enums.Category).get(form.category).units;

const categories = ref(Array.from(ObjectToMap(Enums.Category).keys()));
const type = computed({
  get() {
    return form.type;
  },
  set(value) {
    form.type = value;
    categories.value = GetCategories().names;
    if (!categories.value.includes(form.category)) {
      form.category = "Others";
    }
  },
});

const defaultValues = {
  type: viewOptions[0],
  title: "",
  category: Enums.Category.Others.name,
  value: "",
  units: "",
  TStart: new LocalTime("12:00 AM"),
  TEnd: new LocalTime("12:00 AM"),
  note: "",
  DStart: new Date(),
  DEnd: new Date(),
};

const form = reactive({
  type: defaultValues.type,
  title: defaultValues.title,
  category: defaultValues.category,
  value: defaultValues.value,
  units: defaultValues.units,
  TStart: defaultValues.TStart,
  TEnd: defaultValues.TEnd,
  note: defaultValues.note,
  DStart: defaultValues.DStart,
  DEnd: defaultValues.DEnd,
});

const Clear = () => {
  form.type = defaultValues.type;
  form.title = defaultValues.title;
  form.category = defaultValues.category;
  form.value = defaultValues.value;
  form.units = defaultValues.units;
  form.TStart = defaultValues.TStart;
  form.TEnd = defaultValues.TEnd;
  form.note = defaultValues.note;
  form.DStart = defaultValues.DStart;
  form.DEnd = defaultValues.DEnd;
};

const state = reactive({
  processingText: "",
  warningText: "",
  processing: false,
});

const animation = reactive({
  showBackground: false,
  showAside: false,
  showFooter: false,
});

const disableClear = computed(
  () =>
    form.type === defaultValues.type &&
    form.title === defaultValues.title &&
    form.category === defaultValues.category &&
    form.value === defaultValues.value &&
    form.units === defaultValues.units &&
    form.TStart === defaultValues.TStart &&
    form.TEnd === defaultValues.TEnd &&
    form.note === defaultValues.note &&
    form.DStart === defaultValues.DStart &&
    form.DEnd === defaultValues.DEnd
);
const disableSave = computed(
  () =>
    [form.title].includes("") ||
    (form.type.label === viewOptions[0].label && form.value === "")
);

const Process = () => {
  state.processing = true;
  state.processingText = "Connecting to server...";
  setTimeout(() => {
    animation.showBackground = true;
    animation.showFooter = true;
  }, 500);
  setTimeout(() => {
    animation.showAside = true;
  }, 1000);
  const lid = SeedGenerator().toString();
  const data: Props = {
    lid: lid,
    type: form.type.label!,
    title: form.title,
    category: form.category,
    value: form.value,
    units: form.units,
    TStart: form.TStart,
    TEnd: form.TEnd,
    note: form.note,
  };
  setTimeout(
    () =>
      SetBatch(
        props.db!,
        data,
        form.DStart,
        form.DEnd,
        props.pid!,
        UserInfo.GetUID()
      ).then(() => {
        state.processing = false;
        PawprintsEvent.EventDispatcher("modal-add-log", "hide");
        emit("success", {propsLAD: data, DStart: form.DStart, DEnd: form.DEnd});
      }),
    1500
  );
};

const emit = defineEmits(["success"]);
</script>
<style scoped>
.form {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.input-segment {
  --flex: 1 0 0;
}

.input-wrapper {
  width: 100%;
}

.flex-horizontal {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 5px;
}

.input-time {
  width: 150px;
}

.buttons {
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 10px;
}

.button {
  flex: 1 0 0;
}
</style>
