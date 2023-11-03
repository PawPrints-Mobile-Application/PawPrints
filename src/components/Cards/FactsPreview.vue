<template>
  <section class="facts-preview">
    <FactsPreviewCard />
  </section>
</template>
<script setup lang="ts">
import { FactsPreviewCard } from ".";
</script>
<style scoped>
.facts-preview {
  width: 100%;
  min-height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
