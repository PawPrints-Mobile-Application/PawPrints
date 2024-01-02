<template>
  <IonPage>
    <ButtonSignout />
  </IonPage>
</template>
<script setup lang="ts">
import { IonPage } from "@ionic/vue";
import { onMounted } from "vue";
import SeedGenerator from "../utils/SeedGenerator";
import { ButtonSignout } from "../components";

onMounted(() => {
  console.log(SeedGenerator());
});
</script>
<style scoped></style>
