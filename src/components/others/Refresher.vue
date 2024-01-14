<template>
  <IonRefresher
    slot="fixed"
    :pull-factor="0.5"
    :pull-min="100"
    :pull-max="200"
    @ionRefresh="$emit('refresh', $event)"
    ><IonRefresherContent
  /></IonRefresher>
</template>
<script setup lang="ts">
import { IonRefresher, IonRefresherContent } from "@ionic/vue";
</script>
