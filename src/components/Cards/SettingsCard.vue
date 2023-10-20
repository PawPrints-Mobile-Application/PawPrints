<template>
  <button class="settings-card" @click="() => emit('click', onClick)">
    <img id="icon" :src="icon" />
    <h4 id="label">{{ label }}</h4>
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
  background-color: var(--ion-color-secondary);
  border-radius: 10px;
  border: none;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 130px;
  flex-grow: 1;
}

.settings-card:active {
  background-color: var(--ion-color-secondary-shade);
}

#icon {
  width: 60px;
}

#label {
  font-size: var(--fs1);
  font-family: Poppins;
  margin: 10px 0 0;
}
</style>
