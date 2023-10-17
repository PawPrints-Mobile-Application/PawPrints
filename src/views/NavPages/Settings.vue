<template>
  <page-layout id="settings-page">
    {{ !!currentUser ? `${currentUser.uid}` : 'placeholder' }}
    <ButtonSignOut />
  </page-layout>
</template>

<script lang="ts" setup>
import { PageLayout } from '../../layout';
import { ButtonSignOut } from '../../components/Buttons';
import { ref } from 'vue';
import auth from '../../server/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const currentUser = ref();
onAuthStateChanged(auth, (user) => {
  console.log(user);
  currentUser.value = user;
});
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