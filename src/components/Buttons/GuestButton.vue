<template>
  <TextButton class="guest-signin" label="Guest" @click="GuestSignIn" />
</template>
<script setup lang="ts">
import { TextButton } from ".";
import SigninUser from "../../server/authentication/SigninUser";
import { useIonRouter } from "@ionic/vue";
const ionRouter = useIonRouter();
const Redirect = () => ionRouter.navigate("/home", "forward", "replace");

const GuestSignIn = () => SigninUser().then(() => Redirect());
</script>
<style scoped>
.text-button {
  width: var(--width);
  height: var(--height);
  font-weight: var(--font-weight);
}
</style>
