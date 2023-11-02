<template>
  <section
    class="search-box"
    :class="{ 'show-input': expand || !collapse }"
    @click="() => !expand && Expand()"
  >
    <SearchButton @click="() => (expand ? Return() : Expand())" />
    <InputText
      ref="input"
      type="text"
      id="search"
      placeholder="Search"
      v-model:modelValue="value"
      hideHelper
      noIcon
      @click="() => (expand ? Return() : Expand())"
      @blur="Collapse"
      design="input-only"
    />
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { InputText } from ".";
import { SearchButton } from "../Buttons";

const input = ref();
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

const expand = ref(!props.collapse);
const Return = () => emit("return", value.value);
const Expand = () => {
  expand.value = true;
  if (props.collapse) emit("expand");
  emit("focus", value.value);
  input.value.ForceFocus();
};
const Collapse = () => {
  expand.value = false;
  if (props.collapse) emit("collapse");
  emit("blur", value.value);
};
const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
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
.search-box {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--ion-color-secondary);
  border-radius: 10px;
  padding: 5px;
  overflow: hidden;
  --width: 48px;
  max-width: var(--width);
  transition: all 200ms ease-out;
}

.search-box:not(.show-input) > .input-text {
  opacity: 0;
}

.show-input {
  --width: 100%;
}

.search-button {
  --size: var(--fs0);
  margin: 0;
}

.input-text {
  flex: 1 0 0;
  width: 0;
}
</style>
