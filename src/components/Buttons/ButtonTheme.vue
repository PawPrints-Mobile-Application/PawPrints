<template>
  <section
    class="button-theme text small"
    :style="{
      backgroundColor: theme?.secondary,
      color: theme?.primary,
      outline: `2px solid ${theme?.tertiary}`,
    }"
  >
    {{ label }}
  </section>
</template>
<script setup lang="ts">
defineProps({
  theme: Object,
  label: String,
});
</script>
<style scoped>
.button-theme {
    height: 30px;
    width: max-content;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
}
</style>
