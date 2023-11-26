<template>
  <section>
    <ButtonDropdown />
  </section>
</template>
<script setup lang="ts">
import {
  ButtonDropdown,
} from "../components/Buttons";
</script>
<script lang="ts">
export default {
  name: "Test",
};
</script>
<style scoped>
.testing {
  width: 100px;
  height: 100px;
  background-color: var(--theme-secondary);
}
</style>
