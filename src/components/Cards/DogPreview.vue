<template>
  <section class="dog-preview">
    <header :class="{ 'have-dogs': !state.noDogsFound }">
      <InputSearch
        v-show="!state.noDogsFound"
        v-model:value="searchDog"
        @input="FilterDogs"
        @expand="() => (state.searchExpand = true)"
        @collapse="() => (state.searchExpand = false)"
      />
      <ModalAddPet
        trigger="header-button"
        v-show="!state.searchExpand"
        @submit="ReloadPage"
      />
    </header>
    <section class="body" v-show="!state.noDogsFound">
      <DogPreviewCard v-for="dog in filteredDogs" :dog="dog" />
    </section>
  </section>
</template>
<script setup lang="ts">
import { DogPreviewCard } from ".";
import { ModalAddPet } from "../Modals";
import { InputSearch } from "../Forms";
import { reactive, ref } from "vue";
import { GetAll } from "../../server/models/Dogs";

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
const ReloadPage = () => FetchDogs();

// Data Manipulator
// const DeleteAllDogs = () => {
//   DeleteAllData()
//     .then(FetchDogs)
//     .then(() => {
//       console.log("All Dogs in the database has been deleted.");
//     });
// };

const FetchDogs = () =>
  GetAll().then((data) => {
    rawDogs.value = data;
    filteredDogs.value = data;
    state.noDogsFound = filteredDogs.value?.length === 0 || !filteredDogs.value;
  });

defineExpose({ ReloadPage });
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
    align-items: center;
    justify-content: center;
    flex: 1 0 0;
    gap: 10px;

    > .search-box {
      width: 100%;
      --border-radius: 20px;
    }
  }

  > header.have-dogs {
    align-items: flex-start;
    justify-content: space-between;
    height: 50px;
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
