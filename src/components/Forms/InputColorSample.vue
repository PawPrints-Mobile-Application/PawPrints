<template>
  <section class="input-color-sample">
    <TextSubheading>Sample Colors ({{ SampleColors.length }} colors)</TextSubheading>
    <div class="wrapper">
      <div
        class="color"
        v-for="color in SampleColors"
        :style="{ backgroundColor: color }"
        @click="emit('update:modelValue', color)"
      />
    </div>
  </section>
</template>
<script setup lang="ts">
import { TextSubheading } from "../Texts";
import { SampleColors } from "../../utils";

const emit = defineEmits(["update:modelValue"]);
</script>
<style scoped>
.input-color-sample {
  --size: 30px;
  --count: 3;
  --padding: 5px;
  --gap: 10px;
}

.wrapper {
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
}

.color {
  outline: 1px solid var(--theme-black);
  width: var(--size);
  height: var(--size);
  border-radius: 15px;
}
</style>
