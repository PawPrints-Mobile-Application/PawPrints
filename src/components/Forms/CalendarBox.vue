<template>
    <section class="calendar-box">
      <header>
        <BackButton class="button" @click="() => MoveMonth(-1)" />
            <select type="month" id="calendar-month" name="calendar-month" :v-model="valueMonth">
                <option v-for="(month, id) in constants.months" :value="id">{{ month }}</option>
            </select>
            <input type="number" class="calendar-year" v-model="form.value.year" />
        <ForwardButton class="button" @click="() => MoveMonth(1)" />
      </header>

      <table id="grid">
        <tr id="row-header">
          <th class="cell cell-header" v-for="day in constants.days">
            {{ day }}
          </th>
        </tr>
        <tr
          class="row-days"
          v-for="week in Array(Math.ceil(form.dates.length / 7)).keys()"
        >
          <td
            :id="`cell-${week}${day}`"
            class="cell"
            v-for="day in Array(7).keys()"
            :class="{ selected: IsSelected(week * 7 + (day % 7)) }"
            @click="() => SetDate(week * 7 + (day % 7))"
          >
            <div>
              <span>{{ form.dates[week * 7 + (day % 7)] }}</span>
              <ion-icon
                v-if="IsSelected(week * 7 + (day % 7))"
                id="calendarMark"
                :icon="calendarMark"
              />
            </div>
          </td>
        </tr>
      </table>
    </section>
</template>

<script setup lang="ts">
import { IconButton, BackButton, ForwardButton } from "../Buttons";
import { calendar as icon, paw as calendarMark } from "ionicons/icons";
import { ref, reactive, computed } from "vue";
import { IonIcon } from "@ionic/vue";

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
  getMaxDate: (month: number, year: number) =>
    new Date(year, month + 1, 0).getDate(),
  days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
};

const valueMonth = computed({
    get() {
        return form.shown.month;
    },
    set(value: number) {
        form.shown.month = value;
    }
})
const value = ref();
const focused = ref(false);
const form = reactive({
  calendarShown: false,
  value: {
    date: new Date().getDate(),
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  },
  shown: {
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  },
  dates: Array(1),
});

const MoveMonth = (value: 1 | -1) => {
  let temp = {
    month: form.shown.month + value,
    year: form.shown.year,
  };
  if (0 > temp.month || temp.month > 11) {
    temp.month = (temp.month + 12) % 12;
    temp.year += value;
  }
  SetCalendar(temp);
};

const ShowCalendar = () => {
  const maxDate = constants.getMaxDate(form.shown.month, form.shown.year);
  const startDay = new Date(form.shown.year, form.shown.month, 1).getDay();
  form.dates = Array(startDay)
    .fill("-")
    .map((item) => (item === "-" ? "" : item))
    .concat(Array.from({ length: maxDate }, (_, i) => i + 1));
};
const SetCalendar = (shown: { month: number; year: number }) => {
  form.shown = shown;
  ShowCalendar();
  console.log(form.value);
};
const IsSelected = (date: number) => {
  return (
    form.shown.month === form.value.month &&
    form.shown.year === form.value.year &&
    form.value.date === date
  );
};

const SetDate = (date: number) => {
  form.value = {
    date: date,
    month: form.shown.month,
    year: form.shown.year,
  };
  value.value = `${form.value.year}-${TwoCharactersFormat(form.value.month)}-${TwoCharactersFormat(date + 1)}`
};

const TwoCharactersFormat = (value: number) => value < 10 ? `0${value}` : value;

const ManualSetDate = () => {
  const temp = value.value.split("-");
  form.value = {
    date: parseInt(temp[2]) - 1,
    month: parseInt(temp[1]) - 1,
    year: parseInt(temp[0]),
  };
  SetCalendar({ month: parseInt(temp[1]) - 1, year: parseInt(temp[0]) });
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

header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid var(--ion-color-black);
  height: 40px;
  padding-bottom: 15px;
}

.button {
  background-color: var(--ion-color-black);
}

#calendar-label {
  color: var(--ion-color-black);
  text-align: center;
  font-size: var(--fs3);
  font-weight: 700;
}

#grid {
  width: 100%;
  height: 100%;
  margin-top: 18px;
}

.cell {
  text-align: center;

  font-size: var(--fs1);
  font-weight: 400;
  width: calc(100% / 7);
  height: 30px;
  /* overflow: hidden; */
}

.cell-header {
  vertical-align: text-top;
  font-weight: 700;
  height: 30px;
}

.selected {
  font-weight: 700;
  height: 30px;
}

.selected div {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  height: 100%;
}

#calendarMark {
  z-index: -1;
  position: absolute;
  font-size: var(--fs6);
  color: var(--ion-color-tertiary);
  transform: translateY(-7px);
}
</style>
