<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button v-for="route in routes" :tab="route.name" :href="'/'+route.name">
          <ion-icon :icon="route.icon" />
          <ion-label>{{ route.name }}</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>
  
<script lang="ts">
  import { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon } from '@ionic/vue';

  import { routes } from './index.ts';

  export default {
    components: { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon },
    data() {
      return {
        routes
      };
    },
  };
</script>