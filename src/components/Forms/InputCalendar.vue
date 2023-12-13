<template>
  <section class="forms input-calendar">
    <header>
      <ButtonBack @click="MoveMonth(-1)" />
      <InputDropdown
        class="month"
        :modelValue="Calendar.months[calendar.month]"
        @update:modelIndex="SetMonth"
        :options="Calendar.months"
        hideIcon
      />
      <InputDropdown
        class="year"
        :modelValue="calendar.year"
        @update:modelValue="SetYear"
        :options="calendar.years"
        hideIcon
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
        v-for="(date, i) of calendar.cells"
        :style="{ gridColumnStart: i === 0 ? calendar.dayStart : 'auto' }"
        @click="SetDate(date)"
      >
        <ion-icon v-show="isSelected(i)" :icon="icon" />
        <TextParagraph class="date" :value="date.toString()" />
      </div>
    </footer>
  </section>
</template>
<script setup lang="ts">
import { reactive, onMounted } from "vue";
import { IonIcon } from "@ionic/vue";
import { paw as icon } from "ionicons/icons";
import { Calendar } from "../../utils";
import { ButtonBack, ButtonNext } from "../Buttons";
import { InputDropdown } from ".";
import { TextParagraph } from "../Texts";

const props = defineProps({
  modelValue: Date,
  disableFuture: Boolean,
  disablePast: Boolean,
  length: {
    type: Number,
    default: 151,
    validator: (value: number) => value % 2 === 1,
  },
});

const isSelected = (i: number) =>
  calendar.date === i + 1 &&
  calendar.month === props.modelValue?.getMonth() &&
  calendar.year === props.modelValue?.getFullYear();

const GetYears = (): number[] => {
  const range = Math.floor(props.length / 2);
  if (!!props.disableFuture && !!props.disablePast) {
    return [new Date().getFullYear()];
  } else if (!!props.disableFuture) {
    return Array.from(
      { length: range + 1 },
      (_, i) => i + new Date().getFullYear() - range
    );
  } else if (!!props.disablePast) {
    return Array.from(
      { length: range + 1 },
      (_, i) => i + new Date().getFullYear()
    );
  }
  return Array.from(
    { length: 2 * range + 1 },
    (_, i) => i + new Date().getFullYear() - range
  );
};

const GetCells = (): number[] =>
  Array.from(
    { length: new Date(calendar.year, calendar.month + 1, 0).getDate() },
    (_, i) => i + 1
  );

const GetDayStart = () =>
  new Date(calendar.year, calendar.month, 1).getDay() + 1;

const CellsRecalculate = () => {
  calendar.cells = GetCells();
  calendar.dayStart = GetDayStart();
};

const calendar = reactive({
  date: 1,
  year: 1,
  month: 1,
  cells: new Array<number>(),
  dayStart: 1,
  years: GetYears(),
});

const MoveMonth = (increment: 1 | -1) => {
  const month = (calendar.month + increment + 12) % 12;
  const year =
    calendar.year +
    ([-1, 12].includes(calendar.month + increment) ? increment : 0);
  console.log(month, year);
  SetMonth(month, false);
  SetYear(year);
};

const SetMonth = (value: number, doRecalculate: boolean = true) => {
  calendar.month = value;
  if (doRecalculate) CellsRecalculate();
};

const SetDate = (value: number) => {
  calendar.date = value;
  const date = new Date(calendar.year, calendar.month, calendar.date);
  emit("update:modelValue", date);
  emit("select", date);
};

const SetYear = (value: number, doRecalculate: boolean = true) => {
  calendar.year = value;
  if (doRecalculate) CellsRecalculate();
};

const emit = defineEmits(["update:modelValue", "select"]);

onMounted(() => {
  if (!props.modelValue) return;
  calendar.date = props.modelValue.getDate();
  calendar.year = props.modelValue.getFullYear();
  calendar.month = props.modelValue.getMonth();
  CellsRecalculate();
});
</script>
<style scoped>
.input-calendar {
  width: 100%;
  height: min-content;
  background-color: var(--theme-secondary-background);
  border-radius: 10px;
  outline: 2px solid var(--theme-black);
  padding: 10px;
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
  background-color: var(--theme-secondary-background);
  color: var(--theme-secondary-text);
}

header > .forms {
  --text-align: center;
  --font-weight: bold;
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
  height: 40px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.date {
  position: absolute;
}

ion-icon {
  position: absolute;
  color: var(--theme-tertiary-background);
  font-size: 50px;
  transform: translateY(-10px);
}
</style>
