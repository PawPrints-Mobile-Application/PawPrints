<template>
  <section
    class="button-theme text small"
    :style="{
      backgroundColor: theme?.light.tertiary,
      color: theme?.light.primary,
    }"
    :class="{ selected: isTheme }"
    @click="Click"
  >
    {{ props.name! }}
  </section>
</template>
<script setup lang="ts">
import { SetRootStyle, CustomEvent, ObjectToMap } from "../../utils";
import { ref, onMounted } from "vue";
const props = defineProps({
  theme: Object,
  name: String,
});

const isTheme = ref(localStorage.getItem("colorTheme") === props.name);

const Click = () => {
  localStorage.setItem("colorTheme", props.name!);
  CustomEvent.EventDispatcher("reload-theme");
};

onMounted(() => {
  CustomEvent.EventListener("reload-theme", () => {
    isTheme.value = localStorage.getItem("colorTheme") === props.name;
    if (isTheme.value)
      SetRootStyle(
        ObjectToMap(props.theme!).get(localStorage.getItem("colorMode")!)
      );
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
  outline: 2px solid var(--theme-quadratic);
  opacity: 1;
  font-weight: 700;
}
</style>
