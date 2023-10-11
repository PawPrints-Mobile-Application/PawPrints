<template>
  <page-layout id="login-page">
    <template #pageContent>
        <img id="logo" :src="PawPrints" alt="PawPrints" />
        <section class="main-content">
          <h1 id="main-content-title">PawPrints</h1>
          <SimpleButtonModal text="Sign In" id="signin">
            <template #modalPage="{closeModal}">
              <SignInPage :closeModal="closeModal" />
            </template>
          </SimpleButtonModal>
          <SimpleButtonModal text="Sign Up" id="signup">
            <template #modalPage="{closeModal}">
              <SignUpPage :closeModal="closeModal" />
            </template>
          </SimpleButtonModal>
          <GoogleButton />
      </section>
    </template>
  </page-layout>
</template>

<script lang="ts" setup>
import PageLayout from "../components/PageLayout.vue";
import GoogleButton from "../components/Buttons/GoogleButton.vue";
import SimpleButtonModal from "../components/Buttons/SimpleButtonModal.vue";
import SignInPage from "./SignInPage.vue";
import SignUpPage from "./SignUpPage.vue";
</script>

<script lang="ts">
import { PawPrints } from "../assets/images";

export default {
  name: "LogIn",
  data() {
    return {
      PawPrints,
    };
  },
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
  min-width: var(--width);
  max-width: var(--width);
  width: 50%;
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
  position: relative;
  --button-min-width: 250px;
}
</style>
