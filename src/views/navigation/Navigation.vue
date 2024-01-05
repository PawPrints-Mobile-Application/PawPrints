<template>
  <IonPage>
    <IonTabs>
      <IonRouterOutlet />
      <NavigationBar />
    </IonTabs>
  </IonPage>
</template>
<script setup lang="ts">
import { NavigationBar } from "../../components";
import { IonPage, IonTabs, IonRouterOutlet } from "@ionic/vue";
</script>
<style scoped></style>
