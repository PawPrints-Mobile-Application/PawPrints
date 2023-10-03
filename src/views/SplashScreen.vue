<template>
  <ion-page>
    <ion-content>
      <ion-avatar><img :src="PawPrints" alt="PawPrints"></ion-avatar>
      
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
  import { IonContent, IonPage, IonAvatar } from '@ionic/vue';

  import { PawPrints } from '../assets/images';

  export default {
    name: "SplashScreen",
    components: { IonContent, IonPage, IonAvatar },
    data() {
      return {
        PawPrints
      }
    },
  }
</script>

<style scoped>
ion-content {
  --background: var(--ion-color-tertiary);
  display: flex;
  justify-content: center;
  align-items: center;
}

ion-avatar {
  --img-width: 60vw;
  width: var(--img-width);
  height: var(--img-width);
  margin: calc((100vh - var(--img-width)) / 2) auto;
  background-color: white;
}
</style>