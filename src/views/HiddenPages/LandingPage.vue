<template>
  <page-layout id="splash-screen-page">
    <section class="page-content">
      <div class="logo-wrapper"><ImgLogo id="logo" :class="{ 'show-thumbnail': show.thumbnail }" /></div>
      <ion-spinner
        class="login-loading"
        v-show="show.thumbnail"
        :class="{ 'show-loading': show.loading }"
        name="lines"
        color="primary"
      />
    </section>
  </page-layout>
</template>

<script setup lang="ts">
import { PageLayout } from "../../layout";
import { ImgLogo } from "../../components/Logo";
import { SplashToHome, SplashToLogin } from ".";

import auth from '../../server/firebase';
import { AuthState } from "../../server/authentication";
import { onAuthStateChanged } from 'firebase/auth';
import { reactive, watch, ref } from "vue";
import { IonSpinner, onIonViewDidEnter, useIonRouter } from "@ionic/vue";
import { CreateDB } from "../../server/sqlite/models";

const state = reactive({
  doneAnimation: false,
  readyRedirect: false,
});

const user = ref();
onAuthStateChanged(auth, (currentUser) => {
  user.value = localStorage.getItem('auth') !== AuthState[0] || !!currentUser;
});

const ionRouter = useIonRouter();
const Redirect = () => {
  show.loading = false;
  setTimeout(() => {
    ionRouter.navigate(
      `/${user.value ? SplashToHome.name : SplashToLogin.name}`,
      "forward",
      "replace"
    );
  }, 500);
};

watch(user, () => (state.readyRedirect = true));
watch(() => state.doneAnimation && state.readyRedirect, Redirect);

onIonViewDidEnter(() => {
  CreateDB();
  setTimeout(() => {
    show.thumbnail = true;
    setTimeout(() => {
      state.doneAnimation = true;
      show.loading = true;
    }, 500);
  }, 1000);
});

const show = reactive({
  thumbnail: false,
  loading: false,
});
</script>

<script lang="ts">
export default {
  name: "LandingPage",
  routeInfo: {
    filename: "LandingPage",
    path: "/landingpage",
    meta: {
      requiresAuth: false,
      requiresInternet: false,
    },
  },
};
</script>
<style scoped>
#splash-screen-page {
  height: 100%;
  background-color: var(--ion-color-tertiary);
  --page-content-justify-content: center;
  transition: all 0.5s ease-in;
}

.logo-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.page-content {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}

#logo {
  --width: 100px;
  opacity: 0;
  transition: opacity 250ms ease-out, width 500ms ease-in, height 450ms ease-out,
    background-color 500ms ease 750ms;
}

.show-thumbnail {
  --background-color: var(--ion-color-primary);
  --width: 240px !important;
  opacity: 1 !important;
}

#logo::before {
  position: absolute;
  content: "";
  background-color: var(--background-color);
  width: 10px;
  height: 10px;
  border-radius: 100%;
  z-index: -1;
  transition: all 500ms ease-in 100ms;
}

.login-loading {
  position: absolute;
  bottom: 100px;
  width: 80px;
  height: 80px;
  opacity: 0;
  transition: all 500ms ease-out;
}

.show-loading {
  opacity: 1;
}
</style>
