<template>
    <section class="add-pet-button-container">
        <button class="add-pet-button">
            <div id="button-line-1" class="button-line" />
            <div id="button-line-2" class="button-line" />
        </button>
        <div class="add-pet-button-text">Add Pet</div>
    </section>
</template>

<script setup lang="ts">
</script>

<style scoped>
.add-pet-button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column nowrap;
}

.add-pet-button-text {
    text-align: center;
    font-family: Rubik;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 30px;
}

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
