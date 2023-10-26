<template>
  <Button class="guest-signin" text="Guest" @click="GuestSignIn" />
</template>
<script setup lang="ts">
import { Button } from ".";
import { SigninProps } from "../../server/authentication/SigninUser";
import { useIonRouter } from "@ionic/vue";
const ionRouter = useIonRouter();
const Redirect = () => ionRouter.navigate("/home", "forward", "replace");

const GuestSignIn = async () => {
  await SigninProps(
    {
      uid: new Date().toLocaleString(),
      displayName: "Guest",
      email: "none",
    },
    new Date().toLocaleDateString(),
    new Date().toLocaleTimeString()
  );
  Redirect();
};
</script>
<style scoped></style>
