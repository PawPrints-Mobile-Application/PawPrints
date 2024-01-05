<template>
  <button
    class="navigation-tab button ion-activatable ion-focusable"
    @click="Navigate"
    :class="{ active: state }"
  >
    <IonIcon :icon="state ? icons.active : icons.default" />
    <TextSmall :value="label" />
    <ion-ripple-effect />
  </button>
</template>
<script setup lang="ts">
import { IonIcon, IonRippleEffect, useIonRouter } from "@ionic/vue";
import { useRouter } from "vue-router";
import { TextSmall } from "..";
import { PropType, computed } from "vue";

const ionRouter = useIonRouter();
const router = useRouter();
const isOnTab = () =>
  router.currentRoute.value.path
    .toLowerCase()
    .includes(props.target.toLowerCase());
// const isTab = () =>
//   router.currentRoute.value.path.toLowerCase() === props.target.toLowerCase();
const Navigate = () => ionRouter.navigate(props.target, "forward", "replace");

const state = computed(isOnTab);

const props = defineProps({
  icons: {
    type: Object as PropType<{ default: string; active: string }>,
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
.navigation-tab {
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  background-color: var(--theme-primary-background);
  color: var(--theme-tertiary-background);
}

ion-icon {
  font-size: 20px;
  color: var(--theme-primary-text);
  transition: color 100ms ease-out;
}

.text-small {
  color: var(--theme-primary-text);
}

.active {
  > ion-icon {
    color: var(--theme-tertiary-background);
  }
}
</style>
