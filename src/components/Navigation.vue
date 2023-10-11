<template>
  <ion-page class="main-page">
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar class="tab-bar" slot="bottom">
        <ion-tab-button
          v-for="route in navPages"
          :id="`tab-button-${route.name}`"
          class="tab-button"
          :tab="route.name"
          :href="route.path"
          layout="icon-start"
        >
          <ion-icon
            :icon="route.icons[route.path === currentRoute ? 0 : 1]"
            :color="route.path === currentRoute ? 'tertiary' : 'secondary'"
          />
          <!-- <ion-label>{{ route.name }}</ion-label> -->
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonIcon,
} from "@ionic/vue";
import { navPages } from "../views/index";
import { ref, watchEffect } from "vue";
const currentRoute = ref("");

export default {
  name: "Navigation",
  components: {
    IonPage,
    IonTabs,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonLabel,
    IonIcon,
  },
  data() {
    currentRoute.value = this.$router.currentRoute.value.path;
    return {
      navPages,
      currentRoute,
    };
  },
  mounted() {
    watchEffect(async () => {
      currentRoute.value = this.$router.currentRoute.value.path;
    });
  },
};
</script>

<style scoped>
.tab-bar {
  --background: var(--ion-color-primary);
}

.tab-button {
  --ripple-color: var(--ion-color-tertiary);
}

.tab-button::after {
  content: '';
  --width: calc(80vw / 4);
  --height: 40px;
  border-radius: 10px;
  width: var(--width);
  height: var(--height);
  position: absolute;
  transform: translate(calc((-3px - var(--width) / 2)),calc((-28px - var(--height) / 2)));
}
</style>
