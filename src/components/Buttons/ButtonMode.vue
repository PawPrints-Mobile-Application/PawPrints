<template>
  <section
    class="button-mode"
    :style="{
      backgroundImage: `linear-gradient(to right, ${options.light.secondary}, ${
        !isLight ? options.dark.primary : options.light.secondary
      }, ${options.dark.primary})`,
    }"
    @click="Click"
  >
    <div
      :class="{ dark: !isLight }"
      class="button"
      :style="{
        color: !isLight ? options.light.primary : options.dark.primary,
      }"
    >
      <IonIcon :icon="isLight ? light : dark" />
    </div>
  </section>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { IonIcon } from "@ionic/vue";
import { sunny as light, moon as dark } from "ionicons/icons";
import { ObjectToMap, CustomEvent} from "../../utils";
import themes from "../../theme";

const isLight = ref(localStorage.getItem("colorMode") === "light");
const options = ref(
  ObjectToMap(themes).get(localStorage.getItem("colorTheme")!)
);

const Click = () => {
  localStorage.setItem(
    "colorMode",
    localStorage.getItem("colorMode") === "dark" ? "light" : "dark"
  );
  CustomEvent.EventDispatcher("reload-mode");
};

onMounted(() => {
  CustomEvent.EventListener(
    "reload-theme",
    () =>
      (options.value = ObjectToMap(themes).get(
        localStorage.getItem("colorTheme")!
      ))
  );
  CustomEvent.EventListener("reload-mode", () => {
    isLight.value = localStorage.getItem("colorMode") === "light";
    CustomEvent.EventDispatcher("reload-theme");
  });
});
</script>
<style scoped>
.button-mode {
  outline: 3px solid var(--theme-tertiary);
  padding: 5px 6px;
  width: 77px;
  border-radius: 30px;
  transition: all 300ms ease-out;
}

.dark {
  transform: translateX(35px);
}

.button {
  transition: all 300ms ease-out;
  position: relative;
  height: 30px;
  width: 30px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 26px;
}
</style>
