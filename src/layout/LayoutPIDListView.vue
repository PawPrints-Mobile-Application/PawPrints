<template>
  <section class="pid-list-view">
    <header>
      <InputDynamic
        class="list-view-month"
        type="dropdown"
        :options="Calendar.monthsShort"
        v-model="month"
        :count="12"
        hideInput
        hideIcon
        @change="ReloadLogs"
      />
      <InputDynamic
        class="list-view-year"
        type="dropdown"
        :options="Calendar.GetYears(151)"
        v-model="year"
        :count="12"
        hideInput
        hideIcon
        @change="ReloadLogs"
      />
    </header>
    <div class="content">
      <CardLog
        v-for="log in logs?.keys()"
        :id="Number(log)"
        :logs="logs?.get(log)!"
        :date="new Date(modelYear!, modelMonth!, Number(log))"
      />
    </div>
  </section>
</template>
<script setup lang="ts">
import { PropType, computed, onMounted } from "vue";
import { InputDynamic } from "../components/Forms";
import { Calendar, CustomEvent } from "../utils";
import { CardLog } from "../components/Cards";
import { Props } from "../server/models/Logs";

const props = defineProps({
  modelMonth: Number,
  modelYear: Number,
  logs: Map as PropType<Map<number, Props[]>>,
});

const month = computed({
  get() {
    return Calendar.monthsShort[props.modelMonth!];
  },
  set(value) {
    emit("update:modelMonth", Calendar.monthsShort.indexOf(value));
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

const emit = defineEmits(["update:modelMonth", "update:modelYear"]);

onMounted(() => {
  setTimeout(() => {
    document
      .getElementById(Math.max(new Date().getDate() - 2, 0).toString())
      ?.scrollIntoView({ behavior: "smooth" });
  }, 10);
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
