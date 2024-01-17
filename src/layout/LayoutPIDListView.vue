<template>
  <section class="pid-list-view">
    <section class="month-year">
      <InputDropdown
        class="month"
        :modelValue="Calendar.months[month]"
        @update:modelIndex="SetMonth"
        :options="Calendar.months"
        hideIcon
        trigger="popup-month-calendar-view"
        closeOnSelect
      />
      <InputDropdown
        class="year"
        :modelValue="year.toString()"
        @update:modelValue="(value) => SetYear(Number(value))"
        :options="calendar.years"
        hideIcon
        trigger="popup-year-calendar-view"
        closeOnSelect
      />
    </section>
    <section class="logs">
      <section
        class="daily-log"
        v-for="date of GetCells(year, month)"
        :class="{ active: isSelected(date) }"
      >
        <section class="date-day">
          <TextSubheading>{{ date }}</TextSubheading>
          <TextSubheading>{{
            Calendar.days[new Date(year, month, date).getDay()]
          }}</TextSubheading>
        </section>
        <CardLog v-for="lid of GetLIDs(date)" :log="GetLog(lid)" />
      </section>
    </section>
  </section>
</template>
<script setup lang="ts">
import { PropType, computed, reactive } from "vue";
import { Props as PropsLAD } from "../server/models/LogAddressingData";
import { Calendar } from "../utils";
import { CardLog, InputDropdown, TextSubheading } from "../components";
import { GetLATID } from "../server/models/Logs";

const props = defineProps({
  modelValue: Date,
  latids: Object as PropType<Map<string, string[]>>,
  logs: Object as PropType<Map<string, PropsLAD>>,
  pid: String,
});

const GetLog = (lid: string) => props.logs?.get(lid);

const GetLIDs = (date: number) => {
  const latid = GetLATID(
    new Date(year.value, month.value, date, 0, 0, 0),
    props.pid!
  );
  return props.latids?.get(latid);
};

const currentDate = new Date();
const isSelected = (i: number) =>
  i === currentDate.getDate() &&
  month.value === currentDate.getMonth() &&
  year.value === currentDate.getFullYear();

const GetYears = (): string[] => Calendar.GetYears(75).map((i) => i.toString());

const GetCells = (year: number, month: number): number[] =>
  Array.from(
    { length: new Date(year, month + 1, 0).getDate() },
    (_, i) => i + 1
  );
const GetDayStart = (year: number, month: number) =>
  new Date(year, month, 1).getDay() + 1;

const CellsRecalculate = (year: number, month: number) => {
  calendar.cells = GetCells(year, month);
  calendar.dayStart = GetDayStart(year, month);
  const temp = new Date(year, month, props.modelValue!.getDate());
  emit("update:modelValue", temp);
};

const month = computed(() => props.modelValue!.getMonth());
const year = computed(() => props.modelValue!.getFullYear());

const calendar = reactive({
  cells: new Array<number>(),
  dayStart: 1,
  years: GetYears(),
});
const SetMonth = (value: number) => CellsRecalculate(year.value, value);
const SetYear = (value: number) => CellsRecalculate(value, month.value);

const emit = defineEmits(["update:modelValue", "select"]);
</script>
<style scoped>
.pid-list-view {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.month-year {
  display: flex;
  gap: 10px;
}

.input-dropdown {
  --text-align: center;
  width: 100px;
  --background: var(--theme-secondary-background);
  --color: var(--theme-secondary-text);
}

.logs {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.daily-log {
  background-color: var(--theme-secondary-background);
  padding: 10px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.active {
  outline: 3px solid var(--theme-tertiary-background);
}

.date-day {
  display: flex;
  gap: 10px;
  color: var(--theme-secondary-text);
}

.card-log {
  padding-left: 26px;
}
</style>
