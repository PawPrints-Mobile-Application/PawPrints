<template>
  <div class="input-date">
    <InputText
      ref="input"
      type="text"
      :label="!!label ? label : format"
      :id="id"
      :placeholder="format"
      v-model:modelValue="shownValue"
      hideHelper
      :required="required"
      :icon="icon"
      @click="Expand"
      @icon-click="Expand"
      :design="design"
    />
    <Popup v-model:model-value="state.expand" @click="Collapse">
      <template #content="{ reverseValue }">
        <CalendarBox v-model:model-value="value" @click="reverseValue"/>
      </template>
    </Popup>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, onMounted, ref } from "vue";
import {
  calendar as iconExpand,
  calendarClear as iconCollapse,
} from "ionicons/icons";
import Popup from "../Modals/Popup.vue";
import { InputText, CalendarBox } from ".";

const input = ref();
const icon = ref(iconExpand);
const props = defineProps({
  label: String,
  id: {
    type: String,
    required: true,
  },
  required: Boolean,
  format: {
    type: String,
    default: "MM/DD/YYYY",
    validator: (value: string) =>
      ["YYYY", "MM", "DD"]
        .map((form) => value.indexOf(form) !== -1)
        .reduce((acc, value) => acc && value) &&
      ["-", "/"]
        .map((separator) => value.indexOf(separator) !== -1)
        .reduce((acc, value) => acc || value),
  },
  modelValue: {
    type: String,
    required: true,
  },
  modelValid: Boolean,
  design: {
    type: String,
    default: "classic",
    validators: (value: string) =>
      ["classic", "input-only", "label-inline"].includes(value),
  },
  default: String,

  // Actions
  disabled: Boolean,
  hideIcon: Boolean,
  noIcon: Boolean,
});

const values = reactive({
  month: (new Date().getMonth() + 1).toString(),
  date: new Date().getDate().toString(),
  year: new Date().getFullYear().toString(),
});

const shownValue = ref('');
const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    values.year = value.substring(0, 4);
    values.month = value.substring(5,7);
    values.date = value.substring(8,10);
    ReformatValue();

    emit("input", value);
    emit("update:modelValue", value);
  },
});

const ReformatValue = () => {
  shownValue.value = props.format;
  state.format.forEach(segment => {
    let value = (segment === 'MM' ? values.month : (segment === 'DD' ? values.date : values.year));

    shownValue.value = shownValue.value.replace(segment, value);
  })
}

const state = reactive({
  format: ["MM", "DD", "YYYY"],
  separator: "-",
  expand: false,
});

// const dateParts = ["YYYY", "MM", "DD"];
const separators = ["-", "/"];
onMounted(() => {
  separators.forEach((separator) => {
    if (props.format.indexOf(separator) === -1) return;
    state.separator = separator;
  });

  if (!props.default) return;
  value.value = props.default;
});

const Expand = () => {
  state.expand = true;
  input.value.SetIcon(iconCollapse);
};

const Collapse = () => {
  state.expand = false;
  input.value.SetIcon(iconExpand);
};

const emit = defineEmits(["update:modelValue", "focus", "blur", "input"]);
</script>

<style scoped>
.input-date,
.input-text {
  width: 100%;
}
</style>
