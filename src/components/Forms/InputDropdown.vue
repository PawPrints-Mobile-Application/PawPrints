<template>
  <section class="input-dropdown default-input">
    <InputLabel :value="label" v-show="!!label" />
    <InputDynamic
      :model-value="value?.toString()"
      @input="GetSetOption"
      :freeze="!!hideInput"
      :placeholder="placeholder"
      @click="
        () => {
          if (!!hideInput) state = !state;
        }
      "
      :hideIcon="hideIcon"
    >
      <ButtonExpand
        v-model:expand="state"
        @click="emit('state-expanded', state)"
      />
    </InputDynamic>
    <Popup v-model="state" @click-backdrop="emit('state-expanded', state)">
      <template #default="{ Trigger }">
        <InputSelect
          v-model="value"
          :options="options"
          @click="
            () => {
              Trigger();
              emit('select', value);
            }
          "
          :count="count"
        />
      </template>
    </Popup>
  </section>
</template>
<script setup lang="ts">
import { InputSelect, InputLabel, InputDynamic } from ".";
import { ButtonExpand } from "../Buttons";
import { ref, computed } from "vue";
import { Popup } from "../Popup";

const props = defineProps({
  label: String,
  hideIcon: Boolean,
  hideInput: Boolean,
  placeholder: {
    type: String,
    default: "Select a value",
  },

  // For Input Select
  options: Array<String | Number | Date | Object>,
  modelValue: [String, Number, Date, Object],
  count: {
    type: Number,
    default: 5,
  },
});

const GetSetOption = (element: string) => {
  props.options?.forEach((option) => {
    if (option.toString() === element) value.value = option;
  });
};

const state = ref(false);
const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
    emit("change", value);
  },
});

const emit = defineEmits([
  "update:modelValue",
  "change",
  "select",
  "state-expanded",
]);
</script>
<style scoped>
.input-dropdown {
  width: 100%;
}
</style>
