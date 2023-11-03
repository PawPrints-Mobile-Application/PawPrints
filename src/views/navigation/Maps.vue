<template>
  <page-layout id="maps-page">
    <template #pageHeader>
      <Searchbox
        id="search"
        v-model="searchLocation"
        :onReturn="() => console.log(searchLocation)"
      />
    </template>
    <template #pageContent>
      <section
        id="background-placeholder"
        :style="{
          width: `${appDimesions.width}px`,
          height: `${appDimesions.height}px`,
        }"
      />
    </template>
  </page-layout>
</template>

<script lang="ts" setup>
import { Searchbox } from "../../components/Forms";
import { PageLayout } from "../../layout";
import { ref } from "vue";

const searchLocation = ref("");
const appDimesions = {
  width: window.innerWidth,
  height: window.innerHeight,
};
</script>

<script lang="ts">
export default {
  name: "Maps",
};
</script>

<style scoped>
.search-box {
  width: 100%;
}

#background-placeholder {
  background-color: var(--ion-color-primary-shade);
}
</style>
