<template>
  <ButtonModal :design="1" :text="text" :id="id">
    <template #modalContent="{closeModal}">
      <slot name="modalPage" :closeModal="closeModal" />
    </template>
  </ButtonModal>
</template>

<script setup lang="ts">
import ButtonModal from "./ButtonModal.vue";
</script>

<script lang="ts">
export default {
  name: "SimpleButtonModal",
  props: ["text", "id"],
};
</script>

<style scoped>
</style>
