<template>
  <section
    class="search-box"
    :class="{ 'show-input': showInput }"
    @click="() => !showInput && Expand()"
  >
    <SearchButton @click="() => (showInput ? Return() : Expand())" />
    <TextInput
      id="search"
      ref="input"
      v-model="value"
      hide-label
      @input="(value) => emit('update:modelValue', value)"
      v-on:keyup.enter="Return"
      placeholder="Search"
      label="Search"
      label-effects="hide"
      @blur="Collapse"
      @focus="() => emit('focus', value)"
    />
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { TextInput } from ".";
import { SearchButton } from "../Buttons";

const showInput = computed(() => state.value || !props.collapse);
const Return = () => emit("return", value);
const Expand = () => {
  state.value = true;
  if (props.collapse) emit("expand");
  input.value.ForceFocus();
};
const Collapse = () => {
  state.value = false;
  if (props.collapse) emit("collapse");
  emit("blur", value);
};

const input = ref();
const state = ref(false);
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  collapse: {
    type: Boolean,
    default: false,
  },
});
const value = ref(props.modelValue);
const emit = defineEmits([
  "update:modelValue",
  "return",
  "blur",
  "focus",
  "expand",
  "collapse",
]);
</script>

<style scoped>
/* 30px radius for circle */
/* 10px radius for square */
.search-box {
  --radius: 10px;
  --radius-after: var(--radius);
  --height: 45px;
  --width: 50px;

  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  background-color: var(--ion-color-secondary);
  border-radius: var(--radius);
  width: var(--width);
  height: var(--height);
  transition: all 400ms ease-out;
}

.text-input {
  --border-radius: var(--radius);
  display: none;
  width: 0px;
  transition: all 500ms ease-out;
}

.show-input,
.show-input .text-input {
  display: flex;
  --border-radius: var(--radius-after);
  border-radius: var(--radius-after);
  padding: 0px 10px;
  width: 100%;
}
</style>
