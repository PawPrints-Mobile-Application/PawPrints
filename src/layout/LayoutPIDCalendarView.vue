<template>
  <section class="pid-calendar-view">
    <header>
      <ButtonBack @click="MoveMonth(-1)" />
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
      <ButtonNext @click="MoveMonth(1)" />
    </header>
    <div class="days">
      <TextParagraph
        class="day"
        v-for="day of Calendar.daysShort"
        :value="day"
      />
    </div>
    <footer class="dates">
      <div
        class="date-wrapper"
        :class="{ active: isSelected(date) }"
        v-for="(date, i) of calendar.cells"
        :style="{ gridColumnStart: i === 0 ? calendar.dayStart : 'auto' }"
        @click="emit('dateClick')"
      >
        <TextSmall class="date" :value="date.toString()" />
        <section class="logs">
          <IonIcon
            v-for="lid of GetLIDs(date).slice(0, iconLimit)"
            class="log"
            :class="[GetLog(lid)!.type]"
            :icon="ObjectToMap(Enums.Category).get(GetLog(lid)!.category).icon"
          />
        </section>
        <TextSmall
          class="extra"
          v-show="!!GetExtra(date)"
          :value="GetExtra(date).toString()"
        />
      </div>
    </footer>
  </section>
</template>
<script setup lang="ts">
import { IonIcon } from "@ionic/vue";
import {
  ButtonBack,
  ButtonNext,
  InputDropdown,
  TextParagraph,
  TextSmall,
} from "../components";
import { Calendar, ObjectToMap } from "../utils";
import { PropType, computed, onMounted, reactive } from "vue";
import { Enums, Props as PropsLAD } from "../server/models/LogAddressingData";
import { GetLATID } from "../server/models/Logs";

const props = defineProps({
  modelValue: Date,
  latids: Object as PropType<Map<string, string[]>>,
  logs: Object as PropType<Map<string, PropsLAD>>,
  pid: String,
});

const GetLog = (lid: string) => props.logs!.get(lid);

const GetLIDs = (date: number) => {
  const latid = GetLATID(
    new Date(year.value, month.value, date, 0, 0, 0),
    props.pid!
  );
  const temp = props.latids!.get(latid);
  if (!temp) return [];
  return temp;
};

const currentDate = new Date();
const isSelected = (i: number) =>
  i === currentDate.getDate() &&
  month.value === currentDate.getMonth() &&
  year.value === currentDate.getFullYear();

const iconLimit = 4;
const GetExtra = (date: number) => {
  const lids = GetLIDs(date);
  if (!lids) return 0;
  return Math.max(0, lids.length - iconLimit);
};

const month = computed(() => props.modelValue!.getMonth());
const year = computed(() => props.modelValue!.getFullYear());

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

const calendar = reactive({
  cells: new Array<number>(),
  dayStart: 1,
  years: GetYears(),
});

const MoveMonth = (increment: 1 | -1) => {
  const tempMonth = (month.value + increment + 12) % 12;
  const tempYear =
    year.value + ([-1, 12].includes(month.value + increment) ? increment : 0);
  CellsRecalculate(tempYear, tempMonth);
};
const SetMonth = (value: number) => CellsRecalculate(year.value, value);
const SetYear = (value: number) => CellsRecalculate(value, month.value);

const emit = defineEmits(["update:modelValue", "select", "dateClick"]);

onMounted(() => {
  CellsRecalculate(year.value, month.value);
});
</script>
<style scoped>
.pid-calendar-view {
  width: 100%;
  height: min-content;
  border-radius: 10px;
  padding-left: 10px;
  padding-bottom: 10px;
  padding-right: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

header {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--theme-secondary-text);
}

.button {
  background-color: var(--theme-primary-background);
  color: var(--theme-primary-text);
}

header > .forms {
  --text-align: center;
  --font-weight: bold;
}

.input-dropdown {
  --background: var(--theme-primary-background);
  --color: var(--theme-primary-text);
}

.month {
  width: 100px;
}

.year {
  width: 70px;
}

.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
  text-align: center;
  font-weight: bold;
  min-height: 30px;
  align-items: center;
  color: var(--theme-primary-text);
}

.dates {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  width: 100%;
  text-align: center;
  align-items: center;
}

.date-wrapper {
  width: 100%;
  height: 65px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 5px 2px;
  background-color: var(--theme-secondary-background);
}

.date {
  color: var(--theme-secondary-text);
}

.logs {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
}

.log {
  font-size: 15px;
  color: var(--theme-secondary-text);
}

.Record {
  color: var(--theme-tertiary-background);
}

.extra {
  border-radius: 10px;
  width: 100%;
  background-color: var(--theme-tertiary-background);
  color: var(--theme-primary-background);
}

.active {
  outline: 3px solid var(--theme-tertiary-background);
  > .date {
    font-weight: bold;
  }
}
</style>
