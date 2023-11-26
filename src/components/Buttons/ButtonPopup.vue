<template>
  <section class="button-popup">
    <slot name="button" :Trigger="Change" />
    <Popup v-model="state" @click-backdrop="emit('click-backdrop')">
      <template #content="{ Trigger }">
        <slot name="content" :Trigger="Trigger"
          ><slot :Trigger="Trigger"
        /></slot>
      </template>
    </Popup>
  </section>
</template>
<script setup lang="ts">
import { Popup } from "../Popup";
import { computed } from "vue";

const props = defineProps({
  modelValue: Boolean,
});

const state = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("change", value);
    emit("update:modelValue", value);
  },
});

const Change = () => {
  state.value = !state.value;
};

const emit = defineEmits([
  "update:modelValue",
  "change",
  "click-backdrop",
  "state",
]);
</script>
<style scoped></style>
