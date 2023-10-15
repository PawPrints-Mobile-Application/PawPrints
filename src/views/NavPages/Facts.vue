<template>
  <page-layout id="fact-page"> Facts </page-layout>
</template>

<script lang="ts" setup>
import { PageLayout } from '../../layout';
</script>

<script lang="ts">
import { factsFilled, factsOutline } from "../../assets/icons";
export default {
  name: "Facts",
  routeInfo: {
    filename: 'Facts',
    path: "/facts",
    meta: {
      requiresAuth: false,
      requiresInternet: false,
    },
    icon: {
      default: factsOutline,
      active: factsFilled
    }
  }
};
</script>

<style scoped></style>
