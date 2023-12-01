<template>
  <section class="popup" v-show="!!props.modelValue">
    <IonModal
      :isOpen="!!props.modelValue"
      :canDismiss="!props.modelValue"
      :showBackdrop="false"
    >
      <div class="wrapper">
        <ion-backdrop
          :visible="true"
          stopPropagation
          tappable
          @ionBackdropTap="Trigger"
        />
        <div class="content">
          <slot name="content" :Trigger="Trigger"
            ><slot :Trigger="Trigger"
          /></slot>
        </div>
      </div>
    </IonModal>
  </section>
</template>
<script setup lang="ts">
import { IonModal, IonBackdrop } from "@ionic/vue";
const props = defineProps({
  modelValue: Boolean,
});

const Trigger = () => {
  emit("update:modelValue", !props.modelValue);
  emit("click-backdrop");
};

const emit = defineEmits(["update:modelValue", "click-backdrop"]);
</script>
<style scoped>
.popup {
  --outline: 2px solid var(--theme-black);
  --border-radius: 6px;
  --background-color: var(--theme-primary);
}

ion-modal::part(content) {
  /* height: auto;
  width: auto; */
  outline: var(--outline);
  border-radius: var(--border-radius);
  background-color: var(--background-color);
}

ion-backdrop {
  background: var(--theme-black);
  opacity: 0.7;
}

.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.content {
  z-index: 2;
  width: auto;
  height: auto;
}
</style>
