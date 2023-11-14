<template>
  <ButtonModal
    ref="modal"
    trigger="signin"
    title="Sign In"
    buttonSubmitText="Sign In"
    :disableSubmit="disabled || processingRequest"
    :disableBack="processingRequest"
    :disableClear="processingRequest"
    :hideHeader="processingRequest"
    :hideFooter="processingRequest"
    @submit="Login"
    @clear="ClearForm(false)"
    @dismiss="ClearForm"
  >
    <template #button><ButtonAuth label="Sign In" /></template>

    <section class="state-indicator">
      <NoteWarning v-show="noteWarning !== '' && !hideForm">
        {{ noteWarning }}
      </NoteWarning>
      <div class="media">
        <IonSpinner name="crescent" v-show="hideForm" />
        <img :src="PawPrints" />
      </div>
      <TextSubheading v-show="hideForm">{{ processState }}</TextSubheading>
    </section>

    <section class="form" :class="{ hide: hideForm }">
      <InputText
        ref="email"
        type="email"
        label="Email"
        placeholder="Enter Email"
        v-model:value="form.email"
      />

      <InputText
        ref="password"
        type="password"
        label="Password"
        placeholder="Enter Password"
        v-model:value="form.password"
      />
    </section>
  </ButtonModal>
</template>
<script setup lang="ts">
import { ButtonModal, ButtonAuth } from "../Buttons";
import { InputText } from "../Forms";
import { NoteWarning, TextSubheading } from "../Texts";

import {
  FirebaseLogin,
  DatabaseInitialization,
  WindowDatabaseInitialization,
} from "../../server/authentication";

import { computed, reactive, ref } from "vue";
import { useIonRouter, IonSpinner } from "@ionic/vue";
import { PawPrints } from "../../assets/images";

const modal = ref();

const ionRouter = useIonRouter();
const Redirect = () => {
  console.log("Redirecting to Home Page...");
  ionRouter.navigate("/home", "forward", "replace");
};

const form = reactive({
  email: "",
  password: "",
  showPassword: false,
});

const email = ref();
const password = ref();

const ClearForm = (clearNote: boolean = true) => {
  console.log("Clearing...");
  form.email = "";
  form.password = "";
  if (clearNote) noteWarning.value = "";
  else
    setTimeout(() => {
      email.value.Reevaluate();
      password.value.Reevaluate();
    }, 100);
};

const processingRequest = ref(false);
const disabled = computed(
  () => form.email === "" || form.password === "" || processingRequest.value
);

const Login = () => {
  emit("processing", true);
  processState.value = "Connecting to server...";
  processingRequest.value = true;
  hideForm.value = true;
  noteWarning.value = "";
  setTimeout(() => {
    processState.value = "Account Logging in...";
    FirebaseLogin(form)
      .then((user) => {
        processState.value = "Fetching Cloud Database...";
        return DatabaseInitialization(user);
      })
      .then((props) => {
        processState.value = "Preparing Application...";
        return WindowDatabaseInitialization(props);
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
            noteWarning.value = "Invalid email";
            break;
          case "auth/user-not-found":
            noteWarning.value = "User Not Found";
            break;
          case "auth/wrong-password":
            noteWarning.value = "Wrong Password";
            break;
          case "auth/network-request-failed":
            noteWarning.value = "Network request failed.";
            break;
          default:
            noteWarning.value = "Incorrect Email or Password";
            break;
        }
        console.log(error);
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
  name: "SigninTemplate",
};
</script>

<style scoped>
.form {
  transform: translateY(-50px);
  width: 100%;
  height: 170px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 50px;
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
