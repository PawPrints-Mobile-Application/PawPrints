<template>
  <button class="add-pet-button" @click="async () => {
    await AddDogProfile();
    emit('click', onClick);
  }">
      <div id="button-line-1" class="button-line" />
      <div id="button-line-2" class="button-line" />
  </button>
</template>

<script setup lang="ts">
// import { onMounted } from 'vue';
import { InsertData } from '../../server/sqlite/models/DogProfile';

const AddDogProfile = async () => {
  await InsertData({
  pid: Date.now(),
  name: 'Troy',
  birthday: new Date().toLocaleDateString(),
  breed: 'Shih Tzu',
  color: 'white',
  inoutdoor: 0,
  fixing: 0
});
console.log('Troy Profile Added!');
}

// onMounted(AddDogProfile);
const emit = defineEmits(['click']);
</script>

<style scoped>
.add-pet-button {
  --size: 45px;
  width: var(--size);
  height: var(--size);
  background-color: var(--ion-color-tertiary);
  border-radius: 12px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
}

.button-line {
  --line-size: calc(var(--size) * 0.7);
  position: absolute;
  width: var(--line-size);
  height: 4px;
  background-color: var(--ion-color-primary);
  border-radius: 30px;
}

#button-line-1 {
  transform: rotateZ(90deg);
}

.add-pet-button:active {
  background-color: var(--ion-color-tertiary-shade);
}
</style>
