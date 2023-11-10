<template>
  <section class="template-wrapper">
    <section class="message-processing" v-show="hideForm">
      <div class="message-media">
        <IonSpinner name="crescent" />
        <img :src="PawPrints" />
      </div>
      <p class="message-text">
        {{ processState }}
      </p>
    </section>
    <div class="form" :class="{ hide: hideForm }">
      <NoteWarning v-show="noteWarning !== ''">
        {{ noteWarning }}
      </NoteWarning>

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

      <TextButton
        id="button-signin"
        :label="!processingRequest ? 'Sign In' : 'Processing...'"
        @click="Login"
        :disabled="disabled"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { InputText } from "../../../components/Forms";
import { TextButton } from "../../../components/Buttons";
import { NoteWarning } from "../../../components/Texts";

import {
  FirebaseLogin,
  DatabaseInitialization,
  WindowDatabaseInitialization,
} from "../../../server/authentication";

import { computed, reactive, ref } from "vue";
import { useIonRouter, IonSpinner } from "@ionic/vue";
import { PawPrints } from "../../../assets/images";
const ionRouter = useIonRouter();
const Redirect = () => ionRouter.navigate("/home", "forward", "replace");

const form = reactive({
  email: "",
  password: "",
  showPassword: false,
});

const email = ref();
const password = ref();

const ClearForm = () => {
  form.email = "";
  form.password = "";
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
            ClearForm();
            hideForm.value = false;
            emit("fail");
          } else {
            Redirect();
            emit("success");
          }
          processingRequest.value = false;
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
.template-wrapper {
  justify-content: center;
}

#button-signin {
  --width: 100%;
  --height: 40px;
  margin-top: 20px;
}

.form {
  height: 250px;
  width: 100%;
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
