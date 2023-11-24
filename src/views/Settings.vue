<template>
  <LayoutPage justify="flex-start" hide-scrollbar>
    <ButtonToggleThemeLightAndDark class="theme-toggle" />
    <CardUser />
    <CardSettings
      v-for="setting in settings"
      :label="setting.label"
      :icon="setting.icon"
      @click="Navigate(setting.path)"
    />
    <template #footer>
      <ButtonSignOut />
    </template>
  </LayoutPage>
</template>

<script lang="ts" setup>
import { LayoutPage } from "../layout";
import { CardUser, CardSettings } from "../components/Cards";
import {
  ButtonToggleThemeLightAndDark,
  ButtonSignOut,
} from "../components/Buttons";
import {
  person as profileIcon,
  pricetags as subscriptionIcon,
  helpCircle as faqsIcon,
  alertCircle as aboutIcon,
} from "ionicons/icons";
import { useIonRouter } from "@ionic/vue";
const ionRouter = useIonRouter();

const settings = [
  {
    label: "Profile",
    path: "/settings/profile",
    icon: profileIcon,
  },
  {
    label: "Subscriptions",
    path: "/settings/subscriptions",
    icon: subscriptionIcon,
  },
  {
    label: "Frequently Asked Questions",
    path: "/settings/faqs",
    icon: faqsIcon,
  },
  {
    label: "About",
    path: "/settings/about",
    icon: aboutIcon,
  },
];

const Navigate = (target: string) =>
  ionRouter.navigate(target, "forward", "push");
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

.theme-toggle {
  align-self: flex-end;
}

.button-signout {
  width: 100%;
  max-height: 40px;
  margin-block: 5px 10px;
}
</style>
