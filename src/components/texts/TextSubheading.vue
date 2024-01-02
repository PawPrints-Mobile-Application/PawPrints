<template>
    <h3 class="text-subheading font subheading rubik">
    <slot>{{ value }}</slot>
    </h3>
</template>

<script setup lang="ts">
defineProps({
  value: String,
});
</script>