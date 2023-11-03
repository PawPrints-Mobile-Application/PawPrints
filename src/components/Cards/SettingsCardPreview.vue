<template>
  <section class="settings-card-preview">
    <SettingsCard
      v-for="info in settingsInfo"
      :label="info.label"
      :icon="info.icon"
      @click="info.handler"
    />
  </section>
</template>
<script setup lang="ts">
import { settingsCardIcons } from "../../assets/icons";
import { SettingsCard } from ".";

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
<style scoped>
.settings-card-preview {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: stretch;
    flex-flow: row wrap;
    gap: 10px;
}
</style>
