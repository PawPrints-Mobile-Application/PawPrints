<template>
    <page-layout>
        <article>
        <Button type="0" text="Sign In" :icon="star" state="row"/>
        <Button type="0" text="Sign In" :icon="star" state="row-reverse"/>
        <Button type="0" text="Sign In" :icon="star" state="column"/>
        <Button type="0" text="Sign In" :icon="star" state="column-reverse"/>
        <Button type="0" text="Sign In" :icon="star" state="icon"/>
        <Button type="0" text="Sign In" :icon="star" state="text"/>
        </article>
    </page-layout>
</template>
<script setup lang="ts">
import PageLayout from '../components/PageLayout.vue';
import Button from '../components/Buttons/Button.vue';
import { star } from 'ionicons/icons';
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
    }
</style>