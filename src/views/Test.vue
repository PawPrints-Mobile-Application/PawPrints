<template>
  <IonPage class="test">
    <ButtonSignout />
    <!-- <Toast trigger="toast-trial" height="70px">
      <ToastSmall />
    </Toast> -->
    <InputDropdown trigger="test" v-model="value" :options="Breeds.names" />
  </IonPage>
</template>
<script setup lang="ts">
import { IonPage } from "@ionic/vue";
import { onMounted, ref } from "vue";
import SeedGenerator from "../utils/SeedGenerator";
import { ButtonSignout } from "../components";
// import ToastSmall from "../layout/ToastSmall.vue";
// import { Toast } from "../components";
import { PawprintsEvent } from "../utils";
import { InputDropdown } from "../components";
import { Breeds } from "../utils";
const value = ref("");

onMounted(() => {
  console.log(SeedGenerator());
  setTimeout(() => PawprintsEvent.EventDispatcher("toast-trial"), 2000);
});
</script>
<style scoped>
.test {
  padding: 20px;
}
</style>
