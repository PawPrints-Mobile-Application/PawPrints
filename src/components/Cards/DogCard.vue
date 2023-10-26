<template>
  <button class="dog-card" @click="() => emit('click', onClick)">
    <img class="icon" :src="icon" />
    <h4 class="text name">{{ name }}</h4>
    <h5 class="text age">{{ age }}</h5>
  </button>
</template>

<script setup lang="ts">
defineProps({
  name: {
    type: String,
    required: true,
  },
  age: {
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

<script lang="ts">
export default {
  name: "DogCard",
};
</script>
<style scoped>
.dog-card {
  background-color: var(--ion-color-secondary);
  border-radius: 10px;
  border: none;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  padding: 10px;
  min-width: 120px;
  flex-grow: 1;
}

.dog-card:active {
  background-color: var(--ion-color-secondary-shade);
}

.icon {
  width: 90px;
  background-color: var(--ion-color-primary);
  border-radius: 100%;
}

.text {
  font-size: var(--fs2);
  text-align: center;
  margin: 0;
  width: 90px;
}

.name {
  font-size: var(--fs3);
  font-family: Poppins;
  font-weight: 700;
}

.age {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
