<template>
  <ButtonRippled class="button-text text Rubik paragraph normal">{{ label }}</ButtonRippled>
</template>
<script setup lang="ts">
import { ButtonRippled } from ".";

defineProps({
  label: String,
});
</script>
<style scoped>
.button-text {
  padding: 10px 30px;
  min-width: 130px;
}
</style>
