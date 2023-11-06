<template>
  <page-layout>
    <template #pageHeader>
      <h3 class="auth-greetings text text-heading font-bold">
        {{ authGreetings }}
      </h3>
    </template>
    <template #pageContent>
      <section class="content">
        <FactsPreview @click="DeleteAllDogs" />
        <DogPreview />
      </section>
    </template>
  </page-layout>
</template>

<script lang="ts" setup>
import { PageLayout } from "../../layout";
import { FactsPreview, DogPreview } from "../../components/Cards";
import { onIonViewDidEnter, onIonViewWillEnter } from "@ionic/vue";
import { DeleteAllData } from "../../server/sqlite/data/User/DogProfile";

const authGreetings = `Henlo, ${
  localStorage.getItem("authUsername") === "Guest"
    ? "Hooman"
    : localStorage.getItem("authUsername")
}`;

// Light Functions, preferrably async functions only
onIonViewWillEnter(async () => {});

// Heavy Functions
onIonViewDidEnter(() => {});

// Data Manipulator
const DeleteAllDogs = () => {
  DeleteAllData().then(() => {
    console.log("All Dogs in the database has been deleted.");
  });
};
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
