<template>
  <section
    id="pet-avatar-default"
    class="pet-avatar"
    :style="{
      'background-color':
        backgroundColor === '' ? 'var(--ion-color-secondary)' : backgroundColor,
    }"
  >
    <img src="../../../assets/images/PawPrints.png" />
  </section>
</template>

<script setup lang="ts">
defineProps({
  backgroundColor: {
    type: String,
    default: "var(--ion-color-secondary)",
  },
});
</script>

<style scoped>
.pet-avatar {
  --size: 100%;
  width: var(--size);
  height: var(--size);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
}
</style>
