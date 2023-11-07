<template>
  <section class="input-dropdown default-input">
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
      <ButtonExpand v-model:expand="state" />
    </InputBox>
    <Popup v-model:value="state">
      <template #content="{ reverseValue }">
        <InputSelect
          v-model:value="value"
          :options="options"
          @click="reverseValue"
          :count="count"
        />
      </template>
    </Popup>
  </section>
</template>
<script setup lang="ts">
import { InputBox, InputSelect, InputLabel } from ".";
import { ButtonExpand } from "../Buttons";
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
  count: {
    type: Number,
    default: 5,
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
.input-dropdown {
  width: 100%;
}
</style>
