<template>
  <page-layout id="splash-screen-page" :class="{ 'show-content': showContent }">
    <section class="page-content">
      <ImgLogo id="logo" />
      <section class="main-content">
        <h1 id="main-content-title">PawPrints</h1>
        <GuestButton />
        <ButtonModal text="Sign In" />
        <ButtonModal text="Sign Up" />
        <GoogleButton />
      </section>
    </section>
  </page-layout>
</template>

<script lang="ts" setup>
import { PageLayout } from '../../layout';
import { GoogleButton, ButtonModal, GuestButton } from '../../components/Buttons';
import { ImgLogo } from '../../components/Logo';

import { onMounted, ref } from "vue";

import { useIonRouter } from "@ionic/vue";
const ionRouter = useIonRouter();

const showContent = ref(false);
const ShowContent = () => {
  setTimeout(() => {
    showContent.value = true;
    setTimeout(() => ionRouter.navigate("/login", "forward", "replace"), 2000);
  }, 1000);
};

onMounted(() => ShowContent());
</script>

<script lang="ts">
export default {
  name: "SplashToLogin",
  routeInfo: {
    filename: 'SplashToLogin',
    path: '/splashtologin',
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

.show-content #logo::before {
  width: 2000px;
  height: 2000px;
  border-radius: 0;
}

.main-content {
  width: 100%;
  height: 0;
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
  gap: 20px;
  transition: height 1s ease-in-out, opacity 1s ease-in-out 1s;
}

.show-content .main-content {
  height: 350px;
  opacity: 1 !important;
}

#main-content-title {
  font-weight: bold;
  margin: 0;
}

.guest-signin, .button-modal {
  --width: 200px;
  --height: 50px;
}
</style>
