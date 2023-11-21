<template>
  <section class="input-dynamic text subheading poppins">
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
    />
    <section class="icon" v-show="!hideIcon">
      <InputColorPicker v-if="type === 'color'" />
      <PopupCalendar
        ref="dateRef"
        :saveOnChange="saveOnChange"
        v-else-if="type === 'date'"
        v-model="dateValue"
      />
      <slot />
    </section>
  </section>
</template>
<script setup lang="ts">
import { computed, ref, onMounted, reactive } from "vue";
import { InputBox, InputColorPicker } from ".";
import { PopupCalendar } from "../Popup";
import { LocalDate } from "../../utils";

const props = defineProps({
  type: String,
  modelValue: String,
  hidden: Boolean, // Turns text into password
  show: Boolean,
  freeze: Boolean,
  hideIcon: Boolean,
  saveOnChange: Boolean,
});

const freezer = () => !!props.freeze || props.type === "date";

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const dateValue = computed({
  get() {
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

const Click = () => {
  if (props.type === "date") dateRef.value.Trigger();
  emit("click");
};

const reference = ref();
const ForceFocus = () => reference.value.ForceFocus();
const ForceBlur = () => reference.value.ForceBlur();
const state = reactive({
  touched: false,
  edited: false,
  focused: false,
});

onMounted(() => {
  state.touched = reference.value.state.touched;
  state.edited = reference.value.state.edited;
  state.edited = reference.value.state.edited;
});

const emit = defineEmits([
  "update:modelValue",
  "focus",
  "blur",
  "first-touch",
  "first-edit",
  "change",
  "input",
  "click",
]);
defineExpose({ state, ForceFocus, ForceBlur });
</script>
<style scoped>
.input-dynamic {
  background-color: var(--ion-color-secondary);
  border-radius: 6px;
  width: 100%;
  padding: 5px 10px;
  height: max-content;
  display: flex;
  gap: 5px;

  &.focused {
    outline: 2px solid black;
  }
}

.input-box {
  flex: 1 0 0;
  &:is(:active, :hover, :focus) {
    outline: none;
  }
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
