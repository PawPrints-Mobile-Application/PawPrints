<template>
  <section class="popup" v-if="!!props.modelValue">
    <ion-backdrop
      :visible="true"
      stopPropagation
      tappable
      @ionBackdropTap="reverseValue"
    />
    <div class="content">
      <slot :reverseValue="reverseValue" />
    </div>
  </section>
</template>
<script setup lang="ts">
import { IonBackdrop } from "@ionic/vue";
const props = defineProps({
  modelValue: Boolean,
});

const reverseValue = () => {
  emit("click");
  emit("update:modelValue", !props.modelValue);
};
const emit = defineEmits(["update:modelValue", "click"]);
</script>
<style scoped>
.popup {
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

ion-backdrop {
  background: var(--ion-color-black);
  opacity: 0.3;
}

.content {
  z-index: 2;
}
</style>
