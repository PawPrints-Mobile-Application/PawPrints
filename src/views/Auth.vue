<template>
  <LayoutPage justify="center" inAntiNavigation>
    <Logo />
    <section class="main-content">
      <TextTitle>PawPrints</TextTitle>
      <TextSubheading>Your Ultimate Canine<br/>Companion Care App</TextSubheading>
      <ButtonGuest />
      <ModalSignin />
      <ModalSignup />
    </section>
  </LayoutPage>
</template>

<script lang="ts" setup>
import { LayoutPage } from "../layout";
import { TextTitle, TextSubheading } from "../components/Texts";
import { ButtonGuest } from "../components/Buttons";
import { ModalSignin, ModalSignup } from "../components/Modals";
import { Logo } from "../components/Logo";
</script>

<script lang="ts">
export default {
  name: "Auth",
};
</script>

<style scoped>
.main-content {
  width: 100%;
  height: 270px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
  gap: 10px;
  overflow: hidden;
}
.text-subheading {
  font-weight: 400;
  text-align: center;
}
</style>
