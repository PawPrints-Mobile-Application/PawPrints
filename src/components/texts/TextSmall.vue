<template>
  <p class="text-small font small rubik">
    <slot>{{ value }}</slot>
  </p>
</template>

<script setup lang="ts">
defineProps({
  value: String,
});
</script>
