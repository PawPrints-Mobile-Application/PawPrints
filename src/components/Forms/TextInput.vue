<template>
  <section
    class="text-input"
    :class="{ focused: focused, 'has-value': modelValue !== '' }"
  >
    <label
      v-show="!!label && labelEffects === 'move'"
      class="text-input-label"
      :for="name"
      @click="focus"
      >{{ label }}</label
    >
    <div class="text-input-wrapper">
      <input
        ref="input"
        class="text-input-input"
        :name="name"
        :type="hide ? type : 'text'"
        v-model="value"
        :placeholder="focused || labelEffects === 'hide' ? placeholder : ''"
        :onFocus="() => {
          focused = true;
          emit('focus', value);
        }"
        :onBlur="() => {
          focused = false;
          emit('blur', value);
        }"
      />
      <ion-icon
        class="text-input-icon"
        v-show="allowValidation"
        :icon="valid ? validIcon : invalidIcon"
        :color="valid ? 'success' : 'danger'"
      />
    </div>
    <div
      class="text-input-helper"
      :class="{ 'opacity-0': !(!!helperText && allowValidation && !valid) }"
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
import { ref, computed } from "vue";
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  label: String,
  placeholder: String,
  type: {
    type: String,
    required: true,
    validator: (value: string) => ["text", "email", "password", 'date'].includes(value),
  },
  validator: {
    type: Function,
    default: () => true,
  },
  helperText: String,
  validate: Boolean,
  modelValue: {
    type: String,
    default: '',
    required: true
  },
  modelValid: Boolean,
  hide: {
    type: Boolean,
    default: false,
  },
  labelEffects: {
    type: String,
    default: 'move',
    validator: (value: string) => ['move', 'hide'].includes(value)
  }
});

const input = ref();
const focus = () => input.value.focus();
const valid = ref(false);
const allowValidation = computed(
  () => !!props.validate && props.modelValue !== ""
);

const focused = ref(false);
const _value = ref(props.modelValue);
const value = computed({
  get() {
    return _value.value;
  },
  set(value: string) {
    _value.value = value;
    valid.value = !!props.validate ? props.validator(value) : true
    emit("update:modelValue", value);
    emit("input", value);
    emit("update:modelValid", valid.value);
  },
});

const emit = defineEmits(["input", "update:modelValid", "update:modelValue", "blur", 'focus']);

defineExpose({focus});
</script>

<style scoped>
.text-input {
  --background-color: var(--ion-color-secondary);
  --background-color-after: var(--ion-color-secondary-shade);
  --border-radius: 5px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: flex-start;
  width: 100%;

  font-family: Rubik;
  font-size: 14px;
  font-weight: 400;
}

.text-input-label {
  position: relative;
  transform: translate(20px, 32px);
  transition: all 200ms ease-out;
  padding: 5px 0;
  overflow-x: visible;
}

.focused .text-input-label,
.has-value .text-input-label {
  transform: translate(0, 0);
  font-weight: 700;
}

.text-input-wrapper {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-radius: var(--border-radius);
  background-color: var(--background-color);
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
  background-color: var(--background-color-after);
}

.text-input-icon {
  overflow: hidden;
  font-size: 30px;
  margin: 0px 20px 0 0;
}

.text-input-helper {
  padding: 5px var(--padding);
  color: var(--ion-color-danger);
  opacity: 0.7;
}
</style>
