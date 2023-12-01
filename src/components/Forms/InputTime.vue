<template>
  <section class="input-time default-input">
    <div>
      <InputSelect
        class="hours"
        :options="options.hours"
        v-model="form.hours"
        :count="6"
      />
      <InputSelect
        class="minutes"
        :options="options.minutes"
        v-model="form.minutes"
        :count="6"
      />
      <InputSelect class="ampm" :options="options.ampm" v-model="form.ampm" />
    </div>
    <ButtonText label="Save" @click="SetValue" />
  </section>
</template>
<script setup lang="ts">
import { InputSelect } from ".";
import { reactive } from "vue";
import { DropdownOption, LocalTime } from "../../utils";
import { ButtonText } from "../Buttons";

const options = {
  hours: Array.from(
    { length: 12 },
    (_, i) => new DropdownOption((i + 1).toString(), i + 1)
  ),
  minutes: Array.from(
    { length: 60 },
    (_, i) => new DropdownOption((i + 1).toString(), i + 1)
  ),
  ampm: ["AM", "PM"].map((i) => new DropdownOption(i)),
};

const props = defineProps({
  modelValue: LocalTime,
});

const form = reactive({
  hours: options.hours[props.modelValue!.hoursConverted - 1],
  minutes: options.minutes[props.modelValue!.minutes - 1],
  ampm: options.ampm[props.modelValue!.ampm === "AM" ? 0 : 1],
});

const ConvertToLocalTime = () => {
  const hours =
    form.hours.value + (form.ampm.label === options.ampm[0].label ? 0 : 12);
  const minutes = form.minutes.value;
  return new LocalTime(Number(`${hours}${minutes}`));
};

const SetValue = () => {
  const temp = ConvertToLocalTime();
  emit("update:modelValue", temp);
  emit("change", temp);
};

const emit = defineEmits(["update:modelValue", "change"]);
</script>
<style scoped>
.input-time {
  flex-direction: column;
  align-items: center;
  background-color: var(--theme-primary);
  border-radius: 10px;
  padding: 10px;
  outline: 3px solid var(--theme-black);
}

.input-time div {
  display: flex;
  align-items: center;
  gap: 10px;
}

.input-select {
  min-width: 80px;
}

.button-text {
  width: 100%;
  margin-top: 20px;
}
</style>
