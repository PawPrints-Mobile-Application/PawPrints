<template>
  <IonPage class="splash" :class="{ show: state.logo }">
    <div
      class="drop"
      :class="{ enlarge: (state.out || state.show) && state.ready }"
    />
    <Avatar
      :class="{
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
  reactive,
  watch,
  onUnmounted,
} from "vue";
import { PawprintsEvent } from "../utils";
import { useIonRouter, IonPage } from "@ionic/vue";
const ionRouter = useIonRouter();
const Navigate = () =>
  ionRouter.navigate(state.out ? "/home" : "/auth", "forward", "replace");

const state = reactive({
  logo: false,
  ready: false,

  out: false, //home
  show: false, //auth
});

const StateMover = (userFound: boolean) => {
  if (userFound) state.out = true;
  else state.show = true;
};

watch(
  () => state.ready && (state.out || state.show),
  () => setTimeout(Navigate, state.out ? 1000 : 1000)
);

onBeforeMount(() => {
  PawprintsEvent.AddEventListener('user-finder', StateMover);
});

onMounted(() => {
  setTimeout(() => (state.logo = true), 550);
  setTimeout(() => (state.ready = true), 1300);
});

onUnmounted(() => {
  PawprintsEvent.RemoveEventListener('user-finder', StateMover);
});
</script>
<style scoped>
.splash {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  transition: all 200ms ease-out;
}

.show {
  background-color: var(--theme-tertiary-background);

  > .avatar {
    opacity: 1;
    width: 200px;
    height: 200px;
  }
}

.avatar {
  opacity: 0;
  --size: 0;
  transition: width 100ms ease-in 800ms, height 200ms ease-out 800ms,
    opacity 20ms ease-out 800ms, transform 500ms ease-out 800ms;

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
