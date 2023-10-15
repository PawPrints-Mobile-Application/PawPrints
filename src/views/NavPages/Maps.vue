<template>
  <page-layout id="maps-page">
    Maps
  </page-layout>
</template>

<script lang="ts" setup>
import { PageLayout } from '../../layout';
</script>

<script lang="ts">
import { mapsFilled, mapsOutline } from '../../assets/icons';
  export default {
    name: "Maps",
  routeInfo: {
    filename: 'Maps',
    path: "/maps",
    meta: {
      requiresAuth: false,
      requiresInternet: false,
    },
    icon: {
      default: mapsOutline,
      active: mapsFilled
    } 
  }
  }
</script>

<style scoped>
</style>