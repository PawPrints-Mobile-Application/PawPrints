<template>
  <page-layout id="settings-page">
    <ButtonSignOut />
  </page-layout>
</template>

<script lang="ts" setup>
import { PageLayout } from '../../layout';
import { ButtonSignOut } from '../../components/Buttons';
</script>

<script lang="ts">
import {settingsFilled, settingsOutline} from '../../assets/icons';
  export default {
    name: "Settings",
  routeInfo: {
    filename: 'Settings',
    path: "/settings",
    meta: {
      requiresAuth: false,
      requiresInternet: false,
    },
    icon: {
      default: settingsOutline,
      active: settingsFilled
    } 
  }
  }
</script>

<style scoped>
</style>