<template>
  <section class="navigation-bar">
    <ButtonIcon
      class="dogs"
      :class="{ clicked: state.dogs }"
      :icon="dogs"
      @click="clickMiddle"
    />

    <ButtonIcon
      class="home button"
      :class="{ clicked: state.home }"
      :icon="home"
      @click="Navigate('/home')"
    />
    <ButtonIcon
      class="forums button middle"
      :class="{ clicked: state.forums }"
      :icon="forums"
      @click="Navigate('/forums')"
    />
    <div class="divider" />
    <ButtonIcon
      class="maps button middle"
      :class="{ clicked: state.maps }"
      :icon="maps"
      @click="Navigate('/maps')"
    />
    <ButtonIcon
      class="settings button"
      :class="{ clicked: state.settings }"
      :icon="settings"
      @click="Navigate('/settings')"
    />
  </section>
</template>
<script setup lang="ts">
import {
  albums as home,
  bulb as forums,
  paw as dogs,
  settings,
  map as maps,
} from "ionicons/icons";
import { ButtonIcon } from "../Buttons";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useIonRouter, useBackButton } from "@ionic/vue";
import { App } from "@capacitor/app";
useBackButton(-1, () => {
  if (!ionRouter.canGoBack()) {
    App.exitApp();
  }
});

const ionRouter = useIonRouter();
const router = useRouter();
const isOnTab = (path: string) =>
  router.currentRoute.value.path.toLowerCase().includes(path.toLowerCase());

const state = reactive({
  home: false,
  forums: false,
  dogs: false,
  maps: false,
  settings: false,
});
const clickMiddle = () => {
  state.dogs = true;
  setTimeout(() => Navigate("/dogs"), 250);
  setTimeout(() => (state.dogs = false), 500);
};

const Navigate = (target: string) =>
  ionRouter.navigate(target, "forward", "push");
</script>
<style scoped>
.navigation-bar {
  min-width: 100%;
  height: 56px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: var(--ion-color-tertiary);
}

.dogs {
  position: absolute;
  border-radius: 100%;
  --button-size: 35svw;
  --size: 55px;
  transform: translate(0px, -10px);
  z-index: 2;
  outline: 2px solid var(--ion-color-black);
}

.button {
  flex: 1 0 0;
  border-radius: 0px;
  --transform: translateX(15svw);
  --button-size: 56px;
  min-width: 20px;
  --size: 30px;
  z-index: 1;
}

.middle {
  min-width: 30px;
}

.divider {
  width: 35svw;
  height: 100%;
}

.settings {
  border-radius: 0px;
  right: 0;
  --transform: translateX(15svw);
  --button-size: 56px;
  --size: 35px;
  z-index: 1;
}

.clicked {
  --button-size: 400svw;
}
</style>
