<template>
  <section class="input-dropdown default-input">
    <InputLabel :value="label" v-show="!!label" />
    <InputDynamic
      v-model="othersValue"
      :freeze="!!hideInput"
      :placeholder="placeholder"
      @click="
        () => {
          if (!!hideInput) state = !state;
        }
      "
      :hideIcon="hideIcon"
    >
      <ButtonDropdown v-model="state" />
    </InputDynamic>
    <Popup v-model="state">
      <template #default="{ Trigger }">
        <InputBox v-model="filter" v-show="!!searchable" />
        <br />
        <InputSelect
          v-model="value"
          :options="GetOptions()"
          @click="
            () => {
              Trigger();
              emit('select', value);
            }
          "
          :count="count"
          :allow-others="!hideInput"
        />
      </template>
    </Popup>
  </section>
</template>
<script setup lang="ts">
import { InputSelect, InputLabel, InputDynamic, InputBox } from ".";
import { ButtonDropdown } from "../Buttons";
import { ref, computed } from "vue";
import { Popup } from "../Popup";
import { DropdownOption } from "../../utils";

const props = defineProps({
  label: String,
  hideIcon: Boolean,
  hideInput: Boolean,
  placeholder: {
    type: String,
    default: "Select a value",
  },

  // For Input Select
  options: Array<DropdownOption>,
  modelValue: DropdownOption,
  count: {
    type: Number,
    default: 5,
    validate: (value: number) => value <= 10 && value > 0,
  },
  searchable: Boolean,
});

const othersValue = computed({
  get() {
    return props.modelValue?.label!;
  },
  set(value: string) {
    FindOption(value);
  },
});

const filter = ref("");
const FindOption = (element: string) => {
  let temp = new DropdownOption(element, element);
  props.options?.forEach((option) => {
    if (option.toString() === element) temp = option;
  });
  value.value = temp;
};

const GetOptions = () => {
  if (!props.options || props.options.length === 0) return [];
  let temp: DropdownOption[] = [];
  props.options.forEach((option) => {
    if (
      filter.value === "" ||
      option.label.toLowerCase().includes(filter.value)
    )
      temp.push(option);
  });
  return temp;
};

const state = ref(false);
const value = computed({
  get() {
    return props.modelValue!;
  },
  set(value) {
    emit("update:modelValue", value!);
    emit("change", value!);
  },
});

const emit = defineEmits(["update:modelValue", "change", "select"]);
</script>
<style scoped>
.input-dropdown {
  width: 100%;
}

.input-select {
  width: 100%;
}
</style>
