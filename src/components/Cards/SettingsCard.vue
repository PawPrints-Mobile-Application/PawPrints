<template>
  <button class="settings-card" @click="() => emit('click', onClick)">
    <img class="profile-picture" :src="icon" />
    <h4 class="profile-text profile-username">{{ label }}</h4>
  </button>
</template>
<script setup lang="ts">
defineProps({
  label: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(["click"]);
</script>
<style scoped>
.settings-card {
  min-width: 180px;
  min-height: 180px;
  background-color: var(--ion-color-secondary);
  border: none;
  border-radius: 10px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}

.settings-card:active {
  background-color: var(--ion-color-secondary-shade);
}
</style>
