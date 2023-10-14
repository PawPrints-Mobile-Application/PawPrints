<template>
  <page-layout id="login-page">
    <template #pageContent>
      <ImgLogo id="logo" />
      <section class="main-content">
        <h1 id="main-content-title">PawPrints</h1>
        <ButtonModal :design="1" id="signin" text="Sign In">
          <template #modalContent="{ closeModal }">
            <SignInPage :closeModal="closeModal" />
          </template>
        </ButtonModal>
        <ButtonModal :design="1" id="signup" text="Sign Up">
          <template #modalContent="{ closeModal }">
            <SignUpPage :closeModal="closeModal" />
          </template>
        </ButtonModal>
        <GoogleButton />
      </section>
    </template>
  </page-layout>
</template>

<script lang="ts" setup>
import PageLayout from "../components/PageLayout.vue";
import GoogleButton from "../components/Buttons/GoogleButton.vue";
import ButtonModal from "../components/Buttons/ButtonModal.vue";
import SignInPage from "./SignInPage.vue";
import SignUpPage from "./SignUpPage.vue";
import ImgLogo from "../components/Logo/ImgLogo.vue";
</script>

<script lang="ts">

export default {
  name: "LogIn",
};
</script>

<style scoped>
#login-page {
  height: 100%;
  background-color: var(--ion-color-primary);
  --page-content-justify-content: center;
}

#logo {
  --width: 250px;
  min-height: 250px;
}

.main-content {
  width: 100%;
  opacity: 1;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
}

#main-content-title {
  font-weight: bold;
}

.button-modal {
  --button-width: 200px;
  margin: 10px;
}
</style>
