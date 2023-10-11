<template>
  <section class="signin-content">
    <h1 class="content-title">SIGN UP</h1>
    <TextInput
      type="text"
      label="First Name"
      id="firstName"
      placeholder="Enter First Name"
      :value="(v: string) => form.firstName.value = v"
    />

    <TextInput
      type="text"
      label="Last Name"
      id="lastName"
      placeholder="Enter Last Name"
      :value="(v: string) => form.lastName.value = v"
    />

    <TextInput
      type="text"
      label="Username"
      id="username"
      placeholder="Enter Username"
      :value="(v: string) => form.username.value = v"
    />

    <TextInput
      type="email"
      label="Email"
      id="email"
      placeholder="Enter Email"
      :validator="EmailValidator"
      :value="(v: string) => form.email.value = v"
    />

    <TextInput
      type="password"
      label="Password"
      id="password"
      placeholder="Enter Password"
      :value="(v: string) => form.lastName.value = v"
    />

    <TextInput
      type="password"
      label="Confirm Password"
      id="confirmPassword"
      placeholder="Confirm Password"
      :value="(v: string) => form.confirmPassword.value = v"
    />

    <div class="content-text">
      By creating an account you agree to our <span class="navigation-link">Privacy Policy</span> and <span class="navigation-link">Terms of Service</span>.
    </div>

    <Button color="tertiary">Sign In</Button>
  </section>
</template>

<script setup lang="ts">
import TextInput from "../components/Forms/TextInput.vue";
import Button from "../components/Buttons/Button.vue";
import { reactive, toRefs } from "vue";

const form = toRefs(
  reactive({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
);
const EmailValidator = (value: string) =>
  value.match(
    /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  ) !== null;
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
}

.navigation-link {
  text-decoration: underline;
  font-weight: 500;
  cursor: pointer;
}
</style>
