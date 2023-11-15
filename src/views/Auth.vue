<template>
  <LayoutPage justify="center" inAntiNavigation>
    <ImgLogo />
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
.main-content {
  width: 100%;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
  gap: 20px;
  transition: all 300ms ease-out;
  overflow: hidden;
}
</style>
