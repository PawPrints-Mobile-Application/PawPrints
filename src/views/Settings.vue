<template>
  <LayoutPage justify="space-around" hide-scrollbar>
    <ProfileCard />
    <SettingsCardPreview />
    <template #footer>
      <ButtonSignOut />
    </template>
  </LayoutPage>
</template>

<script lang="ts" setup>
import { ProfileCard, SettingsCardPreview } from "../components/Cards";

import { LayoutPage } from "../layout";
import { ButtonSignOut } from "../components/Buttons";
</script>

<script lang="ts">
export default {
  name: "Settings",
};
</script>

<style scoped>
.settings {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  gap: 30px;
}

.button-signout {
  margin: 10px 0;
}
</style>
