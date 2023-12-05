<template>
  <LayoutModal
    ref="modal"
    :isOpen="false"
    title="Edit Log"
    close-on-submit
    :canDismiss="!isOpen"
    justify="flex-start"
  >
    <template #header>
      <section class="header">
        <TextHeading>{{ disableEdit ? "Preview" : "Edit" }} Log</TextHeading>
        <ButtonLock v-model="disableEdit" />
      </section>
    </template>
    <section class="content">
      <InputDynamic />
    </section>
  </LayoutModal>
</template>

<script setup lang="ts">
import { reactive, computed, ref, onMounted } from "vue";
import { LayoutModal } from "../../layout";
import {
  InputSegment,
  InputDynamicWrapped,
  InputChoice,
  InputTextareaWrapped,
  InputLabel,
  InputToggle,
  InputDynamic,
} from "../Forms";
import {
  LocalDate,
  LocalTime,
  SegmentOption,
  TwoCharactersFormat,
} from "../../utils";
import {
  documents as recordIcon,
  calendar as scheduleIcon,
} from "ionicons/icons";
import { Enums, Get } from "../../server/models/Logs";
import { AddLogs } from "../../server/models/LogAddressingTable";
import { SeedGenerator, GetUID, CustomEvent } from "../../utils";
import { ButtonLock } from "../Buttons";
import { TextHeading } from "../Texts";

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  lid: String,
});



const disableEdit = ref(true);

const emit = defineEmits(["submit", "discard"]);

onMounted(() => {
  //   CustomEvent.EventListener("modal-log-edit", () => setTimeout(ClearForm, 1));
  //   form.recordType = GetRecordTypeOptions()[0];
});
</script>

<style scoped>
.header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
  width: 100%;
  height: 100%;
}

.content {
  width: 100%;
}
</style>
