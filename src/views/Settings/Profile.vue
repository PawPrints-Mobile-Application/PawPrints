<template>
  <LayoutSettings label="MY PROFILE">
    <InputPhoto name="Photo" v-model:value="form.photo" has-change-button />
    <InputDynamicWrapped
      ref="username"
      type="text"
      label="Username"
      id="username"
      :placeholder="GetPlaceholder()"
      v-model:modelValid="form.usernameValidation"
      v-model="form.username"
      :validators="SignupValidator.username"
      :hideRequired="form.disabled"
      :hideValidator="form.disabled"
    />
    <InputDynamicWrapped
      ref="email"
      type="email"
      label="Email"
      placeholder="Enter Email"
      v-model="form.email"
      freeze
    />
    <ButtonText
      class="change-password"
      label="Change Password"
      @click="ResetPassword"
    />
    <section class="change-buttons">
      <ButtonText
        class="reset"
        label="Reset"
        @click="Reset"
        :disabled="form.disabled"
      />
      <ButtonText
        class="save"
        label="Save"
        @click="Save"
        :disabled="form.disabled || form.usernameValidation !== 1"
      />
    </section>
  </LayoutSettings>
</template>
<script setup lang="ts">
import { LayoutSettings } from "../../layout";
import { InputPhoto, InputDynamicWrapped } from "../../components/Forms";
import { reactive, watch, ref, onMounted } from "vue";
import { ButtonText } from "../../components/Buttons";
import { sendPasswordResetEmail } from "firebase/auth";
import auth from "../../server/firebase";
import { Set } from "../../server/models/Information";
import { CustomEvent } from "../../utils";
import { SignupValidator } from "../../server/rulesets";

const username = ref();
const GetPlaceholder = () => localStorage.getItem("authUsername")!;

const form = reactive({
  photo: "",
  username: localStorage.getItem("authUsername")!,
  email: localStorage.getItem("authEmail")!,
  disabled: true,
  usernameValidation: -1,
});

watch(
  () => form.username,
  () =>
    (form.disabled = form.username === localStorage.getItem("authUsername")!)
);

const Reset = () => {
  form.photo = "";
  form.username = localStorage.getItem("authUsername")!;
  setTimeout(() => username.value.Reevaluate(), 10);
};
const Save = () => {
  Set(
    {
      uid: localStorage.getItem("authID")!,
      email: form.email,
      username: form.username,
      subscription: localStorage.getItem("authType")!,
      theme: localStorage.getItem("colorTheme")!,
      mode: localStorage.getItem("colorMode")!,
    },
    localStorage.getItem("authID")!
  ).then(() => {
    console.log("Username has been changed");
    localStorage.setItem("authUsername", form.username);
    form.disabled = true;
    CustomEvent.EventDispatcher("reload-card-user");
  });
};
const ResetPassword = () => {
  sendPasswordResetEmail(auth, form.email)
    .then(() => {
      console.log("Email sent.");
    })
    .catch((error) => {
      console.log(error);
    });
};
onMounted(() => {
  username.value.Reevaluate();
});
</script>

<script lang="ts">
export default {
  name: "Profile",
};
</script>
<style scoped>
.change-buttons {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-block: 10px;
}
.reset {
  background-color: var(--theme-warning-background);
  color: var(--theme-warning-text);
}
.save {
  background-color: var(--theme-success-background);
  color: var(--theme-success-text);
}

.change-password {
  background-color: var(--theme-tertiary-background);
  color: var(--theme-tertiary-text);
  width: 100%;
}
</style>
