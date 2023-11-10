<template>
  <Toast v-model:show="network.show">
    <section class="toast-network">
        <ion-icon :icon="network.icon" />
        <span>{{ `Network ${network.value}` }}</span>
    </section>
  </Toast>
</template>
<script setup lang="ts">
import { IonIcon } from "@ionic/vue";
import { onBeforeMount, onMounted, onUnmounted, reactive } from "vue";
import {
  globeOutline as networkOffline,
  wifiOutline as networkOnline,
} from "ionicons/icons";
import Toast from ".";

onBeforeMount(() => {
  sessionStorage.setItem("networkInitialized", "false");
});
onMounted(async () => {
  window.addEventListener("online", async () => await SetConnectivity(true));
  window.addEventListener("offline", async () => await SetConnectivity(false));
  await SetConnectivity(navigator.onLine);
  sessionStorage.setItem("networkInitialized", "true");
});

onUnmounted(() => {
  window.removeEventListener("online", async () => await SetConnectivity(true));
  window.removeEventListener(
    "offline",
    async () => await SetConnectivity(false)
  );
});

// CONNECTIVITY EVENT LISTENER
const network = reactive({
  time: 2000,
  value: "offline",
  show: false,
  icon: networkOffline
});
const showToast = () => {
  network.show = true;
  setTimeout(() => {
    network.show = false;
  }, network.time);
};
const SetConnectivity = async (isNetOnline: boolean) => {
  network.value = isNetOnline ? "online" : "offline";
  network.icon = isNetOnline ? networkOnline : networkOffline;
  sessionStorage.setItem("network", network.value);
  if (sessionStorage.getItem("networkInitialized") === "true" || !isNetOnline) showToast();

  // Database Synchronization to Cloud
  if (!isNetOnline) return;
  
};
</script>
<style scoped>
.toast {
    --width: 220px;
}

.toast-network {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    font-size: var(--fs1);

    > span {
        font-size: var(--fs2);
    }
}
</style>
