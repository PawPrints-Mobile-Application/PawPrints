<template>
    <TextButton
      class="button-signout"
      @click="SignOut"
      label="Sign Out"
    />
</template>

<script setup lang="ts">
import { TextButton } from ".";
import { useIonRouter } from "@ionic/vue";
import {SignoutUser} from '../../server/authentication';
const ionRouter = useIonRouter();
const Redirect = () => ionRouter.navigate("/auth", "forward", "replace");

const SignOut = async () => SignoutUser().then(Redirect);
</script>
<style scoped>
</style>