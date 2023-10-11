<template>
  <section class="signin-content">
    <h1 class="content-title">SIGN IN</h1>
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
      :value="(v: string) => form.password.value = v"
    />

    <Button color="tertiary" v-on:click="() => Redirect(closeModal)">Sign In</Button>
  </section>
</template>

<script setup lang="ts">
import TextInput from "../components/Forms/TextInput.vue";
import Button from "../components/Buttons/Button.vue";
import { reactive, toRefs } from "vue";
  import { useIonRouter } from '@ionic/vue';
  const ionRouter = useIonRouter();

const form = toRefs(reactive({ email: "", password: "" }));
const EmailValidator = (value: string) =>
  value.match(
    /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  ) !== null;

  const Redirect = (func: any) => {ionRouter.navigate("/home", "forward", "replace"); func();};
</script>

<script lang="ts">
export default {
  name: "SignInPage",
  props: ['closeModal']
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
</style>
