<template>
  <ButtonPopup v-model="state" @click-backdrop="emit('click-backdrop')">
    <template #button>
      <ButtonTime v-model="state" @click="Trigger" v-show="!hideIcon" />
    </template>
    <InputTime v-model="value" @change="Trigger" />
  </ButtonPopup>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { ButtonPopup, ButtonTime } from "../Buttons";
import { InputTime } from "../Forms";
import { LocalTime } from "../../utils";

const props = defineProps({
  modelValue: LocalTime,
  hideIcon: Boolean,
});

const state = ref(false);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    console.log(value);
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
