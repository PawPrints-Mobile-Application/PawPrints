<template>
    <IconButton class="button-google" :icon="logoGoogle" background-color="primary" color="tertiary" :on-click="onClick"/>
</template>
<script setup lang="ts">
import IconButton from './IconButton.vue';
import { logoGoogle } from "ionicons/icons";
</script>
<script lang="ts">
export default {
    name: "GoogleButton",
    props: ['onClick']
}
</script>
<style>
.button-google {
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    min-height: 50px !important;
    outline: 2px solid var(--ion-color-secondary);
    border-radius: 10px;
    font-size: 30px;
}
    
</style>