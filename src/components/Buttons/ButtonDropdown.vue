<template>
  <section class="button-dropdown" :class="{ expand: state }" @click="Click">
    <ion-icon id="icon-up" :icon="chevronUp" />
    <ion-icon id="icon-down" :icon="chevronDown" />
  </section>
</template>
<script setup lang="ts">
import { chevronUp, chevronDown } from "ionicons/icons";
import { IonIcon } from "@ionic/vue";
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

const emit = defineEmits(["update:modelValue", "click", "expand", "collapse"]);
</script>
<style scoped>
.button-dropdown {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--theme-tertiary);
  height: 30px;
  --translateYUp: -8px;
  --translateYDown: 8px;

  > ion-icon {
    font-size: 35px;
    position: absolute;
    transition: all 100ms ease-out;
  }

  #icon-up {
    transform: translateY(var(--translateYUp));
  }

  #icon-down {
    transform: translateY(var(--translateYDown));
  }
}

.expand {
  --translateYUp: 8px;
  --translateYDown: -8px;
}
</style>
