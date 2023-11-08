<template>
  <section class="dog-preview">
    <h1>My Dogs</h1>
    <header v-show="!state.noDogsFound">
      <InputSearch
        v-model:value="searchDog"
        @input="FilterDogs"
        @expand="() => (state.searchExpand = true)"
        @collapse="() => (state.searchExpand = false)"
      />
      <AddPetButton
        id="header-button"
        v-show="!state.noDogsFound && !state.searchExpand"
        @submit="ReloadPage"
      />
    </header>
    <section class="body">
      <AddPetButton
        v-if="!!state.noDogsFound"
        id="body-button"
        @submit="ReloadPage"
      />
      <DogCard v-else v-for="dog in filteredDogs" :dog="dog" />
    </section>
  </section>
</template>
<script setup lang="ts">
import { DogCard } from ".";
import { AddPetButton } from "../Buttons";
import { InputSearch } from "../Forms";
import { onMounted, reactive, ref } from "vue";
import {
  GetAllData,
  // DeleteAllData,
} from "../../server/sqlite/data/User/DogProfile";
import { AuthType } from "../../server/authentication";

const rawDogs = ref<Array<any>>();
const filteredDogs = ref<Array<any>>();
const searchDog = ref("");
const state = reactive({
  searchExpand: false,
  noDogsFound: false,
});

const FilterDogs = (searchString: string) => {
  filteredDogs.value = []; // Clears the filter to render
  // Rerender the filtered results
  setTimeout(() => {
    if (searchString.trim() === "") {
      filteredDogs.value = rawDogs.value;
      return;
    }
    let temp: any[] = [];
    rawDogs.value?.forEach((value) => {
      if (!value.name.includes(searchString)) return;
      temp.push(value);
    });
    filteredDogs.value = temp;
  }, 10);
};

// Page Manipulator
const ReloadPage = () => {
  if (localStorage.getItem("authType") === new AuthType().guest) {
    FetchDogs();
  } else if (localStorage.getItem("authType") === new AuthType().free) {
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
    filteredDogs.value = data.values;
    state.noDogsFound = filteredDogs.value?.length === 0 || !filteredDogs.value;
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
  flex-direction: column;
  justify-content: flex-start;
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
    align-items: flex-start;
    justify-content: space-between;
    gap: 10px;

    > .search-box {
      width: 100%;
      --border-radius: 20px;
    }
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
</style>
