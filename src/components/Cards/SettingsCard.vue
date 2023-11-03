<template>
  <button class="settings-card" @click="() => emit('click', onClick)">
    <img :src="icon" />
    <h4>{{ label }}</h4>
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
  flex: 1 0 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-radius: 20px;
  background-color: var(--ion-color-secondary);

  > img {
    width: 80px;
    aspect-ratio: 1;
  }

  > h4 {
    margin: 0;
    font-size: var(--fs3);
  }
}

.settings-card:active {
  background-color: var(--ion-color-secondary-shade);
}
</style>
