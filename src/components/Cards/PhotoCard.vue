<template>
  <section class="photo-card">
    <img :src="value" />
  </section>
</template>
<script setup lang="ts">
defineProps({
  value: String,
});
</script>
<style scoped>
.photo-card {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  background-color: var(--ion-color-tertiary);
  outline: 2px solid var(--ion-color-black);
  border-radius: 10px;
  overflow: hidden ;

  > img {
    width: 100%;
  }
}
</style>
