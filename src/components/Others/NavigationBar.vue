<template>
  <section class="navigation-bar">
    <ButtonRippled
      :class="[
        {
          clicked: state.dogs,
          selected: isOnTab('dogs'),
          zoom: isTab('/dogs'),
        },
        GetMiddleButton().class,
        'button-middle',
      ]"
      @click="clickMiddle"
      @mousehold="console.log(true)"
    >
      <section class="icon">
        <ion-icon :icon="GetMiddleButton().iconBack" />
        <ion-icon v-show="GetMiddleButton().class !== 'dogs'" :icon="addIcon" />
      </section>
      <TextSmall v-show="GetMiddleButton().class === 'dogs'">Dogs </TextSmall>
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
</template>
<script setup lang="ts">
import {
  pawOutline as dogsDefault,
  add as addIcon,
  paw as pawIcon,
  document as documentIcon,
  albumsOutline as homeDefault,
  albums as homeActive,
  bulbOutline as forumsDefault,
  bulb as forumsActive,
  mapOutline as mapsDefault,
  map as mapsActive,
  settingsOutline as settingsDefault,
  settings as settingsActive,
} from "ionicons/icons";
import { CustomEvent } from "../../utils";
import { ButtonIcon, ButtonRippled } from "../Buttons";
import { TextSmall } from "../Texts";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useIonRouter, useBackButton, IonIcon } from "@ionic/vue";
import { App } from "@capacitor/app";
useBackButton(-1, () => {
  if (!ionRouter.canGoBack()) {
    App.exitApp();
  }
});

const options = [
  {
    class: "dogs",
    label: "Dogs",
    iconBack: dogsDefault,
  },
  {
    class: "add-dog",
    label: "Dog",
    iconBack: pawIcon,
  },
  {
    class: "add-log",
    label: "Log",
    iconBack: documentIcon,
  },
];

const GetMiddleButton = () => {
  const selected = isOnTab("/dogs") ? (isTab("/dogs") ? 1 : 2) : 0;
  return options[selected];
};

const ionRouter = useIonRouter();
const router = useRouter();
const isOnTab = (path: string) =>
  router.currentRoute.value.path.toLowerCase().includes(path.toLowerCase());
const isTab = (path: string) =>
  router.currentRoute.value.path.toLowerCase() === path.toLowerCase();

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
  if (!isOnTab("/dogs")) {
    state.navigating = true;
    state.dogs = true;
    setTimeout(() => {
      Navigate("/dogs", false, true);
      setTimeout(() => {
        state.dogs = false;
        setTimeout(() => (state.navigating = false), 150);
      }, 150);
    }, 250);
  } else if (!isTab("/dogs")) CustomEvent.EventDispatcher("modal-log-add");
  else CustomEvent.EventDispatcher("modal-dog-add");
};

const Navigate = (
  target: string,
  resetTime: boolean = true,
  offResetriction: boolean = false
) => {
  if (state.navigating && !offResetriction) return;
  state.navigating = true;
  ionRouter.navigate(target, 'forward', "push");
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
  background-color: var(--theme-primary-background);
  border-top: 2px solid var(--theme-tertiary-background);
}

.text-small {
  font-size: 10px;
}
.button-middle {
  --button-size: 60px;
  --size: 40px;
  width: var(--button-size);
  height: var(--button-size);
  display: flex;
  flex-direction: column;
  position: absolute;
  border-radius: 100%;
  outline: 2px solid var(--theme-black);
  background-color: var(--theme-tertiary-background);
  color: var(--theme-tertiary-text);
  z-index: 2;
  overflow: hidden;
  transform: translate(0px, -7px);
  transition: all 300ms ease-out;
  opacity: 1;

  &.selected {
    transform: translate(0px, -9px);
  }

  .icon {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: var(--size);

    > ion-icon:nth-child(1) {
      font-size: var(--size);
      color: var(--theme-button-middle-text);
    }

    > ion-icon:nth-child(2) {
      font-size: 18px;
      position: absolute;
      color: var(--theme-tertiary-background);
    }
  }

  .text-small {
    position: relative;
    color: var(--theme-button-middle-text);
    transform: translateY(-2px);
  }
}

.add-dog {
  --size: 40px;
  margin-top: 5px;
  .icon {
    height: var(--size);

    > ion-icon:nth-child(2) {
      transform: translateY(6px);
      font-size: 18px;
    }
  }

  .text-small {
    transform: translateY(-1px);
  }
}

.add-log {
  --size: 40px;
  .icon {
    height: var(--size);
    transform: translate(1px, 0px);

    > ion-icon:nth-child(2) {
      transform: translate(0px, 6px);
      font-size: 20px;
    }
  }

  .text-small {
    transform: translateY(0px);
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
  color: var(--theme-primary-text);
  background-color: var(--theme-primary-background);

  &.selected {
    color: var(--theme-tertiary-background);
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
