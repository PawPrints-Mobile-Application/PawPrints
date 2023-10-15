<template>
    <Button class="guest-signin" text="Guest" @click="GuestSignIn" />
</template>
<script setup lang="ts">
import { Button } from '.';
import { signInAnonymously } from 'firebase/auth';
import auth from '../../server/firebase';
import { useIonRouter } from "@ionic/vue";
const ionRouter = useIonRouter();
const Redirect = () => ionRouter.navigate("/home", "forward", "replace");

const GuestSignIn = () => {
  signInAnonymously(auth).then(() => {
    console.log('Successfully Logged In!');
    Redirect();
  }).catch(error => {
    console.log(error);
    alert(error);
  })
}
</script>
<style scoped>
.guest-signin {
  --width: 200px;
  --height: 50px;
}
</style>