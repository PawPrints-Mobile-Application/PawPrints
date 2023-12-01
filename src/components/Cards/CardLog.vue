<template>
  <section class="card card-log">
    <header>
      <TextSubheading>{{ date.getDate() }}</TextSubheading>
      <TextSubheading>{{ Calendar.days[date.getDay()] }}</TextSubheading>
    </header>
    <div class="logs">
      <div class="log" v-for="log in logs">
        <div class="time">
          <TextSubheading>{{ log.TStart.toString() }}</TextSubheading>
          <TextSubheading
            v-show="
              !isRecord(log) && log.TStart.toString() !== log.TEnd.toString()
            "
            >to</TextSubheading
          >
          <TextSubheading
            v-show="
              !isRecord(log) && log.TStart.toString() !== log.TEnd.toString()
            "
            >{{ log.TEnd.toString() }}</TextSubheading
          >
        </div>
        <div class="data">
          <TextSubheading class="title">{{ log.title }}</TextSubheading>
          <TextSubheading class="record-value"
            >{{ log.recordType
            }}<span v-show="isRecord(log)"
              >: {{ log.recordValue }}{{ log.recordUnits }}</span
            ></TextSubheading
          >
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { TextSubheading } from "../Texts";
import { Calendar } from "../../utils";
import { Props } from "../../server/models/Logs";

const isRecord = (log: Props) => log.type === "record";

defineProps({
  logs: {
    type: Object,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});
</script>
<style scoped>
.card-log {
  width: 100%;
  border-radius: 6px;
  background-color: var(--theme-secondary-background);
  padding: 10px 20px;
}

header {
  display: flex;
  gap: 20px;
}

header .text-subheading {
  font-weight: 700;
}

.text-subheading {
  font-weight: 400;
}

.logs {
  margin-left: 27px;
  margin-top: 5px;
  display: flex;
  gap: 5px;
  flex-direction: column;
}

.time {
  display: flex;
  justify-content: space-between;
}

.data {
  background-color: var(--theme-tertiary-background);
  border-radius: 5px;
  padding: 5px 10px;
  display: flex;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
}

.title {
  flex: 1 0 0;
}

.record-value {
  width: 30%;
  text-align: end;
}
</style>
