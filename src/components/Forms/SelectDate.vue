<template>
  <section class="select-date">
    <InputDropdown
      class="month"
      v-model:model-value="values.month"
      id="month"
      design="input-only"
      :options="constants.months"
      no-icon
    />
    <InputDropdown
      class="date"
      v-model:model-value="values.date"
      id="date"
      design="input-only"
      :options="GetArrayDates()"
      no-icon
    />
    <InputDropdown
      class="year"
      v-model:model-value="values.year"
      id="year"
      design="input-only"
      :options="GetYears()"
      no-icon
    />
  </section>
</template>
<script setup lang="ts">
import { onMounted, reactive, watch } from "vue";
import { InputDropdown } from ".";
defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

const values = reactive({
  month: "",
  date: "1",
  year: "2020",
});

const GetMonth = (key: number) => constants.months[key];
const constants = {
  months: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
};
const NumberToString = (value: number) =>
  (value < 10 ? "0" : "") + value.toString();
const GetArrayDates = () =>
  Array.from(
    {
      length: new Date(
        Number(values.year),
        constants.months.indexOf(values.month) + 1,
        0
      ).getDate(),
    },
    (_, i) => NumberToString(i + 1)
  );
const GetYears = () =>
  Array.from({ length: 151 }, (_, i) =>
    (i + new Date().getFullYear() - 70).toString()
  );

onMounted(() => {
  values.month = GetMonth(new Date().getMonth());
  values.year = new Date().getFullYear().toString();
  values.date = new Date().getDate().toString();
});

watch(values, () => emit("update:modelValue", `${values.year}-${NumberToString(constants.months.indexOf(values.month) + 1)}-${values.date}`));

const emit = defineEmits(["update:modelValue"]);
</script>
<style scoped>
.select-date {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
}

.month {
  width: 100px;
}

.date {
  width: 35px;
}

.year {
  width: 50px;
}
</style>
