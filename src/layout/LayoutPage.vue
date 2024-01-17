<template>
  <IonPage>
    <IonContent>
      <slot />
    </IonContent>
  </IonPage>
</template>
<script setup lang="ts">
import { IonContent, IonPage } from "@ionic/vue";
</script>
<style scoped>
.layout-page {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

ion-content::part(scroll) {
  padding: 0px 10px 20px;
  background-color: var(--theme-primary-background);
  color: var(--theme-primary-text);
}
</style>
