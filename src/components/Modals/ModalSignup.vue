<template>
  <ButtonModal
    ref="modal"
    trigger="signup"
    title="Sign Up"
    buttonSubmitText="Sign Up"
    :disableSubmit="disabled || processingRequest"
    :disableBack="processingRequest"
    :disableClear="processingRequest"
    :hideHeader="processingRequest"
    :hideFooter="processingRequest"
    @submit="Register"
    @clear="ClearForm(false)"
    @dismiss="ClearForm"
  >
    <template #button><ButtonAuth label="Sign Up" /></template>

    <section class="state-indicator" v-show="hideForm">
      <div class="media">
        <IonSpinner name="crescent" />
        <img :src="PawPrints" />
      </div>
      <TextSubheading>{{ processState }}</TextSubheading>
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
    </section>
  </ButtonModal>
</template>

<script setup lang="ts">
import { ButtonModal, ButtonAuth } from "../Buttons";
import { InputText, InputToggle } from "../Forms";
import { NoteWarning, TextSubheading } from "../Texts";

import {
  FirebaseRegistration,
  FirebaseVerification,
  FirebaseProfileUpdate,
  DatabaseRegistration,
  WindowDatabaseInitialization,
} from "../../server/authentication";

import { computed, reactive, ref } from "vue";
import { useIonRouter, IonSpinner } from "@ionic/vue";
import { PawPrints } from "../../assets/images";
import { SignupValidator } from "../../server/rulesets";

const modal = ref();

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

const ClearForm = (clearNote: boolean = true) => {
  console.log("Clearing...");
  form.username = "";
  form.email = "";
  form.password = "";
  form.acceptTOS = false;
  if (clearNote) noteWarning.value = "";
  else
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
  processState.value = "Connecting to server...";
  processingRequest.value = true;
  hideForm.value = true;
  noteWarning.value = "";
  setTimeout(() => {
    processState.value = "Account Registration...";
    FirebaseRegistration(form)
      .then((user) => {
        processState.value = "Account Verification...";
        return FirebaseVerification(user);
      })
      .then((user) => {
        processState.value = "Account Details Initialization...";
        return FirebaseProfileUpdate(user, { displayName: form.username });
      })
      .then((user) => {
        processState.value = "Creating Cloud Database...";
        return DatabaseRegistration(user);
      })
      .then((props) => {
        processState.value = "Preparing Application...";
        return WindowDatabaseInitialization(props);
      })
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
            ClearForm(false);
            hideForm.value = false;
            emit("fail");
            processingRequest.value = false;
          } else {
            Redirect();
            emit("success");
            modal.value.Close();
          }
          emit("processing", false);
          processState.value = "";
        }, 1000);
      });
  }, 1000);
};

const noteWarning = ref("");
const hideForm = ref(false);
const processState = ref("");

const emit = defineEmits(["processing", "success", "fail"]);
</script>

<script lang="ts">
export default {
  name: "SignupTemplate",
};
</script>
<style scoped>
.navigation-link {
  text-decoration: underline;
  font-weight: 500;
  cursor: pointer;
}
.form {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  transition: all 200ms ease-out;
  overflow: hidden;
}

.form.hide {
  height: 0;
}

.state-indicator {
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  transition: all 200ms ease-out;

  > .note-warning {
    position: absolute;
    width: calc(100% - 40px);
  }

  > .media {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > ion-spinner {
      position: absolute;
      --size: 260px;
      width: var(--size);
      height: var(--size);
    }
  }
}
</style>
