<template>
  <h2 class="text-heading font heading poppins">
    <slot>{{ value }}</slot>
  </h2>
</template>

<script setup lang="ts">
defineProps({
  value: String,
});
</script>
