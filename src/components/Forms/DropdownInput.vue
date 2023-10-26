<template>
  <section class="dropdown-input" :class="{ 'focused': state.focused, 'has-value' : value !== defaultDisabled }">
    <label for="input" id="label">{{ label }}</label>
    <select
      id="input"
      :name="name"
      v-model="value"
      @focus="() => state.focused = true"
      @blur="() => state.focused = false"
    >
      <option :value="defaultDisabled" disabled selected>
        {{ state.focused ? placeholder : "" }}
      </option>
      <option :value="element" v-for="element in values">{{ element }}</option>
    </select>
  </section>
</template>
<script setup lang="ts">
import { reactive, computed } from "vue";

const state = reactive({
  focused: false,
});

const props = defineProps({
  modelValue: {
    type: [String, Number, Number, Boolean, Function, Object],
    required: true,
  },
  defaultDisabled: {
    type: [String, Number, Number, Boolean, Function, Object],
    required: true,
  },
  values: {
    type: Array,
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
  placeholder: {
    type: String,
    default: "Select an option.",
  },
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
</script>
<style scoped>
.dropdown-input {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  text-align: left;

  font-family: Rubik;
  font-size: 14px;
  font-weight: 400;
}

select {
  width: 100%;
}

label {
  transform: translate(20px, 32px);
  transition: all 200ms ease-out;
  padding: 5px 0;
}

select {
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: url('../../assets/icons/dropdownIcon.svg') calc(100% - 10px) / 15% 80% no-repeat var(--ion-color-secondary);
}

.focused > * {
    outline: none;
}

.focused label, .has-value label {
  transform: translate(0, 0);
  font-weight: 700;
}

.focused select {
  background-color: var(--ion-color-secondary-shade);
}

option {
  background-color: var(--ion-color-secondary);
}

select option:checked,
select option:hover {
  background-color: var(--ion-color-secondary-shade);
}
</style>
