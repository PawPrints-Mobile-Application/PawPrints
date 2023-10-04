<template>
    <ion-page>
      <ion-content color="primary">
        <main>
          <ion-thumbnail><img :src="PawPrints" alt="PawPrints"></ion-thumbnail>
          <div class="main-content">
            <ion-text><h1>PawPrints</h1></ion-text>
            <SignInModal />
            <Button id="modal-Sign" expand="block" color="tertiary">Sign</Button>
            <ion-button id="modal-SignUp" expand="block" color="tertiary">Sign Up</ion-button>
            <ion-button expand="block" color="tertiary">Google Sign In</ion-button>
          </div>
        </main>
        <Modal trigger="modal-SignUp" />
      </ion-content>
    </ion-page>
  </template>

  <script lang="ts" setup>
    import {
      IonContent, IonPage, IonThumbnail, IonButton, IonText,
    } from '@ionic/vue';
    import SignInModal from './SignInModal.vue';
    import Modal from '../components/Modal.vue';
    import Button from '../components/Button.vue';
  </script>
  
  <script lang="ts">
    import { PawPrints } from '../assets/images';
  
    export default {
      name: "LogIn",
      data() {
        return {
          PawPrints
        }
      },
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
  }

  ion-thumbnail {
    width: max-content;
    height: max-content;
  }

  .main-content {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column nowrap;
    transform: translateY(-50px);
  }

  h1 {
    font-weight: bold;
  }

  ion-button {
    font-weight: bold;
    font-size: 1.5rem;
    width: 90%;
    min-width: 150px;
    --border-radius: 10px;
    margin-top: 10px;
  }
  </style>