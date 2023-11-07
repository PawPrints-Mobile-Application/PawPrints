<template>
  <section class="input-dropdown default-input">
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
    <Popup v-model:model-value="state">
      <template #content="{ reverseValue }">
        <InputSelect
          v-model:value="value"
          :options="options"
          @click="reverseValue"
          :count="5"
        />
      </template>
    </Popup>
  </section>
</template>
<script setup lang="ts">
import { InputBox, InputSelect } from ".";
import { ButtonExpand } from "../Buttons";
import { ref, computed } from "vue";
import Popup from "../Modals/Popup.vue";

const props = defineProps({
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
.input-dropdown {
  width: 100%;
}
</style>
