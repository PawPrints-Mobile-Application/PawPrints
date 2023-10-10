<template>
  <ion-page class="main-page">
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom" color="light">
        <ion-tab-button v-for="route in navPages" :tab="route.name" :href="route.path" layout="icon-start">
          <ion-icon :icon="route.icons[route.path === currentRoute? 0 : 1]"/>
          <!-- <ion-label>{{ route.name }}</ion-label> -->
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>
  
<script lang="ts">
  import { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon } from '@ionic/vue';
  import {navPages} from '../views/index';
  import { ref, watchEffect } from 'vue';
  const currentRoute = ref('');

  export default {
    name: "Navigation",
    components: { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon },
    data() {
      currentRoute.value = this.$router.currentRoute.value.path;
      return {
        navPages,
        currentRoute
      };
    },
    mounted() {
      watchEffect(async () => {
        currentRoute.value = this.$router.currentRoute.value.path;
      })
    }
  };
</script>