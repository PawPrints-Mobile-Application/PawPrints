<template>
  <Modal
    trigger="modal-signup"
    @present="() => (state.authError = false)"
    :disableBack="state.processing"
  >
    <template #header><TextHeading class="bold" value="Sign Up" /> </template>

    <section
      class="indicator-processing"
      :class="{ processing: state.processing }"
    >
      <IonSpinner
        name="bubbles"
        :class="{ color: state.userFound }"
        v-show="state.processing"
      />
      <Avatar :color="'red'" type="user" />
    </section>
    <TextSubheading
      class="note-processing"
      :class="{ show: state.processing }"
      :value="state.processingText"
    />
    <NoteWarning
      v-show="state.authError && !state.processing"
      :value="state.warningText"
    />
    <section class="form" :class="{ hide: state.processing }">
      <InputWrapper label="Username">
        <InputText placeholder="Enter Username" v-model="form.username" />
      </InputWrapper>
      <InputWrapper label="Email">
        <InputText placeholder="Enter Email" v-model="form.email" />
      </InputWrapper>
      <InputWrapper label="Password">
        <InputPassword placeholder="Enter Password" v-model="form.password" />
      </InputWrapper>
      <InputToggle id="TOS" v-model="form.acceptTOS">
        <TextSmall>
          By creating an account you agree to our
          <span class="navigation-link">Privacy Policy</span> and
          <span class="navigation-link">Terms of Service</span>.
        </TextSmall>
      </InputToggle>
      <div class="buttons">
        <ButtonDanger value="Clear" @click="Clear" :disabled="disableClear" />
        <ButtonSuccess
          value="Sign In"
          @click="Process"
          :disabled="disableSave"
        />
      </div>
    </section>
  </Modal>
</template>
<script setup lang="ts">
import { computed, reactive } from "vue";
import {
  Modal,
  TextHeading,
  TextSubheading,
  InputWrapper,
  InputText,
  InputPassword,
  InputToggle,
  ButtonSuccess,
  ButtonDanger,
  Avatar,
  NoteWarning,
  TextSmall,
} from "..";
import { IonSpinner, useIonRouter } from "@ionic/vue";
import {
  FirebaseRegistration,
  FirebaseVerification,
  FirebaseProfileUpdate,
  DatabaseRegistration,
  WindowDatabaseInitialization,
} from "../../server/authentication";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import { PawprintsEvent } from "../../utils";
const ionRouter = useIonRouter();
const Navigate = () => {
  console.log("Redirecting to Tutorial Page...");
  ionRouter.navigate("/tutorials", "forward", "replace");
};

const props = defineProps({
  db: SQLiteDBConnection,
});

const defaultValues = {
  username: "",
  email: "",
  password: "",
  acceptTOS: false,
};

const form = reactive({
  username: "",
  email: "",
  password: "",
  acceptTOS: false,
});

const state = reactive({
  processingText: "",
  warningText: "",
  processing: false,
  userFound: false,
  authError: false,
});

const Clear = () => {
  form.username = "";
  form.email = "";
  form.password = "";
  form.acceptTOS = false;
};

const disableClear = computed(
  () =>
    form.email === defaultValues.email &&
    form.username === defaultValues.username &&
    form.password === defaultValues.password &&
    form.acceptTOS === defaultValues.acceptTOS
);
const disableSave = computed(
  () =>
    [form.email, form.username, form.password].includes("") || !form.acceptTOS
);

const Process = () => {
  state.processing = true;
  state.processingText = "Connecting to server...";
  setTimeout(() => {
    state.processingText = "Account Registration...";
    FirebaseRegistration(form)
      .then((user) => {
        state.processingText = "Account Verification...";
        return FirebaseVerification(user);
      })
      .then((user) => {
        state.processingText = "Account Details Initialization...";
        return FirebaseProfileUpdate(user, { displayName: form.username });
      })
      .then((user) => {
        state.processingText = "Creating Cloud Database...";
        return DatabaseRegistration(props.db!, user);
      })
      .then((props) => {
        state.processingText = "Preparing Application...";
        return WindowDatabaseInitialization(props);
      })
      .catch((error) => {
        console.log(error);
        switch (error.code) {
          case "auth/email-already-in-use":
            state.warningText = `Email address already in use.`;
            break;
          case "auth/invalid-email":
            state.warningText = `Email address is invalid.`;
            break;
          case "auth/operation-not-allowed":
            state.warningText = `Error during sign up.`;
            break;
          case "auth/weak-password":
            state.warningText =
              "Password is not strong enough. Add additional characters including special characters and numbers.";
            break;
          case "auth/network-request-failed":
            state.warningText = "Network request failed.";
            break;
          default:
            state.warningText = error.message;
            break;
        }
        state.authError = true;
      })
      .finally(() => {
        Clear();
        if (!state.authError) {
          Navigate();
          PawprintsEvent.EventDispatcher("modal-signup");
        }
        setTimeout(() => {
          state.processing = false;
          state.processingText = "";
          state.userFound = false;
        }, 1000);
      });
  }, 1000);
};
</script>
<style scoped>
.modal {
  --justify-content: center;
  --gap: 20px;
}

.button {
  flex: 1 0 0;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 2px;
  height: 300px;
  overflow: hidden;
  transition: all 200ms ease-out;

  > .buttons {
    width: 100%;
    display: flex;
    gap: 10px;
  }

  &.hide {
    height: 0;
    padding: 0;
  }
}

.note-processing {
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 0px;
  overflow: hidden;
  transition: all 200ms ease-out;

  &.show {
    height: 200px;
  }
}

.indicator-processing {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 150px;
  width: 100%;

  > .avatar {
    --size: 150px;
    position: absolute;
    transition: all 200ms ease-out;
  }

  > ion-spinner {
    opacity: 0;
    width: 250px;
    height: 250px;
    transition: all 200ms ease-out;

    &.color {
      color: var(--theme-tertiary-background);
    }
  }
}

.processing {
  > .avatar {
    --size: 100px;
  }

  > ion-spinner {
    opacity: 1;
  }
}

.navigation-link {
  text-decoration: underline;
  font-weight: 500;
  cursor: pointer;
}
</style>
