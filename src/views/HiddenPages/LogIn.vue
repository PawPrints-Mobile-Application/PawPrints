<template>
  <page-layout>
      <div class="logo-wrapper"><ImgLogo id="logo" /></div>
      <section class="main-content">
        <h1 id="main-content-title">PawPrints</h1>
        <GuestButton />
        <ButtonModal :design="1" id="signin" text="Sign In" title="Sign In">
          <template #modalContent="{ closeModal }">
            <SignInPage :closeModal="closeModal" />
          </template>
        </ButtonModal>
        <ButtonModal :design="1" id="signup" text="Sign Up" title="Sign Up">
          <template #modalContent="{ closeModal }">
            <SignUpPage :closeModal="closeModal" />
          </template>
        </ButtonModal>
        <GoogleButton />
      </section>
  </page-layout>
</template>

<script lang="ts" setup>
import { PageLayout } from "../../layout";
import { GoogleButton, ButtonModal, GuestButton } from "../../components/Buttons";
import { SignInPage, SignUpPage } from ".";
import { ImgLogo } from "../../components/Logo";
</script>

<script lang="ts">

export default {
  name: "LogIn",
  routeInfo: {
      filename: 'LogIn',
    path: "/login",
    meta: {
      requiresAuth: false,
      requiresInternet: false,
    },
  }
};
</script>

<style scoped>
.page-layout {
  --page-content-justify-content: center;
  transition: all 500ms ease-in;
}

.logo-wrapper {
  position: absolute;
  bottom: 30%;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#logo {
  --background-color: var(--ion-color-primary);
  --width: 240px;
}

.main-content {
  position: absolute;
  top: 35%;
  width: 100%;
  opacity: 1;
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
  gap: 20px;
}

#main-content-title {
  font-weight: bold;
  margin: 0;
}
</style>
