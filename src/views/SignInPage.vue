<template>
  <form class="signin-content" v-on:submit.prevent="">
    <h1 class="content-title">SIGN IN</h1>
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
      :onValidate="(value) => emailValidated = value"
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

    <Button
      id="button-signin"
      :onClick="() => Redirect(closeModal)"
      text="Sign In"
      :disabled="disabled"
    />
  </form>
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

const email = ref("");
const password = ref("");

const EmailValidator = (value: string) =>
  value.match(
    /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  ) !== null;

const emailValidated = ref(false);
const disabled = computed(()=>!emailValidated.value || password.value === "")
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
  margin-top: 20px;
}
</style>
