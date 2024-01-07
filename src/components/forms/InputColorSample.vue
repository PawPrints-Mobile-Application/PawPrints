<template>
  <section class="input-color-sample">
    <TextSubheading
      >Sample Colors ({{ SampleColors.length }} colors)</TextSubheading
    >
    <div class="wrapper">
      <div
        class="color"
        :class="{ active: modelValue === color }"
        v-for="color in SampleColors"
        :style="{ backgroundColor: color }"
        @click="emit('update:modelValue', color)"
      />
    </div>
  </section>
</template>
<script setup lang="ts">
import { TextSubheading } from "..";
import { SampleColors } from "../../utils";

defineProps({
  modelValue: String,
});

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
  padding: var(--padding) 0;
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  gap: var(--gap);
}

.color {
  outline: 1px solid var(--theme-black);
  width: var(--size);
  height: var(--size);
  border-radius: 15px;
  transition: outline 50ms ease-out;
}

.active {
  outline: 3px solid var(--theme-primary-text);
}
</style>
