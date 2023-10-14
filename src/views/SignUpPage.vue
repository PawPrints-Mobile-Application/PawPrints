<template>
  <section class="signin-content">
    <h1 class="content-title">SIGN UP</h1>

    <TextInput
      class="text-input text-input-bottom-margin"
      type="text"
      label="First Name"
      id="firstname"
      name="firstname"
      placeholder="Enter First Name"
      v-model:modelValue="form.firstname"
    />

    <TextInput
      class="text-input text-input-bottom-margin"
      type="text"
      label="Last Name"
      id="lastname"
      name="lastname"
      placeholder="Enter Last Name"
      v-model:modelValue="form.lastname"
    />

    <TextInput
      class="text-input text-input-bottom-margin"
      type="text"
      label="Username"
      id="username"
      name="username"
      placeholder="Enter Username"
      v-model:modelValue="form.username"
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
      v-model:modelValid="emailValidated"
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
      validate
      :validator="(value: string) => value.length >= 6"
      v-model:modelValid="passwordValidated"
      helper-text="Password must be at least 6 characters!"
    />

    <TextInput
      class="text-input"
      type="password"
      label="Confirm Password"
      id="confirmPassword"
      name="confirmPassword"
      placeholder="Confirm Password"
      v-model:modelValue="form.confirmPassword"
      :hide="!form.showPassword"
      validate
      :validator="(value: string) => form.password === value"
      v-model:modelValid="passwordValidated"
      helper-text="Passwords must match!"
    />
    <Checkbox name="showPassword" label="Show Password" v-model="form.showPassword" />

    <Checkbox id="TOS" name="acceptTOS" v-model="form.acceptTOS">
        By creating an account you agree to our
        <span class="navigation-link">Privacy Policy</span> and
        <span class="navigation-link">Terms of Service</span>.
    </Checkbox>

    <Button
      id="button-signup"
      :onClick="register"
      text="Sign Up"
      :disabled="disabled"
    />
  </section>
</template>

<script setup lang="ts">
import Checkbox from "../components/Forms/Checkbox.vue";
import TextInput from "../components/Forms/TextInput.vue";
import Button from "../components/Buttons/Button.vue";
import { computed, ref, reactive } from "vue";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../server/firebase";
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
  firstname: "",
  lastname: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  showPassword: false,
  acceptTOS: false
});

const EmailValidator = (value: string) =>
  value.match(
    /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  ) !== null;

const emailValidated = ref(false);
const passwordValidated = ref(false);
const disabled = computed(() => !emailValidated.value || form.password !== '' || form.password === form.confirmPassword);

const register = () => {
  createUserWithEmailAndPassword(auth, form.email, form.password)
    .then(() => {
      console.log("Successfully registered!");
      Redirect();
      props.closeModal();
    })
    .catch((error) => {
      console.log(error);
      alert(error.message);
    });
};
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

.text-input-bottom-margin {
  margin-bottom: 20px;
}

#email {
  margin-bottom: 3px;
}

#button-signup {
  --width: 100%;
  margin-top: 30px;
}

#TOS {
  margin: 20px 0 0px;
}
</style>
