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
      // Pre-app Splash Screen (Static)
      await SplashScreen.show();
      setTimeout(()=>{
        SplashScreen.hide();
      }, 2000);

      // Post-app Splash Screen (Animated)
      
    }
  };
</script>

<style scoped>
</style>
