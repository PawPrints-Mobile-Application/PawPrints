<template>
  <ButtonText class="button-guest" label="Guest" @click="GuestSignIn" />
</template>
<script setup lang="ts">
import { ButtonText } from ".";
import {
  DatabaseInitialization,
  WindowDatabaseInitialization,
} from "../../server/authentication";

import { useIonRouter } from "@ionic/vue";
const ionRouter = useIonRouter();
const Redirect = () => ionRouter.navigate("/home", "forward", "replace");

const GuestSignIn = () =>
  DatabaseInitialization().then(WindowDatabaseInitialization).then(Redirect);
</script>
<style scoped>
.button-text {
  width: 200px;
  height: 50px;
}
</style>
