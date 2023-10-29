<template>
    <page-layout>
      <div class="logo-wrapper"><ImgLogo id="logo" /></div>
      <section class="main-content">
        <h1 class="text text-title font-poppins font-bold">PawPrints</h1>
        <GuestButton class="button" />
        <ButtonModal
        class="button"
          id="signin"
          text="Sign In"
          title="Sign In"
          height="300px"
          hide-footer
        >
          <template #modalContent="{ closeModal }">
            <signin :closeModal="closeModal" />
          </template>
        </ButtonModal>
        <ButtonModal
        class="button"
          id="signup"
          text="Sign Up"
          title="Sign Up"
          height="500px"
          hide-footer
        >
          <template #modalContent="{ closeModal }">
            <signup :closeModal="closeModal" />
          </template>
        </ButtonModal>
        <GoogleButton />
      </section>
    </page-layout>
  </template>
  
  <script lang="ts" setup>
  import { defineAsyncComponent } from "vue";
  import { PageLayout } from "../layout";
  import {
    GoogleButton,
    ButtonModal,
    GuestButton,
  } from "../components/Buttons";
  import { templates } from "./templates";
  import { ImgLogo } from "../components/Logo";

  const signin = defineAsyncComponent(templates.signin);
  const signup = defineAsyncComponent(templates.signup);
  </script>
  
  <script lang="ts">
  export default {
    name: "Auth"
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

  .button {
    --width: 200px;
    --height: 40px;
  }
  </style>
  