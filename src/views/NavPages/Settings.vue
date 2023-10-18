<template>
  <page-layout id="settings-page">
    <template #pageContent>
      <section class="profile-container">
        <img class="profile-picture" :src="profilePicture">
        <h1 class="profile-text profile-username">{{ username }}</h1>
        <h2 class="profile-text profile-email">{{ email }}</h2>
      </section>
      <section class="settings-card-container">
        <SettingsCard v-for="info in settingsInfo" :label="info.label" :icon="info.icon" @click="info.handler" />
      </section>
      <section class="buttons-container">
        <ButtonSignOut />
      </section>
      </template>
  </page-layout>
</template>

<script lang="ts" setup>
import { PageLayout } from '../../layout';
import { ButtonSignOut } from '../../components/Buttons';
import { ref, computed } from 'vue';
import auth from '../../server/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { SettingsCard } from '../../components/Cards';
import { personCircleOutline } from 'ionicons/icons';
import { settingsCardIcons } from '../../assets/icons'

const profilePicture = ref(personCircleOutline);
const username = computed(() => localStorage.getItem('username'));
const email = computed(() => localStorage.getItem('username'));
const currentUser = ref();
onAuthStateChanged(auth, (user) => {
  console.log(user);
  currentUser.value = user;
});

const settingsInfo = [
  {
    label: 'Profile',
    icon: settingsCardIcons.settingsProfile,
    handler: () => console.log('Profile clicked')
  },
  {
    label: 'Preferences',
    icon: settingsCardIcons.settingsPreferences,
    handler: () => console.log('Preferences clicked')
  },
  {
    label: 'Subscriptions',
    icon: settingsCardIcons.settingsSubscriptions,
    handler: () => console.log('Subscriptions clicked')
  },
  {
    label: 'About',
    icon: settingsCardIcons.settingsAbout,
    handler: () => console.log('About clicked')
  },
]
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
#settings-page {
  padding: 20px 0 0;
  overflow-y: scroll;
}

.profile-picture {
  --size: 150px;
  width: var(--size);
  height: var(--size);
}

.profile-text {
  text-align: center;
  margin: 0;
}

.profile-username {
  font-size: var(--fs7);
}

.profile-email {
  font-size: var(--fs3);
}

.settings-card-container {
  padding: 20px 0;
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  gap: 30px;
}
</style>