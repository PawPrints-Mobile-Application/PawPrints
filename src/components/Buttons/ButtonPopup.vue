<template>
  <section class="button-popup">
    <slot name="button" />
    <Popup ref="reference" v-model="state" @click="emit('state', state)">
      <template #content="{ Trigger }">
        <slot name="content" :Trigger="Trigger"
          ><slot :Trigger="Trigger"
        /></slot>
      </template>
    </Popup>
  </section>
</template>
<script setup lang="ts">
import { Popup } from "../Popup";
import { ref } from "vue";

const state = ref(false);
const emit = defineEmits(["state"]);

const reference = ref();
const Trigger = () => reference.value.Trigger();

defineExpose({ Trigger });
</script>
<style scoped></style>
