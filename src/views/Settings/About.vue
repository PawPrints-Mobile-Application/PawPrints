<template>
  <LayoutSettings label="ABOUT">
    <section class="logo">
      <Logo />
      <TextHeading class="app-name">PawPrints</TextHeading>
    </section>
    <section class="container">
      <TextHeading>Our Team</TextHeading>
      <TextParagraph v-for="name in devNames">{{ name }}</TextParagraph>
    </section>
    <section class="container">
      <TextHeading>Contact Us</TextHeading>
      <TextParagraph>Email: pawprints8223@gmail.com</TextParagraph>
    </section>
  </LayoutSettings>
</template>
<script setup lang="ts">
import { LayoutSettings } from "../../layout";
import { Logo } from "../../components/Logo";
import { TextHeading, TextParagraph } from "../../components/Texts";

const devNames = [
  "Alliah Nhoree Galamition",
  "John Lexter Panti",
  "Shani Marish Pineda",
  "Carlos Jairo Tiaga",
];
</script>

<script lang="ts">
export default {
  name: "About",
};
</script>
<style scoped>
.logo {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
}

.app-name {
  margin: 0;
  font-family: Poppins;
  font-size: var(--fs1);
  font-weight: 700;
}

.container {
  border-radius: 10px;
  padding: 10px;
  width: 90%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  background-color: var(--theme-secondary-background);
  font-family: Poppins;
  font-size: var(--fs4);
  color: var(--theme-secondary-text-background);

  > * {
    margin: 0;
  }

  > .text-heading {
    font-size: var(--fs1);
    font-weight: 700;
    color: var(--theme-secondary-text);
  }
}
</style>
