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
import { onBeforeMount, onBeforeUnmount, ref } from "vue";
import { PawprintsEvent } from "../../utils";

const ionRouter = useIonRouter();
const Redirect = () => {
  ionRouter.navigate("/splash", "forward", "replace");
  PawprintsEvent.EventDispatcher("reset-data")
  setTimeout(() => PawprintsEvent.EventDispatcher("transition to auth"), 1000);
};

const SignOut = () =>
  FirebaseSignout()
    .then(() => DatabaseTermination(db.value))
    .then(WindowDatabaseTermination)
    .then(Redirect);

const db = ref();
onBeforeMount(() => {
  PawprintsEvent.AddEventListener("response-db", (value: any) => {
    db.value = value;
  });
  PawprintsEvent.EventDispatcher("request-db");
});
onBeforeUnmount(() => {
  PawprintsEvent.RemoveEventListener(
    "response-db",
    (value: any) => (db.value = value)
  );
});
</script>
<style scoped>
.button-signout {
  color: var(--theme-warning-text);
  background-color: var(--theme-warning-background);
}
</style>
