<template>
  <section class="date-input" :class="{ 'focused': state.focused, 'touched' : state.touched }">
    <input
      id="input"
      type="date"
      v-model="value"
      @focus="() => {
        state.focused = true;
        state.touched = true;
      }"
      @blur="() => (state.focused = false)"
    />
    <IconButton
      id="toggler"
      :icon="icon"
      @click="
        () => {
            state.calendar = !state.calendar;
        }
      "
      @focus="() => {
        state.focused = true;
        state.touched = true;
      }"
      @blur="() => (state.focused = false)"
    />
  </section>
  <Popup v-model="state.calendar">
    <CalendarBox />
  </Popup>
</template>

<script setup lang="ts">
import { CalendarBox } from ".";
import { Popup } from "../Modals";
import { IconButton } from "../Buttons";
import { calendar as icon } from "ionicons/icons";
import { reactive, computed } from "vue";

const state = reactive({
  calendar: false,
  focused: false,
  touched: false
});

const props = defineProps({
    modelValue: {
        type: String,
        required: true,
        validator: (value: string) => value.match(/^\d{4}-\d{2}-\d{2}$/) !== null
    }
});
const value = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit('update:modelValue', value);
    }
})
const emit = defineEmits(['update:modelValue'])
</script>

<style scoped>
.date-input {
  width: 100%;
  border-radius: 5px;
  background-color: var(--ion-color-secondary);
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: center;
  padding: 10px 10px 10px 20px;
}

#input {
  width: 100%;
  border: none;
  background: none;
  border-radius: 5px;
  font-family: Rubik;
  font-size: 14px;
  font-weight: 400;
}

#input:focus {
  outline: none;
}

.focused {
  background-color: var(--ion-color-secondary-shade);
}

#input::-webkit-calendar-picker-indicator {
  display: none;
}

#toggler {
    position: absolute;
  width: 50px;
  --padding: 0;
  --margin: 0;
  --size: var(--fs5);
  background-color: var(--ion-color-secondary);
  --color: var(--ion-color-primary);
}

.focused #toggler {
  background-color: var(--ion-color-secondary-shade);
}
</style>
