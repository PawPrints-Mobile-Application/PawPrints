<template>
  <section class="pid-list-view">
    <header>
      <InputDynamic
        class="list-view-month"
        type="dropdown"
        :options="Calendar.monthsShort"
        v-model="calendar.dropdownMonth"
        :count="12"
        hideInput
        hideIcon
      />
      <InputDynamic
        class="list-view-year"
        type="dropdown"
        :options="Calendar.GetYears(151)"
        v-model="calendar.dropdownYear"
        :count="12"
        hideInput
        hideIcon
      />
    </header>
    <div class="content">
      <CardLog v-for="{ logs, date } in datedLogs" :logs="logs" :date="date" />
    </div>
  </section>
</template>
<script setup lang="ts">
import { reactive, ref, Ref } from "vue";
import { InputDynamic } from "../components/Forms";
import { Calendar, LocalTime } from "../utils";
import { Props } from "../server/models/Logs";
import { CardLog } from "../components/Cards";

type DatedLog = {
  date: Date;
  logs: Props[];
};

const datedLogs: Ref<DatedLog[]> = ref([
  {
    date: new Date(),
    logs: [
      {
        lid: "123131",
        type: "record",
        title: "Record",
        recordType: "Weight",
        recordValue: 22,
        recordUnits: "kg",
        DStart: new Date(),
        TStart: new LocalTime(230),
        DEnd: new Date(),
        TEnd: new LocalTime(230),
        note: "",
      },
      {
        lid: "465135435",
        type: "record",
        title: "The quick brown fox jumps over the lazy dog ",
        recordType: "Temp",
        recordValue: 52,
        recordUnits: "°C",
        DStart: new Date(),
        TStart: new LocalTime(1450),
        DEnd: new Date(),
        TEnd: new LocalTime(1450),
        note: "",
      },
    ],
  },
  {
    date: new Date(2023, 11, 3),
    logs: [
      {
        lid: "123131",
        type: "record",
        title: "Injection",
        recordType: "Vaccine",
        recordValue: "8-in-1",
        DStart: new Date(),
        TStart: new LocalTime(230),
        DEnd: new Date(),
        TEnd: new LocalTime(230),
        note: "",
      },
      {
        lid: "465135435",
        type: "schedule",
        title: "Grooming",
        recordType: "Activity",
        recordValue: "Grooming",
        recordUnits: "°C",
        DStart: new Date(),
        TStart: new LocalTime(1150),
        DEnd: new Date(),
        TEnd: new LocalTime(1650),
        note: "",
      },
    ],
  },
  {
    date: new Date(2023, 11, 15),
    logs: [
      {
        lid: "123131",
        type: "record",
        title: "Vomitting vomitting vomitting",
        recordType: "Symptoms",
        recordValue: "Vomitting vomitting vomitting",
        DStart: new Date(),
        TStart: new LocalTime(230),
        DEnd: new Date(),
        TEnd: new LocalTime(230),
        note: "",
      },
      {
        lid: "465135435",
        type: "record",
        title: "record",
        recordType: "Temp",
        recordValue: 52,
        recordUnits: "°C",
        DStart: new Date(),
        TStart: new LocalTime(1450),
        DEnd: new Date(),
        TEnd: new LocalTime(1450),
        note: "",
      },
    ],
  },
]);
const calendar = reactive({
  month: 1,
  year: 1,
  days: 1,
  dropdownMonth: Calendar.monthsShort[new Date().getMonth() - 1],
  dropdownYear: new Date().getFullYear().toString(),
});
</script>
<style scoped>
.pid-list-view {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
}

header {
  display: flex;
  gap: 10px;
  width: 100%;
  justify-content: flex-start;
}
.input-dynamic {
  flex: none;
  width: min-content;
}
.list-view-month {
  --input-background: var(--theme-quadratic-background);
  --input-text: var(--theme-quadratic-text);
  font-weight: 500;
  padding: 2px;
}
.list-view-year {
  --input-background: var(--theme-quadratic-background);
  --input-text: var(--theme-quadratic-text);
  font-weight: 500;
  padding: 2px;
}

.content {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  gap: 5px;
}
</style>
