<template>
  <section class="card card-log">
    <div class="time">
      <TextSmall>{{ log!.TStart.toString() }}</TextSmall>
      <TextSmall
        v-show="!isRecord() && log!.TStart.toString() !== log!.TEnd.toString()"
        >to</TextSmall
      >
      <TextSmall
        v-show="!isRecord() && log!.TStart.toString() !== log!.TEnd.toString()"
        >{{ log!.TEnd.toString() }}</TextSmall
      >
    </div>
    <div class="data" @click="OpenLog" :class="[log!.type]">
      <TextSubheading :value=" `${log!.type}:\t${log!.title}` " />
      <TextParagraph
        :value="` ${log!.category} ${isRecord() ? `(${log!.value}${(!log!.units ? log!.units : log!.units)})` : ''}` "
      />
      <TextParagraph v-show="!!log!.note" :value="`Note: ${log!.note}`" />
    </div>
  </section>
</template>
<script setup lang="ts">
import { PropType } from "vue";
import { Props as PropsLAD } from "../../server/models/LogAddressingData";
import { PawprintsEvent } from "../../utils";
import { TextParagraph, TextSmall, TextSubheading } from "..";

const props = defineProps({
  log: Object as PropType<PropsLAD>,
});
const isRecord = () => props.log!.type === "Record";
const OpenLog = () =>
  PawprintsEvent.EventDispatcher("modal-log-edit", props.log!);
</script>
<style scoped>
.data {
  padding: 6px;
  border-radius: 10px;
}

.time {
  color: var(--theme-secondary-text);
}

.Record {
  background-color: var(--theme-list-log-background);
  color: var(--theme-list-log-text);
}
.Schedule {
  background-color: var(--theme-primary-background);
  color: var(--theme-primary-text);
}
</style>
