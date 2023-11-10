<template>
  <page-layout>
    <div class="logo-wrapper">
      <ImgLogo
        id="logo"
        :class="{
          'show-thumbnail': show.thumbnail,
          'show-background': state.background,
        }"
      />
    </div>
    <ion-spinner
      class="login-loading"
      v-show="show.thumbnail"
      :class="{ 'show-loading': show.loading && !state.background }"
      name="crescent"
      color="primary"
    />
  </page-layout>
</template>

<script setup lang="ts">
import { PageLayout } from "../../layout";
import { ImgLogo } from "../../components/Logo";

import auth from "../../server/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { reactive, watch, ref } from "vue";
import { IonSpinner, onIonViewDidEnter, useIonRouter } from "@ionic/vue";

import CreateDB from "../../server/sqlite/data";
import CreateModels from "../../server/models";

const state = reactive({
  doneAnimation: false,
  readyRedirect: false,
  background: false,
});

const user = ref();
onAuthStateChanged(auth, (currentUser) => {
  user.value = localStorage.getItem("authType") !== "" || !!currentUser;
});

const ionRouter = useIonRouter();
const Redirect = () => {
  state.background = true;
  setTimeout(() => {
    ionRouter.navigate(
      `/${user.value ? "splashtohome" : "splashtoauth"}`,
      "forward",
      "replace"
    );
  }, 1000);
};

watch(user, () => (state.readyRedirect = true));
watch(() => state.doneAnimation && state.readyRedirect, Redirect);

onIonViewDidEnter(() => {
  setTimeout(async () => {
    show.thumbnail = true;
    show.loading = true;
    CreateDB()
      .then(CreateModels)
      .then(() =>
        setTimeout(() => {
          state.doneAnimation = true;
        }, 1000)
      );
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
};
</script>
<style scoped>
.page-layout {
  --padding-side: 0 !important;
  --background-color: var(--ion-color-tertiary);
  --page-content-justify-content: center;
  transition: all 0.5s ease-in;
}

.logo-wrapper {
  z-index: 2;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
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
  --width: 240px !important;
  opacity: 1 !important;
}

.show-background {
  --background-color: var(--ion-color-primary);
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
  --loading-size: 0px;
  top: calc(50% - var(--loading-size) / 2);
  width: var(--loading-size);
  height: var(--loading-size);
  opacity: 0;
  transition: all 500ms ease-in;
}

.show-loading {
  --loading-size: 280px;
  opacity: 1;
}
</style>
