<template>
  <page-layout id="splash-screen-page"
  :class="{ 'show-content': showContent }">
    <template #pageContent>
      <img
        id="logo"
        :class="{ 'show-thumbnail': showThumbnail }"
        :src="PawPrints"
        alt="PawPrints"
      />
        <ion-spinner
        class="login-loading"
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
import { useIonRouter } from "@ionic/vue";
const ionRouter = useIonRouter();
setTimeout(() => ionRouter.navigate("/login", "forward", "replace"), 6000);

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
    showThumbnail.value = true
    setTimeout(() => {
      showLoading.value = true
      setTimeout(() => (showContent.value = true), 3000);
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
  --width: 150px;
  min-width: var(--width);
  max-width: var(--width);
  width: 150px;
  opacity: 0;

  /* width: 80%;
  min-width: 150px;
  max-width: 400px;
  height: max-content; */
  transition: opacity 500ms ease-out, min-width 1000ms ease-in-out;
}

.show-thumbnail {
  --width: 250px !important;
  opacity: 1 !important;
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
  background-color: var(--ion-color-primary) !important;
}

.show-content .main-content {
  opacity: 1 !important;
}

.button {
  position: relative;
  --min-width: 250px;
}
</style>
