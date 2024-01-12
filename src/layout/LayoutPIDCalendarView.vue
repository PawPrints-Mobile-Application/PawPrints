<template>
  <section class="pid-calendar-view">
    <header>
      <ButtonBack @click="() => MoveMonth(-1)" type="icon" />
      <InputDropdown
        class="month"
        :options="Calendar.months"
        v-model="month"
        :count="12"
        hideInput
        hideIcon
        @select="ReloadLogs"
      />
      <InputDropdown
        class="year"
        :options="Calendar.GetYears(151)"
        v-model="year"
        :count="12"
        hideInput
        hideIcon
        @select="ReloadLogs"
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
            v-for="icon in getIcons(Number(date)).icons"
            id="calendar-mark"
            :icon="recordTypeIcons(icon.recordType)"
          />
          <TextSmall v-show="getIcons(Number(date)).extra">{{
            getIcons(Number(date)).extra
          }}</TextSmall>
        </div>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import { InputDropdown, TextSmall, ButtonBack, ButtonNext } from "../components";
import { computed, ref, onMounted, PropType, Ref } from "vue";
import { Calendar, PawprintsEvent } from "../utils";
import { Enums, Props } from "../server/models/Logs";
import { IonIcon } from "@ionic/vue";

const props = defineProps({
  modelMonth: {
    type: Number,
    default: new Date().getMonth(),
  },
  modelYear: {
    type: Number,
    default: new Date().getFullYear(),
  },
  logs: {
    type: Object as PropType<Map<number, Props[]>>,
    default: new Map<number, Props[]>(),
  },
});

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
    return props.modelYear;
  },
  set(value) {
    emit("update:modelYear", Number(value));
  },
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
  return Array.from(
    { length: new Date(props.modelYear!, props.modelMonth! + 1, 0).getDate() },
    (_, i) => (i + 1).toString()
  );
};

const cells: Ref<string[]> = ref(CalendarSpaceCells().concat(CalendarCells()));
const icons = ref(props.logs!);
const ResetCells = () => {
  icons.value = props.logs!;
  cells.value = CalendarSpaceCells().concat(CalendarCells());
};

const getIcons = (date: number) => {
  let extra = 0;
  const iconsList = icons.value.get(date)?.filter((_, i) => {
    if (i < 4) return true;
    else {
      extra++;
      return false;
    }
  });
  return {
    icons: iconsList,
    extra: extra,
  };
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
  year.value = tempYear;
  ReloadLogs();
};

const ReloadLogs = () => PawprintsEvent.EventDispatcher("reload-logs");

const AddLog = (date: number) =>
  PawprintsEvent.EventDispatcher(
    "modal-log-add",
    new Date(Number(year.value), Calendar.months.indexOf(month.value), date)
  );

const emit = defineEmits(["update:modelMonth", "update:modelYear"]);

onMounted(() => {
  PawprintsEvent.EventListener("reload-logs", () => setTimeout(ResetCells, 1));
  PawprintsEvent.EventListener("reload-display", ResetCells);
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

.input-dropdown {
  --input-background: var(--theme-primary-background);

  &.month {
    max-width: 120px;
    font-weight: 700;
  }

  &.year {
    max-width: 60px;
    font-weight: 700;
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

.text-small {
  color: var(--theme-tertiary-text);
  background-color: var(--theme-tertiary-background);
  border-radius: 6px;
  font-weight: 700;
  width: 100%;
  text-align: center;
}
</style>
