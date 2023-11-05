<template>
  <InputWrapper
    :label="label"
    :id="id"
    :design="design"
    :hide-label="hideLabel"
  >
    <section class="input-toggle">
      <div class="option-input">
        <input
          :id="`${id}-input`"
          type="radio"
          :name="`input-radio-${id}`"
          :value="!value"
          @click="Toggle"
        />
        <div class="custom-input" v-show="value" />
      </div>
      <label class="option-label" :for="`${id}-input`">
        <slot>{{ content }}</slot>
      </label>
    </section>
  </InputWrapper>
</template>
<script setup lang="ts">
import { InputWrapper } from ".";
import { ref } from "vue";

const props = defineProps({
  label: String,
  id: {
    type: String,
    required: true,
  },
  design: {
    type: String,
    default: "classic",
    validators: (value: string) =>
      ["classic", "input-only", "label-inline"].includes(value),
  },
  hideLabel: Boolean,
  modelValue: Boolean,
  content: String,
});

const value = ref(props.modelValue);
const Toggle = () => {
  value.value = !value.value;
  emit("update:modelValue", value.value);
};

const emit = defineEmits(["update:modelValue"]);
</script>
<style scoped>
.input-wrapper {
  width: 100%;
}

.input-toggle {
  width: 100%;
  min-width: calc(50% - var(--gap));
  --size: 15px;
  --cover-size: calc(var(--size) * 0.6);
  --border-radius: 10px;
  height: 20px;
  flex: 1 0 0;
  display: flex;
  gap: 5px;
  align-items: center;
}

.option-input {
  background-color: var(--ion-color-secondary);
  width: var(--size);
  height: var(--size);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: var(--border-radius);

  > input {
    opacity: 0;
  }
}

.option-input > .custom-input {
  opacity: 0.7;
  background-color: var(--ion-color-black);
  border-radius: var(--border-radius);
  position: absolute;
  width: var(--cover-size);
  height: var(--cover-size);
}

.option-label {
  font-size: var(--fs4);
  flex: 1 0 0;

  > input {
    width: 100%;
    border-radius: 4px;
    border: none;
    border-bottom: 1px solid var(--ion-color-black);
  }

  > input:is(:focus, :hover, :active) {
    outline: none;
    border-bottom: 2px solid var(--ion-color-black);
  }
}
</style>
