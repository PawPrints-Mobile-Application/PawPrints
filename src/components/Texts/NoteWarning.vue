<template>
  <section class="note-warning">
    <slot />
  </section>
</template>
<script setup lang="ts"></script>
<style scoped>
.note-warning {
  width: 100%;
  font-size: var(--fs4);
  font-style: italic;
  text-align: center;
  color: var(--ion-color-danger);
}
</style>
