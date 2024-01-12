<template>
  <section
    class="button-theme text small"
    :style="{
      backgroundColor: ObjectToMap(options.light).get('tertiary-background'),
      color: ObjectToMap(options.light).get('button-middle-text'),
    }"
    :class="{ selected: active }"
    @click="Click"
  >
    {{ props.name! }}
  </section>
</template>
<script setup lang="ts">
import { PawprintsEvent, Themes, UserInfo } from "../../utils";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { ObjectToMap } from "../../utils";
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});

const CheckActive = () => props.name === Themes.Get().theme;
const SetActive = () => (active.value = CheckActive());
const active = ref(CheckActive());

const options = computed(() => ObjectToMap(Themes.themes).get(props.name));

const Click = () => {
  UserInfo.SetTheme(props.name, Themes.Get().mode);
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
  outline: 2px solid var(--theme-tertiary-text);
  opacity: 1;
  font-weight: 700;
}
</style>
