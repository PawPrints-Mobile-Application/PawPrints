<template>
  <section
    class="button-mode"
    :style="{
      backgroundImage: `linear-gradient(to right, ${ObjectToMap(
        options.light
      ).get('secondary-background')}, ${
        !isLight
          ? ObjectToMap(options.dark).get('primary-background')
          : ObjectToMap(options.light).get('secondary-background')
      }, ${ObjectToMap(options.dark).get('primary-background')})`,
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
import { computed, onMounted, onUnmounted, ref } from "vue";
import { IonIcon } from "@ionic/vue";
import { sunny as light, moon as dark } from "ionicons/icons";
import { ObjectToMap, PawprintsEvent, Themes, UserInfo } from "../../utils";

const CheckActive = () => Themes.Get().mode === "light";
const SetActive = () => (isLight.value = CheckActive());
const isLight = ref(CheckActive());

const options = computed(() =>
  ObjectToMap(Themes.themes).get(Themes.Get().theme)
);

const Click = () => {
  const theme = Themes.Get().theme;
  UserInfo.SetTheme(theme, isLight.value ? "dark" : "light");
  PawprintsEvent.EventDispatcher("set-themes");
};

onMounted(() => {
  PawprintsEvent.AddEventListener("updated-themes", SetActive);
});

onUnmounted(() => {
  PawprintsEvent.RemoveEventListener("updated-themes", SetActive);
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
