<template>
    <button class="dog-card" @click="() => emit('click', onClick)">
        <img class="dog-icon" :src="icon">
        <h4 class="dog-text dog-name">{{ name }}</h4>
        <h5 class="dog-text dog-age">{{ age }}</h5>
    </button>
</template>

<script setup lang="ts">
defineProps({
    name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    }
})
const emit = defineEmits(['click'])
</script>

<script lang="ts">
export default {
    name: 'DogCard'
}
</script>
<style scoped>
.dog-card {
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

.dog-card:active {
    background-color: var(--ion-color-secondary-shade);
}

.dog-icon {
    width: 120px;
}

.dog-text {
  text-align: center;
  margin: 0;
text-align: center;
}

.dog-name {
    font-size: var(--fs5);
    font-family: Poppins;
    font-weight: 700;
}

.dog-age {
    width: 180px;
}
</style>