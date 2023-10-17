<template>
    <Button
      id="button-signout"
      :onClick="SignOut"
      text="Sign Out"
    />
</template>

<script setup lang="ts">
import { getAuth, signOut } from 'firebase/auth';
import Button from './Button.vue';
import { useIonRouter } from "@ionic/vue";
import {SignoutUser} from '../../server/authentication';
const ionRouter = useIonRouter();
const Redirect = () => ionRouter.navigate("/login", "forward", "replace");

const SignOut = async () => await SignoutUser().then(async () => await signOut(getAuth()).then(Redirect));
</script>
<style scoped>
</style>