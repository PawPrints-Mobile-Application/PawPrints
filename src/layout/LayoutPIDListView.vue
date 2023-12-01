<template>
  <section class="pid-list-view">
    <header>
      <InputDynamicWrapped
        type="dropdown"
        :options="Calendar.monthsShort"
        v-model="calendar.dropdownMonth"
        :count="12"
        hideInput
        hideIcon
        hideValidator
      />
      <InputDynamicWrapped
        type="dropdown"
        :options="Calendar.GetYears(151)"
        v-model="calendar.dropdownYear"
        :count="12"
        hideInput
        hideIcon
        hideValidator
      />
    </header>
    <div class="content">
      <CardLog v-for="{ logs, date } in datedLogs" :logs="logs" :date="date" />
    </div>
  </section>
</template>
<script setup lang="ts">
import { reactive, ref, Ref } from "vue";
import { InputDynamicWrapped } from "../components/Forms";
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
        title: "record",
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
        title: "dwa awdawdwadas d awda wdaw ",
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
        title: "daw dwad wad",
        recordType: "Weight",
        recordValue: 28,
        recordUnits: "kg",
        DStart: new Date(),
        TStart: new LocalTime(230),
        DEnd: new Date(),
        TEnd: new LocalTime(230),
        note: "",
      },
      {
        lid: "465135435",
        type: "schedule",
        title: "scheddwadadda",
        recordType: "Temp",
        recordValue: 35,
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
    date: new Date(2023, 11,15),
    logs: [
      {
        lid: "123131",
        type: "record",
        title: "record",
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

.input-dynamic-wrapped {
  flex: none;
  width: min-content;
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
