<template>
  <ion-app>
    <ion-router-outlet></ion-router-outlet>
  </ion-app>
</template>

<script lang="ts">
  import { IonApp, IonRouterOutlet } from '@ionic/vue';
  import { SplashScreen } from '@capacitor/splash-screen';
  export default {
    name: 'App',
    components: { IonApp, IonRouterOutlet },
    async mounted() {
      await SplashScreen.show();
      setTimeout(()=>{
        SplashScreen.hide();
      }, 2000);
    }
  };
</script>

<style scoped>
</style>
