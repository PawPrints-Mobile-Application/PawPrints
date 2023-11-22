<template>
  <section class="navigation-bar">
    <ButtonRippled
      class="dogs"
      :id="isOnTab('dogs') ? 'add-dog-main' : 'tab-dogs'"
      :class="{ clicked: state.dogs, selected: isOnTab('dogs') }"
      @click="clickMiddle"
      @mousehold="console.log(true)"
    >
      <ion-icon :icon="isOnTab('dogs') ? dogsActive : dogsDefault" />
      <TextSmall>{{ state.dogs ? "" : "Dogs" }}</TextSmall>
    </ButtonRippled>

    <ButtonIcon
      class="home button"
      :class="{ selected: isOnTab('home') }"
      :icon="isOnTab('home') ? homeActive : homeDefault"
      @click="Navigate('/home')"
      label="Home"
    />
    <ButtonIcon
      class="forums button middle"
      :class="{ selected: isOnTab('forums') }"
      :icon="isOnTab('forums') ? forumsActive : forumsDefault"
      @click="Navigate('/forums')"
      label="Forums"
    />
    <div class="divider" />
    <ButtonIcon
      class="maps button middle"
      :class="{ selected: isOnTab('maps') }"
      :icon="isOnTab('maps') ? mapsActive : mapsDefault"
      @click="Navigate('/maps')"
      label="Maps"
    />
    <ButtonIcon
      class="settings button"
      :class="{ selected: isOnTab('settings') }"
      :icon="isOnTab('settings') ? settingsActive : settingsDefault"
      @click="Navigate('/settings')"
      label="Settings"
    />
  </section>
  <ModalAddDog :isOpen="isOpen" @dismiss="() => isOpen = false" />
</template>
<script setup lang="ts">
import {
  albumsOutline as homeDefault,
  albums as homeActive,
  pawOutline as dogsDefault,
  add as dogsActive,
  bulbOutline as forumsDefault,
  bulb as forumsActive,
  mapOutline as mapsDefault,
  map as mapsActive,
  settingsOutline as settingsDefault,
  settings as settingsActive,
} from "ionicons/icons";
import { ModalAddDog } from "../Modals";
import { ButtonIcon, ButtonRippled } from "../Buttons";
import { TextSmall } from "../Texts";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import {
  useIonRouter,
  useBackButton,
  IonIcon,
} from "@ionic/vue";
import { App } from "@capacitor/app";
useBackButton(-1, () => {
  if (!ionRouter.canGoBack()) {
    App.exitApp();
  }
});

const isOpen = ref(false);

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
  navigating: false,
});

const clickMiddle = () => {
  if (state.navigating) return;
  if (!isOnTab("dogs")) {
    console.log(true);
    state.navigating = true;
    state.dogs = true;
    setTimeout(() => {
      Navigate("/dogs", false, true);
      setTimeout(() => {
        state.dogs = false;
        setTimeout(() => (state.navigating = false), 150);
      }, 150);
    }, 250);
  } else isOpen.value = true;
};

const Navigate = (
  target: string,
  resetTime: boolean = true,
  offResetriction: boolean = false
) => {
  if (state.navigating && !offResetriction) return;
  state.navigating = true;
  ionRouter.navigate(target, "forward", "push");
  if (resetTime) setTimeout(() => (state.navigating = false), 100);
};
</script>
<style scoped>
.navigation-bar {
  min-width: 100%;
  height: 56px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: var(--ion-color-primary);
  border-top: 2px solid var(--ion-color-white-shade);
}

.dogs {
  --button-size: 60px;
  --size: 30px;
  width: var(--button-size);
  height: var(--button-size);
  display: flex;
  flex-direction: column;
  position: absolute;
  border-radius: 100%;
  transform: translate(0px, -7px);
  z-index: 2;
  outline: 2px solid var(--ion-color-black);
  color: var(--ion-color-primary);

  &.selected {
    --size: 40px;

    > .text-small {
      transform: translateY(-5px);
    }
  }
}

.clicked {
  --button-size: 250svh;
  --size: 70px;
  transform: translate(0px, -15px);
}

.button {
  flex: 1 0 0;
  border-radius: 0px;
  --button-size: 56px;
  min-width: 20px;
  --size: 25px;
  z-index: 1;
  color: var(--ion-color-black);
  background-color: var(--ion-color-primary) !important;

  &.selected {
    color: var(--ion-color-tertiary);
  }
}

.selected {
  font-weight: 700;
}

.middle {
  min-width: 30px;
}

.divider {
  width: 50px;
  height: 100%;
}
</style>
