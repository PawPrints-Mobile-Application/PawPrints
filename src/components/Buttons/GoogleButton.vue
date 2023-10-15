<template>
    <IconButton class="button-google" :icon="logoGoogle" background-color="primary" color="tertiary" :on-click="SignInWithGoogle"/>
</template>
<script setup lang="ts">
import IconButton from './IconButton.vue';
import { logoGoogle } from "ionicons/icons";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import auth from '../../server/firebase';
import { useIonRouter } from "@ionic/vue";
const ionRouter = useIonRouter();
const Redirect = () => ionRouter.navigate("/home", "forward", "replace");

const SignInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then(() => {
            Redirect();
        })
        .catch(error => {
            console.log(error.message);
        })
}
</script>
<style scoped>
.button-google {
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    min-height: 50px !important;
    outline: 2px solid var(--ion-color-secondary);
    border-radius: 10px;
    font-size: 30px;
}
    
</style>