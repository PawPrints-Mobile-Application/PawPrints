<template>
    <Button class="guest-signin" text="Guest" @click="GuestSignIn" />
</template>
<script setup lang="ts">
import { Button } from '.';
import {SigninUser} from '../../server/authentication';
import { useIonRouter } from "@ionic/vue";
const ionRouter = useIonRouter();
const Redirect = () => ionRouter.navigate("/home", "forward", "replace");

const GuestSignIn = async () => {
  await SigninUser({
    uid: new Date().toLocaleString(),
    displayName: 'Guest',
    email: 'none'
  });
  Redirect();
}
</script>
<style scoped>
.guest-signin {
  --width: 200px;
  --height: 50px;
}
</style>