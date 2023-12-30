<template>
    <h1 class="text-title text title bold poppins">
    <slot>{{ value }}</slot>
    </h1>
</template>

<script setup lang="ts">
defineProps({
  value: String,
});
</script>