<template>
  <button
    class="button-time"
    :class="{ expand: !!props.modelValue }"
    @click="() => (state = !modelValue)"
  >
    <IonIcon :icon="icon" />
  </button>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { IonIcon } from "@ionic/vue";
import { time as icon } from "ionicons/icons";
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

const emit = defineEmits(["update:modelValue", "expand", "collapse", "click"]);
</script>
<style scoped>
.button-time {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  overflow: hidden;
  background: none;

  --line-1: rotate(135deg) translate(4.5px, 0);
  --line-2: rotate(90deg) translate(-4.5px, 0);
}

ion-icon {
  position: relative;
  font-size: 30px;
  color: var(--theme-tertiary-background);
  transition: all 200ms ease-out;
}

.expand ion-icon {
  transform: rotate(180deg);
}
</style>
