<template>
  <Modal
    trigger="modal-signin"
    @present="() => (state.authError = false)"
    :disableBack="state.processing"
  >
    <template #header><TextHeading class="bold" value="Sign In" /> </template>

    <section
      class="indicator-processing"
      :class="{ processing: state.processing }"
    >
      <IonSpinner
        name="bubbles"
        :class="{ color: state.userFound }"
        v-show="state.processing"
      />
      <Avatar />
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
      <InputWrapper label="Email">
        <InputText placeholder="Enter Email" v-model="form.email" />
      </InputWrapper>
      <InputWrapper label="Password">
        <InputPassword placeholder="Enter Password" v-model="form.password" />
      </InputWrapper>
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
  ButtonSuccess,
  ButtonDanger,
  Avatar,
  NoteWarning,
} from "..";
import { IonSpinner, useIonRouter } from "@ionic/vue";
import {
  FirebaseLogin,
  DatabaseInitialization,
  WindowDatabaseInitialization,
} from "../../server/authentication";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import { PawprintsEvent } from "../../utils";
const ionRouter = useIonRouter();
const Navigate = () => {
  console.log("Redirecting to Home Page...");
  ionRouter.navigate("/home", "forward", "replace");
};

const props = defineProps({
  db: SQLiteDBConnection,
});

const defaultValues = {
  email: "",
  password: "",
};

const form = reactive({
  email: defaultValues.email,
  password: defaultValues.password,
});

const state = reactive({
  processingText: "",
  warningText: "",
  processing: false,
  userFound: false,
  authError: false,
});

const Clear = () => {
  form.email = defaultValues.email;
  form.password = defaultValues.password;
};

const disableClear = computed(
  () =>
    form.email === defaultValues.email &&
    form.password === defaultValues.password
);

const disableSave = computed(() => [form.email, form.password].includes(""));

const Process = () => {
  state.processing = true;
  state.processingText = "Connecting to server...";
  setTimeout(() => {
    state.processingText = "Account Logging in...";
    FirebaseLogin(form)
      .then((user) => {
        state.userFound = true;
        state.processingText = "Fetching Cloud Database...";
        return DatabaseInitialization(props.db!, user);
      })
      .then((props) => {
        state.processingText = "Preparing Application...";
        return WindowDatabaseInitialization(props);
      })
      .catch((error) => {
        // console.log(error);
        switch (error.code) {
          case "auth/invalid-email":
            state.warningText = "Invalid email";
            break;
          case "auth/user-not-found":
            state.warningText = "User Not Found";
            break;
          case "auth/wrong-password":
            state.warningText = "Wrong Password";
            break;
          case "auth/network-request-failed":
            state.warningText = "Network request failed.";
            break;
          default:
            state.warningText = error;
            break;
        }
        state.authError = true;
      })
      .finally(() => {
        Clear();
        if (!state.authError) {
          Navigate();
          PawprintsEvent.EventDispatcher("modal-signin");
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
  height: 200px;
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
  min-height: 200px;
  width: 100%;

  > .avatar {
    --size: 200px;
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
</style>
