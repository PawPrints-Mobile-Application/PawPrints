<template>
  <section class="calendar-box">
    <header class="calendar-nav">
      <BackButton class="button" @click="() => MoveMonth(-1)" />
      <InputDropdown
        class="month"
        v-model:model-value="shownMonth"
        id="month"
        design="input-only"
        :options="constants.months"
        no-icon
      />
      <InputDropdown
        class="year"
        v-model:model-value="shownYear"
        id="year"
        design="input-only"
        :options="GetYears()"
        no-icon
      />
      <ForwardButton class="button" @click="() => MoveMonth(1)" />
    </header>
    <table class="calendar-body">
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
            <ion-icon
              v-if="IsCellSelected(week, day)"
              id="calendar-mark"
              :icon="calendarMark"
            />
            <span class="calendar-number">{{
              calendar.cells[BaseSevenToDecimal(week, day)]
            }}</span>
          </div>
        </td>
      </tr>
    </table>
  </section>
</template>

<script setup lang="ts">
import { InputDropdown } from ".";
import { BackButton, ForwardButton } from "../Buttons";
import { paw as calendarMark } from "ionicons/icons";
import { reactive, computed } from "vue";
import { IonIcon } from "@ionic/vue";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(["update:modelValue", "click"]);

// FORMATTER
const TwoCharactersFormat = (value: number) =>
  value < 10 ? `0${value}` : value;
const stringToArray = (value: string) => {
  let temp = value;
  if (temp === "") {
    return [
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      new Date().getDate(),
    ];
  }
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
const GetYears = () =>
  Array.from({ length: 151 }, (_, i) =>
    (i + new Date().getFullYear() - 70).toString()
  );

// VALUES
const form = reactive({
  date: stringToArray(props.modelValue)[2],
  month: stringToArray(props.modelValue)[1],
  year: stringToArray(props.modelValue)[0],
});

const shownMonth = computed({
  get() {
    return calendar.shownMonth;
  },
  set(value: string) {
    calendar.shownMonth = value;
    calendar.month = constants.months.indexOf(value);
    RefreshCalendar();
  },
});

const shownYear = computed({
  get() {
    return calendar.shownYear;
  },
  set(value: string) {
    calendar.shownYear = value;
    calendar.year = Number(value);
    RefreshCalendar();
  },
});

const calendar = reactive({
  shownMonth: constants.months[form.month - 1],
  shownYear: form.year.toString(),
  month: form.month - 1,
  year: form.year,
  cells: getCalendarCells(form.month - 1, form.year),
  focused: false,
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
  form.month = calendar.month + 1;
  form.year = calendar.year;
  form.date = calendar.cells[cell];
  const temp = arrayToString(form.year, form.month, form.date);
  emit("update:modelValue", temp);
  emit("click");
};
</script>

<style scoped>
.calendar-box {
  outline: 2px solid black;
  min-width: 280px;
  min-height: 320px;
  padding: 10px;
  border-radius: 10px;
  background-color: var(--ion-color-secondary);
}

.calendar-nav {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid var(--ion-color-black);
  padding-bottom: 5px;
}

.button {
  background-color: var(--ion-color-black);
  --size: var(--fs2);
  --border-radius: 6px;
}

.month {
  max-width: 100px;
  font-weight: 700;
}

.year {
  max-width: 60px;
  font-weight: 700;
}

.calendar-body {
  --body-width: 100%;
  --cell-size: calc(var(--body-width) / 7);
  width: var(--body-width);
  height: 100%;
}

.cell {
  width: var(--cell-size);
  height: 35px;
  text-align: center;
  font-size: var(--fs3);
}

#calendar-mark {
  position: absolute;
  color: var(--ion-color-tertiary);
  font-size: 40px;
  transform: translateY(-7px);
}

.calendar-number {
  position: relative;
}

.selected div {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
