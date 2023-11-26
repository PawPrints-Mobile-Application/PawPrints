<template>
  <ButtonPopup v-model="state" @click-backdrop="emit('click-backdrop')">
    <template #button>
      <ButtonCalendar v-model="state" @click="Trigger" />
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

const state = ref(false);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
    emit("state", value);
  },
});

const Trigger = () => {
  state.value = !state.value;
};

const emit = defineEmits(["update:modelValue", "state", "click-backdrop"]);

defineExpose({ Trigger });
</script>
<style scoped></style>
