<template>
  <section
    class="input-search default-input"
    :class="{ expand: state || !!keepOpen }"
  >
    <ButtonSearch
      :expand="state"
      @update:expand="(value) => (state = !!keepOpen ? false : value)"
      @click="() => input.ForceFocus()"
    />
    <InputBox
      ref="input"
      :value="!!hideInput && value === '' ? placeholder : value"
      @update:value="(v) => (value = v)"
      @blur="() => (state = false)"
      :freeze="!!hideInput"
      :placeholder="placeholder"
      @click="
        () => {
          if (!!hideInput) state = !state;
        }
      "
      @change="emit('change', value)"
      @return="emit('return', value)"
    />
  </section>
</template>
<script setup lang="ts">
import { ButtonSearch } from "../Buttons/";
import { InputBox } from ".";
import { ref, computed } from "vue";

const input = ref();
const props = defineProps({
  hideIcon: Boolean,
  hideInput: Boolean,
  placeholder: {
    type: String,
    default: "Search",
  },
  value: {
    type: String,
    required: true,
  },
  keepOpen: Boolean,
});

const _state = ref(false);
const state = computed({
  get() {
    return _state.value;
  },
  set(value) {
    if (value) emit("expand");
    else emit("collapse");
    _state.value = value;
  },
});
const value = computed({
  get() {
    return props.value;
  },
  set(value) {
    emit("update:value", value);
    emit("input", value);
  },
});

const emit = defineEmits([
  "update:value",
  "expand",
  "collapse",
  "return",
  "input",
  "change",
]);
</script>
<style scoped>
.input-search {
  align-self: flex-start;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  background-color: var(--ion-color-secondary);
  border-radius: 5px;
  transition: all 200ms ease-out;
  overflow: hidden;
  padding-right: 5px;

  > .input-box {
    flex: 1 0 0;
    opacity: 0;
    padding: 0;
  }
}

.input-search.expand {
  width: 100%;
  > .input-box {
    opacity: 1;
  }
}
</style>
