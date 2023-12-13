<template>
  <section class="forms input-password">
    <input
      class="text poppins paragraph"
      :type="toggleShow || !!show ? 'text' : 'password'"
      v-model="value"
    />
    <ion-icon
      class="text heading theme color tertiary"
      :icon="!!toggleShow ? showIcon : hideIcon"
      @click="() => (toggleShow = !toggleShow)"
    />
  </section>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { IonIcon } from "@ionic/vue";
import { eye as showIcon, eyeOff as hideIcon } from "ionicons/icons";

const props = defineProps({
  modelValue: String,
  show: Boolean,
});

const toggleShow = ref(false);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const emit = defineEmits(["update:modelValue"]);
</script>
<style scoped>
.input-password {
  --background: var(--theme-secondary-background);
  --color: var(--theme-secondary-text);
  --outline: var(--theme-tertiary-background);
  --radius: 5px;
  --icon: var(--theme-tertiary-background);
  --text-align: left;
  --font-weight: 400;
  background-color: var(--background);
  color: var(var(--color));
  width: 100%;
  height: 30px;
  border-radius: var(--radius);
  padding: 5px 10px;
  display: flex;
  gap: 5px;

  &:is(:active, :hover, :focus) {
    outline: 2px solid var(--outline);
  }
}

input {
  text-align: var(--text-align);
  font-weight: var(--font-weight);
  background-color: inherit;
  color: inherit;
  border: none;
  outline: none;
  flex: 1 0 0;

  &:is(:active, :hover, :focus) {
    outline: none;
  }
}

input[type="password"]::-ms-reveal,
input[type="password"]::-ms-clear {
  display: none;
}
</style>
