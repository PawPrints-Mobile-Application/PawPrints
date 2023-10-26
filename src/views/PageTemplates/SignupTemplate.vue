<template>
  <section class="template-wrapper">
    <TextInput
      type="text"
      label="First Name"
      id="firstName"
      placeholder="Enter First Name"
      v-model:modelValue="form.firstName"
    />

    <TextInput
      type="text"
      label="Last Name"
      id="lastName"
      name="lastName"
      placeholder="Enter Last Name"
      v-model:modelValue="form.lastName"
    />

    <TextInput
      type="text"
      label="Username"
      id="username"
      placeholder="Enter Username"
      required
      v-model:modelValid="validations.username"
      v-model:modelValue="form.username"
      :validators="SignupValidator.username"
    />

    <TextInput
      type="email"
      label="Email"
      id="email"
      placeholder="Enter Email"
      required
      v-model:modelValid="validations.email"
      v-model:modelValue="form.email"
      :validators="SignupValidator.email"
    />

    <TextInput
      type="password"
      label="Password"
      id="password"
      placeholder="Enter Password"
      required
      v-model:modelValid="validations.password"
      v-model:modelValue="form.password"
      :validators="SignupValidator.password"
      :show="form.showPassword"
    />

    <Checkbox
      id="show-password"
      label="Show Password"
      v-model="form.showPassword"
    />

    <Checkbox id="TOS" name="acceptTOS" v-model="form.acceptTOS">
      By creating an account you agree to our
      <span class="navigation-link">Privacy Policy</span> and
      <span class="navigation-link">Terms of Service</span>.
    </Checkbox>

    <Button
      id="button-signup"
      :text="!processingRequest ? 'Sign Up' : 'Processing...'"
      @click="Register"
      :disabled="disabled"
    />
  </section>
</template>

<script setup lang="ts">
import { Checkbox, TextInput } from "../../components/Forms";
import Button from "../../components/Buttons";

import { SignupUser } from "../../server/authentication";
import "crypto";

import { computed, reactive, ref } from "vue";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../server/firebase";
import { SignupValidator } from "../../server/rulesets";
import { useIonRouter } from "@ionic/vue";
const ionRouter = useIonRouter();
const Redirect = () => {
  console.log("Redirecting to Home Page...");
  ionRouter.navigate("/home", "forward", "replace");
};

const props = defineProps({
  closeModal: {
    type: Function,
    default: () => null,
  },
});

const form = reactive({
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  showPassword: false,
  acceptTOS: false,
});

const validations = reactive({
  username: false,
  email: false,
  password: false,
  confirmPassword: false,
});

const requirements = () =>
  [
    form.firstName,
    form.lastName,
    form.username,
    form.email,
    form.password,
    form.confirmPassword,
  ]
    .map((value) => value !== "")
    .reduce((acc, value) => acc && value);
const validity = () =>
  validations.confirmPassword && validations.email && validations.password;

const processingRequest = ref(false);
const disabled = computed(
  () =>
    !(
      requirements() &&
      validity() &&
      form.acceptTOS &&
      !processingRequest.value
    )
);

const Register = async () => {
  processingRequest.value = true;
  createUserWithEmailAndPassword(auth, form.email, form.password)
    .then((userCredential) =>
      SignupUser(
        form,
        userCredential.user,
        1,
        new Date().toLocaleDateString(),
        new Date().toLocaleTimeString()
      ).then(() => {
        Redirect();
        props.closeModal();
      })
    )
    .catch((error) => {
      let errorMessage;
      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = `Email address ${form.email} already in use.`;
          break;
        case "auth/invalid-email":
          errorMessage = `Email address ${form.email} is invalid.`;
          break;
        case "auth/operation-not-allowed":
          errorMessage = `Error during sign up.`;
          break;
        case "auth/weak-password":
          errorMessage =
            "Password is not strong enough. Add additional characters including special characters and numbers.";
          break;
        case "auth/network-request-failed":
          errorMessage = "Network request failed.";
          break;
        default:
          errorMessage = error.message;
          break;
      }
      console.log(error.code);
      alert(errorMessage);
    });
};
</script>

<script lang="ts">
export default {
  name: "SignupTemplate",
  routeInfo: {
    filename: "SignupTemplate",
    path: "/user/signup",
    meta: {
      requiresAuth: false,
      requiresInternet: false,
    },
  },
};
</script>
<style scoped>
.navigation-link {
  text-decoration: underline;
  font-weight: 500;
  cursor: pointer;
}

#button-signup {
  --width: 100%;
  --height: 40px;
  margin-top: 20px;
}
</style>
