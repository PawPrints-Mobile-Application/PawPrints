<template>
    <section class="date-input" :class="{ focused: state.focused }">
      <TextInput
        :id="id"
        :label="label"
        type="date"
        :required="required"
        v-model:model-value="value"
        :hideLabel="hideLabel"
        :animated="animated"
        @focus="Focus"
        @blur="Blur"
        :disabled="!!disallowInput"
      />
      <ion-icon
        :icon="state.collapsed ? expand : collapse"
        @click="toggleOptions"
      />
    <Popup v-model="state.collapsed" reversed>
      <template #content="{reverseValue}">
        <CalendarBox v-model="value" @click="() => reverseValue()" />
      </template>
    </Popup>
    </section>
  </template>
  
  <script setup lang="ts">
  import { TextInput, CalendarBox } from ".";
  import { computed, reactive } from "vue";
  import { IonIcon } from "@ionic/vue";
  import {
    calendar as expand,
    calendarClear as collapse,
  } from "ionicons/icons";
import { Popup } from "../Modals";
  
  const props = defineProps({
    label: String,
    id: {
      type: String,
      required: true,
    },
    required: Boolean,
    modelValue: {
      type: String,
      required: true,
    },
  
    // Actions
    hideLabel: Boolean,
    animated: {
      type: Boolean,
      default: true,
    },
    disallowInput: Boolean,
  });
  
  const toggleOptions = () => (state.collapsed = !state.collapsed);
  
  const value = computed({
    get() {
      return props.modelValue;
    },
    set(value) {
      emit("update:modelValue", value);
    },
  });
  
  const emit = defineEmits(["update:modelValue"]);
  
  const state = reactive({
    focused: false,
    touched: false,
    collapsed: true,
  });
  
  const Focus = () => {
    state.focused = true;
    state.touched = true;
  };
  
  const Blur = () => state.focused = false;
  </script>
  
  <style scoped>
  .date-input {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    align-items: end;
    width: 100%;
    font-family: Rubik;
    font-size: 14px;
    font-weight: 400;
  }
  
  .text-input {
    width: calc(100% - 33px);
    margin-right: 33px;
    z-index: 1;
  }
  
  ion-icon {
    position: absolute;
    width: 40px;
    height: 35px;
    background-color: var(--ion-color-secondary);
    border-radius: 6px;
    z-index: 2;
    color: var(--ion-color-tertiary);
  }
  
  .focused ion-icon {
    background-color: var(--ion-color-secondary-shade);
  }
  
  .backdrop {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  
  .choices {
    --height: 0px;
    transform: translateY(calc(var(--height) * 5.9));
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-flow: column nowrap;
    height: calc(var(--height) * 6);
    overflow-y: scroll;
    border-radius: 0 0 8px 8px;
    transition: all 100ms ease-out;
  }
  
  .show-options {
    --height: 30px;
  }
  
  .show-options .option {
    opacity: 1;
  }
  
  .option {
    opacity: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: var(--height);
    background-color: var(--ion-color-secondary);
    transition: all 75ms ease-out 50ms;
  }
  
  div.option {
    background-color: var(--ion-color-secondary-shade);
    color: var(--ion-color-primary);
  }
  
  .option.select {
    background-color: var(--ion-color-secondary-shade);
  }
  </style>
  