<template>
  <section class="template-wrapper">
    <InputText
      type="text"
      label="Username"
      id="username"
      placeholder="Enter Username"
      required
      v-model:valid="validations.username"
      v-model:value="form.username"
      :validators="SignupValidator.username"
    />

    <InputText
      type="email"
      label="Email"
      id="email"
      placeholder="Enter Email"
      required
      v-model:valid="validations.email"
      v-model:value="form.email"
      :validators="SignupValidator.email"
    />

    <InputText
      type="password"
      label="Password"
      id="password"
      placeholder="Enter Password"
      required
      @validate="(value) => (validations.password = value > -1)"
      v-model:value="form.password"
      :validators="SignupValidator.password"
      :show="validations.showPassword"
    />

    <InputToggle id="TOS" v-model="form.acceptTOS">
      By creating an account you agree to our
      <span class="navigation-link">Privacy Policy</span> and
      <span class="navigation-link">Terms of Service</span>.
    </InputToggle>

    <TextButton
      id="button-signup"
      :label="!processingRequest ? 'Sign Up' : 'Processing...'"
      @click="Register"
      :disabled="disabled"
    />
  </section>
</template>

<script setup lang="ts">
import { TextButton } from "../../../components/Buttons";
import { InputText, InputToggle } from "../../../components/Forms";

import { SignupUser } from "../../../server/authentication";

import { computed, reactive, ref } from "vue";
import { SignupValidator } from "../../../server/rulesets";
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
  username: "",
  email: "",
  password: "",
  acceptTOS: false,
});

const validations = reactive({
  username: false,
  email: false,
  password: false,
  showPassword: false,
});

const requirements = () =>
  [form.username, form.email, form.password]
    .map((value) => value !== "")
    .reduce((acc, value) => acc && value);
const validity = () => validations.email && validations.password;

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
  validations.showPassword = false;
  SignupUser(form)
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
    })
    .then(() => {
      Redirect();
      props.closeModal();
    })
    .finally(() => (processingRequest.value = false));
};
</script>

<script lang="ts">
export default {
  name: "SignupTemplate",
};
</script>
<style scoped>
.template-wrapper {
  justify-content: space-between;
}

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

.input-text {
  width: 100%;
}
</style>
