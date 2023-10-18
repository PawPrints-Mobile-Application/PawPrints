<template>
  <page-layout id="home-page">
    <template #pageHeader>
      <h1 id="home-header-title">Henlo, Hooman!</h1>
      <ImgLogo v-if="conditions.empty" id="home-header-logo" />
      <AddPetButton v-else @click="FetchDogs" />
    </template>
    <template #pageContent>
      <section class="facts-preview-card-container">
        <FactsPreviewCard @click="async () => await DeleteAllDogs()" />
      </section>
      <section class="dog-cards-container">
        <AddPetButton v-show="conditions.empty" :onClick="async () => await ReloadPage()" />
        <DogCard
          v-show="!conditions.empty"
          v-for="dog in rawDogs"
          :dog="dog"
          :name="dog.name"
          :icon="dogIcon"
          :age="'4 years and 10 months old'"
        />
      </section>
    </template>
  </page-layout>
</template>

<script lang="ts" setup>
import { Logo as dogIcon } from "../../assets/images";
import { PageLayout } from "../../layout";
import { FactsPreviewCard, DogCard } from "../../components/Cards";
import { ImgLogo } from "../../components/Logo";
import { AddPetButton } from "../../components/Buttons";
import { AuthState } from "../../server/authentication";
import { onIonViewDidEnter, onIonViewWillEnter } from "@ionic/vue";
import { reactive, ref } from "vue";
import {
  GetAllData,
  DeleteAllData,
} from "../../server/sqlite/models/DogProfile";

const rawDogs = ref<Array<any>>();

const conditions = reactive({
  empty: true,
});

const EmptyEvaluator = () => rawDogs.value?.length === 0 || !rawDogs.value;

// Light Functions, preferrably async functions only
onIonViewWillEnter(async () => {
  
});

// Heavy Functions
onIonViewDidEnter(async () => {
  await ReloadPage();
  console.log(rawDogs.value?.length);
});

// Page Manipulator
const ReloadPage = async () => {
  if (localStorage.getItem("auth") === AuthState[1]) {
    await FetchDogs();
  } else if (localStorage.getItem("auth") === AuthState[2]) {
  }
  conditions.empty = EmptyEvaluator();
};

// Data Manipulator
const DeleteAllDogs = async () => {
  await DeleteAllData();
  await ReloadPage();
};

const FetchDogs = async () => {
  rawDogs.value = (await GetAllData()).values;
};
</script>

<script lang="ts">
import { homeFilled, homeOutline } from "../../assets/icons";
export default {
  name: "Home",
  routeInfo: {
    filename: "Home",
    path: "/home",
    meta: {
      requiresAuth: true,
      requiresInternet: false,
    },
    icon: {
      default: homeOutline,
      active: homeFilled,
    },
  },
};
</script>

<style scoped>
#home-page {
  overflow-y: scroll;
  -ms-overflow-style: none;
}
#home-page::-webkit-scrollbar {
  display: none;
}

#home-header-title {
  text-align: left;
  font-family: Poppins;
  font-weight: 700;
  font-size: var(--fs4);
}

#home-header-logo {
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
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.add-button {
  width: 100%;
  min-height: 100px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
}

.dog-cards {
  width: 100%;
}
</style>
