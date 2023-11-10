<template>
  <TextButton class="button-signout" @click="SignOut" label="Sign Out" />
</template>

<script setup lang="ts">
import { TextButton } from ".";
import { useIonRouter } from "@ionic/vue";

import {
  DatabaseTermination,
  WindowDatabaseTermination,
} from "../../server/authentication";

const ionRouter = useIonRouter();
const Redirect = () => ionRouter.navigate("/auth", "forward", "replace");

const SignOut = () =>
  DatabaseTermination().then(WindowDatabaseTermination).then(Redirect);
</script>
<style scoped></style>
