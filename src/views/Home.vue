<template>
  <LayoutPage justify="flex-start" disableHeaderOnScroll addMarginBotton>
    <template #header>
      <header>
        <ImgLogo />
        <TextHeading>{{ authGreetings }}</TextHeading>
      </header>
    </template>
    <HomeCard
      title="Wanna know your dogs better?"
      details="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
      target="/dogs"
    />
    <HomeCard
      title="Do you have dif(fur)ties on your dogs?"
      details="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud"
      target="/forums"
    />
    <HomeCard
      title="Finding the nearest vet?"
      details="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud"
      target="/maps"
    />
  </LayoutPage>
</template>

<script lang="ts" setup>
import { LayoutPage } from "../layout";
import { ImgLogo } from "../components/Logo";

import { TextHeading } from "../components/Texts";
import { HomeCard } from "../components/Cards";
import { onIonViewDidEnter, onIonViewWillEnter } from "@ionic/vue";

const authGreetings = `Henlo, ${
  localStorage.getItem("authUsername") === "Guest"
    ? "Hooman"
    : localStorage.getItem("authUsername")
}`;

// Light Functions, preferrably async functions only
onIonViewWillEnter(async () => {});

// Heavy Functions
onIonViewDidEnter(() => {});
</script>

<script lang="ts">
export default {
  name: "Home",
};
</script>

<style scoped>
.layout-page {
  --min-height-header: 50px;
}

.img-logo {
  --size: 50px;
  outline: 2px solid black;
}

header {
  min-height: 50px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  transition: all 200ms ease-out;
}

.dwada {
  height: 3000px;
  background-color: yellow;
}
</style>
