<template>
  <LayoutPage>
    <div class="logo-wrapper"><ImgLogo id="logo" /></div>
    <section class="main-content">
      <TextTitle>PawPrints</TextTitle>
      <GuestButton />
      <ModalSignin />
      <ModalSignup />
    </section>
  </LayoutPage>
</template>

<script lang="ts" setup>
import { LayoutPage } from "../layout";
import { TextTitle } from "../components/Texts";
import { GuestButton } from "../components/Buttons";
import { ModalSignin, ModalSignup } from "../components/Modals";
import { ImgLogo } from "../components/Logo";
</script>

<script lang="ts">
export default {
  name: "Auth",
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
</style>
