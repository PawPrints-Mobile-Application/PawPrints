<template>
  <p class="text-paragraph text paragraph rubik">
    <slot>{{ value }}</slot>
  </p>
</template>

<script setup lang="ts">
defineProps({
  value: String,
});
</script>
