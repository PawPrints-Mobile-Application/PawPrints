<template>
  <ButtonRippled class="button-lock" @click="() => (state = !modelValue)">
    <ion-icon v-if="state" :icon="lockClosed" />
    <ion-icon v-else :icon="lockOpenOutline" />
  </ButtonRippled>
</template>
<script setup lang="ts">
import { lockClosed, lockOpenOutline } from "ionicons/icons";
import { ButtonRippled } from ".";
import { IonIcon } from "@ionic/vue";
import { computed } from "vue";
const props = defineProps({
  modelValue: Boolean,
});

const state = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("click", value);
    emit("update:modelValue", value);
    if (value) emit("expand");
    else emit("collapse");
  },
});

const emit = defineEmits(["update:modelValue", "click", "expand", "collapse"]);
</script>
<style scoped>
.button-lock {
  --size: 35px;
  --background: var(--theme-primary-background);
  --color: var(--theme-tertiary-background);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--color);
  background-color: var(--background);
  width: var(--size);
  height: var(--size);
  border-radius: 6px;
  overflow: hidden;
  font-size: var(--size);
}
</style>
