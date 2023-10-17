<template>
  <page-layout id="home-page">
    <template #pageHeader>
      <h1 id="home-header-title">Hello Hooman!</h1>
      <ImgLogo id="home-header-logo"/>
    </template>
    <template #pageContent>
      <section class="facts-preview-card-container">
        <FactsPreviewCard />
      </section>
      <section class="dog-cards-container" :style="{justifyContent: conditions.empty ? 'center' : 'flex-start'}">
        <AddPetButton v-show="conditions.empty" @click="FetchData" />
        <DogCard v-show="!conditions.empty" v-for="dog in rawDogs" :dog="dog" />
      </section>
    </template>
  </page-layout>
</template>

<script lang="ts" setup>
import { PageLayout } from "../../layout";
import { FactsPreviewCard, DogCard } from "../../components/Cards";
import { ImgLogo } from "../../components/Logo";
import { AddPetButton } from "../../components/Buttons";
import { AuthState } from "../../server/authentication";
import { onIonViewDidEnter, onIonViewWillEnter } from "@ionic/vue";
import { computed, reactive, ref, watch } from "vue";
import { DeleteAllData, Props as dogProps, GetAllData } from "../../server/sqlite/models/DogProfile";



const rawDogs = ref<Array<any>>();

const conditions = reactive({
  empty: true
});

const EmptyEvaluator = () => rawDogs.value?.length === 0;

// Light Functions, preferrably async functions only
onIonViewWillEnter(async () => {
  if (localStorage.getItem('auth') === AuthState[1]) {
    // await DeleteAllData();
    await FetchData();
    console.log(rawDogs.value);
  }
  else if (localStorage.getItem('auth') === AuthState[2]) {

  }
});

const FetchData = async () => rawDogs.value = (await GetAllData()).values;

watch(EmptyEvaluator, () => {console.log('RawDogs Changed'); conditions.empty = EmptyEvaluator()})

// Heavy Functions
onIonViewDidEnter(() => {
  conditions.empty = EmptyEvaluator();
  console.log(rawDogs.value?.length, conditions.empty);
});
</script>

<script lang="ts">
import { homeFilled, homeOutline } from "../../assets/icons";
export default {
  name: "Home",
  routeInfo: {
    filename: 'Home',
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
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
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