<template>
    <ion-page>
      <ion-content color="primary">
        <main>
          <ion-thumbnail><img id="logo" :src="PawPrints" alt="PawPrints"></ion-thumbnail>
          <!-- <ion-spinner :class="`login-loading ${showLoading && !showContent ? 'show-loading' : ''}`" name="lines" color="primary"/> -->
          <div class="main-content">
            <ion-text><h1>PawPrints</h1></ion-text>
            <!-- <SignInModal /> -->
            <Button color="tertiary">Sign In</Button>
            <Button color="tertiary">Sign Up</Button>
            <BackButton type="1" />

            <!-- <ButtonModal id="sign" expand="block" color="primary" :allow-modal-buttons="false" text="iii">
              <template #buttonContent>
                signye
              </template>
              <template #modalContent>
                yeahh
              </template>
            </ButtonModal>
            <ion-button id="modal-SignUp" expand="block" color="tertiary">Sign Up</ion-button>
            <ion-button expand="block" color="tertiary"><ion-icon :icon="logoGoogle" slot="icon-only"></ion-icon></ion-button> -->
          </div>
        </main>
        <!-- <Modal trigger="modal-SignUp" /> -->
      </ion-content>
    </ion-page>
  </template>

  <script lang="ts" setup>
    import {
      IonContent, IonPage, IonThumbnail, IonText, // IonButton, IonIcon IonSpinner
    } from '@ionic/vue';
    // import { logoGoogle } from 'ionicons/icons';
    // import SignInModal from './SignInModal.vue';
    // import Modal from '../components/Modal.vue';
    // import ButtonModal from "../components/ButtonModal.vue";
    import Button from '../components/Buttons/Button.vue';
    import BackButton from '../components/Buttons/BackButton.vue';
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
    transform: translateY(-50px);
  }
  
  /* .login-loading{
    position: absolute;
    bottom: 25%;
    width: 80px;
    height: 80px;
    opacity: 0;
    transition: all 500ms ease-out;
  }

  .show-loading {
    opacity: 1;
  } */


  h1 {
    font-weight: bold;
  }

  ion-button {
    font-weight: bold;
    font-size: 1.5rem;
    min-width: 150px;
    max-width: 400px;
    --border-radius: 10px;
    margin-top: 10px;
  }
  </style>