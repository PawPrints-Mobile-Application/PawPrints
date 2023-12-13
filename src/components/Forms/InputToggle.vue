<template>
  <section class="forms input-toggle text poppins paragraph">
    <aside class="input" @click="SetValue">
      <ion-icon :class="{show: !!props.modelValue}" :icon="icon" />
    </aside>
    <aside class="content">
      <slot>{{ label }}</slot>
    </aside>
  </section>
</template>
<script setup lang="ts">
import { paw as icon } from "ionicons/icons";
import { IonIcon } from "@ionic/vue";
const props = defineProps({
  modelValue: Boolean,
  label: String,
});

const SetValue = () => {
  emit("update:modelValue", !props.modelValue);
  emit("toggle", !props.modelValue);
};

const emit = defineEmits(["update:modelValue", "toggle"]);
</script>
<style scoped>
.input-toggle {
  --background: var(--theme-secondary-background);
  --color: var(--theme-secondary-text);
  --outline: var(--theme-tertiary-background);
  --radius: 5px;
  --text-align: left;
  --size: 25px;
  display: flex;
  gap: 15px;
}
.input {
  width: var(--size);
  height: var(--size);
  border-radius: var(--radius);
  background-color: var(--background);

  display: flex;
  align-items: center;
  justify-content: center;
}

ion-icon {
  position: absolute;
  color: var(--theme-tertiary-background);
  font-size: 0px;
  opacity: 0;
  transition: all 200ms ease-out;
}

.show {
  color: var(--theme-tertiary-background);
  transform: rotate(30deg) translateY(-5px);
  font-size: 45px;
  opacity: 1;
}
</style>
