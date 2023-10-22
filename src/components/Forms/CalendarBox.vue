<template>
  <section class="calendar-box">
    <header id="calendar-nav">
      <BackButton class="button" @click="() => MoveMonth(-1)" />
        <div class="labels" :class="{'focused' : calendar.focused}">
      <select
        id="calendar-month"
        name="calendar-month"
        class="calendar-label"
        v-model="calendar.month"
        @change="RefreshCalendar"
        @focus="() => calendar.focused = true"
        @blur="() => calendar.focused = false"
      >
        <option v-for="(month, id) in constants.months" :value="id">
          {{ month }}
        </option>
      </select>
      <input
        type="number"
        class="calendar-label"
        id="calendar-year"
        v-model="calendar.year"
        @input="RefreshCalendar"
        @focus="() => calendar.focused = true"
        @blur="() => calendar.focused = false"
      />
        </div>
      <ForwardButton class="button" @click="() => MoveMonth(1)" />
    </header>

    <table id="calendar-grid">
      <tr id="row-header">
        <th class="cell cell-header" v-for="day in constants.days">
          {{ day }}
        </th>
      </tr>
      <tr
        class="row-days"
        v-for="week in Array(Math.ceil(calendar.cells.length / 7)).keys()"
      >
        <td
          :id="`cell-${BaseSevenToDecimal(week, day)}`"
          class="cell cell-body"
          v-for="day in Array(7).keys()"
          :class="{ selected: IsCellSelected(week, day) }"
          @click="() => SetDate(BaseSevenToDecimal(week, day))"
        >
          <div>
            <span class="calendar-number">{{
              calendar.cells[BaseSevenToDecimal(week, day)]
            }}</span>
            <ion-icon
              v-if="IsCellSelected(week, day)"
              id="calendar-mark"
              :icon="calendarMark"
            />
          </div>
        </td>
      </tr>
    </table>
  </section>
</template>

<script setup lang="ts">
import { BackButton, ForwardButton } from "../Buttons";
import { paw as calendarMark } from "ionicons/icons";
import { reactive } from "vue";
import { IonIcon } from "@ionic/vue";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
    validator: (value: string) => value.match(/^\d{4}-\d{2}-\d{2}$/) !== null,
  },
});
const emit = defineEmits(["update:modelValue"]);

// FORMATTER
const TwoCharactersFormat = (value: number) =>
  value < 10 ? `0${value}` : value;
const stringToArray = (value: string) => {
  let temp = value;
  if (temp === '') {return [new Date().getFullYear(), new Date().getMonth(), new Date().getDate()] }
  return value.split("-").map((el: string) => parseInt(el));
};
const arrayToString = (year: number, month: number, date: number) =>
  `${year}-${TwoCharactersFormat(month)}-${TwoCharactersFormat(date)}`;
const BaseSevenToDecimal = (week: number, day: number) => week * 7 + (day % 7);

// CONSTANTS
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
  days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  getArrayDates: (month: number, year: number) =>
    Array(new Date(year, month, 1).getDay())
      .fill("-")
      .map((item) => (item === "-" ? "" : item))
      .concat(
        Array.from(
          { length: new Date(year, month + 1, 0).getDate() },
          (_, i) => i + 1
        )
      ),
};
const getCalendarCells = (month: number, year: number) =>
  constants.getArrayDates(month, year);

// VALUES
const form = reactive({
  date: stringToArray(props.modelValue)[2],
  month: stringToArray(props.modelValue)[1],
  year: stringToArray(props.modelValue)[0],
});
const calendar = reactive({
  month: form.month - 1,
  year: form.year,
  cells: getCalendarCells(form.month - 1, form.year),
  focused: false
});

// Calendar Methods
const MoveMonth = (value: 1 | -1) => {
  let month = calendar.month + value;
  let year = calendar.year;
  if (0 > month || month > 11) {
    month = (month + 12) % 12;
    year += value;
  }
  calendar.month = month;
  calendar.year = year;
  RefreshCalendar();
};

const RefreshCalendar = () => {
  calendar.cells = getCalendarCells(calendar.month, calendar.year);
};

const IsCellSelected = (week: number, day: number) => {
  const cell = BaseSevenToDecimal(week, day);
  return (
    calendar.cells[cell] !== "" &&
    calendar.month === form.month - 1 &&
    calendar.year === form.year &&
    form.date === calendar.cells[cell]
  );
};

// Form Changes
const SetDate = (cell: number) => {
  form.year = calendar.year;
  form.month = calendar.month + 1;
  form.date = calendar.cells[cell];
  const temp = arrayToString(form.year, form.month, form.date);
  console.log(temp);
  emit("update:modelValue", temp);
};
</script>

<style scoped>
.calendar-box {
  width: 100%;
  min-height: 320px;
  padding: 20px 10px;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
  background-color: var(--ion-color-secondary);
  border-radius: 15px;
  z-index: 4;
}

/* NAVIGATION */
#calendar-nav {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid var(--ion-color-black);
  height: 50px;
  padding-bottom: 15px;
}

.labels {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--ion-color-secondary);
  border-radius: 8px;
  padding: 5px;
}

.calendar-label {
  color: var(--ion-color-black);
  font-size: var(--fs3);
  font-weight: 700;
  border: none;
  background: none;
}

.calendar-label:focus {
  outline: none;
}

.focused {
  background-color: var(--ion-color-secondary-shade);
}

#calendar-month {
  z-index: 1;
  width: 110px;
  appearance: none;
  -webkit-appearance: none;
  text-align: left;
}

#calendar-year {
  z-index: 0;
  width: 50px;
  text-align: right;
  transform: translateY(2px);
}

#calendar-month option {
  background-color: var(--ion-color-secondary);
}

#calendar-month option:checked,
#calendar-month option:hover {
  background-color: var(--ion-color-secondary-shade);
}

.button {
  background-color: var(--ion-color-black);
  --size: var(--fs2);
  --border-radius: 8px;
  margin: 0 5px;
}

/* GRID */
#calendar-grid {
  width: 100%;
  height: 100%;
  margin-top: 18px;
}

.cell {
  text-align: center;
  font-size: var(--fs1);
  width: calc(100% / 7);
  height: 30px;
  font-weight: 400;
}

.cell-header {
  vertical-align: text-top;
  font-weight: 700;
}

.selected {
  font-weight: 700;
}

.selected div {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.calendar-number {
  z-index: 2;
}

#calendar-mark {
  z-index: 1;
  position: absolute;
  font-size: var(--fs6);
  color: var(--ion-color-tertiary);
  transform: translateY(-7px);
}
</style>
