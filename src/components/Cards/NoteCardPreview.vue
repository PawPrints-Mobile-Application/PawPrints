<template>
  <section class="note-card-preview">
    <TextSubheading class="main-label">Associated Notes:</TextSubheading>
    <NoteCard v-for="note in notes" :note="note" />
  </section>
</template>
<script setup lang="ts">
import { TextSubheading } from "../Texts";
import { NoteCard } from ".";

defineProps({
  notes: Array<string>,
  hideLabel: Boolean,
});
</script>
<style scoped>
.main-label {
  margin-bottom: 5px;
}

.chosen-label {
  margin-block: 6px;
  width: 100%;
  background-color: var(--ion-color-primary-shade);
  border-radius: 7px;
  padding: 5px 10px;
}
</style>
