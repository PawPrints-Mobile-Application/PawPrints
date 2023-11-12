<template>
  <page-layout>
    <template #pageHeader>
      <h3 class="auth-greetings text text-heading font-bold">
        {{ authGreetings }}
      </h3>
    </template>
    <template #pageContent>
      <section class="content">
        <FactsPreview />
        <DogPreview ref="dogPreview" />
      </section>
    </template>
  </page-layout>
</template>

<script lang="ts" setup>
import { PageLayout } from "../../layout";
import { FactsPreview, DogPreview } from "../../components/Cards";
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
</style>
../../server/sqlite/data/DogProfile
