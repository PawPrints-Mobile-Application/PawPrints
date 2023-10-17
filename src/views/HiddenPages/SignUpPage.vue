<template>
  <section class="signin-content">
    <h1 class="content-title">SIGN UP</h1>

    <TextInput
      class="text-input text-input-bottom-margin"
      type="text"
      label="First Name"
      id="firstName"
      name="firstName"
      placeholder="Enter First Name"
      v-model:modelValue="form.firstName"
    />

    <TextInput
      class="text-input text-input-bottom-margin"
      type="text"
      label="Last Name"
      id="lastName"
      name="lastName"
      placeholder="Enter Last Name"
      v-model:modelValue="form.lastName"
    />

    <TextInput
      class="text-input"
      type="text"
      label="Username"
      id="username"
      name="username"
      placeholder="Enter Username"
      validate
      :validator="SignupValidator.username.validator"
      v-model:modelValid="validations.username"
      v-model:modelValue="form.username"
      :helper-text="`Password must be at least ${SignupValidator.username.count} characters!`"
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
      :validator="SignupValidator.email"
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
      validate
      :validator="SignupValidator.password.validator"
      v-model:modelValid="validations.password"
      :helper-text="`Password must be at least ${SignupValidator.password.count} characters!`"
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
      v-model:modelValid="validations.confirmPassword"
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
      :text="processingRequest ? 'Sign Up' : 'Processing...'"
      :disabled="disabled"
    />
  </section>
</template>

<script setup lang="ts">
import { Checkbox, TextInput } from '../../components/Forms';
import Button from '../../components/Buttons';

import { SignupUser } from '../../server/authentication';

import { computed, reactive, ref } from "vue";
import { createUserWithEmailAndPassword} from "firebase/auth";
import auth from "../../server/firebase";
import { SignupValidator} from '../../server/rulesets';
import { useIonRouter } from "@ionic/vue";
const ionRouter = useIonRouter();
const Redirect = () => {
  console.log('Redirecting to Home Page...');
  ionRouter.navigate("/home", "forward", "replace");
}

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
  acceptTOS: false
});

const validations = reactive({
  username: false,
  email: false,
  password: false,
  confirmPassword: false
});

const requirements = () => [form.firstName, form.lastName, form.username, form.email, form.password, form.confirmPassword].map(value => value !== '').reduce((acc, value) => acc && value);
const validity = () => validations.confirmPassword && validations.email && validations.password;

const processingRequest = ref(true);
const disabled = computed(() => !(requirements() && validity() && form.acceptTOS && processingRequest.value));

const register = async () => {
  processingRequest.value = false;
  createUserWithEmailAndPassword(auth, form.email, form.password)
    .then(async (userCredential) => {
      await SignupUser(form, userCredential.user);
      Redirect();
      props.closeModal();
    })
    .catch((error) => {
     switch (error.code) {
        case 'auth/email-already-in-use':
          console.log(`Email address ${form.email} already in use.`);
          break;
        case 'auth/invalid-email':
          console.log(`Email address ${form.email} is invalid.`);
          break;
        case 'auth/operation-not-allowed':
          console.log(`Error during sign up.`);
          break;
        case 'auth/weak-password':
          console.log('Password is not strong enough. Add additional characters including special characters and numbers.');
          break;
        default:
          console.log(error.message);
          break;
      }
    });
};
</script>

<script lang="ts">
export default {
  name: "SignUpPage",
  routeInfo: {
      filename: 'SignUpPage',
    path: '/signup',
    meta: {
      requiresAuth: false,
      requiresInternet: false
    }
  }
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
  --height: 40px;
  margin-top: 30px;
}

#TOS {
  margin: 20px 0 0px;
}
</style>