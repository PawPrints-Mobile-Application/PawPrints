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
      <InputSelect class="ampm" :options="options.ampm" v-model="form.ampm" :count="2" />
    </div>
    <ButtonText label="Save" @click="SetValue" />
  </section>
</template>
<script setup lang="ts">
import { InputSelect } from ".";
import { reactive } from "vue";
import { LocalTime, TwoCharactersFormat } from "../../utils";
import { ButtonText } from "../Buttons";

const options = {
  hours: Array.from({ length: 12 }, (_, i) => i + 1),
  minutes: Array.from({ length: 60 }, (_, i) => i),
  ampm: ["AM", "PM"],
};

const props = defineProps({
  modelValue: LocalTime,
});

const form = reactive({
  hours: options.hours[props.modelValue!.hoursConverted - 1],
  minutes: options.minutes[props.modelValue!.minutes],
  ampm: options.ampm[props.modelValue!.ampm === "AM" ? 0 : 1],
});

const ConvertToLocalTime = () => {
  const hours =
    form.hours + (form.ampm === options.ampm[0] ? 0 : 12);
  const minutes = form.minutes;
  return new LocalTime(
    Number(`${TwoCharactersFormat(hours)}${TwoCharactersFormat(minutes)}`)
  );
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
  justify-content: center;
  background-color: var(--theme-primary-background);
  border-radius: 10px;
  padding: 10px;
  min-height: 270px;
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
  margin-top: 10px;
  min-height: 40px;
}
</style>
