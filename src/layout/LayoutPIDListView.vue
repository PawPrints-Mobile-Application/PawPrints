<template>
  <section class="pid-list-view">
    <header>
      <InputDynamic
        class="list-view-month"
        type="dropdown"
        :options="Calendar.monthsShort"
        v-model="calendar.dropdownMonth"
        :count="12"
        hideInput
        hideIcon
      />
      <InputDynamic
        class="list-view-year"
        type="dropdown"
        :options="Calendar.GetYears(151)"
        v-model="calendar.dropdownYear"
        :count="12"
        hideInput
        hideIcon
      />
    </header>
    <div class="content">
      <CardLog
        v-for="{ date, logs } in monthlyLogs"
        :logs="logs"
        :date="date"
      />
    </div>
  </section>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, Ref } from "vue";
import { InputDynamic } from "../components/Forms";
import { Calendar } from "../utils";
import { Props } from "../server/models/Logs";
import { GetLogs } from "../server/models/LogAddressingTable";
import { CardLog } from "../components/Cards";

type DailyLogs = {
  date: Date;
  logs: Props[];
};
const monthlyLogs: Ref<DailyLogs[]> = ref([]);
const calendar = reactive({
  dropdownMonth: Calendar.monthsShort[new Date().getMonth()],
  dropdownYear: new Date().getFullYear().toString(),
});

onMounted(() => {
  monthlyLogs.value = [];
  GetLogs(new Date(2023, 11, 1), new Date(2023, 12, 0)).then((value) => {
    value.forEach((logs, latid) => {
      monthlyLogs.value.push({
        date: new Date(Number(latid)),
        logs: logs,
      });
    });
  });
});
</script>
<style scoped>
.pid-list-view {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
}

header {
  display: flex;
  gap: 10px;
  width: 100%;
  justify-content: flex-start;
}
.input-dynamic {
  flex: none;
  width: min-content;
}
.list-view-month {
  --input-background: var(--theme-quadratic-background);
  --input-text: var(--theme-quadratic-text);
  font-weight: 500;
  padding: 2px;
}
.list-view-year {
  --input-background: var(--theme-quadratic-background);
  --input-text: var(--theme-quadratic-text);
  font-weight: 500;
  padding: 2px;
}

.content {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  gap: 5px;
}
</style>
