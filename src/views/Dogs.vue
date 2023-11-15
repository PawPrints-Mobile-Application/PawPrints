<template>
  <LayoutPage justify="flex-start">
    <template #header>
      <TextHeading class="auth-greetings">
        {{ authGreetings }}
      </TextHeading>
    </template>
    <template #content>
      <FactsPreviewCard />
      <DogPreview ref="dogPreview" />
    </template>
  </LayoutPage>
</template>

<script lang="ts" setup>
import { LayoutPage } from "../layout";
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
  await dogPreview.value.ReloadPage();
});

// Heavy Functions
onIonViewDidEnter(() => {});
</script>

<script lang="ts">
export default {
  name: "Dogs",
};
</script>

<style scoped>
.page-layout {
  --header-height: 50px;
}

.content {
  width: 100%;
}
</style>
