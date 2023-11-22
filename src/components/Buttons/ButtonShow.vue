<template>
  <button class="button-show" @click="Click">
    <ion-icon :icon="!!modelValue ? showIcon : hideIcon" />
  </button>
</template>
<script setup lang="ts">
import { IonIcon } from "@ionic/vue";
import { eye as showIcon, eyeOff as hideIcon } from "ionicons/icons";

const props = defineProps({
  modelValue: Boolean,
});

const Click = () => {
  const temp = !props.modelValue;
  emit("click", temp);
  emit("update:modelValue", temp);
  if (temp) emit("show");
  else emit("hide");
};

const emit = defineEmits(["update:modelValue", "show", "hide", "click"]);
</script>
<style scoped>
.button-show {
  --color: var(--ion-color-black);
  --background-color: var(--ion-color-secondary);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 30px;
  background-color: var(--background-color);
  color: var(--color);
  font-size: var(--fs0);
}
</style>
