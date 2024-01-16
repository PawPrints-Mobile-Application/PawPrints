<template>
  <ButtonText class="button-guest" value="Guest" @click="GuestSignIn" />
</template>
<script setup lang="ts">
import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import { ButtonText } from "..";
import {
  DatabaseInitialization,
  WindowDatabaseInitialization,
} from "../../server/authentication";

import { useIonRouter } from "@ionic/vue";
const ionRouter = useIonRouter();
const Redirect = () => ionRouter.navigate("/tutorials", "forward", "replace");

const props = defineProps({
  db: SQLiteDBConnection,
});

const GuestSignIn = () =>
  DatabaseInitialization(props.db!)
    .then(WindowDatabaseInitialization)
    .then(Redirect);
</script>
<style scoped></style>
