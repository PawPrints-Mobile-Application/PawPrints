<template>
  <LayoutPage disableScroll justify="center" inAntiNavigation>
    <ion-spinner
      class="login-loading"
      v-show="state.thumbnail"
      :class="{ 'show-loading': state.loading && !state.background }"
      name="crescent"
      color="primary"
    />
    <div
      class="backdrop"
      :class="{ 'background-grow': state.backgroundGrow }"
    />
    <ImgLogo
      :class="{
        'show-thumbnail': state.thumbnail,
        'logo-out': state.logoOut,
      }"
    />
    <section class="main-content" :class="{ 'show-auth': state.showAuth }">
      <TextTitle>PawPrints</TextTitle>
      <ButtonAuth label="Guest" />
      <ButtonAuth label="Sign In" />
      <ButtonAuth label="Sign Up" />
    </section>
  </LayoutPage>
</template>

<script setup lang="ts">
import { LayoutPage } from "../layout";
import { ImgLogo } from "../components/Logo";
import { ButtonAuth } from "../components/Buttons";
import { TextTitle } from "../components/Texts";

import auth from "../server/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { reactive, watch, ref } from "vue";
import { IonSpinner, onIonViewDidEnter, useIonRouter } from "@ionic/vue";

import CreateModels from "../server/models";

const state = reactive({
  thumbnail: false,
  loading: false,
  doneAnimation: false,
  readyRedirect: false,
  background: false,
  backgroundGrow: false,
  logoOut: false,
  showAuth: false,
});

const user = ref();
onAuthStateChanged(auth, (currentUser) => {
  user.value = localStorage.getItem("authType") !== "" || !!currentUser;
});

const ionRouter = useIonRouter();
const Redirect = () => {
  state.background = true;
  setTimeout(() => {
    setTimeout(() => {
      state.backgroundGrow = true;
      state.showAuth = !user.value;
      state.logoOut = user.value;
      setTimeout(() => {
        ionRouter.navigate(
          `/${user.value ? "home" : "auth"}`,
          "forward",
          "replace"
        );
      }, 300);
    }, 300);
  }, 1000);
};

watch(user, () => (state.readyRedirect = true));
watch(() => state.doneAnimation && state.readyRedirect, Redirect);

onIonViewDidEnter(() => {
  setTimeout(async () => {
    state.thumbnail = true;
    state.loading = true;
    CreateModels().then(() =>
      setTimeout(() => {
        state.doneAnimation = true;
      }, 1000)
    );
  }, 1000);
});
</script>

<script lang="ts">
export default {
  name: "Splash",
};
</script>
<style scoped>
.layout-page {
  --background-color: var(--ion-color-tertiary);
}

.img-logo {
  position: relative;
  width: 10px;
  height: 10px;
  opacity: 0;
  transition: opacity 250ms ease-out, width 500ms ease-in, height 200ms ease-out,
    transform 300ms ease-out;
}

.img-logo.show-thumbnail {
  width: 240px;
  height: 240px;
  opacity: 1 !important;
}

.login-loading {
  position: absolute;
  --loading-size: 0px;
  width: var(--loading-size);
  height: var(--loading-size);
  opacity: 0;
  transition: all 500ms ease-in;
}

.login-loading.show-loading {
  --loading-size: 280px;
  opacity: 1;
}

.backdrop {
  opacity: 0;
  position: absolute;
  background-color: var(--ion-color-primary);
  width: 10px;
  height: 10px;
  border-radius: 100%;
  z-index: -1;
  transition: all 400ms ease-in;
}

.backdrop.background-grow {
  width: 2000px;
  height: 2000px;
  border-radius: 0;
  opacity: 1;
}

.img-logo.logo-out {
  transform: translateY(-500px);
}

.main-content {
  width: 100%;
  height: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
  gap: 20px;
  transition: all 300ms ease-out;
  overflow: hidden;
}

.main-content.show-auth {
  opacity: 1;
  height: 250px;
}
</style>
