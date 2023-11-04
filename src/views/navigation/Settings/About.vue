<template>
  <SettingsLayout label="ABOUT" target="/settings">
    <section class="logo">
      <ImgLogo />
      <h2 class="app-name">PawPrints</h2>
    </section>
    <section class="container">
      <h3 class="label">Our Team</h3>
      <p v-for="name in devNames">{{ name }}</p>
    </section>
    <section class="container">
      <h3 class="label">Contact Us</h3>
      <p>Email: pawprints8223@gmail.com</p>
    </section>
  </SettingsLayout>
</template>
<script setup lang="ts">
import { SettingsLayout } from "../../../layout";
import { ImgLogo } from "../../../components/Logo";

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
  position: absolute;
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
  background-color: var(--ion-color-secondary);
  font-family: Poppins;
  font-size: var(--fs4);

  > * {
    margin: 0;
  }

  > .label {
    font-size: var(--fs1);
    font-weight: 700;
  }
}
</style>
