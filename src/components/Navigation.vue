<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom" color="light">
        <ion-tab-button v-for="route in navPages" :tab="route.name" :href="'/'+route.name" layout="icon-start">
          <ion-icon :icon="route.icon" />
          <!-- <ion-label>{{ route.name }}</ion-label> -->
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>
  
<script lang="ts">
  import { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon } from '@ionic/vue';

  import {navPages} from '../views/index';

  export default {
    name: "Navigation",
    components: { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon },
    data() {
      return {
        navPages
      };
    },
  };
</script>