<template>
    <ion-page>
      <ion-content color="primary">
        <main>
          <ion-thumbnail><img id="logo" :src="PawPrints" alt="PawPrints"></ion-thumbnail>
          <div class="main-content">
            <ion-text><h1>PawPrints</h1></ion-text>
            <SignInModal />
            <Button color="tertiary">Sign Up</Button>
            <GoogleButton />

          </div>
        </main>
      </ion-content>
    </ion-page>
  </template>

  <script lang="ts" setup>
    import {
      IonContent, IonPage, IonThumbnail, IonText
    } from '@ionic/vue';
    import Button from '../components/Buttons/Button.vue';
    import GoogleButton from '../components/Buttons/GoogleButton.vue';
    import SignInModal from '../components/Modals/SignInModal.vue';
  </script>
  
  <script lang="ts">
    import { PawPrints } from '../assets/images';
  
    export default {
      name: "LogIn",
      data() {
        return {
          PawPrints
        }
      }
    }
  </script>
  
  <style scoped>
  main {
    height: 100%;
    padding: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column nowrap;
    background-color: var(--ion-color-primary);
    transition: all 0.5s ease-in;
  }

  ion-thumbnail {
    width: 90%;
    min-width: 150px;
    max-width: 400px;
    height: max-content;
  }

  #logo {
    width: 100%;
  }

  .main-content {
    width: 100%;
    opacity: 1;
    height: 200px ;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column nowrap;
  }

  h1 {
    font-weight: bold;
  }
  </style>