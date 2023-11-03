<template>
  <section class="dog-preview">
    <h1>My Dogs</h1>
    <header v-show="!state.noDogsFound">
      <Searchbox
        id="search"
        v-model="searchDog"
        @return="() => console.log(searchDog)"
        @expand="() => (state.searchExpand = true)"
        @collapse="() => (state.searchExpand = false)"
        collapse
        collapseOnReturn
      />
      <AddPetButton
        id="header-button"
        v-show="!state.noDogsFound"
        @submit="ReloadPage"
      />
    </header>
    <section class="body">
      <AddPetButton
        v-if="!!state.noDogsFound"
        id="body-button"
        @submit="ReloadPage"
      />
      <DogCard v-else v-for="dog in rawDogs" :dog="dog" />
    </section>
  </section>
</template>
<script setup lang="ts">
import { DogCard } from ".";
import { AddPetButton } from "../Buttons";
import { Searchbox } from "../Forms";
import { onMounted, reactive, ref } from "vue";
import {
  GetAllData,
  // DeleteAllData,
} from "../../server/sqlite/models/User/DogProfile";
import { AuthType } from "../../server/authentication";

const rawDogs = ref<Array<any>>();
const searchDog = ref("");
const state = reactive({
  searchExpand: false,
  noDogsFound: false,
});

// Page Manipulator
const ReloadPage = () => {
  if (localStorage.getItem("authType") === AuthType[1]) {
    FetchDogs();
  } else if (localStorage.getItem("authType") === AuthType[2]) {
  }
};

// Data Manipulator
// const DeleteAllDogs = () => {
//   DeleteAllData()
//     .then(FetchDogs)
//     .then(() => {
//       console.log("All Dogs in the database has been deleted.");
//     });
// };

const FetchDogs = () => {
  GetAllData().then((data) => {
    rawDogs.value = data.values;
    state.noDogsFound = rawDogs.value?.length === 0 || !rawDogs.value;
  });
};

onMounted(() => {
  ReloadPage();
});
</script>
<style scoped>
.dog-preview {
  width: 100%;
  min-height: 200px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;

  > h1 {
    margin: 0;
    font-family: Rubik;
    text-align: left;
    width: 100%;
    font-size: var(--fs2);
  }

  > header {
    align-self: flex-start;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }

  > .body {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: stretch;
    flex-flow: row wrap;
    gap: 10px;
  }
}

.search-box {
  width: 100%;
}
</style>
