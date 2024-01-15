<template>
  <section class="card card-settings" @click="Navigate">
    <IonIcon :icon="icon" />
    <TextSubheading :value="name" />
  </section>
</template>
<script setup lang="ts">
import { IonIcon, useIonRouter } from "@ionic/vue";
import { TextSubheading } from "..";
const ionRouter = useIonRouter();
const Navigate = () =>
  ionRouter.navigate(`/settings/${props.target}`, "forward", "replace");
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  target: {
    type: String,
    required: true,
  },
});
</script>
<style scoped>
.card-settings {
  background-color: var(--theme-secondary-background);
  border-radius: 4px;
  display: flex;
  padding: 10px;
  gap: 8px;
  color: var(--theme-secondary-text);
}

ion-icon {
  font-size: var(--fs1);
}
</style>
