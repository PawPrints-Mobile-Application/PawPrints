<template>
  <section class="pid-calendar-view">
    <header>
      <ButtonBack @click="() => MoveMonth(-1)" type="icon" />
      <InputDynamic
        class="month"
        type="dropdown"
        :options="Calendar.months"
        v-model="month"
        :count="12"
        hideInput
        hideIcon
        @change="ReloadLogs"
      />
      <InputDynamic
        class="year"
        type="dropdown"
        :options="Calendar.GetYears(151)"
        v-model="year"
        :count="12"
        hideInput
        hideIcon
        @change="ReloadLogs"
      />
      <ButtonNext @click="() => MoveMonth(1)" type="icon" />
    </header>
    <section class="calendar">
      <div class="cell cell-header" v-for="day in Calendar.daysShort">
        {{ day }}
      </div>
      <div
        class="cell cell-body"
        v-for="date in cells"
        :class="{
          selected: isCurrentDate(Number(date)),
          blank: date === '',
        }"
        @click="AddLog(Number(date))"
      >
        <span class="calendar-number">{{ date }}</span>
        <div v-show="icons.get(Number(date))?.length">
          <ion-icon
            v-for="icon in icons.get(Number(date))"
            id="calendar-mark"
            :icon="recordTypeIcons(icon.recordType)"
          />
        </div>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import { InputDynamic } from "../components/Forms";
import { ButtonBack, ButtonNext } from "../components/Buttons";
import { computed, ref, onMounted, PropType, Ref } from "vue";
import { Calendar, CustomEvent } from "../utils";
import { Enums, Props } from "../server/models/Logs";
import { IonIcon } from "@ionic/vue";

const props = defineProps({
  modelMonth: Number,
  modelYear: Number,
  logs: Object as PropType<Map<number, Props[]>>,
});

const isCurrentDate = (date: number) => {
  const currentDate = new Date();
  return (
    currentDate.getDate() === date &&
    currentDate.getFullYear() === props.modelYear &&
    currentDate.getMonth() === props.modelMonth
  );
};

const CalendarSpaceCells = (): string[] => {
  const curMonth = Calendar.months.indexOf(month.value);
  const curYear = Number(year.value);
  return Array(new Date(curYear, curMonth, 1).getDay()).fill("");
};

const CalendarCells = () => {
  const curMonth = Calendar.months.indexOf(month.value);
  const curYear = Number(year.value);
  return Array.from(
    { length: new Date(curYear, curMonth + 1, 0).getDate() },
    (_, i) => (i + 1).toString()
  );
};

const cells: Ref<string[]> = ref([]);
const icons = ref(new Map<number, Props[]>());
const ResetCells = () => {
  icons.value = props.logs!;
  cells.value = CalendarSpaceCells().concat(CalendarCells());
};

const recordTypeIcons = (recordType: string) =>
  new Enums.Record().get(recordType).icon;

const MoveMonth = (increment: 1 | -1) => {
  const curMonth = Calendar.months.indexOf(month.value);
  const curYear = Number(year.value);
  const tempMonth = (curMonth + increment + 12) % 12;
  const tempYear =
    curMonth + increment < 0 || curMonth + increment > 11
      ? curYear + increment
      : curYear;
  month.value = Calendar.months[tempMonth];
  year.value = tempYear.toString();
};

const month = computed({
  get() {
    return Calendar.months[props.modelMonth!];
  },
  set(value) {
    emit("update:modelMonth", Calendar.months.indexOf(value));
  },
});
const year = computed({
  get() {
    return props.modelYear!.toString();
  },
  set(value) {
    emit("update:modelYear", Number(value));
  },
});

const ReloadLogs = () => CustomEvent.EventDispatcher("reload-logs");

const AddLog = (date: number) =>
  CustomEvent.EventDispatcher(
    "modal-log-add",
    new Date(Number(year.value), Calendar.months.indexOf(month.value), date)
  );

const emit = defineEmits(["update:modelMonth", "update:modelYear"]);

onMounted(() => {
  CustomEvent.EventListener("reload-logs", () => setTimeout(ResetCells, 1));
});
</script>

<style scoped>
.pid-calendar-view {
  min-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid var(--theme-black);
  padding-bottom: 5px;
}

.input-dynamic {
  --input-background: var(--theme-primary-background);

  &.month {
    max-width: 120px;
    font-weight: 700;
    z-index: 1;
    --input-background: none;
    transform: translateX(3px);
  }

  &.year {
    max-width: 60px;
    font-weight: 700;
    transform: translate(-15px, 1px);
    --input-background: none;
  }
}

.button {
  font-size: 35px;
  border-radius: 6px;
  color: var(--theme-black);
}

.calendar {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
}

.cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: var(--fs3);

  &.cell-header {
    font-weight: 700;
  }

  &.cell-body:not(.blank) {
    background-color: var(--theme-secondary-background);
    height: 65px;
    border-radius: 6px;
    padding: 4px 2px;
  }

  > div {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
}

.selected {
  outline: 3px solid var(--theme-tertiary-background);
  font-weight: 700;
}
</style>
