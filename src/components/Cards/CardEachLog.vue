<template>
  <div class="card-each-log">
    <div class="time">
      <TextSmall>{{ log.TStart.toString() }}</TextSmall>
      <TextSmall
        v-show="!isRecord(log) && log.TStart.toString() !== log.TEnd.toString()"
        >to</TextSmall
      >
      <TextSmall
        v-show="!isRecord(log) && log.TStart.toString() !== log.TEnd.toString()"
        >{{ log.TEnd.toString() }}</TextSmall
      >
    </div>
    <div class="data" @click="OpenLog(log)">
      <TextSubheading class="title">{{ log.title }}</TextSubheading>
      <TextParagraph class="record-value"
        >{{ log.recordType
        }}<span v-show="isRecord(log)"
          >: {{ log.recordValue }}{{ log.recordUnits }}</span
        ></TextParagraph
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import { TextSubheading, TextParagraph, TextSmall } from "../Texts";
import { CustomEvent } from "../../utils";
import { Props } from "../../server/models/Logs";
import { PropType } from "vue";

const isRecord = (log: Props) => log.type === "record";

defineProps({
  log: {
    type: Object as PropType<Props>,
    required: true,
  },
});

const OpenLog = (log: Props) =>
  CustomEvent.EventDispatcher("modal-log-edit", log);
</script>
<style scoped>
.card-each-log {
  width: 100%;
  border-radius: 6px;
  background-color: var(--theme-secondary-background);
  color: var(--theme-secondary-text);
  padding: 5px 10px;
}

header {
  display: flex;
  gap: 14px;

  > .text-subheading {
    font-weight: 700;
  }
}

.text-subheading {
  font-weight: 400;
}

.logs {
  margin-left: 25px;
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
  background-color: var(--theme-list-log-background);
  color: var(--theme-list-log-text);
  border-radius: 8px;
  padding: 7px 7px;
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
}

.title {
  flex: 1 0 0;
}

.record-value {
  width: 30%;
  text-align: end;
  font-size: 12px;
}
</style>
