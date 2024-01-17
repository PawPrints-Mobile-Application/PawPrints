<template>
  <LayoutPage>
    <LayoutHeader returnTarget="/settings" label="PROFILE" />
    <main>
      <InputUserAvatar v-model="form.avatar" />
      <InputWrapper label="Username">
        <InputText placeholder="Username" v-model="form.username" />
      </InputWrapper>
      <InputWrapper label="Email">
        <InputText
          placeholder="Email"
          :modelValue="UserInfo.GetEmail()"
          freeze
        />
      </InputWrapper>
      <InputWrapper label="Password">
        <ButtonDanger
          class="button-reset"
          value="Reset Password"
          @click="ResetPassword"
        />
      </InputWrapper>

      <div class="buttons">
        <ButtonDanger value="Clear" @click="Clear" :disabled="disableButton" />
        <ButtonSuccess value="Save" @click="Save" :disabled="disableButton" />
      </div>
    </main>
  </LayoutPage>
</template>
<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import {
  ButtonDanger,
  ButtonSuccess,
  InputText,
  InputUserAvatar,
  InputWrapper,
} from "../../components";
import { LayoutHeader, LayoutPage } from "../../layout";
import { Themes, UserInfo } from "../../utils";
import {
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import auth from "../../server/firebase";
import { Set } from "../../server/models/Information";

const defaultValues = reactive({
  username: UserInfo.GetUsername(),
  avatar: UserInfo.GetAvatar(),
});

const form = reactive({
  username: defaultValues.username,
  avatar: defaultValues.avatar,
});

const Clear = () => {
  form.username = defaultValues.username;
  form.avatar = defaultValues.avatar;
};

const disableButton = computed(
  () =>
    form.username === defaultValues.username &&
    form.avatar === defaultValues.avatar
);

const user = ref();
onAuthStateChanged(auth, (currentUser) => (user.value = currentUser));

const Save = () => {
  UserInfo.SetAvatar(form.avatar);
  UserInfo.SetUsername(form.username);
  defaultValues.avatar = form.avatar;
  defaultValues.username = form.username;
  return Set({
    uid: UserInfo.GetUID()!,
    email: UserInfo.GetEmail()!,
    username: form.username,
    subscription: UserInfo.GetSubscription()!,
    theme: Themes.Get().theme,
    mode: Themes.Get().mode,
    avatar: form.avatar,
  })
    .then(() => updateProfile(user.value, { displayName: form.username }))
    .then(() => {
      console.log("Profile updated successfully");
    });
};

const ResetPassword = () =>
  sendPasswordResetEmail(auth, UserInfo.GetEmail())
    .then(() => {
      console.log("Password Reset Sent.");
    })
    .catch((error) => {
      console.log(error);
    });
</script>
<style scoped>
main {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}

.input-user-avatar {
  width: 150px;
}

.input-wrapper,
.button-reset {
  width: 100%;
}

.buttons {
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 10px;

  > .button {
    flex: 1 0 0;
  }
}
</style>
