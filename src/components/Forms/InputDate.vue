<template>
    <section class="input-date default-input">
    <InputLabel :value="label" v-show="!!label" />
      <InputBox
        :value="!!hideInput && value === '' ? placeholder : value"
        @update:value="(v) => (value = v)"
        :freeze="!!hideInput"
        :placeholder="placeholder"
        @click="
          () => {
            if (!!hideInput) state = !state;
          }
        "
        :hideIcon="hideIcon"
      >
        <ButtonCalendar v-model:expand="state" />
      </InputBox>
      <Popup v-model:model-value="state">
        <template #content="{ reverseValue }">
            <InputCalendar v-model:value="value" @click="reverseValue" />
        </template>
      </Popup>
    </section>
  </template>
  <script setup lang="ts">
  import { InputBox, InputCalendar, InputLabel } from ".";
  import { ButtonCalendar } from "../Buttons";
  import { ref, computed } from "vue";
  import Popup from "../Modals/Popup.vue";
  
  const props = defineProps({
    label: String,
    hideIcon: Boolean,
    hideInput: Boolean,
    placeholder: {
      type: String,
      default: "Select a value",
    },
    options: Array<String>,
    value: {
      type: String,
      required: true,
    },
  });
  
  const state = ref(false);
  const value = computed({
    get() {
      return props.value;
    },
    set(value) {
      emit("update:value", value);
    },
  });
  
  const emit = defineEmits(["update:value"]);
  </script>
  <style scoped>
  .input-date {
    width: 100%;
  }
  </style>
  