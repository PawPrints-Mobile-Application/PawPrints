<template>
  <section>
    <ButtonTheme
      v-for="(theme, key) in themeList"
      :theme="theme"
      :label="`Theme ${key}`"
    />
  </section>
</template>
<script setup lang="ts">
import ButtonTheme from "../components/Buttons/ButtonTheme.vue";
import themes from "../theme";
const themeList = [themes.yellowLight, themes.pinkLight, themes.blueLight];
</script>
<script lang="ts">
export default {
  name: "Test",
};
</script>
<style scoped></style>
