<template>
  <IonPage class="splash">
    <div
      class="drop"
      :class="{ enlarge: (state.out || state.show) && state.ready }"
    />
    <Avatar
      :class="{
        show: state.logo,
        out: state.out && state.ready,
      }"
    />
  </IonPage>
</template>
<script setup lang="ts">
import { Avatar } from "../components";
import {
  onBeforeMount,
  onMounted,
  onBeforeUnmount,
  reactive,
  watch,
} from "vue";
import { PawprintsEvent } from "../utils";
import { useIonRouter, IonPage } from "@ionic/vue";
const ionRouter = useIonRouter();
const Navigate = () =>
  ionRouter.navigate(state.out ? "/home" : "/auth", "forward", "replace");

const state = reactive({
  logo: false,
  ready: false,

  out: false,
  show: false,
});

const StateMover = (destination: string) => {
  if (destination === "home") state.out = true;
  else state.show = true;
};

onBeforeMount(() => {
  ["home", "auth"].forEach((state) =>
    PawprintsEvent.AddEventListener(`transition to ${state}`, () =>
      StateMover(state)
    )
  );
});

onBeforeUnmount(() => {
  ["home", "auth"].forEach((state) =>
    PawprintsEvent.RemoveEventListener(`transition to ${state}`, () =>
      StateMover(state)
    )
  );
});

watch(
  () => state.ready && (state.out || state.show),
  () => setTimeout(Navigate, state.out ? 1000 : 1000)
);

onMounted(() => {
  setTimeout(() => (state.logo = true), 50);
  setTimeout(() => (state.ready = true), 800);
});
</script>
<style scoped>
.splash {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.avatar {
  opacity: 0;
  --size: 0;
  transition: width 100ms ease-in 800ms, height 200ms ease-out 800ms,
    opacity 20ms ease-out 800ms, transform 500ms ease-out 800ms;

  &.show {
    opacity: 1;
    width: 200px;
    height: 200px;
  }

  &.out {
    transform: translateY(-1000px);
  }
}

.drop {
  position: absolute;
  width: 0px;
  aspect-ratio: 1;
  border-radius: 100%;
  z-index: -1;
  background-color: var(--theme-primary-background);
  transition: width 1200ms ease-out 400ms, opacity 50ms ease-out;

  &.enlarge {
    width: 5000px;
  }
}
</style>

<style>
:root {
  background-color: var(--theme-tertiary-background);
}
</style>
