<template>
  <ion-app>
    <ion-router-outlet :v-show="allowRouter"></ion-router-outlet>
  </ion-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const allowRouter = ref(false);
</script>

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
        allowRouter.value = true;
      }, 2000);
    }
  };
</script>

<style scoped>
</style>
