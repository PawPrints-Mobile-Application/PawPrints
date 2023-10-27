<template>
    <Button
      id="button-signout"
      :onClick="SignOut"
      text="Sign Out"
    />
</template>

<script setup lang="ts">
import Button from './Button.vue';
import { useIonRouter } from "@ionic/vue";
import {SignoutUser} from '../../server/authentication';
const ionRouter = useIonRouter();
const Redirect = () => ionRouter.navigate("/auth", "forward", "replace");

const SignOut = async () => SignoutUser().then(Redirect);
</script>
<style scoped>
</style>