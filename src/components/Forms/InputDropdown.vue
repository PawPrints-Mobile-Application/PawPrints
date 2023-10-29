<template>
  <div class="input-dropdown">
    <section
      class="forms-input"
      :class="{
        focused: state.focused,
        taken: state.taken,
        touched: state.touched,
        required: !!props.required,
        disabled: !!props.disabled,
        expand: state.expand,
      }"
      :data-design="design"
      @click="ForceFocus"
    >
      <label :for="id" v-show="design !== 'input-only'" @click="ForceFocus">{{
        label
      }}</label>
      <div class="input-container flex-container">
        <input
          ref="input"
          :id="id"
          class="flex-item"
          type="text"
          v-model="value"
          :placeholder="GetPlaceholder()"
          @focus="Focus"
          @blur="Blur"
          :disabled="!!props.disabled"
        />
        <ion-icon
          class="icon-indicator"
          v-show="!hideIcon"
          v-if="
            !state.taken && state.touched && !state.focused && !!props.required
          "
          :icon="iconRequired"
          @click="() => (state.expand = !state.expand)"
        />
        <div
          class="icon-toggle"
          v-show="!hideIcon"
          v-else
          @click="() => (state.expand = !state.expand)"
        >
          <div>
            <ion-icon id="icon-up" :icon="iconUp" />
            <ion-icon id="icon-down" :icon="iconDown" />
          </div>
        </div>
      </div>
    </section>
    <Popup v-model:model-value="state.expand">
      <template #content="{ reverseValue }">
        <InputScroll
          :id="`scroll-${id}`"
          v-model:model-value="value"
          :options="options"
          :default="default"
          @click="reverseValue"
        />
      </template>
    </Popup>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import {
  chevronUp as iconUp,
  chevronDown as iconDown,
  alert as iconRequired,
} from "ionicons/icons";
import { IonIcon } from "@ionic/vue";
import Popup from "../Modals/Popup.vue";
import { InputScroll } from ".";

const input = ref();
const props = defineProps({
  label: String,
  id: {
    type: String,
    required: true,
  },
  required: Boolean,
  placeholder: String,
  modelValue: {
    type: String,
    required: true,
  },
  modelValid: Boolean,
  design: {
    type: String,
    default: "classic",
    validators: (value: string) => ["classic", "input-only"].includes(value),
  },
  default: {
    type: Number,
    default: 0,
  },
  options: {
    type: Array<string>,
    required: true,
  },

  // Actions
  disabled: Boolean,
  hideIcon: Boolean,
});

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("input", value);
    emit("update:modelValue", value);
    state.taken = value !== "";
  },
});

const state = reactive({
  focused: false,
  touched: false,
  taken: false,
  expand: false,
});

const Focus = () => {
  state.focused = true;
  state.touched = true;
  emit("focus");
};

const ForceFocus = () => {
  if (!!props.hideIcon) {
    state.expand = !state.expand;
  } else {
    input.value.focus();
  }
};

const Blur = () => {
  state.focused = false;
  emit("blur");
};

const GetPlaceholder = () =>
  (!state.taken && state.focused) || props.design === "input-only"
    ? props.placeholder
    : "";

const emit = defineEmits(["update:modelValue", "focus", "blur", "input"]);

defineExpose({ ForceFocus });
</script>

<style scoped>
.forms-input {
  min-width: 100%;
}

.icon-toggle {
  display: flex;
  flex-direction: column;
  height: 30px;
  aspect-ratio: 3 / 4;
  overflow-y: hidden;
  overflow: hidden;
}

:is(#icon-up, #icon-down) {
  transition: all 200ms ease-out;
  font-size: var(--fs1);
}

#icon-up {
  transform: translateY(-4px);
}

#icon-down {
  transform: translateY(-20px);
}

.expand #icon-up {
  transform: translateY(9px);
}

.expand #icon-down {
  transform: translateY(-33px);
}
</style>
