<template>
  <section>
    <ButtonTheme
      v-for="(theme, key) in ObjectToMap(themes).keys()"
      :theme="ObjectToMap(themes).get(theme)"
      :name="theme"
      :label="`Theme ${key+1}`"
    />
    <ButtonMode />
  </section>
</template>
<script setup lang="ts">
import ButtonTheme from "../components/Buttons/ButtonTheme.vue";
import ButtonMode from "../components/Buttons/ButtonMode.vue";
import themes from "../theme";
import { ObjectToMap } from "../utils";
</script>
<script lang="ts">
export default {
  name: "Test",
};
</script>
<style scoped>
section {
  display: flex;
  gap: 10px;
}
</style>
