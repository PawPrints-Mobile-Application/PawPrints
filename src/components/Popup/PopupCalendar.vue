<template>
  <ButtonPopup ref="reference">
    <template #button="{ Trigger }">
      <ButtonCalendar @click="Trigger" />
    </template>
    <InputCalendar v-model="value" :saveOnChange="saveOnChange" @save="Trigger" />
  </ButtonPopup>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { ButtonPopup, ButtonCalendar } from "../Buttons";
import { InputCalendar } from "../Forms";

const props = defineProps({
  modelValue: Date,
  saveOnChange: Boolean,
});

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const emit = defineEmits(["update:modelValue"]);

const reference = ref();
const Trigger = () => reference.value.Trigger();

defineExpose({ Trigger });
</script>
<style scoped></style>
