<template>
  <button class="add-pet-button">
    <div id="button-line-1" class="button-line" />
    <div id="button-line-2" class="button-line" />
  </button>
</template>

<style scoped>
.add-pet-button {
  --size: 35px;
  width: var(--size);
  height: var(--size);
  background-color: var(--ion-color-tertiary);
  border-radius: 8px;

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
../../server/sqlite/models/User/DogProfile
