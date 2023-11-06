<template>
  <section class="template-wrapper">
    <div class="form-wrapper">
      <InputText
        type="email"
        label="Email"
        id="email"
        placeholder="Enter Email"
        v-model:modelValue="form.email"
        noValidate
      />

      <InputText
        type="password"
        label="Password"
        id="password"
        placeholder="Enter Password"
        v-model:modelValue="form.password"
        :show="form.showPassword"
        noValidate
      />
      <br />

      <InputToggle
        id="show-password"
        content="Show Password"
        v-model="form.showPassword"
        design="input-only"
      />

      <TextButton
        id="button-signin"
        :label="!processingRequest ? 'Sign In' : 'Processing...'"
        @click="Login"
        :disabled="disabled"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { InputText, InputToggle } from "../../../components/Forms";
import { TextButton } from "../../../components/Buttons";

import { SigninUser } from "../../../server/authentication";

import { computed, reactive, ref } from "vue";
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
const disabled = computed(
  () => form.email === "" || form.password === "" || processingRequest.value
);

const Login = () => {
  processingRequest.value = true;
  SigninUser(form)
    .then(() => {
      Redirect();
      props.closeModal();
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
    })
    .finally(() => (processingRequest.value = false));
};
</script>

<script lang="ts">
export default {
  name: "SigninTemplate",
};
</script>

<style scoped>
.template-wrapper {
  justify-content: center;
}

.form-wrapper {
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

#button-signin {
  --width: 100%;
  --height: 40px;
  margin-top: 20px;
}
</style>
