<template>
  <section class="input-calendar" :class="{ 'with-save': !saveOnChange }">
    <header class="calendar-nav">
      <ButtonBack class="button" @click="() => MoveMonth(-1)" type="icon" />
      <InputDropdown
        class="month"
        :model-value="calendar.dropdownMonth"
        @change="(value) => SetMonth(value.value)"
        :options="constants.months"
        hide-icon
        hide-input
        :count="12"
      />
      <InputDropdown
        class="year"
        :model-value="calendar.dropdownYear"
        @change="(value) => SetYear(value.value)"
        :options="GetAllYears()"
        hide-icon
        hide-input
        :count="15"
      />
      <ButtonNext class="button" @click="() => MoveMonth(1)" type="icon" />
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
          @click="
            () => {
              if (GetCellDate(week, day) === '') return;
              SetDate(Number(GetCellDate(week, day)));
              emit('select');
            }
          "
        >
          <div>
            <ion-icon
              v-if="IsCellSelected(week, day)"
              id="calendar-mark"
              :icon="calendarMark"
            />
            <span
              class="calendar-number"
              :class="{
                future:
                  !!props.disableFuture &&
                  new Date(
                    calendar.year,
                    calendar.month,
                    Number(GetCellDate(week, day))
                  ) > new Date(),
              }"
              >{{ GetCellDate(week, day) }}</span
            >
          </div>
        </td>
      </tr>
    </table>
    <ButtonText label="Save" @click="Save" v-show="!saveOnChange" />
  </section>
</template>

<script setup lang="ts">
import { InputDropdown } from ".";
import { ButtonBack, ButtonNext, ButtonText } from "../Buttons";
import { paw as calendarMark } from "ionicons/icons";
import { reactive, onMounted } from "vue";
import { IonIcon } from "@ionic/vue";
import { DropdownOption } from "../../utils";

// CONSTANTS
const constants = {
  months: [
    new DropdownOption("January"),
    new DropdownOption("February"),
    new DropdownOption("March"),
    new DropdownOption("April"),
    new DropdownOption("May"),
    new DropdownOption("June"),
    new DropdownOption("July"),
    new DropdownOption("August"),
    new DropdownOption("September"),
    new DropdownOption("October"),
    new DropdownOption("November"),
    new DropdownOption("December"),
  ],
  days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
};

// Cell Calendar UI Modifiers
const GetCalendarCells = (month: number, year: number) =>
  Array(new Date(year, month, 1).getDay())
    .fill("")
    .concat(
      Array.from({ length: new Date(year, month + 1, 0).getDate() }, (_, i) =>
        (i + 1).toString()
      )
    );
const GetCellDate = (week: number, day: number) =>
  calendar.cells[BaseSevenToDecimal(week, day)];
const GetAllYears = () => {
  const length = !props.disableFuture ? 151 : 71;
  return Array.from(
    { length: length },
    (_, i) =>
      new DropdownOption(
        (i + new Date().getFullYear() - 70).toString(),
        i + new Date().getFullYear() - 70
      )
  );
};
const indexOfMonth = (month: string) => {
  let temp = -1;
  constants.months.forEach((each, key) => {
    if (each.value === month) temp = key;
  });
  return temp;
};
const BaseSevenToDecimal = (week: number, day: number) => week * 7 + (day % 7);
const IsCellSelected = (week: number, day: number) => {
  const cell = BaseSevenToDecimal(week, day);
  return (
    GetCellDate(week, day) !== "" &&
    calendar.month === selected.month &&
    calendar.year === selected.year &&
    calendar.date.toString() === calendar.cells[cell]
  );
};
const RefreshCalendar = () => {
  calendar.cells = GetCalendarCells(calendar.month, calendar.year);
};

const props = defineProps({
  modelValue: Date,
  saveOnChange: Boolean,
  disableFuture: Boolean,
});
const emit = defineEmits(["update:modelValue", "select", "save"]);

const calendar = reactive({
  month: 0,
  date: 1,
  year: 1,
  dropdownMonth: constants.months[0],
  dropdownYear: new DropdownOption(
    new Date().getFullYear().toString(),
    new Date().getFullYear()
  ),
  cells: new Array<string>(),
});

const selected = reactive({
  month: 0,
  date: 1,
  year: 1,
});

const MoveMonth = (increment: 1 | -1) => {
  const month = (calendar.month + increment + 12) % 12;
  const year =
    calendar.month + increment < 0 || calendar.month + increment > 11
      ? calendar.year + increment
      : calendar.year;
  if (
    !!props.disableFuture &&
    new Date(year, month, calendar.date) > new Date()
  )
    return;
  calendar.month = month;
  calendar.year = year;
  SetMonth(constants.months[calendar.month].value);
};
const SetMonth = (month: string) => {
  if (
    !!props.disableFuture &&
    new Date(calendar.year, indexOfMonth(month), calendar.date) > new Date()
  )
    return;
  calendar.month = indexOfMonth(month);
  calendar.dropdownMonth = new DropdownOption(month);
  RefreshCalendar();
};
const SetYear = (year: number) => {
  calendar.year = year;
  calendar.dropdownYear = new DropdownOption(year.toString(), year);
  RefreshCalendar();
};
const SetDate = (date: number) => {
  if (
    !!props.disableFuture &&
    new Date(calendar.year, calendar.month, date) > new Date()
  )
    return;
  calendar.date = date;
  Save(!!props.saveOnChange);
};

const Save = (doEmit: boolean = false) => {
  selected.date = calendar.date;
  selected.month = calendar.month;
  selected.year = calendar.year;
  if (doEmit) {
    emit(
      "update:modelValue",
      new Date(calendar.year, calendar.month, calendar.date)
    );
    emit("save");
  }
};

onMounted(() => {
  let temp = !props.modelValue ? new Date() : props.modelValue;
  if (!props.modelValue) emit("update:modelValue", temp);
  calendar.date = temp.getDate();
  calendar.month = temp.getMonth();
  calendar.year = temp.getFullYear();
  calendar.dropdownMonth = constants.months[calendar.month];
  RefreshCalendar();
  selected.date = temp.getDate();
  selected.month = temp.getMonth();
  selected.year = temp.getFullYear();
});
</script>

<style scoped>
.input-calendar {
  outline: 2px solid var(--theme-black);
  min-width: 280px;
  min-height: 313px;
  padding: 10px;
  border-radius: 10px;
  background-color: var(--theme-secondary);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  &.with-save {
    min-height: 348px;
  }
}

.calendar-nav {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid var(--theme-black);
  padding-bottom: 5px;
}

.button {
  background-color: var(--theme-secondary);
  font-size: 35px;
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
  flex: 1 0 0;
}

.cell {
  width: var(--cell-size);
  height: 35px;
  text-align: center;
  font-size: var(--fs3);
}

.future {
  opacity: 0.5;
}

#row-header .cell {
  vertical-align: text-top;
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

.button-text {
  margin-top: auto;
  width: 100%;
  max-height: 35px;
  --background-color: var(--theme-black);
}
</style>
