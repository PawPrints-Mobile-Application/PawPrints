<template>
  <section class="input-color default-input">
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
      <InputColorPicker v-model:value="value" />
    </InputBox>
    <section class="sample-colors" v-show="!hideSample">
      <span>Sample Colors</span>
      <div class="wrapper">
        <div
          class="color"
          v-for="color in sampleColors"
          :style="{ backgroundColor: color }"
          @click="() => (value = color)"
        />
      </div>
    </section>
  </section>
</template>
<script setup lang="ts">
import { InputBox, InputColorPicker, InputLabel } from ".";
import { ref, computed } from "vue";

const sampleColors = [
  "#000000",
  "#222222",
  "#f582ae",
  "#8bd3dd",
  "#172c66",
  "#f3d2c1",
  "#55423d",
  "#9656a1",
  "#c3f0ca",
  "#ffd803",
  "#bae8e8",
  "#232946",
  "#b8c1ec",
  "#8c7851",
  "#f25042",
  "#004643",
  "#f9bc60",
  "#e16162",
  "#d9376e",
  "#078080",
  "#f8f5f2",
  "#fec7d7",
  "#a786df",
  "#d9d4e7",
  "#0e172c",
  "#6246ea",
  "#d1d1e9",
  "#e45858",
  "#00332c",
  "#ffa8ba",
  "#faae2b",
  "#475d5b",
  "#16161a",
  "#94a1b2",
  "#2cb67d",
  "#7f5af0",
  "#3da9fc",
  "#ef4565",
  "#90b4ce",
  "#00ebc7",
  "#fbdd74",
  "#4fc4cf",
  "#994ff3",
  "#e63946",
];

const props = defineProps({
  label: String,
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
  hideSample: Boolean,
});

const state = ref(false);
const value = computed({
  get() {
    if (props.value === "") value.value = "#000000";
    return props.value;
  },
  set(value) {
    emit("update:value", value);
    emit("change", value);
  },
});

const emit = defineEmits(["update:value", "change"]);
</script>
<style scoped>
.input-color {
  width: 100%;
}

.sample-colors {
  margin-top: 5px;
  > span {
    width: 100%;
    margin: 5px;
    font-size: var(--fs3);
    font-weight: 700;
  }
}

.wrapper {
  --size: 30px;
  --count: 3;
  --padding: 5px;
  --gap: 10px;

  height: calc(
    (var(--padding) * 2) + (var(--size) * var(--count)) +
      (var(--gap) * (var(--count) - 1))
  );
  padding: var(--padding) 0;
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  gap: var(--gap);
  overflow: scroll;

  > .color {
    outline: 1px solid var(--ion-color-black);
    width: var(--size);
    aspect-ratio: 1;
    border-radius: 15px;
  }
}
</style>
