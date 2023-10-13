<template>
  <section
    class="text-input"
    :class="{ focused: focused, 'has-value': value !== '' }"
  >
    <label
      v-show="!!label"
      id="text-input-label"
      :for="name"
      @click="input?.focus()"
      >{{ label }}</label
    >
    <div class="text-input-wrapper">
      <input
        ref="input"
        class="text-input-input"
        :name="name"
        :type="type"
        v-model.trim="value"
        @input="Validate"
        :placeholder="focused ? placeholder : ''"
        :onFocus="() => (focused = true)"
        :onBlur="() => (focused = false)"
      />
      <ion-icon
        id="text-input-icon"
        v-show="AllowValidation()"
        :icon="Valid() ? validIcon : invalidIcon"
        :color="Valid() ? 'success' : 'danger'"
      />
    </div>
    <div
      id="text-input-helper"
      :class="{ 'opacity-0': !(!!helperText && AllowValidation() && !Valid()) }"
    >
      {{ helperText }}
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  shieldCheckmark as validIcon,
  warning as invalidIcon,
} from "ionicons/icons";
import { IonIcon } from "@ionic/vue";
import { ref } from "vue";
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  label: String,
  placeholder: String,
  type: {
    type: String,
    default: "text",
    validator: (value: string) => ["text", "email", "password"].includes(value),
  },
  validator: {
    type: Function,
    default: (value: string) => true,
  },
  helperText: String,
  validate: Boolean,
});

const input = ref("");
const value = ref("");
const emit = defineEmits(["input", 'validate']);
defineExpose({ value });

const focused = ref(false);
const AllowValidation = () => !!props.validate && value.value !== "";
const Valid = () => props.validator(value.value);
const Validate = () => {
  emit('validate', !!props.validate ? Valid() : true);
  emit("input", value.value);
  return AllowValidation() && Valid();
};
</script>

<style scoped>
.text-input {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: flex-start;
  width: 100%;

  font-family: Rubik;
  font-size: 14px;
  font-weight: 400;
}

#text-input-label {
  position: relative;
  transform: translate(20px, 32px);
  transition: all 200ms ease-out;
  padding: 5px 0;
  overflow-x: visible;
}

.focused #text-input-label,
.has-value #text-input-label {
  transform: translate(0, 0);
  font-weight: 700;
}

.text-input-wrapper {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-radius: 5px;
  background-color: var(--ion-color-quarter);
}

.text-input-input {
  width: 100%;
  padding: 10px 20px;
  border: none;
  background: none;
}

.focused .text-input-input {
  outline: none;
}

.focused .text-input-wrapper {
  background-color: var(--ion-color-quarter-shade);
}

#text-input-icon {
  overflow: hidden;
  font-size: 30px;
  margin: 0px 20px 0 0;
}

#text-input-helper {
  padding: 5px var(--padding);
  color: var(--ion-color-danger);
  opacity: 0.7;
}
</style>
