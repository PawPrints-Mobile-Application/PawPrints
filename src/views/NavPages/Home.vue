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
      <section class="dog-cards-container">
        <section
          :style="{ height: `${dogs.length > 0 ? 0 : '100%'}` }"
          class="add-button"
        >
          <AddPetButton />
        </section>
        <section v-show="dogs.length > 0" v-for="dog in dogs" class="dog-cards">
          <DogCard :dog="dog" />
        </section>
      </section>
    </template>
  </page-layout>
</template>

<script lang="ts" setup>
import { PageLayout } from "../../layout";
import { FactsPreviewCard, DogCard } from "../../components/Cards";
import { ImgLogo } from "../../components/Logo";
import { AddPetButton } from "../../components/Buttons";

import { dogs } from "../../server/data";
</script>

<script lang="ts">
import { homeFilled, homeOutline } from "../../assets/icons";
export default {
  name: "Home",
  routeInfo: {
    filename: 'Home',
    path: "/home",
    meta: {
      requiresAuth: false,
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
  display: inline-block;
  text-align: left;
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
  justify-content: flex-start;
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
