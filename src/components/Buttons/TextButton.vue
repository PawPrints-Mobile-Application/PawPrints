<template>
  <button class="text-button text font-rubik text-subheading" :disabled="!!disabled">
    {{ label }}
  </button>
</template>
<script setup lang="ts">
defineProps({
  label: {
    type: String,
    required: true,
  },
  disabled: Boolean,
});
</script>
<style scoped>
.text-button {
  text-align: center;
  vertical-align: center;
  padding: 5px 10px;
  border-radius: 8px;
  background-color: var(--ion-color-tertiary);
  min-width: 100px;
  min-height: 30px;
}

.text-button:active {
  background-color: var(--ion-color-tertiary-shade);
}
</style>
