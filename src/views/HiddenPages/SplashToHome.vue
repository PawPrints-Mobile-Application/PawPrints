<template>
  <page-layout id="splash-screen-page" :class="{ 'background-grow': animation.backgroundGrow }">
    <section class="page-content">
      <div class="logo-wrapper" :class="{'turn-small': animation.turnSmall}"><ImgLogo id="logo"/></div>
      
    </section>
  </page-layout>
</template>

<script lang="ts" setup>
import { PageLayout } from '../../layout';
import { ImgLogo } from '../../components/Logo';

import { onMounted, reactive } from "vue";

import { useIonRouter } from "@ionic/vue";
const ionRouter = useIonRouter();

const animation = reactive({
  backgroundGrow: false,
  turnSmall: false
});

onMounted(() => {
  setTimeout(() => {
    animation.backgroundGrow = true
    setTimeout(() => {
      animation.turnSmall = true
      setTimeout(() => ionRouter.navigate("/home", "forward", "replace"), 1500);
    }, 500);
  }, 1000);
});
</script>

<script lang="ts">
export default {
  name: "SplashToHome",
  routeInfo: {
    filename: 'SplashToHome',
    path: '/splashtohome',
    meta: {
      requiresAuth: false,
      requiresInternet: false
    }
  }
};
</script>

<style scoped>
#splash-screen-page {
  height: 100%;
  background-color: var(--ion-color-tertiary);
  --page-content-justify-content: center;
  transition: all 0.5s ease-in;
}

.page-content {
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-end;
  width: 100%;
  height: 100%;
}

.logo-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 1000ms ease-out 200ms;
}

#logo {
  --background-color: var(--ion-color-primary);
  --width: 240px;
}

#logo::before {
  position: absolute;
  content: "";
  background-color: var(--background-color);
  width: 10px;
  height: 10px;
  border-radius: 100%;
  z-index: -1;
  transition: all 800ms ease-in 200ms;
}

.background-grow #logo::before {
  width: 1500px;
  height: 1500px;
  border-radius: 0;
}

.turn-small {
  width: 80px;
  height: 80px;
  margin-top: 5px;
}

.turn-small #logo {
  --width: max-content;
}
</style>
