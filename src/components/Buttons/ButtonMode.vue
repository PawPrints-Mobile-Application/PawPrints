<template>
  <section
    class="button-mode"
    :style="{
      backgroundImage: `linear-gradient(to right, ${ObjectToMap(
        options?.light
      ).get('secondary-background')}, ${
        !isLight
          ? ObjectToMap(options?.dark).get('primary-background')
          : ObjectToMap(options?.light).get('secondary-background')
      }, ${ObjectToMap(options?.dark).get('primary-background')})`,
    }"
    @click="Click"
  >
    <div
      :class="{ dark: !isLight }"
      class="button"
      :style="{
        color: ObjectToMap(!isLight ? options.light : options.dark).get(
          'primary-background'
        ),
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
import { ObjectToMap, CustomEvent } from "../../utils";
import { Set } from "../../server/models/Information";
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
  CustomEvent.EventDispatcher("set-mode");
};

onMounted(() => {
  CustomEvent.EventListener("set-mode", () => {
    isLight.value = localStorage.getItem("colorMode") === "light";
    options.value = ObjectToMap(themes).get(
      localStorage.getItem("colorTheme")!
    );
    Set(
      {
        uid: localStorage.getItem("authID")!,
        email: localStorage.getItem("authEmail")!,
        username: localStorage.getItem("authUsername")!,
        subscription: localStorage.getItem("authType")!,
        theme: localStorage.getItem("colorTheme")!,
        mode: localStorage.getItem("colorMode")!,
      },
      localStorage.getItem("authID")!
    ).then(() => CustomEvent.EventDispatcher("reload-mode"));
  });
});
</script>
<style scoped>
.button-mode {
  outline: 3px solid var(--theme-tertiary-background);
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
