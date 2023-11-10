<template>
  <IconButton class="button-google" :icon="icon" @click="SignInWithGoogle" />
</template>
<script setup lang="ts">
import IconButton from "./IconButton.vue";
import { logoGoogle as icon } from "ionicons/icons";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import auth from "../../server/firebase";
import { useIonRouter } from "@ionic/vue";
const ionRouter = useIonRouter();
const Redirect = () => ionRouter.navigate("/home", "forward", "replace");

const SignInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((resolve) => {
      console.log(resolve);
      Redirect();
    })
    .catch((error) => {
      console.log(error.message);
    });
};
</script>
<style scoped>
.button-google {
  background-color: var(--ion-color-tertiary);
  --size: var(--fs0);
  --padding: 7px;
}
</style>
