<template>
  <page-layout>
    <div
      class="logo-wrapper"
      :class="{ 'logo-out': logoOut, 'background-grow': backgroundGrow }"
    >
      <ImgLogo id="logo" />
    </div>
  </page-layout>
</template>

<script lang="ts" setup>
import { PageLayout } from "../../layout";
import { ImgLogo } from "../../components/Logo";

import { onMounted, ref } from "vue";

import { useIonRouter } from "@ionic/vue";
const ionRouter = useIonRouter();

const backgroundGrow = ref(false);
const logoOut = ref(false);
onMounted(() => {
  setTimeout(() => {
    backgroundGrow.value = true;
    setTimeout(() => {
      logoOut.value = true;
      setTimeout(() => ionRouter.navigate("/home", "forward", "replace"), 900);
    }, 200);
  }, 300);
});
</script>

<script lang="ts">
export default {
  name: "SplashToHome",
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

#logo {
  --background-color: var(--ion-color-primary);
  --width: 240px;
  transition: all 800ms ease-in 1000ms;
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

.background-grow #logo::before {
  width: 2000px;
  height: 2000px;
  border-radius: 0;
}

.logo-out {
  transform: translateY(-500px);
}
</style>
