<template>
  <page-layout>
    <template #pageContent>
      <section class="settings">
        <ProfileCard />
        <SettingsCardPreview />
        <ButtonSignOut />
      </section>
    </template>
  </page-layout>
</template>

<script lang="ts" setup>
import { ProfileCard, SettingsCardPreview } from "../../components/Cards";

import { PageLayout } from "../../layout";
import { ButtonSignOut } from "../../components/Buttons";
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
</style>
