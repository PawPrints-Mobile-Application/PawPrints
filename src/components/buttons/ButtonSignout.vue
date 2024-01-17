<template>
  <ButtonDanger class="button-signout" @click="SignOut" value="Sign Out" />
</template>

<script setup lang="ts">
import { ButtonDanger } from "..";
import { useIonRouter } from "@ionic/vue";
import {
  FirebaseSignout,
  DatabaseTermination,
  WindowDatabaseTermination,
} from "../../server/authentication";
import { PawprintsEvent } from "../../utils";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";

const ionRouter = useIonRouter();
const Redirect = () => {
  ionRouter.navigate("/splash", "forward", "replace");
  PawprintsEvent.EventDispatcher("reset-data");
  setTimeout(() => PawprintsEvent.EventDispatcher("user-finder", false), 1000);
};

const props = defineProps({
  db: SQLiteDBConnection,
});

const SignOut = () =>
  FirebaseSignout()
    .then(() => DatabaseTermination(props.db!))
    .then(WindowDatabaseTermination)
    .then(Redirect);
</script>
<style scoped>
.button-signout {
  color: var(--theme-warning-text);
  background-color: var(--theme-warning-background);
}
</style>
