<template>
  <button class="button-show" @click="Click">
    <ion-icon :icon="!!state ? showIcon : hideIcon" />
  </button>
</template>
<script setup lang="ts">
import { IonIcon } from "@ionic/vue";
import { eye as showIcon, eyeOff as hideIcon } from "ionicons/icons";
import { ref, computed } from "vue";
const props = defineProps({
  modelValue: Boolean,
});

const _state = ref(false);
const state = computed({
  get() {
    return !props.modelValue ? _state.value : props.modelValue;
  },
  set(value) {
    _state.value = value;
  },
});

const Click = () => {
  state.value = !state.value;
  emit("click", state.value);
  emit("update:modelValue", state.value);
  if (state.value) emit("expand");
  else emit("collapse");
};

const emit = defineEmits(["update:modelValue", "expand", "collapse", "click"]);
</script>
<style scoped>
.button-show {
  height: 30px;
  width: 30px;
  background-color: var(--theme-secondary);
  color: var(--theme-tertiary);
  font-size: 30px;
}
</style>
