<template>
  <page-layout id="home-page">
    <template #pageHeader>
      <h1 id="home-header-title" class="page-header-title">Hello Hooman!</h1>
      <img id="home-header-logo" class="page-header-icon" :src="PawPrints" alt="PawPrints">
    </template>
    <template #pageContent>
      <section class="facts-preview-card-container">
        <FactsPreviewCard />
      </section>
    </template>
  </page-layout>
</template>

<script lang="ts" setup>
import PageLayout from '../components/PageLayout.vue';
import { PawPrints } from '../assets/images';
import FactsPreviewCard from '../components/Cards/FactsPreviewCard.vue';
</script>

<script lang="ts">
  export default {
    name: "Home"
  }
</script>

<style scoped>
#home-header-title {
  display: inline-block;
  text-align: left;
}

#home-header-icon {

}

.facts-preview-card-container {
  width: 100%;
}
</style>