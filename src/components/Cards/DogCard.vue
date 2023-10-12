<template>
    <section :id="id" class="dog-card">
        <img src="" alt="">
    </section>
</template>
<script setup lang="ts">

</script>

<script lang="ts">
import { Dog } from '../../server/data';
export default {
    name: 'DogCard',
    props: {
        id: String,
        dog: {
            type: Dog,
            required: true,
        }
    }
}
</script>
<style scoped>
    .dog-card {
        width: 100%;
        min-height: 200px;
        background-color: var(--ion-color-secondary);
        border-radius: 20px;
    }
</style>