<template>
  <SettingsLayout label="MY SUBSCRIPTION" target="/settings">
    <SubscriptionCard
      v-show="(key === 0 && current === 0) || key !== 0"
      v-for="(sub, key) in subscriptions"
      :selected="current === key"
      :name="sub.name"
      :icon="sub.icon"
      :info="sub.info"
      :button-text="current === key ? 'Current Plan' : 'Upgrade'"
      :hide-button="current > key"
      :disable-button="current === key"
      :design="Math.max(0, Math.min(1, current))"
    />
    <!-- v-show="(key === 0 && current === 0) || key !== 0" -->
  </SettingsLayout>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { SettingsLayout } from "../../layout";
import {
  subscriptionFree,
  subscriptionPawmium,
  subscriptionGuest,
} from "../../assets/images/index";
import { Enums } from "../../server/models/Information";
import { SubscriptionCard } from "../../components/Cards";

const current = ref(0);
const subscriptions = [
  {
    name: "Guest",
    icon: subscriptionGuest,
    info: ["No profile edit", "No cloud support", "Up to 2 dog profiles"],
  },
  {
    name: "Free",
    icon: subscriptionFree,
    info: ["Advertisement included", "Up to 3 dog profiles"],
  },
  {
    name: "Pawmium",
    icon: subscriptionPawmium,
    info: ["No advertisement", "Unlimited dog profiles"],
  },
];

onMounted(() => {
  switch (localStorage.getItem("authType")) {
    case new Enums.Subscription().guest:
      current.value = 0;
      break;
    case new Enums.Subscription().free:
      current.value = 1;
      break;
    case new Enums.Subscription().pawmium:
      current.value = 2;
      break;
    default:
      break;
  }
});
</script>

<script lang="ts">
export default {
  name: "Subscriptions",
};
</script>
<style scoped></style>
