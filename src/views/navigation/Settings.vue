<template>
  <page-layout>
    <template #pageContent>
      <section class="profile-container">
        <img class="profile-picture" :src="profilePicture" />
        <h1 class="profile-text profile-username">{{ username }}</h1>
        <h2 class="profile-text profile-email">{{ email }}</h2>
      </section>
      <section class="settings-card-container">
        <SettingsCard
          v-for="info in settingsInfo"
          :label="info.label"
          :icon="info.icon"
          @click="info.handler"
        />
      </section>
      <section class="buttons-container">
        <ButtonSignOut />
      </section>
    </template>
  </page-layout>
</template>

<script lang="ts" setup>
import { PageLayout } from "../../layout";
import { ButtonSignOut } from "../../components/Buttons";
import { ref } from "vue";
import auth from "../../server/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { SettingsCard } from "../../components/Cards";
import { personCircleOutline } from "ionicons/icons";
import { settingsCardIcons } from "../../assets/icons";

const profilePicture = ref(personCircleOutline);
const username = localStorage.getItem("authUsername");
const email = localStorage.getItem("authEmail");
const currentUser = ref();
onAuthStateChanged(auth, (user) => {
  console.log(user);
  currentUser.value = user;
});

const settingsInfo = [
  {
    label: "Profile",
    icon: settingsCardIcons.settingsProfile,
    handler: () => console.log("Profile clicked"),
  },
  {
    label: "Preferences",
    icon: settingsCardIcons.settingsPreferences,
    handler: () => console.log("Preferences clicked"),
  },
  {
    label: "Subscriptions",
    icon: settingsCardIcons.settingsSubscriptions,
    handler: () => console.log("Subscriptions clicked"),
  },
  {
    label: "About",
    icon: settingsCardIcons.settingsAbout,
    handler: () => console.log("About clicked"),
  },
];
</script>

<script lang="ts">
export default {
  name: "Settings",
};
</script>

<style scoped>
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
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: center;
  gap: 20px;
  margin: 20px 0;
}
</style>
