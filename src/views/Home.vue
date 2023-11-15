<template>
  <LayoutPage justify="center">
    <template #header>
      <ImgLogo />
    </template>
    <template #content>
      <div class="dwada">dwadawd</div>
    </template>
  </LayoutPage>
</template>

<script lang="ts" setup>
import { LayoutPage } from "../layout";
import { ImgLogo } from "../components/Logo";

import { TextHeading } from "../components/Texts";
import { FactsPreviewCard, DogPreview } from "../components/Cards";
import { onIonViewDidEnter, onIonViewWillEnter } from "@ionic/vue";
import { ref } from "vue";

const dogPreview = ref();
const authGreetings = `Henlo, ${
  localStorage.getItem("authUsername") === "Guest"
    ? "Hooman"
    : localStorage.getItem("authUsername")
}`;

// Light Functions, preferrably async functions only
onIonViewWillEnter(async () => {
});

// Heavy Functions
onIonViewDidEnter(() => {});
</script>

<script lang="ts">
export default {
  name: "Home",
};
</script>

<style scoped>
.page-layout {
  --header-height: 50px;
}

.content {
  width: 100%;
}

.dwada {
  height: 400px;
  width: 100%;
  background-color: yellow;
}
</style>
