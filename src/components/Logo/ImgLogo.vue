<template>
  <section class="img-logo">
    <img :src="Logo" />
  </section>
</template>
<script setup lang="ts">
import { Logo } from "../../assets/images";
</script>
<style scoped>
.img-logo {
  --scale: 100%;
  --size: 200px;
  --width: var(--size);
  --height: var(--size);
  --background-color: none;
  background-color: var(--background-color);
  width: var(--width);
  height: var(--height);
  overflow: hidden;
  border-radius: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
}

img {
  transform: scale(var(--scale));
  width: 95%;
  height: 95%;
}
</style>
