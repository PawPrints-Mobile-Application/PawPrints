<template>
  <section class="logo">
    <img :src="Logo" />
  </section>
</template>
<script setup lang="ts">
import { Logo } from "../../assets/images";
</script>
<style scoped>
.logo {
  --scale: 100%;
  --size: 200px;
  height: var(--size);
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 100%;
}

img {
  transform: scale(var(--scale));
  height: 100%;
  aspect-ratio: 1;
  transition: all 500ms ease-out;
}
</style>
