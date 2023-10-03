<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>{{ pageTitle }}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <slot />
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { IonPage, IonToolbar, IonHeader, IonTitle, IonContent } from '@ionic/vue';

export default {
    props: {
        pageTitle: String,
    },
    components: {
        IonPage, IonToolbar, IonHeader, IonTitle, IonContent
    },    
};
</script>

<style>
    
</style>