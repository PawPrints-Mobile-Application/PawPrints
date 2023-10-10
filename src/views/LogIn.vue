<template>
    <ion-page>
        <main>
          <img id="logo" :src="PawPrints" alt="PawPrints">
          <section class="main-content">
            <h1>PawPrints</h1>
            <SignInModal />
            <Button color="tertiary">Sign Up</Button>
            <GoogleButton />
          </section>
        </main>
    </ion-page>
  </template>

  <script lang="ts" setup>
    import {
      IonPage
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

  #logo {
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