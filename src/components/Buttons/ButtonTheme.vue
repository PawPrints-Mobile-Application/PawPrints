<template>
  <section
    class="button-theme text small"
    :style="{
      backgroundColor: theme?.light.tertiary,
      color: theme?.light.primary,
    }"
    :class="{ selected: isTheme() }"
    @click="Click"
  >
    {{ label }}
  </section>
</template>
<script setup lang="ts">
import { SetRootStyle } from "../../utils";
const props = defineProps({
  theme: Object,
  name: String,
  label: String,
});

const isTheme = () => {
  return localStorage.getItem("colorTheme") === props.name;
};

const Click = () => {
  localStorage.setItem("colorTheme", props.name!);
  console.log(localStorage.getItem("colorTheme"), props.name);
  SetRootStyle(props.theme?.light);
};
</script>
<style scoped>
.button-theme {
  height: 30px;
  width: max-content;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  padding: 5px;
  opacity: 0.7;
}

.selected {
  outline: 2px solid var(--theme-quadratic);
  opacity: 1;
}
</style>
