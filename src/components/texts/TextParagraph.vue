<template>
  <p class="text-paragraph font paragraph rubik">
    <slot>{{ value }}</slot>
  </p>
</template>

<script setup lang="ts">
defineProps({
  value: String,
});
</script>
