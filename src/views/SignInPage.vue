<template>
  <form class="signin-content" method="POST" @submit.prevent="Login">
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
      :validator="validators.email"
      v-model:modelValid="validations.email"
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

    <Checkbox name="checkbox" label="Show Password" v-model="form.showPassword" />

    <Button
      id="button-signin"
      text="Sign In"
      :disabled="disabled"
    />
  </form>
</template>

<script setup lang="ts">
import {EmailValidator} from '../utils';
import Checkbox from "../components/Forms/Checkbox.vue";
import TextInput from "../components/Forms/TextInput.vue";
import Button from "../components/Buttons/Button.vue";
import { computed, ref } from "vue";
import { signInWithEmailAndPassword } from 'firebase/auth';
import auth from "../server/firebase";
import { reactive } from "vue";
import { useIonRouter } from "@ionic/vue";
const ionRouter = useIonRouter();
const Redirect = () => ionRouter.navigate("/home", "forward", "replace");

const props = defineProps({
  closeModal: {
    type: Function,
    default: () => null
  }
});

const form = reactive({
  email:  '',
  password: '',
  showPassword: false
});

const validators = reactive({
  email: EmailValidator
});

const validations = reactive({
  email: false
});

const disabled = computed(()=>!validations.email || form.email === "" || form.password === '');

const errorMessage = ref('');
const Login = () => {
  signInWithEmailAndPassword(auth, form.email, form.password).then(() => {
    console.log('Successfully Logged In!');
    Redirect();
    props.closeModal();
  }).catch(error => {
    console.log(error);
    switch(error.code) {
      case 'auth/invalid-email':
      errorMessage.value = 'Invalid email';
        break;
      case 'auth/user-not-found':
      errorMessage.value = 'User Not Found';
        break;
      case 'auth/wrong-password':
      errorMessage.value = 'Wrong Password';
        break;
      default:
      errorMessage.value = 'incorrect Email or Password';
        break;
    };
    alert(errorMessage.value);
  })
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
  margin-top: 20px;
}
</style>
