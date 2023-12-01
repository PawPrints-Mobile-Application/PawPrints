<template>
  <section
    class="button-theme text small"
    :style="{
      backgroundColor: ObjectToMap(theme?.light).get('tertiary-background'),
      color: theme?.light.primary,
    }"
    :class="{ selected: isTheme }"
    @click="Click"
  >
    {{ props.name! }}
  </section>
</template>
<script setup lang="ts">
import { CustomEvent } from "../../utils";
import { ref, onMounted } from "vue";
import { ObjectToMap } from "../../utils";
const props = defineProps({
  theme: Object,
  name: String,
});

const isTheme = ref(localStorage.getItem("colorTheme") === props.name);

const Click = () => {
  localStorage.setItem("colorTheme", props.name!);
  CustomEvent.EventDispatcher("set-theme");
  CustomEvent.EventDispatcher("set-mode");
};

onMounted(() => {
  CustomEvent.EventListener("set-theme", () => {
    isTheme.value = localStorage.getItem("colorTheme") === props.name;
  });
});
</script>
<style scoped>
.button-theme {
  min-width: 60px;
  width: max-content;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  padding: 10px;
  opacity: 0.7;
  transition: all 75ms ease-out;
}

.selected {
  outline: 2px solid var(--theme-quadratic-background);
  opacity: 1;
  font-weight: 700;
}
</style>
