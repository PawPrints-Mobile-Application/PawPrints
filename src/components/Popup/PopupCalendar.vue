<template>
  <ButtonPopup ref="reference" @state="(value) => emit('state', value)">
    <template #button>
      <ButtonCalendar @click="Trigger" />
    </template>
    <InputCalendar
      v-model="value"
      :saveOnChange="saveOnChange"
      :disableFuture="disableFuture"
      @save="Trigger"
    />
  </ButtonPopup>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { ButtonPopup, ButtonCalendar } from "../Buttons";
import { InputCalendar } from "../Forms";

const props = defineProps({
  modelValue: Date,
  saveOnChange: Boolean,
  disableFuture: Boolean,
});

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const reference = ref();
const Trigger = () => reference.value.Trigger();

const emit = defineEmits(["update:modelValue", "state"]);

defineExpose({ Trigger });
</script>
<style scoped></style>
