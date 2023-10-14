<template>
    <page-layout>
        <article>
            <Checkbox name="checkbox" id="checkbox" :label="`${label}`" v-model="label"/>
        </article>
    </page-layout>
</template>
<script setup lang="ts">
import PageLayout from '../components/PageLayout.vue';
import Checkbox from '../components/Forms/Checkbox.vue';
import { ref } from 'vue';

const label = ref(false);
</script>
<script lang="ts">
export default {
    name: 'Test'
}
</script>
<style>
    article {
        height: 100%;
        outline: 2px solid black;
        width: 100%;
        display: flex;
        flex-flow: column;
        gap: 20px;
        justify-content: center;
        align-items: center;
        background-color: var(--ion-color-primary);
        padding-left: 20px;
    }

    #checkbox {
        --size: 18px;
    }
</style>