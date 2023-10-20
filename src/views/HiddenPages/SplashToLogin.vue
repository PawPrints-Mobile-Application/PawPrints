<template>
  <page-layout :class="{ 'show-content': showContent }">
    <div class="logo-wrapper" :class="{ 'logo-move': logoMove }">
      <ImgLogo id="logo" />
    </div>
    <section class="main-content">
      <h1 id="main-content-title">PawPrints</h1>
      <GuestButton />
      <ButtonModal text="Sign In" />
      <ButtonModal text="Sign Up" />
      <GoogleButton />
    </section>
  </page-layout>
</template>

<script lang="ts" setup>
import { PageLayout } from "../../layout";
import {
  GoogleButton,
  ButtonModal,
  GuestButton,
} from "../../components/Buttons";
import { ImgLogo } from "../../components/Logo";

import { onMounted, ref } from "vue";

import { useIonRouter } from "@ionic/vue";
const ionRouter = useIonRouter();

const showContent = ref(false);
const logoMove = ref(false);
const ShowContent = () => {
  setTimeout(() => {
    logoMove.value = true;
    showContent.value = true;
    setTimeout(() => ionRouter.navigate("/login", "forward", "replace"), 1500);
  }, 300);
};

onMounted(() => ShowContent());
</script>

<script lang="ts">
export default {
  name: "SplashToLogin",
  routeInfo: {
    filename: "SplashToLogin",
    path: "/splashtologin",
    meta: {
      requiresAuth: false,
      requiresInternet: false,
    },
  },
};
</script>

<style scoped>
.page-layout {
  --padding-side: 0 !important;
  --background-color: var(--ion-color-tertiary);
  --page-content-justify-content: center;
  transition: all 500ms ease-in;
}

.logo-wrapper {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 500ms ease-in;
}

.logo-move {
  bottom: 30%;
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
  transition: all 800ms ease-in;
}

.logo-move #logo::before {
  width: 2000px;
  height: 2000px;
  border-radius: 0;
}

.main-content {
  position: absolute;
  top: 35%;
  width: 100%;
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
  gap: 20px;
  transition: opacity 1s ease-in-out 500ms;
}

.show-content .main-content {
  height: 350px;
  opacity: 1 !important;
}

#main-content-title {
  font-weight: bold;
  margin: 0;
}
</style>
