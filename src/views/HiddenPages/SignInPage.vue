<template>
  <form class="signin-content" method="POST" @submit.prevent="Login">
    <TextInput
      class="text-input"
      type="email"
      label="Email"
      id="email"
      name="email"
      placeholder="Enter Email"
      v-model:modelValue="form.email"
    />

    <TextInput
      class="text-input"
      type="password"
      label="Password"
      id="password"
      name="password"
      placeholder="Enter Password"
      v-model:modelValue="form.password"
      :hide="!form.showPassword"
    />

    <Checkbox
      name="checkbox"
      label="Show Password"
      v-model="form.showPassword"
    />

    <Button id="button-signin"
      :text="!processingRequest ? 'Sign In' : 'Processing...'"
      :disabled="disabled"/>
  </form>
</template>

<script setup lang="ts">
import { Checkbox, TextInput } from "../../components/Forms";
import Button from "../../components/Buttons";

import { SigninUser } from "../../server/authentication";

import { computed, reactive, ref } from "vue";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../server/firebase";
import { useIonRouter } from "@ionic/vue";
const ionRouter = useIonRouter();
const Redirect = () => ionRouter.navigate("/home", "forward", "replace");

const props = defineProps({
  closeModal: {
    type: Function,
    default: () => null,
  },
});

const form = reactive({
  email: "",
  password: "",
  showPassword: false,
});

const processingRequest = ref(false);
const disabled = computed(() => form.email === "" || form.password === "" ||
      processingRequest.value);

const Login = () => {
  processingRequest.value = true;
  signInWithEmailAndPassword(auth, form.email, form.password)
    .then(async (userCredential) => {
      await SigninUser(
        userCredential.user,
        new Date().toLocaleDateString(),
        new Date().toLocaleTimeString()
      ).then(() => {
        Redirect();
        props.closeModal();
      });
    })
    .catch((error) => {
      let errorMessage;
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "Invalid email";
          break;
        case "auth/user-not-found":
          errorMessage = "User Not Found";
          break;
        case "auth/wrong-password":
          errorMessage = "Wrong Password";
          break;
        case "auth/network-request-failed":
          console.log("Network request failed.");
          break;
        default:
          errorMessage = "incorrect Email or Password";
          break;
      }
      console.log(error.code);
      alert(errorMessage);
    });
};
</script>

<script lang="ts">
export default {
  name: "SignInPage",
  routeInfo: {
    filename: "SignInPage",
    path: "/signin",
    meta: {
      requiresAuth: false,
      requiresInternet: false,
    },
  },
};
</script>

<style scoped>
.signin-content {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 10px;
}

.content-title {
  font-size: 3rem;
  font-weight: 600;
}

#button-signin {
  --width: 100%;
  --height: 40px;
  margin-top: 20px;
}
</style>
