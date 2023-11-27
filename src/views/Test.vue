<template>
  <section>
    <ButtonTheme v-for="theme in themes" :theme="theme" />
  </section>
</template>
<script setup lang="ts">
import ButtonTheme from '../components/Buttons/ButtonTheme.vue';
import themes from '../theme';
</script>
<script lang="ts">
export default {
  name: "Test",
};
</script>
<style scoped></style>
