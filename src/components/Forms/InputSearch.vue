<template>
  <section class="input-search default-input">
    <ButtonSearch v-model:expand="state" />
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
    />
  </section>
</template>
<script setup lang="ts">
import { ButtonSearch } from "../Buttons/";
import { InputBox } from ".";
import { ref, computed } from "vue";

const props = defineProps({
  hideIcon: Boolean,
  hideInput: Boolean,
  placeholder: {
    type: String,
    default: "Select a value",
  },
  value: {
    type: String,
    required: true,
  },
});

const state = ref(true);
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
.input-search {
  width: 100%;
  display: flex;
  flex-direction: row;
}
</style>
