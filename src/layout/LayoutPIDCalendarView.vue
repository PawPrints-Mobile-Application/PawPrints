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
        trigger="popup-month"
        closeOnSelect
      />
      <InputDropdown
        class="year"
        :modelValue="year"
        @update:modelValue="SetYear"
        :options="calendar.years"
        hideIcon
        trigger="popup-year"
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
      >
        <TextSmall class="date" :value="date.toString()" />
        <article class="logs">
          <IonIcon
            v-for="lid of GetIcons(date).lids"
            class="log"
            :class="[GetLog(date, lid).type]"
            :icon="GetLog(date, lid).category"
          />
        </article>
        <TextSmall
          class="extra"
          v-show="!!GetIcons(date).extra"
          :value="GetIcons(date).extra.toString()"
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
import { Calendar, SeedGenerator } from "../utils";
import { PropType, computed, onMounted, reactive } from "vue";
import { Props as PropsLAD } from "../server/models/LogAddressingData";

const props = defineProps({
  modelValue: Date,
  logs: Object as PropType<Map<string, Map<string, PropsLAD>>>,
});

const GetLog = (date: number, lid: string) => {
  const latid = SeedGenerator(
    new Date(year.value, month.value, date, 0, 0, 0)
  ).toString();
  return props.logs?.get(latid)?.get(lid)!;
};

const iconLimit = 4;
const GetIcons = (date: number) => {
  const temp = {
    lids: [],
    extra: 0,
  };
  if (!props.logs) return temp;
  const latid = SeedGenerator(
    new Date(year.value, month.value, date, 0, 0, 0)
  ).toString();
  if (!props.logs?.get(latid)) return temp;
  const lids = Array.from(props.logs?.get(latid)!.keys());
  return {
    lids: lids.filter((_, i) => i < iconLimit),
    extra: lids.length! - iconLimit,
  };
};

const month = computed({
  get() {
    return props.modelValue!.getMonth();
  },
  set(value) {
    const temp = new Date(
      props.modelValue!.getFullYear(),
      value,
      props.modelValue!.getDate()
    );
    emit("update:modelValue", temp);
  },
});

const year = computed({
  get() {
    return props.modelValue!.getFullYear();
  },
  set(value) {
    const temp = new Date(
      value,
      props.modelValue!.getMonth(),
      props.modelValue!.getDate()
    );
    emit("update:modelValue", temp);
  },
});

const currentDate = new Date();
const isSelected = (i: number) =>
  i === currentDate.getDate() &&
  month.value === currentDate.getMonth() &&
  year.value === currentDate.getFullYear();

const GetYears = (): number[] => {
  const length = 75;
  const range = Math.floor(length / 2);
  return Array.from(
    { length: range + 1 },
    (_, i) => i + new Date().getFullYear() - range
  );
};

const GetCells = (): number[] =>
  Array.from(
    { length: new Date(year.value, month.value + 1, 0).getDate() },
    (_, i) => i + 1
  );

const GetDayStart = () => new Date(year.value, month.value, 1).getDay() + 1;

const CellsRecalculate = () => {
  calendar.cells = GetCells();
  calendar.dayStart = GetDayStart();
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
  console.log(tempMonth, tempYear);
  SetMonth(tempMonth, false);
  SetYear(tempYear);
};

const SetMonth = (value: number, doRecalculate: boolean = true) => {
  month.value = value;
  if (doRecalculate) CellsRecalculate();
};

const SetYear = (value: number, doRecalculate: boolean = true) => {
  year.value = value;
  if (doRecalculate) CellsRecalculate();
};

const emit = defineEmits(["update:modelValue", "select"]);

onMounted(() => {
  CellsRecalculate();
});
</script>
<style scoped>
.pid-calendar-view {
  width: 100%;
  height: min-content;
  border-radius: 10px;
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
