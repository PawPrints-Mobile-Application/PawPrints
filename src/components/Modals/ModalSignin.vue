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
    :canDismiss="true"
    :noHeaderAnimation="true"
  >
    <template #button><ButtonText label="Sign In" /></template>

    <section class="state-indicator">
      <NoteWarning v-show="noteWarning !== '' && !hideForm">
        {{ noteWarning }}
      </NoteWarning>
      <div class="media">
        <IonSpinner name="crescent" v-show="hideForm" />
        <Logo />
      </div>
      <TextSubheading v-show="hideForm">{{ processState }}</TextSubheading>
    </section>

    <section class="form" :class="{ hide: hideForm }">
      <InputDynamicWrapped
        ref="email"
        type="email"
        label="Email"
        placeholder="Enter Email"
        v-model="form.email"
      />

      <InputDynamicWrapped
        ref="password"
        type="password"
        label="Password"
        placeholder="Enter Password"
        v-model="form.password"
      />
    </section>
  </ButtonModal>
</template>
<script setup lang="ts">
import { ButtonModal, ButtonText } from "../Buttons";
import { InputDynamicWrapped } from "../Forms";
import { NoteWarning, TextSubheading } from "../Texts";

import {
  FirebaseLogin,
  DatabaseInitialization,
  WindowDatabaseInitialization,
} from "../../server/authentication";

import { computed, reactive, ref } from "vue";
import { useIonRouter, IonSpinner } from "@ionic/vue";
import { Logo } from "../Logo";

const modal = ref();

const ionRouter = useIonRouter();
const Redirect = () => {
  console.log("Redirecting to Home Page...");
  ionRouter.navigate("/dogs", "forward", "replace");
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
  transform: translateY(-20px);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 30px;
  transition: all 200ms ease-out;
  overflow: hidden;
}

.button-text {
  width: 200px;
  height: 50px;
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
