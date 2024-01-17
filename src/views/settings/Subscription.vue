<template>
  <LayoutPage>
    <LayoutHeader returnTarget="/settings" label="SUBSCRIPTIONS" />
    <main>
      <CardSubscription
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
    </main>
  </LayoutPage>
</template>

<script setup lang="ts">
import { LayoutHeader, LayoutPage } from "../../layout";
import { ref, onMounted } from "vue";
import {
  subscriptionFree,
  subscriptionPawmium,
  subscriptionGuest,
} from "../../assets";
import { Enums } from "../../server/models/Information";
import { CardSubscription } from "../../components";
import { UserInfo } from "../../utils";

const current = ref(0);
const subscriptions = [
  {
    name: Enums.Subscription.free,
    icon: subscriptionGuest,
    info: ["No profile edit", "No cloud support", "Up to 2 dog profiles"],
  },
  {
    name: Enums.Subscription.guest,
    icon: subscriptionFree,
    info: ["Advertisement included", "Up to 3 dog profiles"],
  },
  {
    name: Enums.Subscription.pawmium,
    icon: subscriptionPawmium,
    info: ["No advertisement", "Unlimited dog profiles"],
  },
];

onMounted(() => {
  switch (UserInfo.GetSubscription()) {
    case Enums.Subscription.guest:
      current.value = 0;
      break;
    case Enums.Subscription.free:
      current.value = 1;
      break;
    case Enums.Subscription.pawmium:
      current.value = 2;
      break;
    default:
      break;
  }
});
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
}
</style>
