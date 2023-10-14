<template>
  <page-layout id="settings-page">
    <ButtonSignOut />
  </page-layout>
</template>

<script lang="ts" setup>
import PageLayout from '../components/PageLayout.vue';
import ButtonSignOut from '../components/Buttons/ButtonSignOut.vue';
</script>

<script lang="ts">
  export default {
    name: "Settings",
  }
</script>

<style scoped>
</style>