<template>
  <section class="navigation-center">
    <section
      class="center button ion-activatable ion-focusable"
      @click="Navigate"
      :class="{ active: isOnTab(), grow: animation.grow }"
    >
      <div class="icons">
        <IonIcon class="icon-main" :icon="icon" :class="{ show: !isOnTab() }" />
        <IonIcon class="icon-main" :icon="pawIcon" :class="{ show: isTab() }" />
        <IonIcon
          class="icon-main"
          :class="{ show: isOnTab() && !isTab() }"
          :icon="documentIcon"
        />
        <IonIcon class="icon-add" :icon="addIcon" />
      </div>
      <TextSmall :value="'Dogs'" />
      <ion-ripple-effect />
    </section>
  </section>
</template>
<script setup lang="ts">
import { IonIcon, IonRippleEffect, useIonRouter } from "@ionic/vue";
import { useRouter } from "vue-router";
import { TextSmall } from "..";
import { reactive } from "vue";
import {
  add as addIcon,
  paw as pawIcon,
  document as documentIcon,
} from "ionicons/icons";
import { PawprintsEvent } from "../../utils";

const animation = reactive({
  grow: false,
  readyToClick: true,
});

const ionRouter = useIonRouter();
const router = useRouter();
const isOnTab = () =>
  router.currentRoute.value.path
    .toLowerCase()
    .includes(props.target.toLowerCase());
const isTab = () =>
  router.currentRoute.value.path.toLowerCase() === props.target.toLowerCase();
const Navigate = () => {
  if (!animation.readyToClick) return;
  const action = isOnTab()
    ? isTab()
      ? "modal-add-dog"
      : "modal-add-log"
    : "move";
  switch (action) {
    case "move":
      animation.grow = true;
      animation.readyToClick = false;
      setTimeout(() => {
        animation.grow = false;
        ionRouter.navigate("/dogs", "forward", "replace");
      }, 400);
      setTimeout(() => {
        animation.readyToClick = true;
      }, 800);
      break;
    default:
      PawprintsEvent.EventDispatcher(action);
      break;
  }
};

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  target: {
    type: String,
    required: true,
  },
});
</script>
<style scoped>
.navigation-center {
  width: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
}

.center {
  position: absolute;
  overflow: hidden;
  width: 70px;
  height: 70px;
  border-radius: 100%;
  background-color: var(--theme-primary-background);
  border: 5px solid var(--theme-tertiary-background);
  color: var(--theme-tertiary-background);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: background-color 600ms ease-out, width 600ms ease-out,
    height 600ms ease-out;
}

.icons {
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon-main {
  font-size: 40px;
  color: var(--theme-primary-text);
  transition: all 300ms ease-out;

  &:not(.show) {
    position: absolute;
    opacity: 0;
  }
}

.icon-add {
  position: absolute;
  transform: translateY(6px);
  color: var(--theme-tertiary-text);
  transition: all 300ms ease-out;
  opacity: 0;
}

.text-small {
  color: var(--theme-primary-text);
  transition: all 300ms ease-out;
}

.active {
  background-color: var(--theme-tertiary-background);

  > div .icon-main {
    color: var(--theme-tertiary-text);
  }

  > .text-small {
    font-weight: 700;
  }

  > div .icon-add {
    opacity: 1;
    color: var(--theme-tertiary-background);
  }
}

.grow {
  width: 5000px;
  height: 5000px;
  background-color: var(--theme-tertiary-background);

  > div .icon-main {
    transform: scale(1.5) translateY(-10px);
  }

  > .text-small {
    transform: scale(1.5) translateY(-5px);
  }

  > div .icon-add {
    transform: scale(1.3) translateY(-4px);
  }
}
</style>
