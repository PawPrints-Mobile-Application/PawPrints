<template>
  <button
    class="button-dropdown"
    :class="{ expand: state }"
    @click="() => (state = !modelValue)"
  >
    <ion-icon id="icon-up" :icon="chevronUp" />
    <ion-icon id="icon-down" :icon="chevronDown" />
  </button>
</template>
<script setup lang="ts">
import { chevronUp, chevronDown } from "ionicons/icons";
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
.button-dropdown {
  --background: var(--theme-secondary-background);
  --color: var(--theme-tertiary-background);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--color);
  background-color: var(--background);
  width: 30px;
  height: 30px;
  border-radius: 5px;
  overflow: hidden;
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
