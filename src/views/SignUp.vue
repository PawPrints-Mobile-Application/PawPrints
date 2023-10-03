<template>
    <ion-page>
      <ion-content>
        <div class="example-content">
            
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script lang="ts">
    import { IonContent, IonPage } from '@ionic/vue';
  
    export default {
      name: "SignUp",
      components: { IonContent, IonPage },
    }
  </script>
  
  <style scoped>
    .example-content {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
  </style>