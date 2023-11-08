<template>
  <section class="template-wrapper">
    <section class="message-processing" v-show="hideForm">
      <div class="message-media">
        <IonSpinner name="crescent" />
        <img :src="PawPrints" />
      </div>
      <p class="message-text">Account Processing!</p>
    </section>
    <section class="form" :class="{ hide: hideForm }">
      <NoteWarning v-show="noteWarning !== ''">
        {{ noteWarning }}
      </NoteWarning>

      <InputText
        ref="username"
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
        ref="email"
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
        ref="password"
        type="password"
        label="Password"
        id="password"
        placeholder="Enter Password"
        required
        @validate="(value) => (validations.password = value > -1)"
        v-model:value="form.password"
        :validators="SignupValidator.password"
      />

      <InputToggle id="TOS" v-model:value="form.acceptTOS">
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
  </section>
</template>

<script setup lang="ts">
import { TextButton } from "../../../components/Buttons";
import { InputText, InputToggle } from "../../../components/Forms";
import { NoteWarning } from "../../../components/Texts";

import { SignupUser } from "../../../server/authentication";

import { computed, reactive, ref } from "vue";
import { SignupValidator } from "../../../server/rulesets";
import { useIonRouter, IonSpinner } from "@ionic/vue";
import { PawPrints } from "../../../assets/images";
const ionRouter = useIonRouter();
const Redirect = () => {
  console.log("Redirecting to Home Page...");
  ionRouter.navigate("/home", "forward", "replace");
};

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
});

const username = ref();
const email = ref();
const password = ref();

const ClearForm = () => {
  form.username = "";
  form.email = "";
  form.password = "";
  form.acceptTOS = false;
  setTimeout(() => {
    username.value.Reevaluate();
    email.value.Reevaluate();
    password.value.Reevaluate();
  }, 100);
};

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
  emit("processing", true);
  processingRequest.value = true;
  hideForm.value = true;
  noteWarning.value = "";
  setTimeout(() => {
    SignupUser(form)
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-in-use":
            noteWarning.value = `Email address already in use.`;
            break;
          case "auth/invalid-email":
            noteWarning.value = `Email address is invalid.`;
            break;
          case "auth/operation-not-allowed":
            noteWarning.value = `Error during sign up.`;
            break;
          case "auth/weak-password":
            noteWarning.value =
              "Password is not strong enough. Add additional characters including special characters and numbers.";
            break;
          case "auth/network-request-failed":
            noteWarning.value = "Network request failed.";
            break;
          default:
            noteWarning.value = error.message;
            break;
        }
        console.log(error.code);
      })
      .finally(() => {
        setTimeout(() => {
          if (noteWarning.value !== "") {
            ClearForm();
            hideForm.value = false;
            emit('fail');
          } else {
            Redirect();
            emit('success');
          }
          processingRequest.value = false;
          emit("processing", false);
        }, 1000);
      });
  }, 1000);
};

const noteWarning = ref("");
const hideForm = ref(false);

const emit = defineEmits(["processing", "success", "fail"]);
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

.form {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  transition: all 100ms ease-out;
}

.form.hide {
  height: 0;
}

.message-processing {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > .message-media {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > img {
      position: absolute;
    }

    > ion-spinner {
      --size: 260px;
      width: var(--size);
      height: var(--size);
    }
  }

  > .message-text {
    font-family: Rubik;
    font-weight: bold;
    font-size: var(--fs1);
  }
}
</style>
