<template>
  <LayoutPage disableScroll justify="center" inAntiNavigation>
    <ion-spinner
      class="login-loading"
      v-show="state.thumbnail"
      :class="{ 'show-loading': state.loading && !state.background }"
      name="crescent"
    />
    <div
      class="backdrop"
      :class="{ 'background-grow': state.backgroundGrow }"
    />
    <Logo
      :class="{
        'show-thumbnail': state.thumbnail,
        'logo-out': state.logoOut,
      }"
    />
    <section class="main-content" :class="{ 'show-auth': state.showAuth }">
      <TextTitle>PawPrints</TextTitle>
      <TextSubheading
        >Your Ultimate Canine<br />Companion Care App</TextSubheading
      >
      <ButtonText label="Guest" />
      <ButtonText label="Sign In" />
      <ButtonText label="Sign Up" />
    </section>
  </LayoutPage>
</template>

<script setup lang="ts">
import { LayoutPage } from "../layout";
import { Logo } from "../components/Logo";
import { ButtonText } from "../components/Buttons";
import { TextTitle, TextSubheading } from "../components/Texts";

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
  connectionFeedback: "none",
});

const user = ref(localStorage.getItem("authType") !== "");
onAuthStateChanged(auth, (currentUser) => {
  user.value = !!currentUser;
  state.connectionFeedback = !currentUser ? "none" : "established";
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

watch(() => state.doneAnimation && user.value, Redirect);

onIonViewDidEnter(() => {
  setTimeout(async () => {
    state.thumbnail = true;
    state.loading = true;
    CreateModels().then(() =>
      setTimeout(() => {
        state.doneAnimation = true;
        if (user.value) return;
        setTimeout(() => (state.connectionFeedback = "timeout"), 3000);
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
  --background-color: var(--theme-tertiary-background);
}

.logo {
  position: relative;
  --size: 10px;
  opacity: 0;
  transition: opacity 250ms ease-out, width 500ms ease-in,
    height 450ms ease-out 100ms, transform 300ms ease-out;
}

.logo.show-thumbnail {
  --size: 200px;
  opacity: 1 !important;
}

.login-loading {
  position: absolute;
  --loading-size: 0px;
  width: var(--loading-size);
  height: var(--loading-size);
  opacity: 0;
  color: var(--theme-tertiary-background);
  transition: all 500ms ease-in;
}

.login-loading.show-loading {
  --loading-size: 280px;
  opacity: 1;
}

.backdrop {
  opacity: 0;
  position: absolute;
  background-color: var(--theme-primary-background);
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

.logo.logo-out {
  transform: translateY(-500px);
}

.main-content {
  width: 100%;
  height: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
  gap: 10px;
  transition: all 300ms ease-out;
  overflow: hidden;
}

.main-content.show-auth {
  opacity: 1;
  height: 270px;
}

.text-subheading {
  font-weight: 400;
  text-align: center;
}

.button-text {
  width: 200px;
  height: 50px;
}
</style>
