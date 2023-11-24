<template>
  <section class="card card-settings">
    <IonIcon :icon="icon" />
    <TextSubheading>{{ label }}</TextSubheading>
  </section>
</template>
<script setup lang="ts">
import { IonIcon } from "@ionic/vue";
import { TextSubheading } from "../Texts";
defineProps({
  icon: String,
  label: String,
});
</script>
<style scoped>
.card-settings {
  height: 60px;
  width: 100%;
  background-color: var(--ion-color-secondary);
  border-radius: 8px;
  display: flex;
  gap: 5px;
  padding: 10px;
  align-items: center;
}

ion-icon {
    font-size: 30px;
}
</style>
