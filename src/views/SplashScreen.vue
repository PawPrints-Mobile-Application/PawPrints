<template>
  <page-layout id="splash-screen-page" :class="{ 'show-content': showContent }">
    <template #pageContent>
      <ImgLogo id="logo" :class="{ 'show-thumbnail': showThumbnail }" />
      <ion-spinner
        class="login-loading"
        v-show="!showContent && showLoading"
        :class="{ 'show-loading': showLoading }"
        name="lines"
        color="primary"
      />
      <section class="main-content">
        <h1 id="main-content-title">PawPrints</h1>
        <Button color="tertiary">Sign In</Button>
        <Button color="tertiary">Sign Up</Button>
        <GoogleButton />
      </section>
    </template>
  </page-layout>
</template>

<script lang="ts" setup>
import PageLayout from "../components/PageLayout.vue";
import { IonSpinner } from "@ionic/vue";
import GoogleButton from "../components/Buttons/GoogleButton.vue";
import Button from "../components/Buttons/Button.vue";
import ImgLogo from "../components/Logo/ImgLogo.vue";

import { useIonRouter } from "@ionic/vue";
const ionRouter = useIonRouter();
setTimeout(() => ionRouter.navigate("/login", "forward", "replace"), 4000);

// Redirection Process:
// Check auth first if login already, then move to Home Page if so. If not, move to Login Page.
</script>

<script lang="ts">
import { PawPrints } from "../assets/images";
import { ref } from "vue";

const showThumbnail = ref(false);
const showLoading = ref(false);
const showContent = ref(false);
const ShowContent = () => {
  setTimeout(() => {
    showThumbnail.value = true;
    setTimeout(() => {
      showLoading.value = true;
      setTimeout(() => (showContent.value = true), 1000);
    }, 500);
  }, 1000);
};

export default {
  name: "SplashScreen",
  data() {
    return {
      showContent,
      showLoading,
      PawPrints,
    };
  },
  mounted() {
    ShowContent();
  },
};
</script>

<style scoped>
:root {
  --start-up-delay: 5s;
  --show-content-delay: 11.5s;
}

#splash-screen-page {
  height: 100%;
  background-color: var(--ion-color-tertiary);
  --page-content-justify-content: center;
  transition: all 0.5s ease-in;
}

#logo {
  --width: 100px;
  opacity: 0;

  transition: opacity 250ms ease-out, width 500ms ease-in, height 450ms ease-out, background-color 500ms ease 1500ms;
}

.show-thumbnail {
  --background-color: var(--ion-color-primary);
  --width: 250px !important;
  opacity: 1 !important;
}

#logo::before {
  position: absolute;
  content: '';
  background-color: var(--background-color);
  width: 10px;
  height: 10px;
  border-radius: 100%;
  z-index: -1;
  transition: all 800ms ease-in 200ms;
}

.show-content #logo::before {
  width: 1500px;
  height: 1500px;
  border-radius: 0;
}

.login-loading {
  position: absolute;
  bottom: 25%;
  width: 80px;
  height: 80px;
  opacity: 0;
  transition: all 500ms ease-out;
}

.show-loading {
  opacity: 1 !important;
}

.show-loading + .main-content {
  height: 200px !important;
}

#main-content-title {
  font-weight: bold;
}

.main-content {
  width: 100%;
  height: 0;
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
  transition: height 1s ease-in-out, opacity 1s ease-in-out 1s;
}

.show-content {
  /* background-color: var(--ion-color-primary) !important; */
}

.show-content .main-content {
  opacity: 1 !important;
}

.button {
  position: relative;
  --min-width: 250px;
}
</style>
