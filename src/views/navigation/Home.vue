<template>
  <page-layout>
    <template #pageHeader>
      <h3 class="auth-greetings text text-heading font-bold">
        {{ authGreetings }}
      </h3>
    </template>
    <template #pageContent>
      <FactsPreview @click="DeleteAllDogs" />
      <DogPreview />
    </template>
  </page-layout>
</template>

<script lang="ts" setup>
import { PageLayout } from "../../layout";
import { FactsPreview, DogPreview } from "../../components/Cards";
import { onIonViewDidEnter, onIonViewWillEnter } from "@ionic/vue";
import { DeleteAllData } from "../../server/sqlite/models/User/DogProfile";

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

#search {
  --radius: 10px;
  --radius-after: 30px;
  --height: 43px;
  --width: 43px;
}

#header-logo {
  --min-width: 80px;
  --width: 80px;
}

.facts-preview-card-container {
  width: 100%;
  margin-bottom: 20px;
}

.dog-cards-container {
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: center;
  gap: 10px;
}

#dog-cards-title {
  font-family: Poppins;
  font-size: var(--fs4);
  margin: 0 0 10px;
  font-weight: 700;
  align-self: flex-start;
}

.add-dog-container {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}

.add-button {
  width: 100%;
  min-height: 100px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
}

#add-dog-text {
  text-align: center;
  font-family: Rubik;
  font-size: var(--fs1);
  font-weight: 400;
  margin: 10px;
}

.dog-cards {
  width: 100%;
}
</style>
