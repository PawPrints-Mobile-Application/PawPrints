<template>
  <section class="dropdown-input text font-rubik text-paragraph" :class="{ focused: state.focused }">
    <InputText
      :id="id"
      :label="label"
      type="text"
      :required="required"
      :placeholder="placeholder"
      v-model:model-value="value"
      :hideLabel="hideLabel"
      :animated="animated"
      @focus="Focus"
      @blur="Blur"
      @input="(value) => (state.select = options.indexOf(value))"
      :disabled="!!disallowInput"
    />
    <ion-icon
      :icon="state.collapsed ? expand : collapse"
      @click="toggleOptions"
    />
    <div v-show="!state.collapsed" class="backdrop" @click="Collapse" />
    <section class="choices" :class="{ 'show-options': !state.collapsed }">
      <div class="option">{{ placeholder }}</div>
      <button
        :id="`option-${key}`"
        class="option"
        :class="{ select: state.select === key }"
        @click="
          () => {
            state.select = key;
            value = option;
            Collapse();
          }
        "
        v-for="(option, key) in options"
      >
        {{ option }}
      </button>
    </section>
  </section>
</template>

<script setup lang="ts">
import { InputText } from ".";
import { computed, reactive } from "vue";
import { IonIcon } from "@ionic/vue";
import {
  chevronExpand as expand,
  chevronCollapse as collapse,
} from "ionicons/icons";

const props = defineProps({
  label: String,
  id: {
    type: String,
    required: true,
  },
  required: Boolean,
  placeholder: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
  options: {
    type: Array<string>,
    required: true,
  },
  default: {
    type: Number,
    default: -1,
    validator: (value: number) => value >= -1,
  },

  // Actions
  hideLabel: Boolean,
  animated: {
    type: Boolean,
    default: true,
  },
  disallowInput: Boolean,
});

const toggleOptions = () => (state.collapsed = !state.collapsed);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const emit = defineEmits(["update:modelValue"]);

const state = reactive({
  focused: false,
  touched: false,
  select: -1,
  collapsed: true,
});

const Focus = () => {
  state.focused = true;
  state.touched = true;
};

const Blur = () => (state.focused = false);

const Collapse = () => {
  state.collapsed = true;
};
</script>

<style scoped>
.dropdown-input {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: end;
  width: 100%;
}

.focused {
  z-index: 9;
}

.text-input {
  width: calc(100% - 33px);
  margin-right: 33px;
  z-index: 10;
}

ion-icon {
  position: absolute;
  width: 40px;
  height: 35px;
  background-color: var(--ion-color-secondary);
  border-radius: 6px;
  z-index: 11;
  color: var(--ion-color-tertiary);
}

.focused ion-icon {
  background-color: var(--ion-color-secondary-shade);
}

.backdrop {
  z-index: 8;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.choices {
  z-index: 9;
  width: calc(100% - 33px);
  --height: 0px;
  transform: translateY(calc(var(--height) * 5.9));
  position: absolute;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-flow: column nowrap;
  height: calc(var(--height) * 6);
  overflow-y: scroll;
  border-radius: 0 0 8px 8px;
  transition: all 100ms ease-out;
}

.show-options {
  --height: 30px;
}

.show-options .option {
  opacity: 1;
}

.option {
  opacity: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: var(--height);
  background-color: var(--ion-color-secondary);
  transition: all 75ms ease-out 50ms;
}

div.option {
  background-color: var(--ion-color-secondary-shade);
  color: var(--ion-color-primary);
}

.option.select {
  background-color: var(--ion-color-secondary-shade);
}
</style>
