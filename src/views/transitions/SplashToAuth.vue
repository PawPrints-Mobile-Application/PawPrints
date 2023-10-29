<template>
  <page-layout :class="{ 'show-content': showContent }">
    <div class="logo-wrapper" :class="{ 'logo-move': logoMove }">
      <ImgLogo id="logo" />
    </div>
    <section class="main-content">
      <h1 class="text text-title font-poppins font-bold">PawPrints</h1>
      <TextButton label="Guest" />
      <TextButton label="Sign In" />
      <TextButton label="Sign Up" />
      <IconButton class="button-google" :icon="icon" />
    </section>
  </page-layout>
</template>

<script lang="ts" setup>
import { PageLayout } from "../../layout";
import { logoGoogle as icon } from "ionicons/icons";
import { TextButton, IconButton } from "../../components/Buttons";
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
    setTimeout(() => ionRouter.navigate("/auth", "forward", "replace"), 900);
  }, 300);
};

onMounted(() => ShowContent());
</script>

<script lang="ts">
export default {
  name: "SplashToAuth",
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
  transition: opacity 500ms ease-in-out 500ms;
}

.show-content .main-content {
  height: 350px;
  opacity: 1 !important;
}

#main-content-title {
  font-weight: bold;
  margin: 0;
}

.button-google {
  background-color: var(--ion-color-tertiary);
  --size: var(--fs6);
  --padding: 7px;
}

.text-button {
  width: 200px;
  height: 40px;
}

.icon-button {
  --size: var(--fs0);
}
</style>
