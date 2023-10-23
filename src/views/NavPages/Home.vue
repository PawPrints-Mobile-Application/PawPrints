<template>
  <page-layout>
    <template #pageHeader>
      <section class="header">
        <Searchbox
          id="search"
          v-model="searchDog"
          :onReturn="() => console.log(searchDog)"
          @focus="() => (state.searchFocus = true)"
          @blur="() => (state.searchFocus = false)"
          collapse
        />
        <h3 v-show="!state.searchFocus" id="auth-greetings">
          {{ authGreetings }}
        </h3>
        <AddPetButton v-show="!state.searchFocus && !conditions.empty"/>
      </section>
    </template>
    <template #pageContent>
      <section class="facts-preview-card-container">
        <FactsPreviewCard @click="DeleteAllDogs" />
      </section>
      <h1 id="dog-cards-title">My Dogs</h1>
      <section class="dog-cards-container">
        <section v-show="conditions.empty" class="add-dog-container">
          <AddPetButton/>
          <p id="add-dog-text">Add Dog</p>
        </section>
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
import { Searchbox } from "../../components/Forms";
import { PageLayout } from "../../layout";
import { Logo as dogIcon } from "../../assets/images";
import { FactsPreviewCard, DogCard } from "../../components/Cards";
import { AddPetButton } from "../../components/Buttons";
import { AuthType } from "../../server/authentication";
import { onIonViewDidEnter, onIonViewWillEnter } from "@ionic/vue";
import { reactive, ref } from "vue";
import {
  GetAllData,
  DeleteAllData,
} from "../../server/sqlite/models/User/DogProfile";

const authGreetings = `Henlo, ${
  localStorage.getItem("authUsername") === "Guest"
    ? "Hooman"
    : localStorage.getItem("authUsername")
}`;
const rawDogs = ref<Array<any>>();
const searchDog = ref("");
const state = reactive({
  searchFocus: false,
});

const conditions = reactive({
  empty: true,
});

// Light Functions, preferrably async functions only
onIonViewWillEnter(async () => {});

// Heavy Functions
onIonViewDidEnter(() => {
  ReloadPage();
});

// Page Manipulator
const ReloadPage = () => {
  if (localStorage.getItem("authType") === AuthType[1]) {
    FetchDogs();
  } else if (localStorage.getItem("authType") === AuthType[2]) {
  }
};

// Data Manipulator
const DeleteAllDogs = () => {
  DeleteAllData()
    .then(FetchDogs)
    .then(() => {
      console.log("All Dogs in the database has been deleted.");
    });
};

const FetchDogs = () => {
  GetAllData().then((data) => {
    rawDogs.value = data.values;
    conditions.empty = rawDogs.value?.length === 0 || !rawDogs.value;
  });
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
.page-layout {
  --header-height: 50px;
}

.header {
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

#search {
  --radius: 10px;
  --radius-after: 30px;
  --height: 43px;
  --width: 43px;
}

#auth-greetings {
  text-align: left;
  font-family: Poppins;
  font-weight: 700;
  font-size: var(--fs3);
  margin: 0;
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
../../server/sqlite/models/User/DogProfile
