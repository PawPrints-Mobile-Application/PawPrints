<template>
  <section
    class="input-dynamic text subheading poppins"
    :class="{ focused: state.focused }"
  >
    <InputBox
      ref="reference"
      v-model="value"
      :type="type"
      :freeze="freezer()"
      @focus="emit('focus')"
      @blur="emit('blur')"
      @first-edit="emit('first-edit')"
      @first-touch="emit('first-touch')"
      @change="emit('change', value)"
      @input="emit('input', value)"
      @click="Click"
      :show="valueShow"
      :hidden="hidden"
      :placeholder="placeholder"
      :disabled="disabled"
    />
    <section class="icon" v-show="!hideIcon" @click="IconClick">
      <InputColorPicker v-if="type === 'color'" v-model="colorValue" />
      <PopupCalendar
        ref="dateRef"
        :saveOnChange="saveOnChange"
        v-else-if="type === 'date'"
        v-model="dateValue"
        :disableFuture="disableFuture"
        @state="(value) => emit('state-expanded', value)"
      />
      <ButtonShow v-else-if="type === 'password'" v-model="valueShow" />
      <slot v-else name="icon"><slot /></slot>
    </section>
  </section>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { InputBox, InputColorPicker } from ".";
import { PopupCalendar } from "../Popup";
import { LocalDate } from "../../utils";
import { ButtonShow } from "../Buttons";

const props = defineProps({
  type: String,
  modelValue: [String, Number],
  hidden: Boolean, // Turns text into password
  show: Boolean,
  freeze: Boolean,
  hideIcon: Boolean,
  saveOnChange: Boolean,
  placeholder: String,
  disabled: Boolean,
  disableFuture: Boolean,
});

const freezer = () => !!props.freeze || props.type === "date";

const _show = ref(false);
const valueShow = computed({
  get() {
    return _show.value || !!props.show;
  },
  set(value) {
    _show.value = value;
  },
});

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const colorValue = computed({
  get() {
    return props.modelValue?.toString();
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const dateValue = computed({
  get() {
    if (!props.modelValue || props.modelValue === "") {
      dateValue.value = new LocalDate().GetDate();
    }
    return new Date(props.modelValue!);
  },
  set(value) {
    emit(
      "update:modelValue",
      new LocalDate(value).toLocaleDateString("YYYY/MM/DD", "-")
    );
  },
});
const dateRef = ref();

const IconClick = () => emit("icon-click");

const Click = () => {
  if (props.type === "date") dateRef.value.Trigger();
  emit("click");
};

const reference = ref();
const ForceFocus = () => reference.value.ForceFocus();
const ForceBlur = () => reference.value.ForceBlur();
const state = computed(() =>
  !!reference.value
    ? reference.value.state
    : {
        touched: false,
        edited: false,
        focused: false,
      }
);

const emit = defineEmits([
  "update:modelValue",
  "focus",
  "blur",
  "first-touch",
  "first-edit",
  "change",
  "input",
  "click",
  "icon-click",
  "state-expanded",
]);
defineExpose({ state, ForceFocus, ForceBlur });
</script>
<style scoped>
.input-dynamic {
  --outline: 2px solid var(--ion-color-black);
  background-color: var(--ion-color-secondary);
  border-radius: 6px;
  width: 100%;
  padding: 5px 10px;
  height: max-content;
  display: flex;
  gap: 5px;

  &.focused {
    outline: var(--outline);
  }
}

.input-box {
  flex: 1 0 0;
  --outline: none;
}

.icon {
  width: 30px;
  height: 30px;
}

input[type="date"]::-webkit-inner-spin-button,
input[type="date"]::-webkit-calendar-picker-indicator {
  display: none;
  -webkit-appearance: none;
}

input[type="password"]::-ms-reveal,
input[type="password"]::-ms-clear {
  display: none;
}
</style>
