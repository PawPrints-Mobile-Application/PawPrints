<template>
  <ButtonText
    class="button-signout"
    @click="SignOut"
    label="Sign Out"
    state="danger"
  />
</template>

<script setup lang="ts">
import { ButtonText } from ".";
import { useIonRouter } from "@ionic/vue";
import { CustomEvent } from "../../utils";
import {
  FirebaseSignout,
  DatabaseTermination,
  WindowDatabaseTermination,
} from "../../server/authentication";

const ionRouter = useIonRouter();
const Redirect = () => {
  CustomEvent.EventDispatcher("reload-mode");
  ionRouter.navigate("/auth", "forward", "replace");
};

const SignOut = () =>
  FirebaseSignout()
    .then(DatabaseTermination)
    .then(WindowDatabaseTermination)
    .then(Redirect);
</script>
<style scoped>
.button-signout {
  color: var(--theme-warning-text);
  background-color: var(--theme-warning-background);
}
</style>
