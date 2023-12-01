<template>
  <button
    class="button-time"
    :class="{ expand: !!props.modelValue }"
    @click="() => (state = !modelValue)"
  >
    <div class="background" v-if="!props.modelValue" />
    <div class="line line-1" v-if="!props.modelValue" />
    <div class="line line-2" v-if="!props.modelValue" />
    <IonIcon v-else :icon="icon" />
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
  background-color: var(--theme-tertiary);

  --line-1: rotate(135deg) translate(4.5px, 0);
  --line-2: rotate(90deg) translate(-4.5px, 0);
}

.background {
  width: 100%;
  height: 100%;
  background-color: var(--theme-tertiary);
}

.line {
  position: absolute;
  height: 4px;
  background-color: var(--theme-primary);
  border-radius: 40px;
  transition: all 200ms ease-out;
}

.line-1 {
  width: 14px;
  transform: var(--line-1);
}

.line-2 {
  width: 10px;
  transform: var(--line-2);
}

ion-icon {
  font-size: 35px;
  color: var(--theme-tertiary);
}
</style>
