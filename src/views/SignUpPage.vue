<template>
  <section class="signin-content">
    <h1 class="content-title">SIGN UP</h1>
    <TextInput
      class="text-input"
      type="text"
      label="First Name"
      id="firstName"
      name="firstName"
      placeholder="Enter First Name"
      :onInput="(value) => (firstName = value)"
    />

    <TextInput
      class="text-input"
      type="text"
      label="Last Name"
      id="lastName"
      name="lastName"
      placeholder="Enter Last Name"
      :onInput="(value) => (lastName = value)"
    />

    <TextInput
      class="text-input"
      type="text"
      label="Username"
      id="username"
      name="username"
      placeholder="Enter Username"
      :onInput="(value) => (username = value)"
    />

    <TextInput
      class="text-input"
      type="email"
      label="Email"
      id="email"
      name="email"
      placeholder="Enter Email"
      helperText="Please enter a valid email address"
      validate
      :validator="EmailValidator"
      :onInput="(value) => (email = value)"
    />

    <TextInput
      class="text-input"
      type="password"
      label="Password"
      id="password"
      name="password"
      placeholder="Enter Password"
      :onInput="(value) => (password = value)"
    />

    <TextInput
      class="text-input"
      type="password"
      label="Confirm Password"
      id="confirmPassword"
      name="confirmPassword"
      placeholder="Confirm Password"
      :onInput="(value) => (confirmPassword = value)"
      :onValidate="(value) => emailValidated = value"
    />

    <div class="content-text">
      By creating an account you agree to our
      <span class="navigation-link">Privacy Policy</span> and
      <span class="navigation-link">Terms of Service</span>.
    </div>

    <Button
      id="button-signup"
      :onClick="() => Redirect(closeModal)"
      text="Sign Up"
      :disabled="disabled"
    />
  </section>
</template>

<script setup lang="ts">
import TextInput from "../components/Forms/TextInput.vue";
import Button from "../components/Buttons/Button.vue";
import { computed, ref } from "vue";
import { useIonRouter } from "@ionic/vue";
const ionRouter = useIonRouter();

defineProps(['closeModal']);

const Redirect = (func: any) => {
  ionRouter.navigate("/home", "forward", "replace");
  func();
};

const firstName = ref("");
const lastName = ref("");
const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const EmailValidator = (value: string) =>
  value.match(
    /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  ) !== null;

const emailValidated = ref(false);
const disabled = computed(()=>!emailValidated.value || password.value === "")
</script>

<script lang="ts">
export default {
  name: "SignUpPage",
};
</script>
<style scoped>
.signin-content {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.content-title {
  font-size: 3rem;
  font-weight: 600;
}

.content-text {
  text-align: justify;
  font-family: Rubik;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 10px;
}

.navigation-link {
  text-decoration: underline;
  font-weight: 500;
  cursor: pointer;
}

.text-input {
  margin-bottom: 20px;
}

#email {
  margin-bottom: 3px;
}

#button-signup {
  --width: 100%;
  margin-top: 30px;
}
</style>
