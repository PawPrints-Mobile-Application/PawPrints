<template>
  <section
    class="date-input"
    :class="{ focused: state.focused, touched: state.touched }"
  >
    <label
      id="label"
      :for="name"
      @click="
        () => {
          focus();
          input.focus();
        }
      "
      @blur="() => (state.focused = false)"
      >{{ label }}</label
    >
    <div class="input-wrapper">
      <input
        id="input"
        ref="input"
        :name="name"
        :type="state.touched ? 'date' : 'text'"
        v-model="value"
        @focus="focus"
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
        @focus="focus"
        @blur="() => (state.focused = false)"
      />
    </div>
  </section>
  <Popup v-model="state.calendar">
    <CalendarBox v-model="value" />
  </Popup>
</template>

<script setup lang="ts">
import { CalendarBox } from ".";
import { Popup } from "../Modals";
import { IconButton } from "../Buttons";
import { calendar as icon } from "ionicons/icons";
import { reactive, computed, ref } from "vue";

const state = reactive({
  calendar: false,
  focused: false,
  touched: false,
});

const focus = () => {
  state.focused = true;
  state.touched = true;
};

const TwoCharactersFormat = (value: number) =>
  value < 10 ? `0${value}` : value;

const input = ref();
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});

const value = computed({
  get() {
    if (props.modelValue === "") {
      const temp = `${new Date().getFullYear()}-${TwoCharactersFormat(
        new Date().getMonth() + 1
      )}-${TwoCharactersFormat(new Date().getDate())}`;
      emit("update:modelValue", temp);
      return temp;
    }
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
const emit = defineEmits(["update:modelValue"]);
</script>

<style scoped>
.date-input {
  width: 100%;
  border-radius: 5px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-end;
  align-items: center;
  font-family: Rubik;
  font-size: 14px;
  font-weight: 400;
}

#label {
  width: 100%;
  text-align: start;
  transform: translate(20px, 32px);
  transition: all 200ms ease-out;
  padding: 5px 0;
  overflow-x: visible;
}

.touched #label,
.focused #label {
  transform: translate(0, 0);
  font-weight: 700;
}

.input-wrapper {
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
  opacity: 0;
  width: 100%;
  border: none;
  background: none;
  border-radius: 5px;
}

.touched #input,
.focused #input {
  opacity: 1;
}

#input:focus {
  outline: none;
}

.focused .input-wrapper {
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
