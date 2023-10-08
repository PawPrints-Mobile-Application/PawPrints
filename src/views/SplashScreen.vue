<template>
  <ion-page>
    <ion-content color="primary">
      <main :class="showContent && 'show-content'">
        <ion-thumbnail :class="showThumbnail && 'show-thumbnail'"><img id="logo" :src="PawPrints" alt="PawPrints"></ion-thumbnail>
        <ion-spinner :class="`login-loading ${showLoading && !showContent ? 'show-loading' : ''}`" name="lines" color="primary"/>
        <div class="main-content display-none">
          <ion-text><h1>PawPrints</h1></ion-text>
          <ion-button expand="block" color="tertiary">Sign In</ion-button>
          <ion-button expand="block" color="tertiary">Sign Up</ion-button>
          <ion-button expand="block" color="tertiary">Google Sign In</ion-button>
        </div>
      </main>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
  import {
    IonContent, IonPage, IonThumbnail, IonButton, IonText, IonSpinner
  } from '@ionic/vue';
  import { useIonRouter } from '@ionic/vue';
  const ionRouter = useIonRouter();
  setTimeout(() => ionRouter.navigate("/login", "forward", "replace"), 5500);

  // Redirection Process:
  // Check auth first if login already, then move to Home Page if so. If not, move to Login Page.
</script>

<script lang="ts">
  import { PawPrints } from '../assets/images';
  import { ref } from 'vue';

  const showThumbnail = ref(false);
  const showContent = ref(false);
  const showLoading = ref(false);
  const ShowContent = () => {
    setTimeout(() => showThumbnail.value = true, 500);
    setTimeout(() => showLoading.value = true, 1000);
    setTimeout(() => showContent.value = true, 4000);
  };

  export default {
    name: "SplashScreen",
    data() {
      return {
        showContent, showLoading, PawPrints
      }
    },
    mounted() {
      ShowContent();
    }
  }
</script>

<style scoped>
:root {
  --start-up-delay: 5s;
  --show-content-delay: 11.5s;
}

main {
  height: 100%;
  padding: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
  background-color: var(--ion-color-tertiary);
  transition: all 0.5s ease-in;
}

ion-thumbnail {
  width: 80%;
  min-width: 150px;
  max-width: 400px;
  height: max-content;
  transition: width 1000ms ease-in-out;
}

.show-content .show-thumbnail {
  width: 90%;
}

#logo {
  width: 100%;
  opacity: 0;
  transition: all 500ms ease-out;
}

.show-thumbnail #logo {
  opacity: 1;
}

.main-content {
  width: 100%;
  height: 0;
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
  transform: translateY(-50px);
  transition: height 1s ease-in-out, opacity 1s ease-in-out 1s;
}

.show-content {
  background-color: var(--ion-color-primary);
}

.show-content .main-content {
  opacity: 1;
  height: 200px ;
}

.login-loading{
  position: absolute;
  bottom: 25%;
  width: 80px;
  height: 80px;
  opacity: 0;
  transition: all 500ms ease-out;
}

.show-loading {
  opacity: 1;
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