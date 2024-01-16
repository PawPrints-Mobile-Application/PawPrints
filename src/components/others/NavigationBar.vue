<template>
  <section class="navigation-bar">
    <NavigationTab
      :icons="{
        default: homeDefault,
        active: homeActive,
      }"
      target="/home"
      label="Home"
    />
    <NavigationTab
      :icons="{
        default: forumsDefault,
        active: forumsActive,
      }"
      target="/forums"
      label="Forums"
    />
    <NavigationCenter
      :icon="dogsDefault"
      target="/dogs"
      label="Dogs"
    />
    <NavigationTab
      :icons="{
        default: mapDefault,
        active: mapActive,
      }"
      target="/map"
      label="Map"
    />
    <NavigationTab
      :icons="{
        default: settingsDefault,
        active: settingsActive,
      }"
      target="/settings"
      label="Settings"
    />
  </section>
</template>
<script setup lang="ts">
import { NavigationCenter, NavigationTab } from "..";
import {
    pawOutline as dogsDefault,
  //   add as addIcon,
  //   paw as pawIcon,
  //   document as documentIcon,
  albumsOutline as homeDefault,
  albums as homeActive,
  bulbOutline as forumsDefault,
  bulb as forumsActive,
  mapOutline as mapDefault,
  map as mapActive,
  settingsOutline as settingsDefault,
  settings as settingsActive,
} from "ionicons/icons";
// import { TextSmall } from "../Texts";
// import { reactive } from "vue";
// import { useRouter } from "vue-router";
// import { useIonRouter } from "@ionic/vue";
// import { PawprintsEvent } from '../../utils';

// const ionRouter = useIonRouter();
// const router = useRouter();
// const isOnTab = (path: string) =>
//   router.currentRoute.value.path.toLowerCase().includes(path.toLowerCase());
// const isTab = (path: string) =>
//   router.currentRoute.value.path.toLowerCase() === path.toLowerCase();

// const state = reactive({
//   home: false,
//   forums: false,
//   dogs: false,
//   maps: false,
//   settings: false,
//   navigating: false,
// });

// const clickMiddle = () => {
//   if (state.navigating) return;
//   if (!isOnTab("/dogs")) {
//     state.navigating = true;
//     state.dogs = true;
//     setTimeout(() => {
//       Navigate("/dogs", false, true);
//       setTimeout(() => {
//         state.dogs = false;
//         setTimeout(() => (state.navigating = false), 150);
//       }, 150);
//     }, 250);
//   } else if (!isTab("/dogs")) PawprintsEvent.EventDispatcher("modal-log-add");
//   else PawprintsEvent.EventDispatcher("modal-dog-add");
// };

// const Navigate = (
//   target: string,
//   resetTime: boolean = true,
//   offResetriction: boolean = false
// ) => {
//   if (state.navigating && !offResetriction) return;
//   state.navigating = true;
//   ionRouter.navigate(target, "forward", "push");
//   if (resetTime) setTimeout(() => (state.navigating = false), 100);
// };
</script>
<style scoped>
.navigation-bar {
  height: 56px;
  display: flex;
  justify-content: space-evenly;
  align-items: stretch;
  background-color: var(--theme-primary-background);
  border-top: 2px solid var(--theme-tertiary-background);
}
</style>
