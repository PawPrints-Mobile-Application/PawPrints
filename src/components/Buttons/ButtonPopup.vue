<template>
  <section class="button-popup">
    <slot name="button" :Trigger="Trigger" />
    <Popup v-model="state">
      <slot name="content" :Trigger="Trigger"><slot :Trigger="Trigger" /></slot>
    </Popup>
  </section>
</template>
<script setup lang="ts">
import { Popup } from "../Popup";
import { ref } from "vue";

const state = ref();

const Trigger = () => (state.value = !state.value);

defineExpose({ Trigger });
</script>
<style scoped>
</style>
